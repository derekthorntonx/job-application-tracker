import  express  from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { getApplications, createApplication, deleteApplication, favouriteApplication, getFavourited, searchNotes, deleteUserDocuments } from "../controllers/applications.js";

const applicationRouter = express.Router();

applicationRouter.get('/:userEmail', checkAuth, getApplications);                             // GET list of all applications from current user
applicationRouter.post('/', checkAuth, createApplication);                                    // POST new application to database
applicationRouter.delete('/:_id', checkAuth, deleteApplication);                              // DELETE application by _id
applicationRouter.post('/:_id', checkAuth, favouriteApplication);                             // toggle the isFavourited field on selected document
applicationRouter.get('/favourites/:userEmail', checkAuth, getFavourited);                    // GET list of favourited applications
applicationRouter.get('/search/:userEmail/:searchTerm', checkAuth, searchNotes);              // GET list depending on search query
applicationRouter.delete('/', checkAuth, deleteUserDocuments);                                // DELETE all documents from select user    

export default applicationRouter;