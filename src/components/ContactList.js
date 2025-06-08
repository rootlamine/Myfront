import { getContacts } from "../services/contactService.js";

export default function renderContacts(conversationList, chatHeader, messagesContainer, displayMessages, setSelectedContact) {
  conversationList.innerHTML = "";
  getContacts().then((contacts) => {
    contacts.forEach((contact) => {
      const chatItem = document.createElement("div");
      chatItem.className =
        "p-4 hover:bg-gray-100 px-8 w-full border-b cursor-pointer";
      chatItem.textContent = contact.name;
      chatItem.onclick = () => {
        setSelectedContact(contact);
        chatHeader.textContent = "Discussion avec " + contact.name;
        displayMessages(messagesContainer, contact);
      };
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