export default function RepoInfo({ repo }) {
  let license;
  switch (repo.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span
          className='px-1 py-1 ms-1 d-inline-block btn btn-sm btn-danger'
          style={{ fontSize: '.75em' }}
        >
          NO LICENSE
        </span>
      );
      break;
    case 'NOASSERTION':
      license = (
        <span
          className='px-1 py-1 ms-1 d-inline-block btn btn-sm btn-warning'
          style={{ fontSize: '.75em' }}
        >
          NO ASSERTION
        </span>
      );
      break;
    default:
      license = (
        <span
          className='px-1 py-1 ms-1 d-inline-block btn btn-sm btn-outline-success'
          style={{ fontSize: '.75em' }}
        >
          {repo.licenseInfo?.spdxId}
        </span>
      );
  }
  return (
    <li className='list-group-item'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex flex-column'>
          <a
            href={repo.url}
            target='_blank'
            rel='noreferrer'
            className='h5 mb-0 text-decoration-none'
          >
            {repo.name}
          </a>
          {repo.description && <p className='small'>{repo.description}</p>}
        </div>
        <div className='text-nowrap ms-3'>
          {/* {license} */}
          {repo.homepageUrl && (
            <a
              href={repo.homepageUrl}
              target='_blank'
              rel='noreferrer'
              className='px-1 py-1 ms-1 d-inline-block btn btn-primary'
              style={{ fontSize: '0.75em' }}
            >
              LIVE
            </a>
          )}
          <span
            className={
              'px-1 py-1 ms-1 d-inline-block btn ' +
              (repo.viewerSubscription === 'SUBSCRIBED'
                ? 'btn-success'
                : 'btn-outline-secondary')
            }
            style={{ fontSize: '0.75em' }}
          >
            {repo.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
}
