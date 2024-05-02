const express = require("express")
const app = express();
const cors = require("cors");
//ROUTES//
const userRoutes = require("./routes/userRoutes");
const cuisineRoutes = require("./routes/cuisineRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const chatRoute = require("./routes/chatRoute");



//middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/cuisines", cuisineRoutes);
app.use("/recipes", recipeRoutes);
app.use("/chat", chatRoute);


app.listen(5000, () => {
})