import { getContacts, updateContact } from "../services/contactService.js";

export default function renderContacts(
  conversationList,
  chatHeader,
  messagesContainer,
  displayMessages,
  setSelectedContact,
  contactsOverride // <-- nouveau paramètre optionnel
) {
  conversationList.innerHTML = "";
  const contactsPromise = contactsOverride
    ? Promise.resolve(contactsOverride)
    : getContacts();

  contactsPromise.then((contacts) => {
    contacts.forEach((contact) => {
      const chatItem = document.createElement("div");
      chatItem.className =
        "p-4 hover:bg-gray-100 px-8 w-full border-b flex items-center cursor-pointer";

      chatItem.onclick = () => {
        setSelectedContact(contact);
        chatHeader.setTitle("Discussion avec " + contact.name);
        displayMessages(messagesContainer, contact);
      };

      const nameSpan = document.createElement("span");
      nameSpan.textContent = contact.name;
      chatItem.appendChild(nameSpan);

      // Bouton désarchiver
      if (contact.archived) {
        const unarchiveBtn = document.createElement("button");
        unarchiveBtn.className = "ml-4 text-yellow-400 hover:text-yellow-600";
        unarchiveBtn.title = "Désarchiver";
        unarchiveBtn.innerHTML = '<i class="fas fa-box-open"></i>';
        unarchiveBtn.onclick = async (e) => {
          e.stopPropagation();
          await updateContact(contact.id, { archived: false });
          // Rafraîchir la liste après désarchivage
          if (typeof renderContacts === "function") {
            renderContacts(
              conversationList,
              chatHeader,
              messagesContainer,
              displayMessages,
              setSelectedContact,
              contacts.filter((c) => c.id !== contact.id)
            );
          }
        };
        chatItem.appendChild(unarchiveBtn);
      }

      // Bouton débloquer
      if (contact.blocked) {
        const unblockBtn = document.createElement("button");
        unblockBtn.className = "ml-4 text-green-400 hover:text-green-600";
        unblockBtn.title = "Débloquer";
        unblockBtn.innerHTML = '<i class="fas fa-unlock"></i>';
        unblockBtn.onclick = async (e) => {
          e.stopPropagation();
          await updateContact(contact.id, { blocked: false });
          // Rafraîchir la liste après déblocage
          if (typeof renderContacts === "function") {
            renderContacts(
              conversationList,
              chatHeader,
              messagesContainer,
              displayMessages,
              setSelectedContact,
              contacts.filter((c) => c.id !== contact.id)
            );
          }
        };
        chatItem.appendChild(unblockBtn);
      }

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
