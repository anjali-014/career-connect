import User from "../models/user.model.js";
import Profile from "../models/profiles.model.js";
import crypto from "crypto";

import bcrypt from "bcrypt";

import PDFDocument from 'pdfkit';
import fs from 'fs';

import ConnectionRequest from "../models/connection.model.js";



const convertUserDataTOPDF =async (userData) => {
    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
    const stream = fs.createWriteStream("uploads/" + outputPath);

    doc.pipe(stream);

    doc.image(`uploads/${userData.userId.profilePicture}`, {align: "center" , width: 100})
    doc.fontSize(14).text(`Name: ${userData.userId.name}`);
    doc.moveDown(); 
    doc.fontSize(14).text(`Username: ${userData.userId.username}`); 
    doc.fontSize(14).text(`Email: ${userData.userId.email}`); 
    doc.fontSize(14).text(`Bio: ${userData.bio}`); 
    doc.fontSize(14).text(`Current Position: ${userData.currentPost}`); 
    doc.fontSize(14).text("Past Work : ")
    doc.moveDown();
    userData.pastwork.forEach((work, index) => {
        doc.fontSize(14).text(`Company Name: ${work.company}`);
        doc.fontSize(14).text(`Position: ${work.position}`);
         doc.fontSize(14).text(`Years: ${work.years}`);

    })
    doc.moveDown();
doc.text("Education:");

(userData.education || []).forEach((edu) => {
    doc.text(`School: ${edu.school}`);
    doc.text(`Degree: ${edu.degree}`);
    doc.text(`Field: ${edu.fieldOfStudy}`);
    doc.moveDown();
});

    doc.end();
    
     // 🔥 WAIT for file to finish writing
    return new Promise((resolve, reject) => {
        stream.on("finish", () => resolve(outputPath));
        stream.on("error", reject);
    });
}

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

// implement user profile data controller

export const updateProfileData = async (req, res) => {
    try {
        const { token, ...newUserdata } = req.body;

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profile_to_update = await Profile.findOne({ userId: user._id });

        if (!profile_to_update) {
            return res.status(404).json({ message: "Profile not found" });
        }

        Object.assign(profile_to_update, newUserdata);

        await profile_to_update.save();

        return res.json({ message: "Profile Updated" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//implemented get all user profiles controller

export const getAllUserProfiles = async (req, res) => {

    try{

        const profiles = await Profile.find()
            .populate('userId' , 'name email username profilePicture');

            return res.json({profiles});

    } catch(error){
         return res.status(500).json({ message: error.message });
    }

}

//implement download profile controller....
export const downloadProfile = async (req,res) => {

    const user_id = req.query.id; 

  
    const userProfile = await Profile.findOne({ userId: user_id })
            .populate('userId' , 'name email username profilePicture bio currentPosition ');

    let outputPath = await convertUserDataTOPDF(userProfile);

   return res.download(`uploads/${outputPath}`);


}



export const sendConnectionRequest = async (req,res) =>{

    const {token , connectionId} = req.body;
    
    try{
      const user = await User.findOne({token});

      if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      const connectionUser = await User.findOne({_id : connectionId});
      
       if (!connectionUser) {
            return res.status(404).json({ message: "Connection User not found" });
        }

        const existingRequest = await ConnectionRequest.findOne(
            {
                userId : user._id,
                connectionId : connectionUser._id
            }
        )

        
       if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        const request = new ConnectionRequest({
            userId : user._id,
            connectionId : connectionUser._id
        });

      await request.save();

      return res.json({message : "Request sent"});


    } catch(error){
         return res.status(500).json({ message: error.message });
    }
}



export const getMyConnectionRequest = async (req,res) => {

    const {token} = req.body;

    try {

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({
            userId : user._id
        }).populate('userId', 'name username email profilePicture');

        return res.json({ connections });

    } catch(error){

         return res.status(500).json({ message: error.message });
    
    }
}


export const whatAreMyConnections = async (req,res) => {

    const {token} = req.body;

    try{
       const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({
            connectionId: user._id
        }).populate('userId', 'name username email profilePicture');

     return res.json(connections);



    } catch(error) {
         return res.status(500).json({ message: error.message });
    }
}







