const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const auth = require('../auth');

//Module for sign up
const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    Admin.countDocuments(email, async (err, count) => {
      err && res.send({ error: err.message });

      if (count === 0) {
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new Admin({
          firstName,
          lastName,
          email,
          password: hashPassword,
        });

        const saveUser = await newUser.save();

        return saveUser
          ? res.send(saveUser)
          : res.send({ error: 'Error in saving data' });
      } else {
        return res.send({ error: 'Email already exists' });
      }
    });
  } catch (error) {
    return res.send({ error: error.message });
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
        ? res.send({ accessToken: auth.createToken(findUser) })
        : res.send({ error: 'Password is incorrect' });
    }
  } catch (error) {
    return res.send({
      error: `Unable to find user with email: ${email}`,
    });
  }
};

// Module add data
const addUserData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      aboutMe,
      image,
      workExperience,
      projects,
    } = req.body;

    const details = {
      image,
      workExperience,
      projects,
    };

    console.log(workExperience);

    const findUser = await Admin.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          image,
          workExperience: {
            $each: workExperience,
            $position: 0,
          },
          projects: {
            $each: projects,
            $position: 0,
          },
        },
      },
      {
        new: true,
      }
    );

    const userDetail = {
      firstName,
      lastName,
      email,
      aboutMe,
    };

    const findUserAndUpdate = await Admin.findByIdAndUpdate(
      req.user.id,
      userDetail
    );

    if (findUser) {
      if (findUserAndUpdate) {
        return res.send(findUser);
      } else {
        return res.send({
          error: `Error saving data ${findUserAndUpdate} not found`,
        });
      }
    } else {
      return res.send({ error: `Error saving data ${findUser} not found` });
    }

    // return findUser & findUserAndUpdate
    //   ? res.send(findUser)
    //   : res.send({ error: 'Error saving data' });
  } catch (error) {
    return res.send({ error: `Error: ${error.message}` });
  }
};

// Module to update data
// const updateUserData = async (req, res) => {
//   //* get user via jwt
//   try {
//     const { aboutMe, image, workExperience, projects } = req.body;
//     const { id } = req.user;

//     const newData = {
//       aboutMe,
//       image,
//       workExperience,
//       projects,
//     };

//     const findAdmin = await Admin.findByIdAndUpdate(
//       id,
//       { $push: newData },
//       { new: true }
//     );

//     return findAdmin ? res.send(findAdmin) : res.send('Unable to find data');
//   } catch (error) {
//     return res.send({ message: error.message });
//   }
// };

// Module to get admin data
const getUserData = async (req, res) => {
  const getUser = await Admin.findById(req.user.id);

  return getUser
    ? res.send(getUser)
    : res.send({ error: 'Unable to find user' });
};

const getAllUser = async (req, res) => {
  const data = await Admin.find({}).select('-password -isAdmin');

  return res.send(data);
};

// Module to delete data

module.exports = {
  signUp,
  login,
  addUserData,

  getUserData,
  getAllUser,
};
