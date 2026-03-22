import User from "../models/user.model.js";
import Profile from "../models/profiles.model.js";
import crypto from "crypto";

import bcrypt from "bcrypt";

// Register controller: handles new user signup

export const register = async (req, res) => {
    try{
        // Extract user data from request body
        const {name, email, password, username} = req.body;

        // Validate required fields
        if(!name || !email || !password || !username){
            return res.status(400).json({message: "All fields are required"});
        }
            const user = await User.findOne({
                email
            });
            if(user){
                return res.status(400).json({message: "User already exists"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password : hashedPassword,
                username
            });
            await newUser.save();

            const profile = new Profile({userId: newUser._id });

            await profile.save();

            return res.status(201).json({message: "User created successfully", user: newUser});

    


    }

    catch (error){
        return res.status(500).json({message: error.message});
    }
}

 

// Login controller: verifies user credentials and generates authentication token


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: user._id }, { token });

        return res.json({ token });

    } 
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}


//upload profile picture controller...

export const uploadProfilePicture = async (req, res) => {
    const {token} = req.body;

    try{

        const user = await User.findOne({ token : token});

        if(!user){
             return res.status(404).json({ message : "User not found"})
        }

        user.profilePicture = req.file.filename;

        await user.save();

        return res.json({ message : "Profile picture updated"})

    } catch(error){
        return res.status(500).json({ message : error.message})
    }
}

//update user profile controller

export const updateUserProfile = async (req,res) => {

    try {

        const { token, ...newUserdata } = req.body;

        const user = await User.findOne({ token : token});

         if(!user){
             return res.status(404).json({ message : "User not found"})
        }

        const { username, email} = newUserdata;

        const existingUser = await User.findOne({ $or: [{username}, {email} ]});

        if (existingUser) {
         if (existingUser || String(existingUser._id !== String(user._id))){
             
            return res.status(400).json({message : "User already Exists!"});
         }
        }

       Object.assign(user, newUserdata);

        await user.save();

        return res.json({message: "User updated"});

    } catch (error){

        return res.status(500).json({ message : error.message})
    }
}

// get user and profile controller 

export const getUserAndProfile = async (req,res) => {
    try{
      
        const {token} = req.body;

        const user = await User.findOne({token : token});

        if(!user){
             return res.status(404).json({ message : "User not found"})
        }

        const userProfile = await Profile.findOne({ userId: user._id})
            .populate('userId' , 'name email username profilePicture');

            return res.json(userProfile);




    } catch(error){

         return res.status(500).json({ message : error.message})
    }
}



export const updateProfileData = async (req, res) => {
    
    try{

        const { token, ...newUserdata } = req.body;

        const userprofile = await User.findOne({ token : token });

        if(!user){
             return res.status(404).json({ message : "User not found"})
        }

        const profile_to_update = await Profile.findOne({userId : userprofile._id});

        Object.assign(profile_to_update, newprofileData);

        await profile_to_update.save();

        return res.json({message : "Profiel Updated"});




    } catch(error){

         return res.status(500).json({ message : error.message})
    }
}


