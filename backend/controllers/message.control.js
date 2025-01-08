import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()
    // await newMessage.save()

    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(reciverId);

    if (receiverSocketId) {
      
      //io.to (socketId).emit used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in send message ",error.message)
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userTochatId] },
    }).populate("messages"); //Not Reference But Actual Messages

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller",error.message)
    res.status(500).json({ error: "Internal Server error" });
  }
};
