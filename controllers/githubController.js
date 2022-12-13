import git from '../config/github.js';

const filterRepo = async () => {
  const waitForResults = await git.githubAll();

  const filterNonForked = waitForResults.items.filter(
    (repo) => repo.fork === false
  );

  return waitForResults
    ? filterNonForked
    : { message: 'Unable to filter Repository.' };
};

const getAllLanguages = async (repositories) => {
  try {
    // const getRepo = await filterRepo();

    const getRepoName = await Promise.all(
      repositories.map(async (repo) => {
        const languageReq = await git.languages(repo.name);
        return languageReq;
      })
    );

    const retrieveKeys = getRepoName.map((el) => Object.keys(el)).flat();

    const uniqueLanguage = [...new Set(retrieveKeys)];

    let obj = {};

    uniqueLanguage.forEach((el) => {
      obj[el] = [];
    });

    getRepoName.forEach((item) => {
      for (let i = 0; i < uniqueLanguage.length; i++) {
        item[uniqueLanguage[i]] &&
          obj[uniqueLanguage[i]].push(item[uniqueLanguage[i]]);
      }
    });

    let totalSum = [];

    for (const key in obj) {
      obj[key] = obj[key].reduce((prev, current) => prev + current);

      totalSum.push(obj[key]);
    }

    totalSum = totalSum.reduce((prev, current) => prev + current);

    let percentage = { ...obj };
    let totalPercentage = [];
    for (const amount in percentage) {
      percentage[amount] = Number(((obj[amount] / totalSum) * 100).toFixed(3));
      totalPercentage.push(percentage[amount]);
    }

    totalPercentage = totalPercentage.reduce((prev, current) => prev + current);

    return percentage;
  } catch (error) {
    console.log(error);
  }
};

const getAllRepos = async (req, res) => {
  const getResult = await filterRepo();

  res.send(getResult);
};

const getLanguages = async (req, res) => {
  const getRepo = await filterRepo();
  const result = await getAllLanguages(getRepo);
  console.log('getLanguages ', result.length);
  res.send(result);
};

const getRecentRepo = async (req, res) => {
  const getResult = await filterRepo();
  const testArr = [];

  const test = getResult.map((el) => {
    if (el.created_at.includes(new Date().getFullYear().toString())) {
      testArr.push(el);
    }
    return el;
  });

  const result = await getAllLanguages(testArr);
  res.send(result);
};

export default {
  getAllRepos,
  getLanguages,
  getRecentRepo,
};
