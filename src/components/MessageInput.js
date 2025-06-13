export default function createMessageInput(onSend) {
  const form = document.createElement("form");
  form.className = "flex items-center p-4 bg-[#F0F0F0] border-t border-[#ECE5DD] w-full px-30"; // Arrière-plan gris très clair WhatsApp
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Écris un message";
  input.className = "flex-1 px-4 py-2 border border-[#ECE5DD] rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white"; // Bordure et focus vert WhatsApp
  input.required = true;
  
  const button = document.createElement("button");
  button.type = "submit";
  button.className = "bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#128C7E] transition-colors duration-200"; // Vert principal et foncé WhatsApp
  
  const icon = document.createElement("i");
  icon.className = "fas fa-paper-plane";
  button.appendChild(icon);
  
  form.appendChild(input);
  form.appendChild(button);
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text && onSend) {
      onSend(text);
      input.value = "";
    }
  });
  
  return form;
}