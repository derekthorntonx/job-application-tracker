import mongoose from "mongoose";
import validator from 'validator';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    expireAt: {
        type: Date,
        expires: 7890000
    },
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});

    if (!user){throw Error('No user registed under that E-mail.')}

    if(!email || !password){throw Error('All fields must be filled.')}

    if (!validator.isEmail(email)){throw Error ('Invalid E-mail entered.')}

    if (password !== user.password){
        throw Error('Invalid password.')
    }

    return user
}

userSchema.statics.signup = async function(email, password){

    if (!email || !password){
        throw Error('All fields must be filled.');
    }

    if (!validator.isEmail(email)){
        throw Error ('Invalid E-mail entered.');
    }

    const exists = await this.findOne({email});

    if (exists){
        throw Error('Email already registered.');
    }

    const expireAt = new Date();

    const user = await this.create({email, password, expireAt});

    return user;
}

const Users = mongoose.model('Users', userSchema);

export default Users;