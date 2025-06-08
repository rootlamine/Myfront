const API_URL = "http://localhost:3000/messages";

export async function getMessagesForContact(contactName) {
  const res = await fetch(`${API_URL}?contact=${encodeURIComponent(contactName)}`);
  return await res.json();
}

export async function addMessage(contactName, text) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: contactName,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }),
  });
  return await res.json();
}