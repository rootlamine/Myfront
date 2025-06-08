const API_URL = 'http://localhost:3000';

export async function getUserByPhone(phone) {
  try {
    const res = await fetch(`${API_URL}/users?phone=${encodeURIComponent(phone)}`);
    if (!res.ok) throw new Error('Erreur réseau');
    const users = await res.json();
    return users.length ? users[0] : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
