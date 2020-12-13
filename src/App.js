import React, {useState, useEffect} from 'react';

import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  },[]);

  async function handleAddRepository() {  
    const response = await api.post("repositories",
    {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"]      
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {

    console.log(id);

    const status = await (await api.delete(`repositories/${id}`)).status;

    if (status === 204) {
    
      const index = repositories.findIndex(repositorie => repositorie.id === id);

      repositories.splice(index,1);

      setRepositories([...repositories]);
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>       
        
        </li>)}         
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
