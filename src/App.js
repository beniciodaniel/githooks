import React, { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([])
   
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/beniciodaniel/repos")
      const data = await response.json()
      setRepositories(data)
    }    
    fetchData()
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos!`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <>
      <ul>
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.name}
              {repository.favorite && <span>(Favorito)</span>}
              <button onClick={() => handleFavorite(repository.id)}>Favoritar</button>
            </li>
          )
        }
      </ul>
    </>
  );
}

export default App;
