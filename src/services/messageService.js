const API_URL = "http://localhost:3000/messages";

export async function getMessagesForContact(userId, contactId) {
  const res = await fetch(`${API_URL}?userId=${userId}&contactId=${contactId}`);
  return await res.json();
}

export async function addMessage(message) {
  const response = await fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}