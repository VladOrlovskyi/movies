const validateFields = (values) => {
  const errors = {};

  if (values.username === "") {
    errors.username = "Not empty";
  }

  if (values.password === "") {
    errors.password = "Required";
  }
  return errors;
};

export default validateFields;
