import mongoose, { model } from "mongoose";

const conversationSchema = new mongoose.Schema({
         participants:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         }],
         messages:[{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
         }]
            //createdAt,updatedAt 
},{timestamps:true});

const Converstaion = mongoose.model("Conversation",conversationSchema)

export default  Converstaion