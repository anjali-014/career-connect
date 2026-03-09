import mongoose from "mongoose";

// comments schema for linkedin clone
const commentSchema =new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    body :{
        type: String,
        required: true
    }
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;