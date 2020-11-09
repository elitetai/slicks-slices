import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="400"
            // the styling method for src is from sanity itself
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            // below style is to load a lqip first (after loading animation) before the actual image (looks like a pixalated photo of the original image)
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
