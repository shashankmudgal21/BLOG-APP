import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
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
export const signin = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const validUser = await User.findOne({email});
       
        if(!validUser){
            return next(errorHandler(400,"User is not valid"));
        }
        const comp = bcryptjs.compareSync(password,validUser.password);
        if(!comp){
            return next(errorHandler(400,"Password is not valid"));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc
        return res.status(200).cookie('access_token',token,{httpsOnly:true}).json(rest)
    } catch (error) {
        next(error);
    }
}