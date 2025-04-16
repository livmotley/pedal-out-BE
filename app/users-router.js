const usersRouter = require("express").Router();
const { getUsers } = require("../controllers/postgres/users.controllers.js");


usersRouter
.route("/")
// .get(getUsers)
// .post(postUser)


module.exports = usersRouter;