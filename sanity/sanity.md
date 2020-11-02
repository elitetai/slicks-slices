How to start sanity:
sanity --version // check version
sanity init --reconfigure // create an account or login to create a new dataset with sanity
sanity login // relogin
npm start
sanity graphql deploy production // after deplay, give name of the datasets
sanity deploy // to deploy the server: ? Studio hostname (must be unique)
~ It will provide the url e.g. `https://slicksslicesyunhan.sanity.studio/desk`

Quick Notes:

- Everything in sanity studio is a react component, so you can pass it with react component if you want
- Slug meaning:
  A "slug" is a way of generating a valid URL, generally using data already obtained. For instance, a slug uses the title of an article to generate a URL. I advise to generate the slug by means of a function, given the title (or another piece of data), rather than setting it manually.
  For below examples, the-46-year-old-virgin is a slug: it is created from the title by down-casing all letters, and replacing spaces by hyphens -.
  e.g.:
  `<slug> the-46-year-old-virgin </slug>`
  `www.example.com/article/the-46-year-old-virgin`
- react-icons: A great all-in-one library for icons from various libraries
- To get out the URL endpoint, run `sanity graphql list`
- Sanity's GraphQL style of query writting will not be the same as Gatsby's GraphyQL

Schema:
https://www.sanity.io/docs/schema-types
i) Image field > options > hotspot:
It targets important info like somebody's face or a device and then when we have different sizes for mobile, landscape, panorama, square - it will make sure that the important hotspot is always at the center of the photo, and the rest of it won't be cropped off

Components folder: To put custom CMS inputs
At the field > declare `inputComponent` with the imported input as value
~Notes:

> the styling will not match the defaults from sanity studio
> For react, under input, if you put value - you must include onChange as well

Deployment:
For a changes in our database, we can use Netlify's build hooks to post a new change for rebuilding
~How To:
i) Go to Netlify's build hooks (under `Settings` > `Build & deploy` > `Continuous Deployment` > `Build hooks`)
ii) Type in Build hook name (e.g. Rebuild from Sanity) & leave Branch to build under `master`, then save it. Copy the URL given.
iiI) Go to sanity directory and use the terminal
iv) Type `sanity hook create` (`netlify deploy` can be used as Hook name), apply to `production` & paste the Hook URL
v) It will automatically triggered everytime when you make changes (publish it) on Sanity Studio

Extra:
i) Javascript:
Object.values(toppings) - where toppings is an object
This can be used for functions such as .join() or .filter(), that only works on array, for object as well

ii) Money formatting
`Intl.NumberFormat()` is built inside the browser and it's a great way to format money based on the locale (local currency)
`const formatMoney = Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', }).format;`
then wrap it with the value e.g. formatMoney(value)

iii) Loading sample data:
To import all of the data (prefilled) from `all-sample-data.gz`, just type `sanity dataset import .\sample-data\all-sample-data.gz production` (add on `--replace` if you want to reset it) on the terminal of this sanity's directory
