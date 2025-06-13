import { addContact } from "../services/contactService.js";

export default function showAddContactForm(onContactAdded) {
  if (document.getElementById("addContactForm")) return;
  
  const form = document.createElement("form");
  form.id = "addContactForm";
  form.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50";
  
  const box = document.createElement("div");
  box.className =
    "bg-white p-8 rounded-xl shadow-xl flex flex-col gap-4 min-w-[300px]";
  
  const title = document.createElement("h2");
  title.textContent = "Ajouter un contact";
  title.className = "text-xl font-bold mb-2 text-[#128C7E]"; // Vert foncé WhatsApp
  box.appendChild(title);
  
  // Message d'erreur
  const errorMsg = document.createElement("p");
  errorMsg.className = "text-red-600 text-sm mb-2 hidden";
  errorMsg.textContent = "Tous les champs sont obligatoires.";
  box.appendChild(errorMsg);
  
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Nom du contact";
  nameInput.className = "border border-[#ECE5DD] rounded px-3 py-2 focus:border-[#25D366] focus:outline-none"; // Bordures WhatsApp
  box.appendChild(nameInput);
  
  const phoneInput = document.createElement("input");
  phoneInput.type = "tel";
  phoneInput.placeholder = "Numéro de téléphone";
  phoneInput.className = "border border-[#ECE5DD] rounded px-3 py-2 focus:border-[#25D366] focus:outline-none"; // Bordures WhatsApp
  box.appendChild(phoneInput);
  
  const btns = document.createElement("div");
  btns.className = "flex gap-2 justify-end";
  
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Annuler";
  cancelBtn.className = "px-4 py-2 rounded bg-[#ECE5DD] hover:bg-[#D1C7BD] text-[#34495E]"; // Couleurs WhatsApp grises
  cancelBtn.onclick = () => form.remove();
  btns.appendChild(cancelBtn);
  
  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.textContent = "Ajouter";
  addBtn.className = "px-4 py-2 rounded bg-[#25D366] text-white hover:bg-[#128C7E]"; // Vert WhatsApp principal et foncé au hover
  btns.appendChild(addBtn);
  
  box.appendChild(btns);
  form.appendChild(box);
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    await addContact({
      userId: currentUser.id,
      name: nameInput.value,
      phone: phoneInput.value,
      archived: false,
      blocked: false
    });
    form.remove();
    if (onContactAdded) onContactAdded();
  };
  
  document.body.appendChild(form);
}