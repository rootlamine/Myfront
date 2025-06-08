import { getUserByPhone } from '../services/api.js';

// Conteneur principal pour centrer le formulaire
const container = document.createElement('div');
// container.className = 'flex items-center justify-center min-h-screen bg-blue-600';
container.className = 'flex items-center justify-center min-h-screen w-screen bg-oklch(0.917 0.08 205.041)';


const form = document.createElement('form');
form.className = 'w-full max-w-2xl p-16 bg-white rounded-2xl shadow-2xl animate-fade-in'; // largeur et padding augmentés

// Titre
const h1 = document.createElement('h1');
h1.className = 'text-4xl font-bold text-center mb-8 text-blue-700';
h1.textContent = 'Connexion';
form.appendChild(h1);

// Bloc input
const divInput = document.createElement('div');
divInput.className = 'mb-6';

const label = document.createElement('label');
label.className = 'block text-gray-700 mb-2';
label.setAttribute('for', 'phone');
label.textContent = 'Numéro de téléphone';

const input = document.createElement('input');
input.id = 'phone';
input.name = 'phone';
input.type = 'tel';
input.placeholder = 'Entrez votre numéro de téléphone'; 
input.required = true;
input.className = 'w-full px-6 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg';

divInput.appendChild(label);
divInput.appendChild(input);
form.appendChild(divInput);

// Bouton
const button = document.createElement('button');
button.type = 'submit';
button.className = 'w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold';
button.textContent = 'Se connecter';
form.appendChild(button);

// Message d'erreur
const errorMsg = document.createElement('p');
errorMsg.id = 'errorMsg';
errorMsg.className = 'text-red-600 mt-4 text-center hidden';
form.appendChild(errorMsg);

// Ajoute une animation simple
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`;
document.head.appendChild(style);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = input.value.trim();
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');

  const user = await getUserByPhone(phone);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Dispatch l'événement pour signaler la connexion réussie
    const event = new Event('loginSuccess');
    window.dispatchEvent(event);
  } else {
    errorMsg.textContent = 'Utilisateur non trouvé.';
    errorMsg.classList.remove('hidden');
  }
});

container.appendChild(form);

export default container;
