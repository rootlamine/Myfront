import { getUserByPhone, addUser } from '../services/userService.js';

export default function createLoginPage(onLogin) {
  const container = document.createElement('div');
  container.className = 'flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300';

  // Card
  const card = document.createElement('div');
  card.className = 'bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md';

  // Logo ou titre
  const logo = document.createElement('div');
  logo.className = 'mb-6 text-4xl font-extrabold text-blue-700 tracking-tight';
  logo.textContent = 'Bienvenu sur PencMi';
  card.appendChild(logo);

  // Choix Connexion / Inscription
  const btnGroup = document.createElement('div');
  btnGroup.className = 'flex gap-4 mb-8 w-full justify-center';

  const btnConnexion = document.createElement('button');
  btnConnexion.textContent = "Connexion";
  btnConnexion.className = 'bg-blue-600 text-white px-6 py-2 rounded-full shadow transition hover:bg-blue-700 font-semibold';
  btnGroup.appendChild(btnConnexion);

  const btnInscription = document.createElement('button');
  btnInscription.textContent = "Inscription";
  btnInscription.className = 'bg-gray-200 text-blue-700 px-6 py-2 rounded-full shadow transition hover:bg-blue-300 font-semibold';
  btnGroup.appendChild(btnInscription);

  card.appendChild(btnGroup);

  // Formulaires
  const formConnexion = document.createElement('form');
  formConnexion.className = 'w-full flex flex-col gap-5';

  const phoneInputConnexion = document.createElement('input');
  phoneInputConnexion.type = 'text';
  phoneInputConnexion.placeholder = 'Numéro de téléphone';
  phoneInputConnexion.className = 'border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition';
  formConnexion.appendChild(phoneInputConnexion);

  const errorPhoneConnexion = document.createElement('div');
  errorPhoneConnexion.className = 'text-red-500 text-xs min-h-[18px]';
  formConnexion.appendChild(errorPhoneConnexion);

  const submitConnexion = document.createElement('button');
  submitConnexion.type = 'submit';
  submitConnexion.textContent = "Se connecter";
  submitConnexion.className = 'bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-semibold transition';
  formConnexion.appendChild(submitConnexion);

  // Formulaire inscription
  const formInscription = document.createElement('form');
  formInscription.className = 'w-full flex flex-col gap-5 hidden';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Nom';
  nameInput.className = 'border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition';
  formInscription.appendChild(nameInput);

  const errorName = document.createElement('div');
  errorName.className = 'text-red-500 text-xs min-h-[18px]';
  formInscription.appendChild(errorName);

  const phoneInputInscription = document.createElement('input');
  phoneInputInscription.type = 'text';
  phoneInputInscription.placeholder = 'Numéro de téléphone';
  phoneInputInscription.className = 'border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition';
  formInscription.appendChild(phoneInputInscription);

  const errorPhoneInscription = document.createElement('div');
  errorPhoneInscription.className = 'text-red-500 text-xs min-h-[18px]';
  formInscription.appendChild(errorPhoneInscription);

  const submitInscription = document.createElement('button');
  submitInscription.type = 'submit';
  submitInscription.textContent = "S'inscrire";
  submitInscription.className = 'bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-semibold transition';
  formInscription.appendChild(submitInscription);

  // Gestion affichage
  btnConnexion.onclick = (e) => {
    e.preventDefault();
    formConnexion.classList.remove('hidden');
    formInscription.classList.add('hidden');
    btnConnexion.className = 'bg-blue-600 text-white px-6 py-2 rounded-full shadow transition hover:bg-blue-700 font-semibold';
    btnInscription.className = 'bg-gray-200 text-blue-700 px-6 py-2 rounded-full shadow transition hover:bg-blue-300 font-semibold';
    // Reset errors
    errorPhoneConnexion.textContent = '';
    errorName.textContent = '';
    errorPhoneInscription.textContent = '';
  };
  btnInscription.onclick = (e) => {
    e.preventDefault();
    formConnexion.classList.add('hidden');
    formInscription.classList.remove('hidden');
    btnConnexion.className = 'bg-gray-200 text-blue-700 px-6 py-2 rounded-full shadow transition hover:bg-blue-300 font-semibold';
    btnInscription.className = 'bg-blue-600 text-white px-6 py-2 rounded-full shadow transition hover:bg-blue-700 font-semibold';
    // Reset errors
    errorPhoneConnexion.textContent = '';
    errorName.textContent = '';
    errorPhoneInscription.textContent = '';
  };

  // Soumission connexion
  formConnexion.onsubmit = async (e) => {
    e.preventDefault();
    errorPhoneConnexion.textContent = '';
    const phone = phoneInputConnexion.value.trim();
    if (!phone) {
      errorPhoneConnexion.textContent = "Le numéro est requis.";
      return;
    }
    const user = await getUserByPhone(phone);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (onLogin) onLogin(user);
      window.dispatchEvent(new Event('loginSuccess'));
    } else {
      errorPhoneConnexion.textContent = "Numéro inconnu. Veuillez vous inscrire.";
    }
  };

  // Soumission inscription
  formInscription.onsubmit = async (e) => {
    e.preventDefault();
    errorName.textContent = '';
    errorPhoneInscription.textContent = '';
    const name = nameInput.value.trim();
    const phone = phoneInputInscription.value.trim();
    let hasError = false;
    if (!name) {
      errorName.textContent = "Le nom est requis.";
      hasError = true;
    }
    if (!phone) {
      errorPhoneInscription.textContent = "Le numéro est requis.";
      hasError = true;
    }
    if (hasError) return;
    let user = await getUserByPhone(phone);
    if (user) {
      errorPhoneInscription.textContent = "Ce numéro existe déjà. Veuillez vous connecter.";
      return;
    }
    user = await addUser({ name, phone });
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (onLogin) onLogin(user);
    window.dispatchEvent(new Event('loginSuccess'));
  };

  card.appendChild(formConnexion);
  card.appendChild(formInscription);

  // Afficher connexion par défaut
  formConnexion.classList.remove('hidden');
  formInscription.classList.add('hidden');

  container.appendChild(card);
  return container;
}