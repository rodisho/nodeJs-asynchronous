const fs = require('fs');
const superagent = require('superagent');
const { resolve } = require('path');
const { rejects } = require('assert');

const readFilePro = (file) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(file, (err, data) => {
      if (err) rejects('I could not find that file :( .......... ');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(file, data, (err) => {
      if (err) rejects('Could not write file :( ............');
      resolve('Success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(' THIS IS IMAGES ', imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random image saved to the file !!!!');
  } catch (err) {
    console.log('Something went wrong with this errir message ', err);
    throw err;
  }
  return '2: READY :D';
};

(async () => {
  try {
    console.log('1: Get dog pic');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done, getting dog pic');
  } catch (err) {
    console.log('ERROR ....!!! ', err);
  }
})();

/*
console.log('1: Get dog pic');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('2: Done, getting dog pic');
  })
  .catch((err) => {
    console.log('ERROR ....!!! ', err);
  });
*/
