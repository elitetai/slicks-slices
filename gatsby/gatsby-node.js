import path, { resolve } from 'path'; // node api; no need to npm install it
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  // await below is written because this is async and graphql is a function
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // createPage() is the method, not the function `createPages(params)` below
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        // to pass data from createpage to the actual template (under SinglePizzaPage @ pageContext)
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingssIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // Regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to Pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one (can use forEach too; though this is an object, not array)
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      child: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
          description
        }
      }
    }
  `);
  // 2. Turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based on how many slicemasters, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // _ is used because it's not relevant
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize, // skip the front pages
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

// This function happens before creating pages
export async function sourceNodes(params) {
  // Fetch a list of beers and source them into our gatsby API!
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

// params @ official doc: graphql for query data & actions is used for manually creating pages
export async function createPages(params) {
  // create pages dynamically
  // await is written due to async function from turnPizzasIntoPages/turnToppingssIntoPages which might take some time before it query all the data and fully create the website
  // Wait for for all promises to be resolved before finishing this function
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingssIntoPages(params),
    // 3. Slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}
