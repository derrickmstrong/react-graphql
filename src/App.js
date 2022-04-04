import { useCallback, useEffect, useState } from 'react';
import { githubDB } from './db';
import { githubQuery } from './query'

function App() {
  const [state, setState] = useState({
    name: '',
    repoList: [],
  })
  const fetchData = useCallback(() => { 
    fetch(githubDB.baseURL, {
      method: 'POST',
      headers: githubDB.headers,
      body: JSON.stringify(githubQuery),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { name, repositories } = data.data.viewer;
        setState({
          name: name,
          repoList: repositories.nodes
        });
      })
      .catch(err => {
        console.log(err);
      })
   }, [])

  useEffect(() => {
    fetchData()
  },[fetchData]);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>Repos
      </h1>
      <p>{state.name}</p>
      <ul>
        {state.repoList.map(({id, name, url}) => {
          return (
            <li key={id}>{name} - {url}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
