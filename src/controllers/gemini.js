async function describeImages(req, res) {

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!geminiApiKey) {
    res.send("Chave da API não configurada.");
  }

  const imageUrl = req.body.imageUrl; //URL da imagem que a extensão está enviando

  try {
    const genAI = await new GoogleGenerativeAI(geminiApiKey); //Chama a API através da chave
    
    const model =  await genAI.getGenerativeModel({model: "gemini-1.5-flash"});  //Cria o modelo que vai ser utilizado

    const prompt = `Gere uma frase descritiva para por no alt (HTML) dessa imagem: ${imageUrl} , 
    Por favor não me faça mais perguntas, apenas gere o alt, pois esta requisição está sendo feita de uma API`  //Cria o prompt

    const result = await model.generateContent(prompt); //Recebe a resposta do prompt

    const data = await result.response.text();

    console.log(data);  //Desnecessário, deixei para ver o que a API está retornando no terminal
    res.send({data} || "Descrição padrão da API");

  } catch (error) {
    console.error('Erro ao comunicar com Google Gemini:', error.message);
    res.status(500).json({ error: 'Erro ao processar as imagens.' });
  }
}

module.exports = { describeImages };
