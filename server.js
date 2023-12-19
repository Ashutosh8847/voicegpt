const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const OpenAI = require('openai')
app.use(express.json())
const message = []
console.log("********messages*****",message)

const openai = new OpenAI({
  apiKey: ''
});

async function main(input) {
  console.log("Received input:", input);
  message.push({role:"user",content:input})
  console.log("Usermessage*****",message)


try {
  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo",
  });
  return completion?.choices[0]?.message?.content;

} catch (error) {
  // console.log("****Error****",error)
  return "user input is empty or undefined"
}}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post('/api',async (req,res,next) => {
  try {
    console.log('*****Body*******', req.body);
    const mes = await main(req.body.input);
    res.json({ success: true, message: mes });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}) 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
