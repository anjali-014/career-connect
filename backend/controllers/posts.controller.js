import User from "../models/user.model.js";
import Profile from "../models/profiles.model.js";


import bcrypt from "bcrypt";

 export const activeCheck = async (req, res) => {

    return res.status(200).json({message: "Active"});

}

 export const createPost = async (req,res) => {

    const {token} = req.body;

    try{
   
        const user = await User.findOne({token});
        
              if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

        const post = new Post({
            userId : user._id,
            body : req.body.body,
            media: req.file ? req.file.filename : "",
            fileType : req.file ? req.file.mimetype.split("/") : ""
        })


        await post.save();

        return res.status(200).json({ message : "Post Created"});

    }  catch(error) {

         return res.status(500).json({ message: error.message });
    }
 } 