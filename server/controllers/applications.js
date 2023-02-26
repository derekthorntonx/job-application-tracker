
import Application from "../models/Application.js";

export const getApplications =  async (req, res) => {           //GET
    try {
        const userEmail = req.params.userEmail;
        const applicationList = await Application.find({user: userEmail}).sort({dateApplied: -1});
        res.status(200).json(applicationList)

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getFavourited = async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const favouritedList = await Application.find({isfavourited: true, user: userEmail}).sort({dateApplied: -1});
        res.status(200).json(favouritedList);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const searchNotes = async (req, res) => {
    try {
        const userEmail = req.params.userEmail
        let searchString = req.params.searchTerm;
        const searchList = await Application.find({$text: {$search: searchString}, user: userEmail}).sort({dateApplied: -1});
    res.status(200).json(searchList);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createApplication = async (req, res) => {          //POST
    try {
        const {jobTitle, companyName, notes, postingLink, jobLocation, expireAt, user} = req.body;
        if (jobTitle === '' || companyName === '' || postingLink === '' || jobLocation === '' || user === null){return}
        const newApplication = new Application({
            jobTitle,
            companyName,
            notes,
            postingLink,
            jobLocation,
            dateApplied: new Date().toLocaleDateString(),
            expireAt,
            user
        });
        const newlyCreatedApplication = await newApplication.save();
        res.json(newlyCreatedApplication);
        res.status(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteApplication = async (req, res) => {
    const applicationID = req.params._id;
    const deleted = await Application.findByIdAndDelete(applicationID);
    res.status(200).json(deleted);
}

export const deleteUserDocuments = async (req, res) => {
    const {email} = req.body;

    try {
        const result = await Application.deleteMany({user: email});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


export const favouriteApplication = async (req, res) => {
        const applicationID = req.params._id;
        const target = await Application.findById(applicationID);
        if (target.isfavourited){
        const updated = await Application.findByIdAndUpdate(applicationID, {
            isfavourited: false});
            res.status(200).json(updated)
        }
        else {
            const updated = await Application.findByIdAndUpdate(applicationID, {
                isfavourited: true});
                res.status(200).json(updated)
        }
    }
