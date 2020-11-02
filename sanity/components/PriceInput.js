import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  // if the value is nothing, unset/do not set it, else, set it to that number (must use Number to turn it to number from string)
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

// It's built inside the browser and it's a great way to format money based on the locale (local currency)
const formatMoney = Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  // all of the props can be found in PriceInput under Components @ dev tool
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))} // onChange being called the second time as a prop
        // tell sanity that inputComponent is the actual input & changes of stuff
        ref={inputComponent}
      />
    </div>
  );
}
