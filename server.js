const express = require("express");
const app = express();
const todoRoutes = require("./controller/routes");
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose');

//mongoose connection
mongoose.connect('mongodb://localhost/todosMonu', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected");
});

//setting the environmental variable
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))

//setting the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`server is started at port no http://localhost:${PORT}/todo`);
});
