// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
// It is require to restart npm after saving it all the instances

import dotenv from 'dotenv'; // can be found from dependencies

dotenv.config({ path: '.env' });
// console.log(process.env.SANITY_TOKEN); ~See either browser or terminal to check if it works or not

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Kuala Lumpur!',
    twitter: '@slickSlices',
  },
  plugins: [
    // can be found from dependencies
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        // grab it from manage.sanity.io/projects > the project that you're working with
        projectId: 'r8d1pior',
        dataset: 'production',
        watchMode: true, // when in development mode and you make a change to your sanity CMS, it will automatically be updated inside of your Gatsby (real time editing)
        token: process.env.SANITY_TOKEN, // go to Settings > API > Tokens (Pick `Read` as the rights)
        // Notes: Add CORS Origins @ http://localhost:* and allow credentials for direct connection to Sanity's GraphQL
        // remember to deploy GraphQL API in sanity!
      },
    },
  ],
};
