const API_URL = "http://localhost:3000/users";

export async function getUserByPhone(phone) {
  const res = await fetch(`${API_URL}?phone=${encodeURIComponent(phone)}`);
  const users = await res.json();
  return users[0] || null;
}

export async function addUser(user) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}