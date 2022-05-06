import express from "express";
import { join, login, users } from "../controllers/userController";
import { hompage, trending } from "../controllers/storiesController";

const globalRouter = express.Router();

globalRouter.get("/", hompage);
globalRouter.get("/trending", trending);
globalRouter.get("/new", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/users", users);

export default globalRouter;