import Database from "better-sqlite3"
import cors from "cors"
import express, { json } from"express"

const db=Database(`./db/data.db`, {verbose:console.log})
const app= express()
app.use(cors())
app.use(express.json())

const port=3033

const getMuseums=db.prepare(`
SELECT * FROM museums
`)

const getWorksforMuseum=db.prepare(`
SELECT * FROM works WHERE museumId=@museumId
`)

app.get(`/museums`, (req,res)=>{
const museums=getMuseums.all()


for (let museum of museums){
const works= getWorksforMuseum.all({museumId: museum.id})
museum.works=works
}
res.send(museums)
})
app.get(`/museums/:id`, (req,res)=>{

})
app.get(`/works`, (req,res)=>{

})
app.get(`/works/:id`, (req,res)=>{

})


app.listen(port,()=>{
    console.log(`App running:http://localhost:${port}`)
})