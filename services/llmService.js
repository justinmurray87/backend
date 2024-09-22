// services/llmService.js
const axios = require('axios');

const submitToLLM = async (modelID, prompt) => {
  let apiUrl;
  if (modelID === 'gpt3') {
    apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  } else if (modelID === 'gemini') {
    apiUrl = 'https://api.generativeai.google.com/v1beta2/gemini:generateText';
  }

  const response = await axios.post(apiUrl, {
    prompt: prompt,
    max_tokens: 150,
  }, {
    headers: {
      Authorization: `Bearer YOUR_API_KEY`,
    }
  });

  return response.data;
};

module.exports = { submitToLLM };
