const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  aboutMe: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: [
    {
      page: String,
      url: String,
      archive: {
        type: Boolean,
        default: false,
      },
    },
  ],
  workExperience: [
    {
      year: String,
      role: String,
      description: String,
      archive: {
        type: Boolean,
        default: false,
      },
    },
  ],
  projects: [
    {
      name: String,
      typeOfProject: String,
      status: String,
      description: String,
      archive: {
        type: Boolean,
        default: false,
      },
      language: [
        {
          name: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Admin', adminSchema);
