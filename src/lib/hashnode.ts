export interface HashnodePost {
    title: string;
    slug: string;
    brief: string;
    coverImage?: {
        url: string;
    };
    publishedAt: string;
    content: {
        html: string;
    };
    tags?: {
        name: string;
        slug: string;
    }[];
}

interface HashnodeResponse {
    data: {
        publication: {
            posts: {
                edges: {
                    node: HashnodePost;
                }[];
            };
            post?: HashnodePost;
        };
    };
}

// Function to fetch all posts for the blog index
export async function getHashnodePosts(host: string): Promise<HashnodePost[]> {
    const query = `
    query GetPublicationPosts($host: String!) {
      publication(host: $host) {
        posts(first: 20) {
          edges {
            node {
              title
              slug
              brief
              publishedAt
              coverImage {
                url
              }
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch('https://gql.hashnode.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { host },
        }),
    });

    const body = await response.json() as HashnodeResponse;

    if (!body.data?.publication?.posts?.edges) {
        console.error("Failed to fetch Hashnode posts:", JSON.stringify(body));
        return [];
    }

    return body.data.publication.posts.edges.map(edge => edge.node);
}

// Function to fetch a single individual post by its slug
export async function getHashnodePost(host: string, slug: string): Promise<HashnodePost | null> {
    const query = `
    query GetPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          slug
          brief
          publishedAt
          content {
            html
          }
          coverImage {
            url
          }
          tags {
            name
            slug
          }
        }
      }
    }
  `;

    const response = await fetch('https://gql.hashnode.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { host, slug },
        }),
    });

    const body = await response.json() as HashnodeResponse;
    return body.data?.publication?.post || null;
}
