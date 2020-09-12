import { Request, Response } from 'express';

import config from '../config/config';

import User, { IUser } from '../models/users';

import jwt from 'jsonwebtoken';

function createToken ( user: IUser ) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtsecret, {
        expiresIn: 24 * 24 * 60
    })
}

export const signin = async (req: Request, res: Response): Promise<Response> => {
    // Obtain body values
    const { email, password } = req.body;

    // If req body is empty
    if ( !email || !password ) {
        res.status(404).json({ message: 'Please enter your email and password' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'The user does not exist' });
    }

    const passwordIsValid = await user.comparePassword(password);
    if( !passwordIsValid ) {
        return res.status(401).json({ message: 'Credentials incorrect, please check your email and password' })
    }

    // Return a response to client
    return res.json({
        message: 'login successfull, redirect to home page',
        token: createToken(user)
    });
}

export const signup = async (req: Request, res: Response): Promise<Response> => {
    // Obtain body values
    const { email, password } = req.body;

    // If req body is empty
    if ( !email || !password ) {
        res.status(404).json({ message: 'Please enter your email and password' });
    }
   
    // Verify if user exist on database
    let user = await User.findOne({ email: email});
    if ( user ) {
        return res.status(400).json({ message: 'The user already exist' });
    }
       
    // Create and save new user
    let newUser = new User({ email, password });
    await newUser.save();
    
    // Return a response to client
    return res.status(201).json({
        message: 'User create successfull',
        user: newUser
    });
}