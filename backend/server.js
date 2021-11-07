require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8077;
const mongoose = require("mongoose");
const player = require("./routes/playerRoute");
const game = require("./routes/gameRoute");
const tournament = require("./routes/tournamentRoute");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", () => console.error("Error"));
db.once("open", () => {
  console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Players
app.get("/players/all", player.list);

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
