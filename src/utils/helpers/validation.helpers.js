export const composeValidators =
  (...validators) =>
  (value, allValues) =>
    validators.reduce(
      (error, validator) => error || validator(value, allValues),
      undefined
    );

export const required = value => (value ? undefined : 'Required');

export function emailAddress(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address!'
    : undefined;
}

export const onlyPositives = value => {
  if (value && isNaN(value)) {
    return 'Must be a number!';
  }

  if (value && +value <= 0) {
    return 'Must be greater than zero!';
  }
};

export const samePassword = (passwordAgain, allValues) =>
  passwordAgain && allValues.password && passwordAgain !== allValues.password
    ? "Passwords don't match!"
    : undefined;
