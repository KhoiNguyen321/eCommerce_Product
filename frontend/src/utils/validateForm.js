export const validateLoginForm = (form) => {
  const { email, password } = form;

  const newErrors = [];

  if (email.length < 5) {
    newErrors.push('Email should be at least 5 charcters long');
  }
  if (email.split('').filter((x) => x === '@').length !== 1) {
    newErrors.push('Email should contain a @');
  }
  if (email.indexOf('.') === -1) {
    newErrors.push('Email should contain at least one dot');
  }
  if (password.length < 5) {
    newErrors.push('Password should be at least 6 characters long');
  }
  return newErrors;
};

export const ValidateProfileForm = (form) => {
  const { name, password, confirmPassword } = form;

  const newErrors = [];
  if (!name) {
    newErrors.push('Name can not be empty');
  }
  if (name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    newErrors.push('Name do not contain special characters');
  }

  if (name.length < 5) {
    newErrors.push('Name should be at least 5 characters long');
  }

  if (password !== confirmPassword) {
    newErrors.push('Password and Confirm Password do not match');
  }

  return newErrors;
};
