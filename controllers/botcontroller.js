const UserChatModel = require('../models/userchat')

const UserChat = (req, res)=>{
    const { username } = req.params;

    try {
      const user = UserChatModel.findOne({ username });
  
      if (user) {
        res.status(200).json({ username, points: user.points });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching points:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    
    
}

const botChat= async (ctx) => {
    console.log('hjello',ctx)
    const username = ctx.message?.from?.username || ctx.callbackQuery?.from?.username;
    const chatId = ctx.chat.id;
  
    try {
      const now = new Date();
      const user = await UserChatModel.findOne({ username, chatId });
  
      if (user) {
        const timeDiff = now - user.lastUpdated;
  
        // Only award points if the user hasn’t earned points in the past hour
        if (timeDiff >= 3600000) {
          user.points += 1;
          user.lastUpdated = now;
          await user.save();
        }
      } else {
        // Create a new user entry if one doesn’t exist
        const newUser = new UserChatModel({
          username,
          chatId,
          points: 1,
          lastUpdated: now,
        });
        await newUser.save();
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };
  
module.exports = {UserChat, botChat};  