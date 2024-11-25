import express from "express";
const app = express();

app.get("/select-character", (req, res) => {
    console.log("request to server")
    res.json({"characters": ["Warrior", "Priestess", "Thief"]})
})

app.listen(5001, () => { console.log("Server started on port 5001") })