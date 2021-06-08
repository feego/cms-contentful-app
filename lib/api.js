const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
relatedPost {
  title
  slug
  excerpt
  date
}
excerpt
content {
  json
}
`;

const POST_1_QUERY = `
{
  pagePostCollection(where: {slug: "post-1"}) {
    items {
      sys {
        id
      }
      contentfulMetadata {
        tags {
          name
        }
      }
      title
      componentsCollection(limit: 50) {
        items {
          __typename
          ... on PagePost {
            name
            title
          }
          ... on Author {
            name
            picture {
              title
              url
            }
          }
          ... on Text {
            name
            text {
              json
            }
          }
          ... on Image {
            name
            image {
              url
            }
          }
        }
      }
    }
  }
}
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return extractPostEntries(entries);
}

export async function getPage1(preview) {
  const entries = await fetchGraphQL(
    `{
      pagePostCollection(where: {slug: "post-1"}, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          name
          title
          coverImage {
            url
          }
          date
          author {
            name
            picture {
              url
            }
          }
          content {
            json
          }
          componentsCollection(limit: 10) {
            items {
              __typename
              ... on PagePost {
                name
                title
                coverImage {
                  url
                }
                date
                author {
                  name
                  picture {
                    url
                  }
                }
                content {
                  json
                }
              }
              ... on Author {
                name
                picture {
                  title
                  url
                }
              }
              ... on Text {
                name
                text {
                  json
                }
              }
              ... on Image {
                name
                image {
                  url
                }
              }
            }
          }
        }
      }
    }`,
    preview
  );
  return entries?.data?.pagePostCollection?.items?.[0];
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}
