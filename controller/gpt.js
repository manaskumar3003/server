const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "AIzaSyBzhVppgo2IOr15aH2cArBZlTbBZsdoFIc";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "behave as a financial manager of the vedarga company, vedarga company is  a small firm helping new startups to grow",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const gptCtrl={
  gptrun:async function(req,res) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const{messageinput}= req.body;
  
    const result = await chatSession.sendMessage("hi my name is manas");
    console.log();
    res.json(result.response.text())
  }
  
  
  }

  module.exports = gptCtrl