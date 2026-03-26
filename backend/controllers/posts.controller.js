import User from "../models/user.model.js";
import Profile from "../models/profiles.model.js";
import Post from "../models/posts.model.js"; // ✅ ADD THIS

import bcrypt from "bcrypt";

export const activeCheck = async (req, res) => {
    return res.status(200).json({message: "Active"});
}

export const createPost = async (req,res) => {

    const {token} = req.body;

    try{
        const user = await User.findOne({token});
        
        // ✅ Check user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Validate post body
        if (!req.body.body) {
            return res.status(400).json({ message: "Post body is required" });
        }

        const post = new Post({
            userId : user._id,
            body : req.body.body,
            media: req.file ? req.file.filename : "",
            fileType : req.file ? req.file.mimetype : "" // ✅ FIXED
        });

        await post.save();

        return res.status(201).json({ // ✅ better status
            message : "Post Created",
            post
        });

    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getAllPosts = async (req,res) => {
    try{
    
        const posts = await Post.find()
            .populate('userId', 'name username email profilePicture')

            return res.json({ posts });



    } catch(error){
         return res.status(500).json({ message: error.message });

    }
}



export const deletePost = async (req,res) => {

    const {token, postId} = req.body;

    try{

        const user = await user.findOne({token : token})
                    .select("_id");

         if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findOne({ _id : post_id });

          if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if( post.userId.toString() !== user._id.toString()) {
            return res.status(401).json({ message : "Unauthorized"});

        }

        await Post.deletePost({ _id : post_id});

        return res.json({message : "Post Deleted"});


    } catch (error) {
         return res.status(500).json({ message: error.message });
    }
}