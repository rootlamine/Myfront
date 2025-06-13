import { getMessagesForContact } from "../services/messageService.js";

export default function displayMessages(messagesContainer, contact, userId) {
  if (!contact || !userId) return;
  
  messagesContainer.innerHTML = "";
  
  getMessagesForContact(userId, contact.id).then((msgs) => {
    msgs.forEach((msg) => {
      const msgDiv = document.createElement("div");
      msgDiv.className = "flex flex-col items-end mb-2";
      
      const bubble = document.createElement("div");
      bubble.className =
        "self-end bg-[#DCF8C6] text-[#34495E] px-4 py-2 rounded-xl max-w-xs ml-auto shadow-sm"; // Vert clair WhatsApp et texte gris foncé
      bubble.textContent = msg.text;
      
      const time = document.createElement("span");
      time.className = "text-xs text-[#8696a0] mt-1"; // Gris clair WhatsApp
      time.textContent = msg.time || new Date(msg.timestamp).toLocaleTimeString();
      
      msgDiv.appendChild(bubble);
      msgDiv.appendChild(time);
      messagesContainer.appendChild(msgDiv);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}