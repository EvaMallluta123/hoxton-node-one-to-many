import Database from "better-sqlite3";
import cors from "cors";
import express, { json } from "express";

const db = Database(`./db/data.db`, { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());

const port = 3033;

const getMuseums = db.prepare(`
SELECT * FROM museums
`);

const getWorksforMuseum = db.prepare(`
SELECT * FROM works WHERE museumId=@museumId
`);

const getWorks = db.prepare(`
SELECT * FROM works
`);
const getWorksById = db.prepare(`
SELECT * FROM works WHERE id=@id;
`);

const getMuseumsById = db.prepare(`
SELECT * FROM museums WHERE id=@id;
`);
const createMuseum=db.prepare(`
INSERT INTO museums
(name, location, image)
VALUES
(@name,@location,@image)

`)

const createWork=db.prepare(`
INSERT INTO works
(name, picture, museumId)
VALUES
(@name, @picture, @museumId)


`)
app.get(`/museums`, (req, res) => {
  const museums = getMuseums.all();

  for (let museum of museums) {
    const works = getWorksforMuseum.all({ museumId: museum.id });
    museum.works = works;
  }
  res.send(museums);
});

app.post(`/museums`, (req, res) => {

    let errors: string[]=[]
if (typeof req.body.name!==`string`){
    errors.push(`Name is missing or not a string`)
}
if (typeof req.body.location!==`string`){
    errors.push(`Location is missing or not a string`)
}
if (typeof req.body.image!==`string`){
    errors.push(`Image is missing or not a string`)
}

if(errors.length===0){
    const info=createMuseum.run(req.body)
    const museum=getMuseumsById.get({id: info.lastInsertRowid})
    const works = getWorksforMuseum.all({museumId: museum.id})
    museum.works= works
    res.send(museum)
}
else{
    res.status(400).send({errors})
}
})

app.get(`/museums/:id`, (req, res) => {
  const museum = getMuseumsById.get(req.params);
  if (museum) {
    const works = getWorksforMuseum.all({ museumId: museum.id });
    museum.works = works;
    res.send(museum);
  } else {
    res.status(400).send({ error: `Museum not found` });
  }
}),
app.get(`/works`, (req, res) => {
  const works = getWorks.all();

  for (let work of works) {
    const museums = getMuseumsById.get({ id: work.museumId });
    work.museums = museums;
  }
  res.send(works);
});
app.get(`/works/:id`, (req, res) => {
    const work = getWorksById.get(req.params);
    if (work) {
      const museums = getWorksforMuseum.all({ museumId: work.id });
      work.museums = museums;
      res.send(work);
    } else {
      res.status(400).send({ error: `Works not found` });
    }
});

app.post(`/works`, (req, res) => {

  let errors: string[]=[]
if (typeof req.body.name!==`string`){
  errors.push(`Name is missing or not a string`)
}
if (typeof req.body.picture!==`string`){
  errors.push(`Picture is missing or not a string`)
}
if (typeof req.body.museumId!==`number`){
  errors.push(`MuseumId is missing or not a number`)
}

if(errors.length===0){

  const museum=getMuseumsById.get({id: req.body.museumId})
  if(museum){
    const info= createWork.run(req.body)
    const work=getWorksById.get({id:info.lastInsertRowid})
    work.museum=museum
    res.send(work)
  }
  else{
    res.status(400).send({
      error:`You are creating an work for an museum that does not exist.`
    })
  }
}
else{
  res.status(400).send({errors})
}
})

app.listen(port, () => {
  console.log(`App running:http://localhost:${port}`);
});
