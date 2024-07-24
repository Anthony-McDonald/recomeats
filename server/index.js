const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Routes
const userRoutes = require("./routes/userRoutes");
const cuisineRoutes = require("./routes/cuisineRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const chatRoute = require("./routes/chatRoute");
const forumRoute = require("./routes/forumRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // Import the new upload route

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/cuisines", cuisineRoutes);
app.use("/recipes", recipeRoutes);
app.use("/chat", chatRoute);
app.use("/forum", forumRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', uploadRoutes); // Use the new upload route

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
