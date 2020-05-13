import {getRandomArrayElements, getRandomDate} from '../utils/mock';

const emojis = [`angry`, `puke`, `sleeping`, `smile`];
const phrases = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];
const authors = [`Tim Macoveev`, `John Doe`];

const commentModel = {
  "id": `42`,
  "author": `Ilya O'Reilly`,
  "comment": `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
  "date": `2019-05-11T16:12:32.554Z`,
  "emotion": `smile`
};

const generateComment = () => {
  const comment = JSON.parse(JSON.stringify(commentModel));
  comment[`author`] = getRandomArrayElements(authors)[0];
  comment[`comment`] = getRandomArrayElements(phrases)[0];
  comment[`date`] = getRandomDate();
  comment[`emotion`] = getRandomArrayElements(emojis)[0];

  return comment;
};

export const getComments = (amount) => {
  const result = [];
  for (let i = 1; i <= amount; i++) {
    const comment = generateComment();
    comment.id = i;
    result.push(comment);
  }
  return result;
};
