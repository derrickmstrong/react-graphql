const RepoHeader = () => {
    const styles = {
      fontSize: '.75em',
      fontWeight: 'bold',
    };

  return (
    <ul className='list-group list-group-flush'>
      <li className='list-group-item'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex flex-column' style={styles}>
            REPOS
          </div>
          <div className='text-nowrap ms-3'>
            {/* <span className='px-1 py-1 ms-1 d-inline-block' style={styles}>
              LICENSES
            </span> */}
            <span className='px-1 py-1 ms-1 d-inline-block' style={styles}>
              LIVE
            </span>
            <span className='px-1 py-1 ms-1 d-inline-block' style={styles}>
              SUBSCRIBED
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default RepoHeader