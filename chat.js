document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-container")
  const chatForm = document.getElementById("chat-form")
  const userInput = document.getElementById("user-input")

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const message = userInput.value.trim()
    if (message) {
      addMessage("user", message)
      userInput.value = ""
      await getAIResponse(message)
    }
  })

  function addMessage(role, content) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message", role === "user" ? "user-message" : "ai-message")
    messageDiv.textContent = content
    chatContainer.appendChild(messageDiv)
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  async function getAIResponse(message) {
    const typingIndicator = addTypingIndicator()
    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })
      const data = await response.json()
      removeTypingIndicator(typingIndicator)
      addMessage("ai", data.response)
    } catch (error) {
      console.error("Error:", error)
      removeTypingIndicator(typingIndicator)
      addMessage("ai", "Sorry, I encountered an error. Please try again.")
    }
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.classList.add("message", "ai-message")
    typingDiv.textContent = "AI is typing..."
    chatContainer.appendChild(typingDiv)
    chatContainer.scrollTop = chatContainer.scrollHeight
    return typingDiv
  }

  function removeTypingIndicator(typingDiv) {
    chatContainer.removeChild(typingDiv)
  }
})

