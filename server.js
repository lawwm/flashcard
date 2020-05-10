const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect Database
connectDB();

//Init middleware
app.use(express.json({
    extended: false
}))

//Express routing
app.get("/", (req, res) => {
    res.send("API running");
})

//Define Routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/deck', require('./routes/api/deck.js'));
app.use('/api/card', require('./routes/api/card.js'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})