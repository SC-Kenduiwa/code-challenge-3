// Function to fetch films from the server
async function fetchFilms() {
    const response = await fetch('http://localhost:3000/films');
    const films = await response.json();
    return films;
}

// Function to add a new film
async function addFilm(filmData) {
    const response = await fetch('http://localhost:3000/films', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
    });
    const newFilm = await response.json();
    return newFilm;
}

// Function to update an existing film
async function updateFilm(id, updatedData) {
    const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    const updatedFilm = await response.json();
    return updatedFilm;
}

// Function to delete a film
async function deleteFilm(id) {
    const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}

// Example usage:
(async () => {
    // Fetch films
    const films = await fetchFilms();
    console.log('Films:', films);

    // Add a new film
    const newFilmData = {
        title: 'New Film',
        director: 'New Director'
        // Add other properties as needed
    };
    const newFilm = await addFilm(newFilmData);
    console.log('New Film:', newFilm);

    // Update an existing film (assuming there's a film with ID 1)
    const filmIdToUpdate = 1;
    const updatedData = {
        title: 'Updated Title',
        director: 'Updated Director'
        // Update other properties as needed
    };
    const updatedFilm = await updateFilm(filmIdToUpdate, updatedData);
    console.log('Updated Film:', updatedFilm);

    // Delete a film (assuming there's a film with ID 2)
    const filmIdToDelete = 2;
    const deletionSuccessful = await deleteFilm(filmIdToDelete);
    console.log('Deletion Successful:', deletionSuccessful);
})();