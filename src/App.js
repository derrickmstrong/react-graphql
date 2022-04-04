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
      body: JSON.stringify(githubQuery()),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { name } = data.data.viewer;
        const { edges } = data.data.search;
        console.log(edges.map(({node}) => node.name ))
        setState({
          name: name,
          repoList: edges
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
      <ul className='list-group list-group-flush'>
        {state.repoList && state.repoList.map(({node}) => {
          return (
            <li key={node.id} className='list-group-item'>
              <a href={node.url} className='h5 mb-0 text-decoration-none'>{node.name}</a>
              {node.description && <p className="small">{node.description}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
