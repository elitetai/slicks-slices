Quick Note:
i) Recommended file naming convention: if the file can be reused multiple times, capitalized it (e.g. Pizza.js)
ii) You can define a CSS using constant and use it as a `Component` in JSX
iii) For quick import (using emmet: expand abbreviation), if it doesn't see any evidence of `ES Modules` being used (such as `import` / `export`), it will automatically assumes that it is under common js (like `const` / `let`)
iv) If you want to have some sort of state across page changes, then you need to put the state at the highest level of Gatsby - `root element` via `React.createContext()` (create a custom hook such as `OrderContext.js` @ component) and use `useContext`
~ Context allow us to store data and functionality at a high level and access it at a much lower level without having to pass that data via props
iv) If you want to do something that requires server/backend (e.g. sending email, make contact form) - use serverless function (refer below under `Netlify`)
v) Limitation - the website runs on built time, meaning that it will only generate whatever data from Gatsby's graphQL upon starting up the website. Whatever changes (such as homepage with settings) would need to restart the server.
~ One way is to get the source of the data directly from backend (such as Sanity URL endpoint - grab it from `sanity graphql list` @ sanity's terminal) instead of getting from Gatsby's graphQL (build time), with custom react hook (put it inside utils folder) that will fetch the data and store it inside (refer to `useLatestData.js`)
vi) Gatsby's GraphyQL style of query writting will not be the same as Sanity's GraphQL

- Gatsby Config:
  In order to check the siteMetadata with GraphQL, ones need to connect to `http://localhost:8000/___graphql`
  After connecting and filling up the required data, just query it directly from GraphQL like this (type it instead of copy paste from below):

  ```
  query {
    site {
        siteMetadata {
            description
            title
            siteUrl
        }
    }
  }
  ```

- Types of Query:
  https://www.gatsbyjs.com/docs/static-vs-normal-queries/
  i) Page Queries:
  a) Can be dynamic with variables
  b) Can only be run on top level page (Page template or gatsby-node.js)
  c) Typically queries on external GraphQL API
  d) e.g. export const query = graphql`query {...}`

  ii) Static Queries:
  a) Can not be dynamic, no variables can be passed in
  b) Can be run anywhere (e.g. ToppingFilter)
  c) Use query within Gatsby - such as `siteMetadata` that was declared under `gatsby-config` or query outside a page, e.g. a component
  d) e.g. (using react hook) const { pizzas } = useStaticQuery(graphql`query {...}`)

- Gatsby API:
  i) Gatsby Browser API: it will run once the page is generated and loaded
  \*Might need to restart the build during coding

  > wrapPageElement - Allow a plugin to wrap the page element
  > https://www.gatsbyjs.com/docs/browser-apis/#wrapPageElement

  ii) Gatsby SSR (Server Rendering) API:
  Copy from browser and paste it in gatsby-ssr

  iii) Gatsby Node API:
  https://www.gatsbyjs.com/docs/node-apis/
  Want to dynamically create pages (e.g. page for each of the individual pizza)? use `gatsby-node`!
  Pagination Data: you can paginate each of the data (e.g. slicemasters) during pre-generated at build time instead on demand, but you need to define the number of data required (e.g. total number of slicemasters) in either .env file (use process.env.<GATSY_SOMETHING>) or Javascript file(setting.js)
  Under `gatsby-node`, you can also use external apis via `sourceNodes`!

- Gatsby Image:
  https://www.gatsbyjs.com/plugins/gatsby-image/;
  2 different types of images that you can feed to Gatsby image:
  i) Fixed: fixed within image's width/height
  ii) Fluid: it is responsive ~can resize the image
  \*Notes: to style the `Img` from `gatsby-image`, use the class `.gatsby-image-wrapper` instead of calling `Img`

  Two ways to source for image:
  i) Directory (e.g. data from sanity):
  Pipe them thru [gatsby-plugin-sharp](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/). it runs on your computer, netlify or build process. It will resize and generate all those images for you
  \*Disadv: Can take a long time if you have a lot images
  ii) Use it with service:
  Either you upload image to directly to these services or you feed them your image. It will then produce all of those for you on demand, as the user requests it
  Example of service providers - Sanity Image Pipeline, Cloudinary, Imgix

- React Helmet: used for SEO or head tags
  Allows us to stick tags into react helmet, and it will transport them out of wherever you put them into our document's head. It is useful for things like HTML tags or HTML attributes, SEO, Open Graph meta tags etc
  `import { Helmet } from 'react-helmet'`

  Recommended way of using it:
  To create reusable SEO component (call it `SEO.js`) that has a sets of defaults, and overwrite those if necessarily
  Notes: Need to put the declare the plugin under `gatsby-config`. It requires the plugin in order to make it work during server rendering/pre-building, which is really important for your SEO
  e.g.:
  `plugins: [`
  `'gatsby-plugin-react-helmet'`

- CSS:
  i) clamp() CSS function clamps a value between an upper and lower bound. clamp() enables selecting a middle value within a range of values between a defined minimum and maximum. It takes three parameters: a minimum value, a preferred value, and a maximum allowed value. The clamp() function can be used anywhere where <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> is allowed.
  e.g.:
  `font-size: clamp(1rem, 10vw, 2rem); `
  \*Note that using clamp() for font sizes, as in these examples, allows you to set a font-size that grows with the size of the viewport, but doesn't go below a minimum font-size or above a maximum font-size. It has the same effect as the code in Fluid Typography but in one line, and without the use of media queries.

  ii) Image base64 loading thumbnail:
  `img[src*=base64\\,]`: When the page load up image for the first time, before it finishes downloading from the server, it actually renders out `base64 string` image. Instead of having to wait for a small thumbnail version, it just ships that image as text under `base64`.
  ~How it works: it renders out 20 x 20px image and scale it up then blur it
  e.g.:

  ```
  .gatsby-image-wrapper img[src*=base64\\,] {
  image-rendering: -moz-crisp-edges;
  image-rendering: pixelated;
  }
  ```

  iii) object-fit: contain; // use to contain the img due to difference of height of each individual image; hence, it will automatically resize each individual image

- Netlify
  ~ Serverless function - a function that does one thing and shut itself down (any framework can be used but need a URL that you can ping)
  ~ Netlify is good at hosting Gatsby and serverless function (declare under `netlify.toml` + functions folder that is nested with folders of the functions)

  Steps to do it:
  Under `netlify.toml`, key in:

  ```
  [build]
    functions = "functions/"
  ```

  \*Notes: Before the word `functions`, you must `tab` it to leave some spaces
  Then, under the main `package.json`, it must have below statements:

  ```
  "scripts": {
    "netlify": "netlify dev",
  ```

  Once it's done, kill the terminal and run `npm run netlify`
  Get the URL (something like `◈ Server now ready on http://localhost:8888`)

  Inside the functions folder, you will create more folders and a js file inside it
  handlers are similar to Amazon serverless functions called AWS Lambda (Netlify documentation is not as good, so go for AWS's documentation instead)

  ~To check what is being returned from the file, search up `http://localhost:8888/.netlify/functions/<function folder's name>`
  To create your own `package.json` file:
  i) Use your terminal to go to that file directory (e.g. ../functions/placeOrder)
  ii) Type `npm init` and press/hold enter all the way through (until you see `package.json` file inside the folder)
  Need the dependencies? just `npm install <name>`

- Honeypot: used to go against bots (during form submission)
  Basically just add another input field with a special value (and set the style - display: none) and check it if it's being filled up upon submission or not. If so, return some errors (the mistake might be caused by an user, so do remember to add error codes to identify the error if being asked)

- Deployment:
  Type `npm run build` to run Gatsby build and able to use ES module. It will generate a public folder with all of the html pages.
  At Netlify's webpage (During new site creation, after selecting the repo from Github itself):
  ~ At `basic build settings`:
  Build command: `npm run build`
  Publish directory: `gatsby/public`

  ~After that, go to under `Settings` > `Build & deploy` > `Continuous Deployment` > edit setting:
  Base directory: `gatsby`
  Publish directory: `gatsby/public`
  Then re-deploy it @ `site overview` > `Production deploys` > `Trigger deploy` > `Clear cache...`

  ~Under `Settings` > `Build & deploy` > `Environment`: Copy & paste all of the env in there
  ~For CORS issue due to the use of direct sanity URL query (refer to above - `Limitation` & `useLatestData.js`), add the URL under origin without credential allowed

- Error Decode:
  a) `JSON.parse: unexpected character at line 1 column 1 of the JSON data`
  Meaning: You got some data back and you try to turn into an object but it obviously wasn't JSON to begin with
  Fix: Under `Dev Tool`, go to `Network` and look at the failed XHR request or maybe it's success 200 but the result that came back was not JSON. Check `Console` if all else fails

  b) If you import data from `.env`, sometimes you'll need to restart the build
