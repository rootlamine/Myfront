import showAddContactForm from "../components/AddContactForm.js";
import renderContacts from "../components/ContactList.js";
import displayMessages from "../components/MessageList.js";
import createChatHeader from "../components/ChatHeader.js";
import { addMessage } from "../services/messageService.js";
import createMessageInput from "../components/MessageInput.js";
import { getArchivedContacts, getBlockedContacts, updateContact, deleteContact } from "../services/contactService.js";
// src/pages/chat.js
export default function createChatPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;

  const app = document.createElement("div");
  app.className = "flex h-screen w-screen";

  // === Load Font Awesome ===
  const faLink = document.createElement("link");
  faLink.rel = "stylesheet";
  faLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(faLink);

  // === Primary Sidebar (Icons Menu) ===
  const menuSidebar = document.createElement("div");
  menuSidebar.className =
    "w-16 bg-gray-900 text-white flex flex-col items-center py-4 justify-center space-y-6";

  const menuItems = [
    { name: "Discussions", icon: "fa-comments" },
    { name: "Contacts", icon: "fa-user-friends" },
    { name: "Archivés", icon: "fa-archive" }, // Ajouté
    { name: "Bloqués", icon: "fa-ban" }, // Ajout
    { name: "Groupes", icon: "fa-users" },
    { name: "Diffusions", icon: "fa-bullhorn" },
    { name: "Déconnexion", icon: "fa-sign-out-alt" },
  ];

  menuItems.forEach((item) => {
    const btn = document.createElement("button");
    btn.className =
      "text-xl hover:text-blue-400 focus:outline-none flex items-center justify-center w-10 h-10";
    btn.title = item.name;
    const icon = document.createElement("i");
    icon.className = `fas ${item.icon}`;
    btn.appendChild(icon);

    if (item.name === "Déconnexion") {
      btn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
      });
    }

    if (item.name === "Contacts") {
      btn.addEventListener("click", () => {
        showAddContactForm(() =>
          renderContacts(
            conversationList,
            chatHeader,
            messagesContainer,
            displayMessages,
            setSelectedContact
          )
        );
      });
    }
    if (item.name === "Discussions") {
      btn.addEventListener("click", () => {
        renderContacts(
          conversationList,
          chatHeader,
          messagesContainer,
          displayMessages,
          setSelectedContact,
          undefined, // ou la liste filtrée si besoin
          userId     // <-- Passe le userId ici
        );
        if (selectedContact) {
          chatHeader.setTitle("Discussion avec " + selectedContact.name);
          chatHeader.setButtonsVisible(true);
          displayMessages(messagesContainer, selectedContact, userId);
        } else {
          chatHeader.setTitle("Sélectionne un contact");
          chatHeader.setButtonsVisible(false);
          messagesContainer.innerHTML = "";
        }
      });
    }
    if (item.name === "Archivés") {
      btn.addEventListener("click", () => {
        getArchivedContacts(userId).then((contacts) => {
          renderContacts(
            conversationList,
            chatHeader,
            messagesContainer,
            displayMessages,
            setSelectedContact,
            contacts // <-- la liste filtrée
          );
          chatHeader.setTitle("Contacts archivés");
          chatHeader.setButtonsVisible(false);
          messagesContainer.innerHTML = "";
        });
      });
    }
    if (item.name === "Bloqués") {
      btn.addEventListener("click", () => {
        getBlockedContacts(userId).then((contacts) => {
          renderContacts(
            conversationList,
            chatHeader,
            messagesContainer,
            displayMessages,
            setSelectedContact,
            contacts // <-- la liste filtrée
          );
          chatHeader.setTitle("Contacts bloqués");
          chatHeader.setButtonsVisible(false);
          messagesContainer.innerHTML = "";
        });
      });
    }

    menuSidebar.appendChild(btn);
  });

  // === Secondary Sidebar (Liste de discussions) ===
  const conversationSidebar = document.createElement("div");
  conversationSidebar.className = "w-1/4 bg-white border-r flex flex-col";

  const searchBar = document.createElement("div");
  searchBar.className = "p-4 border-b";
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Rechercher...";
  searchInput.className =
    "w-full px-4 py-2 border rounded-lg focus:outline-none";
  searchBar.appendChild(searchInput);

  const conversationList = document.createElement("div");
  conversationList.className = "flex-1 overflow-y-auto";

  // Chat zone
  const chatZone = document.createElement("div");
  chatZone.className = "flex flex-col flex-1 bg-gray-50";

  let selectedContact = null;
  const setSelectedContact = (contact) => {
    selectedContact = contact;
    if (selectedContact) {
      localStorage.setItem("selectedContactId", selectedContact.id); // <-- Ajoute cette ligne
      chatHeader.setTitle("Discussion avec " + selectedContact.name);
      chatHeader.setButtonsVisible(true);
      displayMessages(messagesContainer, selectedContact, userId);
    } else {
      localStorage.removeItem("selectedContactId"); // <-- Ajoute cette ligne
      chatHeader.setTitle("Sélectionne un contact");
      chatHeader.setButtonsVisible(false);
      messagesContainer.innerHTML = "";
    }
  };

  // Crée le header AVEC les callbacks
  const chatHeader = createChatHeader(
    async () => {
      if (selectedContact && confirm("Supprimer ce contact ?")) {
        await deleteContact(selectedContact.id);
        renderContacts(
          conversationList,
          chatHeader,
          messagesContainer,
          displayMessages,
          setSelectedContact
        );
        chatHeader.setTitle("Sélectionne un contact");
        chatHeader.setButtonsVisible(false);
        messagesContainer.innerHTML = "";
        selectedContact = null;
      }
    },
    async () => {
      if (selectedContact) {
        await updateContact(selectedContact.id, { archived: true });
        renderContacts(
          conversationList,
          chatHeader,
          messagesContainer,
          displayMessages,
          setSelectedContact
        );
        chatHeader.setTitle("Sélectionne un contact");
        chatHeader.setButtonsVisible(false);
      }
    },
    async () => {
      if (selectedContact) {
        await updateContact(selectedContact.id, { blocked: true });
        renderContacts(
          conversationList,
          chatHeader,
          messagesContainer,
          displayMessages,
          setSelectedContact
        );
        chatHeader.setTitle("Sélectionne un contact");
        chatHeader.setButtonsVisible(false);
      }
    }
  );

  // Crée d'abord messagesContainer
  const messagesContainer = document.createElement("div");
  messagesContainer.className = "flex-1 overflow-y-auto p-4 space-y-2";

  // Maintenant tu peux appeler renderContacts
  renderContacts(
    conversationList,
    chatHeader,
    messagesContainer,
    displayMessages,
    setSelectedContact,
    undefined, // ou la liste filtrée si besoin
    userId     // <-- Passe le userId ici
  );

  // Après avoir chargé les contacts (après renderContacts)
  const selectedContactId = localStorage.getItem("selectedContactId");
  if (selectedContactId) {}

  conversationSidebar.appendChild(searchBar);
  conversationSidebar.appendChild(conversationList);

  // Formulaire de message sans innerHTML
  const form = document.createElement("form");
  form.className = "flex items-center p-4 bg-white border-t w-full px-30";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Écris un message";
  input.className =
    "flex-1 px-4 py-2 border rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.className =
    "bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700";

  const icon = document.createElement("i");
  icon.className = "fas fa-paper-plane";
  button.appendChild(icon);

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!selectedContact) {
      alert("Sélectionne un contact d'abord !");
      return;
    }
    if (text) {
      await addMessage({
        userId,
        contactId: selectedContact.id,
        text,
        timestamp: Date.now(),
        read: false
      });
      displayMessages(messagesContainer, selectedContact, userId);
      input.value = "";
    }
  });

  const messageInput = createMessageInput(async (text) => {
    if (!selectedContact) {
      alert("Sélectionne un contact d'abord !");
      return;
    }
    await addMessage({
      userId,
      contactId: selectedContact.id,
      text,
      timestamp: Date.now(),
      read: false
    });
    displayMessages(messagesContainer, selectedContact, userId);
  });

  chatZone.appendChild(chatHeader);
  chatZone.appendChild(messagesContainer);
  chatZone.appendChild(messageInput);

  // Assemblage final
  app.appendChild(menuSidebar);
  app.appendChild(conversationSidebar);
  app.appendChild(chatZone);

  return app;
}
