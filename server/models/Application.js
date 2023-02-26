import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    jobTitle: String,
    companyName: String,
    notes: String,
    postingLink: String,
    jobLocation: String,
    isfavourited: {type: Boolean, default: false},
    dateApplied: {type: Date, default: new Date().toLocaleDateString()},
    user: String,
    expireAt: { type: Date, expires: 10520000}
});

applicationSchema.index({notes: 'text'});

const Application = mongoose.model('Application', applicationSchema);

export default Application;