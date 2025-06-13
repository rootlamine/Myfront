import { getUserByPhone, addUser } from '../services/userService.js';

export default function createLoginPage(onLogin) {
  const container = document.createElement('div');
  container.className = 'flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-[#DCF8C6] via-[#ECE5DD] to-[#128C7E]'; // Dégradé vert WhatsApp

  // Card
  const card = document.createElement('div');
  card.className = 'bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md';

  // Logo ou titre
  const logo = document.createElement('div');
  logo.className = 'mb-6 text-xl font-extrabold text-[#128C7E] tracking-tight'; // Vert foncé WhatsApp
  logo.textContent = 'BIENVENU sur DIOTAYWI';
  card.appendChild(logo);

  // Choix Connexion / Inscription
  const btnGroup = document.createElement('div');
  btnGroup.className = 'flex gap-4 mb-8 w-full justify-center';

  const btnConnexion = document.createElement('button');
  btnConnexion.textContent = "Connexion";
  btnConnexion.className = 'bg-[#25D366] text-white px-6 py-2 rounded-full shadow transition hover:bg-[#128C7E] font-semibold'; // Vert principal WhatsApp
  btnGroup.appendChild(btnConnexion);

  const btnInscription = document.createElement('button');
  btnInscription.textContent = "Inscription";
  btnInscription.className = 'bg-[#ECE5DD] text-[#128C7E] px-6 py-2 rounded-full shadow transition hover:bg-[#25D366] hover:text-white font-semibold'; // Gris clair WhatsApp
  btnGroup.appendChild(btnInscription);

  card.appendChild(btnGroup);

  // Formulaires
  const formConnexion = document.createElement('form');
  formConnexion.className = 'w-full flex flex-col gap-5';

  const phoneInputConnexion = document.createElement('input');
  phoneInputConnexion.type = 'text';
  phoneInputConnexion.placeholder = 'Numéro de téléphone';
  phoneInputConnexion.className = 'border border-[#ECE5DD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] transition'; // Bordure et focus WhatsApp
  formConnexion.appendChild(phoneInputConnexion);

  const errorPhoneConnexion = document.createElement('div');
  errorPhoneConnexion.className = 'text-red-500 text-xs min-h-[18px]';
  formConnexion.appendChild(errorPhoneConnexion);

  const submitConnexion = document.createElement('button');
  submitConnexion.type = 'submit';
  submitConnexion.textContent = "Se connecter";
  submitConnexion.className = 'bg-[#25D366] text-white px-4 py-2 rounded-lg shadow hover:bg-[#128C7E] font-semibold transition'; // Vert WhatsApp
  formConnexion.appendChild(submitConnexion);

  // Formulaire inscription
  const formInscription = document.createElement('form');
  formInscription.className = 'w-full flex flex-col gap-5 hidden';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Nom';
  nameInput.className = 'border border-[#ECE5DD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] transition'; // Bordure et focus WhatsApp
  formInscription.appendChild(nameInput);

  const errorName = document.createElement('div');
  errorName.className = 'text-red-500 text-xs min-h-[18px]';
  formInscription.appendChild(errorName);

  const phoneInputInscription = document.createElement('input');
  phoneInputInscription.type = 'text';
  phoneInputInscription.placeholder = 'Numéro de téléphone';
  phoneInputInscription.className = 'border border-[#ECE5DD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] transition'; // Bordure et focus WhatsApp
  formInscription.appendChild(phoneInputInscription);

  const errorPhoneInscription = document.createElement('div');
  errorPhoneInscription.className = 'text-red-500 text-xs min-h-[18px]';
  formInscription.appendChild(errorPhoneInscription);

  const submitInscription = document.createElement('button');
  submitInscription.type = 'submit';
  submitInscription.textContent = "S'inscrire";
  submitInscription.className = 'bg-[#25D366] text-white px-4 py-2 rounded-lg shadow hover:bg-[#128C7E] font-semibold transition'; // Vert WhatsApp
  formInscription.appendChild(submitInscription);

  // Gestion affichage
  btnConnexion.onclick = (e) => {
    e.preventDefault();
    formConnexion.classList.remove('hidden');
    formInscription.classList.add('hidden');
    btnConnexion.className = 'bg-[#25D366] text-white px-6 py-2 rounded-full shadow transition hover:bg-[#128C7E] font-semibold';
    btnInscription.className = 'bg-[#ECE5DD] text-[#128C7E] px-6 py-2 rounded-full shadow transition hover:bg-[#25D366] hover:text-white font-semibold';
    // Reset errors
    errorPhoneConnexion.textContent = '';
    errorName.textContent = '';
    errorPhoneInscription.textContent = '';
  };
  
  btnInscription.onclick = (e) => {
    e.preventDefault();
    formConnexion.classList.add('hidden');
    formInscription.classList.remove('hidden');
    btnConnexion.className = 'bg-[#ECE5DD] text-[#128C7E] px-6 py-2 rounded-full shadow transition hover:bg-[#25D366] hover:text-white font-semibold';
    btnInscription.className = 'bg-[#25D366] text-white px-6 py-2 rounded-full shadow transition hover:bg-[#128C7E] font-semibold';
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