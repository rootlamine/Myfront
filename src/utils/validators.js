export function isValidPhone(phone) {
  return /^0[6-7][0-9]{8}$/.test(phone); // simple regex FR
}
