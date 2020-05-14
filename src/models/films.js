import {getRandomArrayElements, getRandomDate, getRandomIds} from '../utils/mock';

const titles = [
  {
    title: `Титаник`, original: `Titanic`
  },
  {
    title: `Игра`, original: `Play`
  },
  {
    title: `Железный человек`, original: `Ironman`
  },
  {
    title: `Человек-паук`, original: `Spiderman`
  },
  {
    title: `Бэтмен`, original: `Batman`
  },
  {
    title: `Супермен`, original: `Superman`
  },
  {
    title: `Форест Гамп`, original: `Forest Gump`
  },
  {
    title: `Мачеха`, original: `Stepmother`
  },
  {
    title: `Пиксели`, original: `Pixels`
  },
  {
    title: `Бимуви`, original: `Bee movie`
  },
  {
    title: `Пятница тринадцатое`, original: `Friday 13`
  },
  {
    title: `Гарри Поттер и Тайная комната`, original: `Harry Potter and the Chamber of secrets`
  },
  {
    title: `Миссия невыполнима 2`, original: `Mission impossible 2`
  },
  {
    title: `Джек Ричер`, original: `Jack Richer`
  },
  {
    title: `Особенности национальной рыбалки`, original: `Особенности национальной рыбалки`
  },
  {
    title: `Аладдин`, original: `Aladdin`
  },
  {
    title: `Назад в будущее`, original: `Back to future`
  }
];
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const directors = [`Anthony Mann`, `Mark Edwards`, `Paul Brawn`, `Sam Smith`, `Drew White`, `Samanta Green`, `Olga Joli`, `Ben Santa`, `Greg Pitt`, `Clint Eastwood`];
const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Aleksandr Pyshkin`, `Nikolay Gogol`, `Mark Shagal`, `Boris Godynov`, `Oleg Claus`, `Kim Chen`, `Lola Work`, `Andrei Belyanin`, `Vladimir VasilyevDavid Boreanaz`, `David Duchovny`, `David Hyde-Pierce`, `Debrah Farentino`, `Diane Farr`, `Donal Logue`, `Doug Savant`, `Drew Fuller`, `Dylan Bruno`, `Ed Helms`, `Edie Falco`, `Edie McClurg`, `Eliza Dushku`, `Ellen Pompeo`, `Enrique Murciano`, `Ethan Embry`, `Eva Longoria`, `Felicia Day`, `Felicity Huffman`, `Fionnula Flanagan`, `Frances Fisher`, `Garry Marshall`, `George Lopez`, `Gilbert Gottfried`, `Greg Grunberg`, `Hamish Linklater`, `Harry Groener`, `Holly Hunter`, `Hugh Laurie`, `Ian Hart`, `Isaiah Washington`, `J. August Richards`, `Jack Black`, `Jack Coleman`, `Jack McBrayer`, `Jaimie Alexander`, `James Belushi`, `James Denton`, `James Remar`, `Jamie Kaler`, `January Jones`, `Jason Alexander`, `Jeanne Tripplehorn`, `Jeremy Ratchford`, `Jessica Biel`, `Jim Parsons`, `John Finn`, `John Glover`, `John Leguizamo`, `John Oliver`, `John Stamos`, `Jon Cryer`, `Jon Wellner`, `Jordan Hinson`, `Josh Stewart`, `Joshua Jackson`, `Julia Louis-Dreyfus`, `Julianne Moore`, `Juliet Landau`, `Justin Chambers`, `KaDee Strickland`, `Kaley Cuoco`, `Kat Foster`, `Kate Walsh`];
const actors = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Amy Acker`, `Alan Tudyk`, `Alex Kapp Horner`, `Ali Larter`, `Alyson Hannigan`, `America Ferrera`, `Amy Brenneman`, `Amy Poehler`, `Angela Kinsey`, `Anna Paquin`, `April Matson`, `Archie Kao`, `Ashley Scott`, `B. D. Wong`, `B. J. Novak`, `Beau Bridges`, `Ben Stiller`, `Benjamin McKenzie`, `Bianca Kajlich`, `Bill Paxton`, `Bob Stephenson`, `Brad Garrett`, `Brenda Song`, `Brenda Strong`, `Brian McNamara`, `Brigid Brannagh`, `Bruce Thomas`, `C. S. Lee`, `Camden Toy`, `Camryn Manheim`, `Cassie Scerbo`, `Chris Noth`, `Chris Olivero`, `Clark Gregg`, `Colin Ferguson`, `Constance Marie`, `Creed Bratton`, `Currie Graham`, `Dana Delany`, `Dana Gould`, `Danny Glover`, `Danny Pino`, `David Berman`, `Katherine Heigl`, `Kathy Griffin`, `Keith Carradine`, `Keith Szarabajka`, `Ken Jenkins`, `Kevin Chapman`, `Kim Delaney`, `Kirk Cameron`, `Kristen Bell`, `Kristin Davis`, `Kunal Nayyar`, `Laura Harris`, `Lena Headey`, `Lisa Arch`, `Lisa Edelstein`, `Lisa Kudrow`, `Liz Vassey`, `Lori Loughlin`, `Madison Pettis`, `Maiara Walsh`, `Marc Vann`, `Marcia Cross`, `Marg Helgenberger`, `Masi Oka`, `Matthew Modine`, `Matthew Perry`, `Maura Tierney`, `Megyn Price`, `Mel Gibson`, `Melinda Clarke`, `Michael Emerson`, `Michael Fairman`, `Mindy Kaling`, `Minnie Driver`, `Morena Baccarin`, `Nancy Lee Grahn`, `Nathan Fillion`, `Neil Patrick Harris`, `Nia Vardalos`, `Nicholas Brendon`, `Nicollette Sheridan`, `Oliver Hudson`, `Olivia Wilde`, `Oscar Nunez`, `Patricia Heaton`, `Patrick Warburton`, `Patton Oswalt`, `Paul Lieberstein`, `Paula Newsome`, `Pooch Hall`, `Poppy Montgomery`, `Rachel Dratch`, `Rainn Wilson`, `Ray Romano`, `Rex Lee`, `Rich Sommer`, `Richard Belzer`, `Rob Morrow`, `Robin Williams`, `Ron Glass`, `Ron Howard`, `Ron Rifkin`, `Rondell Sheridan`, `Roseanne Barr`, `Sally Field`, `Sally Pressman`, `Sam Harris`, `Sam Trammell`, `Sam Waterston`, `Sandra Oh`, `Sara Ramirez`, `Sarah Chalke`, `Sarah Silverman`, `Sendhil Ramamurthy`, `Seth Meyers`, `Simon Helberg`, `Sterling K. Brown`, `Summer Glau`, `Susan Sarandon`, `Susan Savage`, `T. R. Knight`, `Teri Hatcher`, `Thom Barry`, `Thomas Dekker`, `Tia Mowry`, `Tim Robbins`, `Timothy Omundson`, `Tina Fey`, `Tom Arnold`, `Tom Lenk`, `Tracie Thoms`, `Tricia O'Kelley`, `Tuc Watkins`, `Valente Rodriguez`, `Valerie Harper`, `Vanessa Marcil`, `Vincent Kartheiser`, `Wallace Langham`, `Wanda Sykes`, `Wendy Davis`, `William H. Macy`, `William Petersen`, `Zach Braff`, `Zachary Levi`];
const countries = [`Canada`, `England`, `France`, `Germany`, `India`, `Japan`, `USA`];
const genres = [`Action`, `Adventure`, `Comedy`, `Drama`, `Film-noir`, `Horror`, `Lovestory`, `Musical`, `Mystery`, `Zombies`];
const restrictions = [0, 6, 12, 16, 18];

const filmModel = {
  "id": 0,
  "comments": [
    1, 2
  ],
  "film_info": {
    "title": `A Little Pony Without The Carpet`,
    "alternative_title": `Laziness Who Sold Themselves`,
    "total_rating": 5.3,
    "poster": `images/posters/blue-blazes.jpg`,
    "age_rating": 0,
    "director": `Tom Ford`,
    "writers": [
      `Takeshi Kitano`
    ],
    "actors": [
      `Morgan Freeman`
    ],
    "release": {
      "date": `2019-05-11T00:00:00.000Z`,
      "release_country": `Finland`
    },
    "runtime": 77,
    "genre": [
      `Comedy`
    ],
    "description": `Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.`
  },
  "user_details": {
    "watchlist": false,
    "already_watched": true,
    "watching_date": `2019-04-12T16:12:32.554Z`,
    "favorite": false
  }
};

let currentCommentId = 1;

const generateMovie = () => {
  const film = JSON.parse(JSON.stringify(filmModel));
  const randomTitle = getRandomArrayElements(titles)[0];
  film[`film_info`][`title`] = randomTitle.title;
  film[`film_info`][`alternative_title`] = randomTitle.original;
  film[`film_info`][`total_rating`] = ((Math.random() * 100) / 10).toFixed(1);
  film[`film_info`][`poster`] = getRandomArrayElements(posters)[0];
  film[`film_info`][`age_rating`] = getRandomArrayElements(restrictions)[0];
  film[`film_info`][`director`] = getRandomArrayElements(directors)[0];
  film[`film_info`][`writes`] = getRandomArrayElements(writers, 1, 4).join(`, `);
  film[`film_info`][`actors`] = getRandomArrayElements(actors, 3, 10).join(`, `);
  film[`film_info`][`release`][`date`] = getRandomDate();
  film[`film_info`][`release`][`release_country`] = getRandomArrayElements(countries)[0];
  film[`film_info`][`runtime`] = Math.floor((Math.random() * 100) + 60);
  film[`film_info`][`genre`] = getRandomArrayElements(genres, 1, 4);
  film[`film_info`][`description`] = getRandomArrayElements(descriptions, 1, 4).join(` `);
  film[`comments`] = getRandomIds(currentCommentId, 10);
  film[`user_details`][`watchlist`] = Math.random() > 0.5;
  film[`user_details`][`already_watched`] = Math.random() > 0.8;
  film[`user_details`][`watching_date`] = getRandomDate();
  film[`user_details`][`favorite`] = Math.random() > 0.7;

  currentCommentId += film[`comments`].length;
  return film;
};

export const getFilms = (amount) => {
  const result = [];
  for (let i = 1; i <= amount; i++) {
    const film = generateMovie();
    film.id = i;
    result.push(film);
  }
  return result;
};
