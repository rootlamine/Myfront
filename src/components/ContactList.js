import { getContacts, updateContact } from "../services/contactService.js";
import { getMessagesForContact } from "../services/messageService.js";

export default function renderContacts(
  conversationList,
  chatHeader,
  messagesContainer,
  displayMessages,
  setSelectedContact,
  contactsOverride,
  userId
) {
  conversationList.innerHTML = "";
  const contactsPromise = contactsOverride
    ? Promise.resolve(contactsOverride)
    : getContacts(userId);

  contactsPromise.then((contacts) => {
    contacts.forEach((contact) => {
      const chatItem = document.createElement("div");
      chatItem.className =
        "flex items-center justify-between p-4 hover:bg-[#ECE5DD] border-b border-[#ECE5DD] cursor-pointer transition-colors duration-200"; // Arrière-plan hover et bordure WhatsApp

      // Partie gauche : nom + dernier message
      const infoDiv = document.createElement("div");
      infoDiv.className = "flex flex-col min-w-0";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = contact.name;
      nameSpan.className = "font-semibold text-base truncate text-[#34495E]"; // Texte gris foncé WhatsApp

      // Dernier message et heure
      const lastMsgRow = document.createElement("div");
      lastMsgRow.className = "flex items-center gap-2 mt-1 min-w-0";

      const lastMsgDiv = document.createElement("span");
      lastMsgDiv.className = "text-xs text-[#667781] truncate max-w-[150px]"; // Gris moyen WhatsApp

      const lastMsgTime = document.createElement("span");
      lastMsgTime.className = "text-xs text-[#8696a0] ml-2 flex-shrink-0"; // Gris clair WhatsApp

      // Correction ici : on utilise contact.id et on affiche l'heure formatée
      getMessagesForContact(userId, contact.id).then((messages) => {
        if (messages.length > 0) {
          const lastMsg = messages[messages.length - 1];
          lastMsgDiv.textContent = lastMsg.text;
          lastMsgTime.textContent = lastMsg.timestamp
            ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";
        } else {
          lastMsgDiv.textContent = "Aucun message";
          lastMsgTime.textContent = "";
        }
      });

      lastMsgRow.appendChild(lastMsgDiv);
      lastMsgRow.appendChild(lastMsgTime);

      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(lastMsgRow);

      // Partie droite : actions
      const actions = document.createElement("div");
      actions.className = "flex gap-2 ml-4";

      // Bouton désarchiver
      if (contact.archived) {
        const unarchiveBtn = document.createElement("button");
        unarchiveBtn.className = "text-[#8696a0] hover:text-[#25D366] transition-colors duration-200"; // Couleurs WhatsApp
        unarchiveBtn.title = "Désarchiver";
        unarchiveBtn.innerHTML = '<i class="fas fa-inbox"></i>';
        unarchiveBtn.onclick = async (e) => {
          e.stopPropagation();
          await updateContact(contact.id, { archived: false });
          renderContacts(
            conversationList,
            chatHeader,
            messagesContainer,
            displayMessages,
            setSelectedContact,
            contacts.filter((c) => c.id !== contact.id)
          );
        };
        actions.appendChild(unarchiveBtn);
      }

      // Bouton débloquer
      if (contact.blocked) {
        const unblockBtn = document.createElement("button");
        unblockBtn.className = "text-[#8696a0] hover:text-[#25D366] transition-colors duration-200"; // Couleurs WhatsApp
        unblockBtn.title = "Débloquer";
        unblockBtn.innerHTML = '<i class="fas fa-user-check"></i>';
        unblockBtn.onclick = async (e) => {
          e.stopPropagation();
          await updateContact(contact.id, { blocked: false });
          renderContacts(
            conversationList,
            chatHeader,
            messagesContainer,
            displayMessages,
            setSelectedContact,
            contacts.filter((c) => c.id !== contact.id)
          );
        };
        actions.appendChild(unblockBtn);
      }

      chatItem.onclick = () => {
        setSelectedContact(contact);
        chatHeader.setTitle("Discussion avec " + contact.name);
        displayMessages(messagesContainer, contact, userId);
      };

      chatItem.appendChild(infoDiv);
      chatItem.appendChild(actions);
      conversationList.appendChild(chatItem);
    });
    
    if (contacts.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "p-4 text-[#8696a0] text-center"; // Gris clair WhatsApp
      emptyMsg.textContent = "Aucun contact pour le moment.";
      conversationList.appendChild(emptyMsg);
    }
  });
}