import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiMessage, setApiMessage] = useState('Chargement de l\'API...');
  const [dbMessage, setDbMessage] = useState('Test de la BDD en cours...');

  useEffect(() => {
    // 1. Déclaration de la fonction asynchrone pour l'API
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setApiMessage(data.message);
      } catch (error) {
        console.error('Erreur API:', error);
        setApiMessage('Erreur : Impossible de joindre le Backend.');
      }
    };

    // 2. Déclaration de la fonction asynchrone pour la BDD
    const fetchDbStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/db-test');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setDbMessage(data.success || data.error);
      } catch (error) {
        console.error('Erreur BDD:', error);
        setDbMessage('Erreur : Impossible de tester la BDD.');
      }
    };

    // 3. Exécution immédiate et en parallèle
    fetchBackendStatus();
    fetchDbStatus();
  }, []); // Le tableau vide garantit une seule exécution au montage

  return (
    <div className="App">
      <h1>🚀 Stack Fullstack Docker</h1>
      
      <div className="card">
        <h2>Message du Backend Node.js :</h2>
        <p style={{ color: '#646cff', fontWeight: 'bold' }}>{apiMessage}</p>
      </div>

      <div className="card">
        <h2>Statut MySQL :</h2>
        <p style={{ color: dbMessage.includes('succès') ? 'green' : 'red', fontWeight: 'bold' }}>
          {dbMessage}
        </p>
      </div>

      <p className="read-the-docs">
        Modifie ce texte dans <code>src/App.jsx</code> et sauvegarde pour tester le Hot Reload du Frontend !
      </p>
    </div>
  );
}

export default App;