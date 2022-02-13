import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Error404 from './Error404';

export default function BlogDetails() {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  let isMounted = true;

  const fetchData = async () => {
    const res = await fetch(`https://api.spaceflightnewsapi.net/v3/blogs/${params.id}`);
    if (!res.ok) throw await res.json();
    const data = await res.json();
    if (isMounted) {
      setBlog(data);
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchData().catch(err => {
      setError({
        status: err.statusCode,
        message: err.message
      });
      setLoading(false);
    });
    return () => isMounted = false;
  }, []);

  if (error) {
    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Error404 status={`${error.status}`} message={`${error.message}`} />
        )}
      </>
    );
  }

  return (
    <section>
      <h1>Blog Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article>
          <h2>{blog.title}</h2>
          <img src={blog.imageUrl} alt={blog.title} style={{ width: '25rem', height: '25rem' }} />
          <p>{blog.summary}</p>
          <p>Site : {blog.newsSite}</p>
          <p>Published At :
            <time>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(blog.publishedAt))}</time>
          </p>
          <p>Updated At :
            <time>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(blog.updatedAt))}</time>
          </p>
          <a href={`${blog.url}`} target="_blank">Reference</a>
        </article>
      )}
    </section>
  );
};