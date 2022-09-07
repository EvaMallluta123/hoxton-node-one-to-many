import Database from "better-sqlite3";

const db = Database(`./db/data.db`, { verbose: console.log });
//Create Database for Museum
const museums = [
  {
    name: "The British Museum",
    location: "London",
    image:
      "https://images.adsttc.com/media/images/627e/dec9/3e4b/318f/a100/0024/newsletter/courtesy_of_studio_malka_architecture.jpg?1652481733",
  },
  {
    name: "Guggenheim",
    location: "New York",
    image:
      "https://www.inexhibit.com/wp-content/webp-express/webp-images/uploads/2014/05/Solomon-R-Guggenheim-New-York-photo-David-Heald-870x580.jpg.webp",
  },
  {
    name: "National Gallery of Art",
    location: "Washington",
    image:
      "https://dcist.com/wp-content/uploads/sites/3/2020/07/30075554873_baf611baa8_k-1024x683.jpg",
  },
  {
    name: "Musée d`Orsay",
    location: "Paris",
    image:
      "https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2018/09/1024px-le_musee_dorsay_paris_4725795882.jpg",
  },
  {
    name: "National Museum of Modern and Contemporary Art",
    location: "Seoul",
    image:
      "https://images.adsttc.com/media/images/5632/357c/e58e/ce2d/5800/001c/newsletter/PORTADA_IMG_4911%C2%AE%C5%93Hyunjun_Mihn.jpg?1446131055",
  },
];
const works = [
  {
    name: "Rosetta Stone ",
    picture:"https://smarthistory.org/wp-content/uploads/2020/10/rosetta-sm-870x1103.jpg",
    museumId: 1
  },
  {
    name: "Egyptian mummies",
    picture:"https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2018/01/17/1077816-977099340.jpg?itok=DFf75j9W",
    museumId: 1
  },
  {
    name: "IMPRESSIONISM",
    picture:"https://cms.guggenheim-bilbao.eus/uploads/2021/03/mujer-con-periquito.jpg",
    museumId: 2
  },
  {
    name: "painting of Johannes Vermeer",
    picture:"https://artincontext.org/wp-content/uploads/2021/12/Johannes-Vermeer-848x530.jpg",
    museumId: 3
  },
  {
    name: "painting of Johannes Vermeer",
    picture:"https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2016/01/ce1084px-Vermeer-view-of-delft.jpg",
    museumId: 3
  },
  {
    name: "painting of Johannes Vermeer",
    picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
    museumId: 3
  },
  {
    name: "artworks from Monet",
    picture:"https://www.thoughtco.com/thmb/CosWA244YGitqt3UVKJFs_vUJJw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/800px-Claude_Monet_024-5abd1421a9d4f900372fff29.jpg",
    museumId: 4
  },
  {
    name: "artworks from Cézanne",
    picture:"https://www.itravelwithart.com/wp-content/uploads/2019/01/Paul_C%C3%A9zanne_185.jpg",
    museumId: 4
  },
  {
    name: "artworks from Cézanne",
    picture:"https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2016/02/1024px-Paul_Ce%CC%81zanne_107.jpg",
    museumId: 4
  },
  {
    name: "artworks from Jason Farago",
    picture:"https://static01.nyt.com/images/2020/06/26/arts/18koreanart-notebook01/merlin_173595993_d2308854-af52-407b-a6c9-1e8f92b04a8c-jumbo.jpg?quality=75&auto=webp",
    museumId: 5
  },

];
// const deleteAllMuseums = db.prepare(`
// DROP TABLE IF EXISTS museums;
// `);
// deleteAllMuseums.run()



const createMuseumsTabel = db.prepare(`
CREATE TABLE IF NOT EXISTS museums(
id INTEGER,
name TEXT NOT NULL,
location TEXT,
image TEXT,
PRIMARY KEY(id));
`);

createMuseumsTabel.run()

const createMuseums = db.prepare(`
INSERT INTO museums (name, location, image) VALUES
(@name, @location, @image);
`);

for (let museum of museums) {
  createMuseums.run(museum);
}

//Create databese for Works
const deleteAllWorks=db.prepare(`
DROP TABLE IF EXISTS works;
`)
deleteAllWorks.run()

const createWorksTable = db.prepare(`
CREATE TABLE IF NOT EXISTS works(
    id INTEGER,
    name TEXT NOT NULL,
    picture TEXT,
    museumId INTEGER NOT NULL,
    PRIMARY KEY(id)
    FOREIGN KEY(museumID) REFERENCES museums(id)
);
`);
createWorksTable.run()

const createWorks=db.prepare(`
INSERT INTO works(name, picture, museumId) VALUES
(@name, @picture, @museumId);
`)
for(let work of works){
    createWorks.run(work)
}