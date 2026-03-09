import mongoose from "mongoose";

// Connection schema for linkedin clone
const connectionRequest =new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    connectionId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status_accepted :{
        type: Boolean,
        default: null  //awaiting response
    }
});


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequest);

export default ConnectionRequest;