import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {/* Array.from() - check out `Using arrow functions and Array.from()` @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from */}
      {/* Second argument is also a map() function */}
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loader-${i}`}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
