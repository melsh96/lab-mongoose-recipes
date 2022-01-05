const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Create new Recipe
    Recipe.create({
      title: "Crêpes",
      level: "Easy Peasy",
      ingredients: [
        "1 cup all-purpose flour",
        "2 eggs",
        "1/2 cup milk",
        "1/2 cup water",
        "1/4 teaspoon salt",
        "2 tablespoons butter, melted",
      ],
      cuisine: "French",
      dishType: "dessert",
      image:
        "https://www.pexels.com/fr-fr/photo/baies-photo-de-nourriture-crepe-style-alimentaire-4725654/",
      duration: 30,
      creator: "MELODIE",
    })
      .then((res) => console.log(res.title))
      .catch((error) => console.error("error", error));
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((recipeDoc) => {
        recipeDoc.forEach((recipe) => {
          console.log(recipe.title);
        });
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        )
          .then((res) => console.log(res))
          .catch((error) => console.error("error", error));
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((res) => console.log(res))
          .catch((error) => console.error("error", error));
      })
      .catch((error) => console.error("error", error));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
