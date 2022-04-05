import { useCallback, useEffect, useState } from 'react';
import { githubDB } from './db';
import { githubQuery } from './query';
import RepoInfo from './components/RepoInfo';
import SearchBar from './components/SearchBar';
import RepoHeader from './components/RepoHeader';

function App() {
  const [state, setState] = useState({
    name: '',
    repoList: [],
    total: 0,
  });
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString));
    fetch(githubDB.baseURL, {
      method: 'POST',
      headers: githubDB.headers,
      body: queryText,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { name } = data.data.viewer;
        const { nodes, repositoryCount } = data.data.search;
        setState({
          name: name,
          repoList: nodes,
          total: repositoryCount,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { name, repoList, total } = state;

  return (
    <div className='container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>Repos
      </h1>
      <p>{name}</p>
      <SearchBar
        search={queryString}
        count={pageCount}
        onSearchChange={setQueryString}
        onCountChange={setPageCount}
        total={total}
      />
      <RepoHeader />
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map(list => {
            return <RepoInfo key={list.id} repo={list} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
