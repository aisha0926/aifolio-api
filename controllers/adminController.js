import * as dotenv from 'dotenv';
dotenv.config();
import Admin from '../models/Admin.js';
import auth from '../config/auth.js';

import bcrypt from 'bcryptjs';
import axios from 'axios';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    if (req.body.projects && req.body.workExperience) {
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
      return res.send(findUser);
    } else if (req.body.projects) {
      const updateProjects = await Admin.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            projects: {
              $each: [projects],
              $position: 0,
            },
          },
        },
        {
          new: true,
        }
      );
      return res.send(updateProjects);
    } else if (req.body.workExperience) {
      const updateExperience = await Admin.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            workExperience: {
              $each: [workExperience],
              $position: 0,
            },
          },
        },
        {
          new: true,
        }
      );
      return res.send(updateExperience);
    } else if (findUserAndUpdate) {
      return res.send(findUserAndUpdate);
    } else {
      return res.send({
        error: `Error saving data ${findUserAndUpdate} not found`,
      });
    }
  } catch (error) {
    return res.send({ error: `Error: ${error.message}` });
  }
};

// Module to update data
const updateUserData = async (req, res) => {
  //* get user via jwt
  try {
    const { _id, project } = req.body;
    // const { id } = req.user;

    const $set = {};
    for (const key in project) {
      $set[`projects.$.${key}`] = project[key];
    }
    console.log($set);

    //Po+ sitional dollar sign
    const test = await Admin.findOneAndUpdate(
      {
        projects: { $elemMatch: { _id: _id } },
      },
      { $set: $set },
      { new: true }
    );

    res.send(test);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

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

const updateData = async (req, res) => {
  try {
    const { id, projects, workExperience } = req.body;

    if (workExperience) {
      const userData = await Admin.findByIdAndUpdate(
        { _id: req.user.id, 'workExperience._id': id },
        {
          $set: {
            'workExperience.$[elem]': workExperience,
          },
        },
        { arrayFilters: [{ 'elem._id': id }] }
      );
      res.send(userData);
    } else if (projects) {
      const projectsData = await Admin.findByIdAndUpdate(
        { _id: req.user.id, 'projects._id': id },
        {
          $set: {
            'projects.$[elem]': projects,
          },
        },
        { arrayFilters: [{ 'elem._id': id }] }
      );
      res.send(projectsData);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete
const deleteData = async (req, res) => {
  /* 
  MAYBE USE AN ARCHIVE AND INSTEAD OF DELETING THE NESTED DATA, JUST CHANGE ITS ARCHIVE VALUE TO TRUE 
  */
  try {
    const { id } = req.body;

    const test = await Admin.findById(req.user.id);

    const userData = await Admin.findByIdAndUpdate(
      { _id: req.user.id, 'workExperience._id': id },
      {
        $pull: {
          'workExperience.$[elem]': { _id: id },
        },
      },
      { arrayFilters: [{ 'elem._id': id }] }
    );
    res.send(userData);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const sendEmail = (req, res) => {
  const { email, name, number, sender_message } = req.body;

  const msg = {
    to: process.env.SENDGRID_RECIPIENT_EMAIL, // Change to your recipient
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject: "Email from Ai'Folio",
    text: 'Just some gibberish stuff to test the sendgrid api',
    html: '<strong>Message</strong>',
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {
      email: `${email}`,
      name: `${name}`,
      number: `${number}`,
      sender_message: `${sender_message}`,
    },
  };

  sgMail
    .send(msg)
    .then((response) => {
      res.send({ message: `Email sent successfully.` });
    })
    .catch((error) => {
      res.send({ message: error });
    });
};

// Module to delete data

export default {
  signUp,
  login,
  addUserData,
  updateUserData,
  getUserData,
  getAllUser,
  sendEmail,
  updateData,
  deleteData,
};
