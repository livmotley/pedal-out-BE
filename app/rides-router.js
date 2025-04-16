const ridesRouter = require("express").Router();
const { getRides, getRideById } = require("../controllers/postgres/rides.controllers.js");


ridesRouter
.route("/")
.get(getRides)
// .post(postRide)

ridesRouter
.route("/:ride_id")
.get(getRideById)


module.exports = ridesRouter;