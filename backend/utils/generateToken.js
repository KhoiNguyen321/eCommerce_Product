import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ foo: id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
