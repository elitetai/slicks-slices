import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingFilter from '../components/ToppingFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  // pass query (below) to props(data) directly
  // console.log(data);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      {/* pageContext gotten from context @ line 54 of 'gatsby-node.js' */}
      <ToppingFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  # Query includes passing toppings' and pizzas' lists
  # 1st way to pass topping data from 'gatsby-node.js': more flexible
  query($toppingRegex: String) {
    # Renaming to pizzas
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      # 2nd way to pass topping data from 'gatsby-node.js': is easier / simpler
      # query($topping: [String]) {
      # pizzas: allSanityPizza(
      #   filter: { toppings: { elemMatch: { name: { in: $topping } } } }
      # ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            # fixed(width: 200, height: 200) {
            #   ...GatsbySanityImageFluid
            # }
            fluid(maxWidth: 400) {
              # Fragment comes with sanity plugin we used
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
