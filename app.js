const express = require("express");
const hbs = require("hbs")
const players = require("./data/players")
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const punkAPI = new PunkAPIWrapper();

const app = express();

app.use(express.static("public"));
// creates an absolute path pointing to a folder called "views"
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


app.get("/", (req, res) => {
  const data = {
    name: "Marco",
    subtitle: "<h2>Welcome to the Web Development Bootcamp</h2>",
    lastName: "Monzón",
    city: "Madrid",
    cities: ["Madrid", "Bilbao", "Barcelona", "Valencia"],
    beers: [
      {
        name: "beer 1",
        description: "Lorem fistrum a wan torpedo ese que llega va usté muy cargadoo ese pedazo de te va a hasé pupitaa a gramenawer ese que llega quietooor diodenoo. Mamaar va usté muy cargadoo va usté muy cargadoo te va a hasé pupitaa tiene musho peligro pecador llevame al sircoo tiene musho peligro se calle ustée. Diodeno va usté muy cargadoo benemeritaar la caidita hasta luego Lucas está la cosa muy malar ese pedazo de no puedor a peich a peich."
      },
      {
        name: "beer 2",
        description: "Lorem fistrum a wan torpedo ese que llega va usté muy cargadoo ese pedazo de te va a hasé pupitaa a gramenawer ese que llega quietooor diodenoo. Mamaar va usté muy cargadoo va usté muy cargadoo te va a hasé pupitaa tiene musho peligro pecador llevame al sircoo tiene musho peligro se calle ustée. Diodeno va usté muy cargadoo benemeritaar la caidita hasta luego Lucas está la cosa muy malar ese pedazo de no puedor a peich a peich."
      }
    ],
    address: {
      street: "Calle Desengaño",
      number: "21"
    },
    player: players[0]
  }
  res.render("index", data)
})

app.get("/players", (req, res) => {
  res.render("players", { players })
})

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
      .then(beers => {
        res.render("beers", { beers: beers })
      })
})

// Default route
app.use((req, res) => {
  res.status(404).send("Not found wey");
});

app.listen(3000, () => {
  console.log("Listening on port 3000 🚀");
})