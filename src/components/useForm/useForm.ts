import React, { ChangeEvent } from "react";

export function useForm(input: { [key: string]: string }) {
  const [values, setValues] = React.useState(input);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
