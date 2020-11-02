import { useState } from 'react';

// This is a custom hook
export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if it's a number and convert it
    const { value } = e.target;
    if (e.target.type === 'number') {
      parseInt(value);
    }

    // useForm is getting an object, instead of single value, hence we need to spread the existing values into it and update new ones
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
