import { getContacts, deleteContact } from "../services/contactService.js";

export default function renderContacts(conversationList, chatHeader, messagesContainer, displayMessages, setSelectedContact) {
  conversationList.innerHTML = "";
  getContacts().then((contacts) => {
    contacts.forEach((contact) => {
      const chatItem = document.createElement("div");
      chatItem.className = "p-4 hover:bg-gray-100 px-8 w-full border-b flex justify-between items-center cursor-pointer";

      // On met le onclick ici !
      chatItem.onclick = () => {
        setSelectedContact(contact);
        chatHeader.textContent = "Discussion avec " + contact.name;
        displayMessages(messagesContainer, contact);
      };

      const nameSpan = document.createElement("span");
      nameSpan.textContent = contact.name;

      // Bouton supprimer
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "text-red-500 hover:text-red-700 ml-4";
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.onclick = async (e) => {
        e.stopPropagation(); // Pour ne pas sélectionner le contact
        if (confirm("Supprimer ce contact ?")) {
          await deleteContact(contact.id);
          renderContacts(conversationList, chatHeader, messagesContainer, displayMessages, setSelectedContact);
        }
      };

      chatItem.appendChild(nameSpan);
      chatItem.appendChild(deleteBtn);
      conversationList.appendChild(chatItem);
    });
    if (contacts.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "p-4 text-gray-400 text-center";
      emptyMsg.textContent = "Aucun contact pour le moment.";
      conversationList.appendChild(emptyMsg);
    }
  });
}