let prompt = document.querySelector("#prompt")
let container = document.querySelector(".container")
let btn = document.querySelector("#btn")
let chatContanier = document.querySelector(".chat-container")
let userMessage = null;
let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDb1Dsh3I6Z5ZLstcUoOcCLulUVJXw1Id4'

function createChatBox(html, className) {
  let div = document.createElement("div")
  div.classList.add(className)
  div.innerHTML = html
  return div
}
async function getApiResponse(aiChatBox) {
  let textElement = aiChatBox.querySelector(".text")


  try {
    let respones = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "contents": [
          {
            "role": "user",
            "parts": [{ text: userMessage }]
          }]
      })
    })
    let data = await respones.json()
    let apiResonse = data?.candidates[0].content.parts[0].text;
    textElement.innerText = apiResonse
  }
  catch (error) {
    console.log(error)
  }
  finally {
    aiChatBox.querySelector(".loading").style.display = "none"
  }
}
function showLoading() {
  let html = ` <div class="img">
        <img src="images/image-copy-2.png" width="50">
     </div>
     <p class="text"></p>
     <img class="loading" src="images/image-copy-3.png" height="40">`
  let aiChatBox = createChatBox(html, "ai-chat-box")
  chatContanier.appendChild(aiChatBox)
  getApiResponse(aiChatBox)
}

btn.addEventListener("click", () => {
  userMessage = prompt.value
  if (userMessage == "") {
    container.style.display = "flex"
  } {
    container.style.display = "none"
  }
  if (!userMessage) return;
  let html = `<div class="img">
            <img src="images/image-copy.png" width="50">
        </div>
        <p class="text"></p>`;
  let userChatBox = createChatBox(html, "user-chat-box")
  userChatBox.querySelector(".text").innerText = userMessage
  chatContanier.appendChild(userChatBox)
  prompt.value = ""
  setTimeout(showLoading, 500)
})