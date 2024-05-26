import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
export const signup = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            next(errorHandler(400,"All field is required"));
        }
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();
        res.status(200).send({
            newUser
        })
    } catch (error) {
       next(error)
    }
}