import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
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
    },
  ],
  workExperience: [
    {
      year: String,
      role: String,
      description: {
        shortDescription: {
          type: String,
          required: [true, 'Short description cannot be empty'],
        },
        bullets: [],
      },
    },
  ],
  projects: [
    {
      label: String,
      title: String,
      description: {
        shortDescription: {
          type: String,
          required: [true, 'Short description cannot be empty'],
        },
        bullets: [],
      },
      status: String,
      projectLink: String,
      githubLink: String,
      technologies: [],
    },
  ],
});

const Owner = mongoose.model('Owner', ownerSchema);

export default Owner;
