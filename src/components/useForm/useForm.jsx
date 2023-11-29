import React from "react";

export function useForm(input) {
  const [values, setValues] = React.useState(input);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
