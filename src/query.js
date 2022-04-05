export const githubQuery = (
  pageCount,
  queryString="",
  // paginationKeyword,
  // paginationString
) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(
        first: ${pageCount}
        query: "${queryString} user:derrickmstrong sort:updated-desc"
        type: REPOSITORY
      ) {
        repositoryCount
        nodes {
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
  `,
  };
};