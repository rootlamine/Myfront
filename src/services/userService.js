// filepath: /home/lex_code/Documents/JavaScript/PencMi/src/services/userService.js
const API_URL = "http://localhost:3000";

export async function getUserByPhone(phone) {
  const res = await fetch(`${API_URL}/users?phone=${encodeURIComponent(phone)}`);
  const users = await res.json();
  return users[0] || null;
}

export async function addUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}