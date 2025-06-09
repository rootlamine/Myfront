const API_URL = "http://localhost:3000/contacts";

export async function getContacts(userId) {
  const res = await fetch(`${API_URL}?userId=${userId}&archived=false&blocked=false`);
  return await res.json();
}

export async function getArchivedContacts(userId) {
  const res = await fetch(`${API_URL}?userId=${userId}&archived=true`);
  return await res.json();
}

export async function getBlockedContacts(userId) {
  const res = await fetch(`${API_URL}?userId=${userId}&blocked=true`);
  return await res.json();
}

export async function addContact(contact) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return await res.json();
}

export async function updateContact(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteContact(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}