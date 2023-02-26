import Users from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_JWT_KEY, { expiresIn: '4d'} )
   
}

export const userLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await Users.login(email, password)
        const token = generateToken(user._id);
        res.status(200).json({email, token})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

export const userDelete = async (req, res) => {
    const {email} = req.body;

    try {
        const result = await Users.findOneAndDelete({email: email});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const userSignup = async (req, res) => {
    const {email, password, expireAt} = req.body;

    try {
        const user = await Users.signup(email, password, expireAt)
        const token = generateToken(user._id);
        res.status(200).json({email, token})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

export const userIsActive = async (req, res) => {
    try {
        const {email} = req.body;
        await Users.findOneAndUpdate(({email}), {
            expireAt: new Date()
        })
        res.status(200).json(email)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}