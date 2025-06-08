const API_URL = "http://localhost:3000/contacts";

export async function getContacts() {
  const res = await fetch(API_URL);
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