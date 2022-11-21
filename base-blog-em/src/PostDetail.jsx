import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ['postsComment', post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateTitleMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  if (isLoading) return <h3>Loading...</h3>;

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the Post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'purple' }}>Deleting the Post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post has (not) been deleted</p>
      )}
      <button onClick={() => updateTitleMutation.mutate(post.id)}>
        Update title
      </button>
      {updateTitleMutation.isLoading && (
        <p style={{ color: 'purple' }}>Update Title isLoading...</p>
      )}
      {updateTitleMutation.isError && (
        <p style={{ color: 'red' }}>Update Title Error!!</p>
      )}
      {updateTitleMutation.isSuccess && (
        <p style={{ color: 'green' }}>Update title succeeeded!!!</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
