const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const auth = require('../auth');

//Module for sign up
const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    Admin.countDocuments(email, async (err, count) => {
      err && res.send({ message: err.message });

      if (count === 0) {
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new Admin({
          firstName,
          lastName,
          email,
          password: hashPassword,
        });

        const saveUser = await newUser.save();

        return saveUser ? res.send(saveUser) : res.send('Error in saving data');
      } else {
        return res.send({ message: 'Email already exists' });
      }
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

// Module to login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await Admin.findOne({ email });

    const validatePassword = bcrypt.compareSync(password, findUser.password);

    if (findUser) {
      return validatePassword
        ? res.send(auth.createToken(findUser))
        : res.send({ message: 'Password is incorrect' });
    }
  } catch (error) {
    return res.send({
      message: `Unable to find user with email: ${email}`,
    });
  }
};

// Module add data
const addData = async (req, res) => {
  try {
    const { aboutMe, image, workExperience, projects } = req.body;

    const findUser = await Admin.findById(req.user.id);

    if (findUser) {
      const addDetails = new Admin({
        aboutMe,
        image,
        workExperience,
        projects,
      });

      const saveDetails = await addDetails.save();

      return saveDetails
        ? res.send(saveDetails)
        : res.send({ message: 'Error saving data' });
    } else {
      return res.send({ message: 'Unable to find user' });
    }
  } catch (error) {
    return res.send({ message: `Error: ${error.message}` });
  }
};

// Module to update data
const updateUserData = async (req, res) => {
  //* get user via jwt
  try {
    const { aboutMe, image, workExperience, projects } = req.body;
    const { id } = req.user;

    const newData = {
      aboutMe,
      image,
      workExperience,
      projects,
    };

    const findAdmin = await Admin.findByIdAndUpdate(
      id,
      { $push: newData },
      { new: true }
    );

    return findAdmin ? res.send(findAdmin) : res.send('Unable to find data');
  } catch (error) {
    return res.send({ message: error.message });
  }
};

// Module to get admin data
const getUserData = async (req, res) => {
  const getUser = await Admin.findById(req.user.id);

  return getUser
    ? res.send(getUser)
    : res.send({ message: 'Unable to find user' });
};

// Module to delete data

module.exports = {
  signUp,
  login,
  addData,
  updateUserData,
  getUserData,
};
