import express from "express";
import { see, edit, deleteVideo } from "../controllers/storiesController";

const storyRouter = express.Router();

storyRouter.get("/:id(\\d+)", see);
storyRouter.get("/:id(\\d+)/edit", edit);
storyRouter.get("/:id(\\d+)/delete", deleteVideo);

export default storyRouter;