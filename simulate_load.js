const axios = require('axios');

// Configuration
const API_URL = process.env.API_URL || "http://localhost:1337/api/articles";
const TOTAL_REQUESTS = process.env.TOTAL_REQUESTS || 10000;

// Fonction pour créer une ressource
async function createRequest() {
  try {
    const response = await axios.post(API_URL, {
      data: { Title: 'New Article', Body: 'Lorem Ipsum' }
    });

    console.log('Create Request Response:', response.data);
  } catch (error) {
    console.error('Error in create request:', error.message);
  }
}

// Fonction pour lire une ressource
async function readRequest() {
  try {
    const response = await axios.get(API_URL);

    console.log('Read Request Response:', response.data);
  } catch (error) {
    console.error('Error in read request:', error.message);
  }
}

// Fonction pour mettre à jour une ressource
async function updateRequest() {
  try {
    const articles = await axios.get(API_URL);
    const articleToUpdate = articles.data.data[0];

    if (articleToUpdate) {
      // Adaptation de la structure des données pour la mise à jour
      const response = await axios.put(`${API_URL}/${articleToUpdate.id}`, {
        data: { Title: 'Updated Article', Body: 'New Content' }
      });

      console.log('Update Request Response:', response.data);
    } else {
      console.error('No articles found for update');
    }
  } catch (error) {
    console.error('Error in update request:', error.message);
  }
}


// Fonction pour supprimer une ressource
async function deleteRequest() {
  try {
    const articles = await axios.get(API_URL);
    const articleToDelete = articles.data.data[0];

    if (articleToDelete) {
      const response = await axios.delete(`${API_URL}/${articleToDelete.id}`);

      console.log('Delete Request Response:', response.data);
    } else {
      console.error('No articles found for delete');
    }
  } catch (error) {
    console.error('Error in delete request:', error.message);
  }
}

// Boucle pour envoyer les requêtes en alternance
async function simulateLoad() {
  for (let i = 1; i<=Number(TOTAL_REQUESTS); i++) {
    switch (i % 4) {
      case 0:
        await createRequest();
        break;
      case 1:
        await readRequest();
        break;
      case 2:
        await updateRequest();
        break;
      case 3:
        await deleteRequest();
        break;
    }

    console.log(`Request ${i} sent`);
  }

  console.log('Load simulation completed');
}

// Appel de la fonction principale
simulateLoad();
