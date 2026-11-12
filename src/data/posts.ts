import axios, { isAxiosError } from 'axios';

export type RemotePost = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type NewPost = Omit<RemotePost, 'id'>;

const postsEndpoint = 'https://6af3f9fe55a1de7dcf03745a.mockapi.io/api/products/items';
// The instructor's demo records use IDs 1-13; app-created posts start after them.
const firstUserPostId = 14;

function isRemotePost(value: unknown): value is RemotePost {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const post = value as Record<string, unknown>;
  return (
    typeof post.id === 'string' &&
    typeof post.name === 'string' &&
    typeof post.description === 'string' &&
    typeof post.image === 'string'
  );
}

function rethrowRequestError(action: string, error: unknown): never {
  if (!isAxiosError(error)) {
    throw error;
  }

  const status = error.response?.status;
  throw new Error(
    status
      ? `Unable to ${action} (HTTP ${status}).`
      : `Unable to ${action}: ${error.message}`
  );
}

export async function fetchRemotePosts(): Promise<RemotePost[]> {
  let data: unknown;
  try {
    ({ data } = await axios.get<unknown>(postsEndpoint));
  } catch (error: unknown) {
    rethrowRequestError('load posts', error);
  }

  if (!Array.isArray(data) || !data.every(isRemotePost)) {
    throw new Error('The posts service returned an invalid response.');
  }

  return [...data]
    .filter((post) => Number(post.id) >= firstUserPostId && post.image.trim().length > 0)
    .sort((a, b) => Number(b.id) - Number(a.id));
}

export async function createRemotePost(post: NewPost): Promise<void> {
  try {
    await axios.post(postsEndpoint, post);
  } catch (error: unknown) {
    rethrowRequestError('create post', error);
  }
}

export async function deleteRemotePost(id: string): Promise<void> {
  try {
    await axios.delete(`${postsEndpoint}/${encodeURIComponent(id)}`);
  } catch (error: unknown) {
    rethrowRequestError('delete post', error);
  }
}
