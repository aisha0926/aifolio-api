import axios from 'axios';

const githubPublic = async () => {
  try {
    const githubReq = await axios.get(
      `https://api.github.com/users/${process.env.GIT_USER}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GIT_TOKEN}`,
        },
      }
    );

    return githubReq.data;
  } catch (error) {
    return { error: error.message };
  }
};

const githubAll = async (req) => {
  try {
    const githubReq = await axios.get(
      `https://api.github.com/search/repositories?q=user:${process.env.GIT_USER}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GIT_TOKEN}`,
        },
      }
    );

    return githubReq.data;
  } catch (error) {
    return { error: error.message };
  }
};

const languages = async (arr) => {
  const githubLang = await axios.get(
    `https://api.github.com/repos/${process.env.GIT_USER}/${arr}/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GIT_TOKEN}`,
      },
    }
  );

  return githubLang.data;
};

export default { githubPublic, githubAll, languages };
