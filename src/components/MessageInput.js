export default function createMessageInput(onSend) {
  const form = document.createElement("form");
  form.className = "flex items-center p-4 bg-white border-t w-full px-30";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Écris un message";
  input.className = "flex-1 px-4 py-2 border rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700";
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