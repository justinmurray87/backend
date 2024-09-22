// controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');
const Template = require('../models/Template');
const Place = require('../models/Place');
const llmService = require('../services/llmService');

const createMessage = async (req, res) => {
  const { userID, modelID, messageType, theme, description, picture, placeID, updatedMessage } = req.body;

  // Check if the user exists
  const user = await User.findById(userID);
  if (!user) {
    return res.status(401).json({ action: 'signup', message: 'User not found. Please sign up.' });
  }

  // Check if the place exists
  const place = await Place.findById(placeID);
  if (!place) {
    return res.status(404).json({ error: 'Place not found. Please select a valid place.' });
  }

  if (messageType === 'save') {
    // Save as draft
    const newMessage = new Message({
      userID,
      modelID,
      theme,
      description,
      picture,
      placeID,
      status: 'draft',
    });
    await newMessage.save();
    return res.status(201).json({ message: 'Message saved as draft.' });
  }

  if (messageType === 'generate') {
    // Fetch template by theme and generate prompt
    const template = await Template.findOne({ theme });
    if (!template) {
      return res.status(404).json({ error: 'Template not found for theme.' });
    }

    const prompt = template.content.replace('{description}', description);
    
    // Send the prompt to LLM based on modelID using service
    const llmResponse = await llmService.submitToLLM(modelID, prompt);

    const generatedMessage = new Message({
      userID,
      modelID,
      theme,
      description,
      picture,
      placeID,
      status: 'generated',
      prompt,
      llmResponse,
    });
    await generatedMessage.save();

    return res.status(200).json({ message: 'Content generated successfully.', llmResponse });
  }

  if (messageType === 'publish') {
    // Publish content, check if generated content exists
    let message = await Message.findOne({ userID, placeID, status: 'generated' });
    if (!message) {
      return res.status(400).json({ error: 'Content must be generated before publishing.' });
    }

    // If updatedMessage exists, update the content before publishing
    if (updatedMessage) {
      message.description = updatedMessage;
    }

    message.status = 'published';
    await message.save();
    return res.status(200).json({ message: 'Content published successfully.' });
  }

  res.status(400).json({ error: 'Invalid message type.' });
};

module.exports = { createMessage };

