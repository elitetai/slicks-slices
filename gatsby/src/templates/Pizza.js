import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

// data: { pizza } is a nested destructuring; downside is you can't call data - it will get errors if you do so
export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      {/* ? under image is called nested chaining, where it will check one by one from left to right to see if it exists or not */}
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node
export const query = graphql`
  # type of slug, which is String and ! means absolutely required
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
