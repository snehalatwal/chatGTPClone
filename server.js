require('dotenv').config();
// console.log(process.env);
const express = require("express");
const cors = require("cors");
const json=require("json");
const PORT = 8000;
const app = express();
const API_KEY =process.env.secretKey;


app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hey");
});

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content:req.body.message }],
        // max_tokens: 100,
      })
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server is running perfectly at port ${PORT}`)
);
