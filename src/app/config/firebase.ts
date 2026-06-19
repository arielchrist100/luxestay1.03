import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Fonction helper pour accéder aux variables d'environnement de manière sûre
const getEnvVar = (key: string, defaultValue: string): string => {
  try {
    // @ts-ignore - import.meta.env peut ne pas être disponible dans tous les environnements
    return import.meta?.env?.[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Configuration Firebase
// Pour la production, configurez ces valeurs dans votre fichier .env
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyDemo-KeyForDevelopment'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'demo-project.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'demo-project'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'demo-project.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '123456789'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:123456789:web:abc123def456')
};

let app;
let auth;

try {
  // Initialiser Firebase
  app = initializeApp(firebaseConfig);
  // Initialiser Firebase Auth
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // Créer des objets mock pour éviter les crashes
  app = {} as any;
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
  } as any;
}

export { auth };
export default app;
