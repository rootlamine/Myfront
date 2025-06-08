const API_URL = "http://localhost:3000/contacts";

export async function getContacts() {
  // On ne veut que les contacts ni archivés ni bloqués
  const res = await fetch(`${API_URL}?archived=false&blocked=false`);
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


export async function deleteContact(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
export async function getArchivedContacts() {
  const res = await fetch(`${API_URL}?archived=true`);
  return await res.json();
}

export async function getBlockedContacts() {
  const res = await fetch(`${API_URL}?blocked=true`);
  return await res.json();
}

export async function updateContact(id, data) {
  const res = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}