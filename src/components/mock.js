const generateMovie = () => {
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

  const getRandomArrayElements = (arr, amount = 1, random = 0) => {
    const result = [];
    amount += Math.ceil(Math.random() * random);
    while (amount > 0) {
      result.push(arr[Math.floor(Math.random() * arr.length)]);
      amount--;
    }
    return result;
  };

  const getRandomDate = () => {
    const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const date = new Date(new Date(1888, 6, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1888, 6, 1).getTime()));
    let result = `0${date.getDay()}`.slice(-2);
    result += ` ${months[date.getMonth()]}`;
    result += ` ${date.getFullYear()}`;

    return result;
  };

  const getRandomComment = () => {
    const emojis = [`angry`, `puke`, `sleeping`, `smile`];
    const phrases = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];
    const dates = [`2 days ago`, `Today `, `2019/12/31 23:59`];
    const authors = [`Tim Macoveev`, `John Doe`];
    return {
      emoji: getRandomArrayElements(emojis)[0],
      phrase: getRandomArrayElements(phrases)[0],
      date: getRandomArrayElements(dates)[0],
      author: getRandomArrayElements(authors)[0]
    };
  };
  const comments = [];
  for (let i = 0; i < 20; i++) {
    comments.push(getRandomComment());
  }

  const film = getRandomArrayElements(titles)[0];
  film.poster = getRandomArrayElements(posters)[0];
  film.rating = ((Math.random() * 100) / 10).toFixed(1);
  film.director = getRandomArrayElements(directors)[0];
  film.writers = getRandomArrayElements(writers, 1, 4).join(`, `);
  film.actors = getRandomArrayElements(actors, 3, 10).join(`, `);
  film.date = getRandomDate();
  film.duration = `${Math.ceil(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`;
  film.country = getRandomArrayElements(countries)[0];
  film.genres = getRandomArrayElements(genres, 1, 4);
  film.restriction = getRandomArrayElements(restrictions)[0];
  film.description = getRandomArrayElements(descriptions, 1, 4).join(` `);
  film.comments = getRandomArrayElements(comments, 0, 10);
  film.watchlist = Math.random() > 0.5;
  film.history = Math.random() > 0.8;
  film.favorite = Math.random() > 0.7;

  return film;
};

const getMovies = (amount) => {
  const result = [];
  while (amount > 0) {
    result.push(generateMovie());
    amount--;
  }
  return result;
};

export const mock = {
  user: {
    rank: `Movie Buff`,
    userpic: `images/bitmap@2x.png`
  },
  films: {
    total: `130 291`,
    list: getMovies(20)
  }
};
