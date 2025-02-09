const { default: ollama } = require("ollama"); // CJS
async function aiConv(usermessage) {
  const message = { role: "user", content: usermessage };
  const response = await ollama.chat({
    model: "llama3.2:1b",
    messages: [message],
    stream: true,
  });
  for await (const part of response) {
    console.log(part.message.content);
  }
}
aiConv("kanye west");
