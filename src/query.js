export const githubQuery = (
  pageCount,
  queryString="react",
  paginationKeyword,
  paginationString
) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(
        first: 20
        query: "${queryString} user:derrickmstrong sort:updated-desc"
        type: REPOSITORY
      ) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              viewerSubscription
              licenseInfo {
                spdxId
              }
            }
          }
        }
      }
    }
  `,
  };
};