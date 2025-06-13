export default function createChatHeader(onDelete, onArchive, onBlock) {
  const chatHeader = document.createElement("div");
  chatHeader.className = "p-4 bg-[#128C7E] text-white font-semibold shadow flex justify-between items-center"; // Vert foncé WhatsApp
  chatHeader.style.height = "80px";
  
  // Titre à gauche
  const title = document.createElement("span");
  title.textContent = "Sélectionne un contact";
  chatHeader.appendChild(title);
  
  // Groupe de boutons à droite
  const btnGroup = document.createElement("div");
  btnGroup.className = "flex gap-3";
  
  // Bouton supprimer
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "hover:text-red-300 transition-colors duration-200"; // Rouge plus doux pour WhatsApp
  deleteBtn.title = "Supprimer";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  if (onDelete) deleteBtn.onclick = onDelete;
  btnGroup.appendChild(deleteBtn);
  
  // Bouton archiver
  const archiveBtn = document.createElement("button");
  archiveBtn.className = "hover:text-[#DCF8C6] transition-colors duration-200"; // Vert clair WhatsApp au hover
  archiveBtn.title = "Archiver";
  archiveBtn.innerHTML = '<i class="fas fa-archive"></i>';
  if (onArchive) archiveBtn.onclick = onArchive;
  btnGroup.appendChild(archiveBtn);
  
  // Bouton bloquer
  const blockBtn = document.createElement("button");
  blockBtn.className = "hover:text-[#ECE5DD] transition-colors duration-200"; // Gris clair WhatsApp au hover
  blockBtn.title = "Bloquer";
  blockBtn.innerHTML = '<i class="fas fa-ban"></i>';
  if (onBlock) blockBtn.onclick = onBlock;
  btnGroup.appendChild(blockBtn);
  
  chatHeader.appendChild(btnGroup);
  
  // Méthodes utilitaires
  chatHeader.setTitle = (txt) => { title.textContent = txt; };
  chatHeader.setButtonsVisible = (visible) => {
    btnGroup.style.display = visible ? "flex" : "none";
  };
  
  chatHeader.setButtonsVisible(false);
  
  return chatHeader;
}