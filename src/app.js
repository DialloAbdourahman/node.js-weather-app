const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express configuration. We can decide not to set the views path but we will have to create a folder called views in the root directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars and view location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory even though we ain't using anymore.
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Diallo Abdourahman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Diallo Abdourahman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message.",
    name: "Diallo Abdourahman",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  // http://localhost:4000/product?search=games&rating=2
  if (!address) {
    res.send({
      error: "Please provide an address to us.",
    });
    return;
  }

  geocode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      res.send({ error });
      return;
    }

    forcast(latitude, longitude, (error, data) => {
      if (error) {
        res.send({ error });
        return;
      }
      res.send({
        forcast: data,
        location,
        address,
      });
    });
  });
});

// More specific error handling especially for the help route
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error page not found",
    name: "Diallo Abdourahman",
    message: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error page not found",
    name: "Diallo Abdourahman",
    message: "Sorry page not found.",
  });
});

app.listen(port, () => {
  console.log(`The server has started on port ${port}`);
});
