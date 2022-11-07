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
      title: String,
      subtitle: String,
      description: String,
      typeOfProject: String,
      status: String,
      link: String,
      archive: {
        type: Boolean,
        default: false,
      },
      technologies: [
        {
          name: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Admin', adminSchema);
