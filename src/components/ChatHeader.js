export default function createChatHeader() {
  const chatHeader = document.createElement("div");
  chatHeader.className = "p-4 bg-blue-600 text-white font-semibold shadow";
  chatHeader.style.height = "80px";
  chatHeader.style.display = "flex";
  chatHeader.style.alignItems = "center";
  chatHeader.textContent = "Sélectionne un contact";
  return chatHeader;
}