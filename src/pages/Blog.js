import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error404 from './Error404';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  //* cara kedua
  let isMounted = true;

  const fetchData = async () => {
    const res = await fetch('https://api.spaceflightnewsapi.net/v3/blogs');
    if (!res.ok) throw new Error('Could not fetch blogs');
    const data = await res.json();
    if (isMounted) {
      setBlogs(data);
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchData().catch(err => {
      setError({
        status: 404,
        message: err.message
      });
      setLoading(false);
    });

    return () => isMounted = false;
  }, []);

  return (
    <section>
      <h1>Blog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article>
          {error && <Error404 status={`${error.status}`} message={`${error.message}`} />}
          {blogs.map(blog => (
            <div key={blog.id}>
              <h2><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></h2>
              <time>{new Date(blog.publishedAt).toLocaleDateString()}</time>
            </div>
          ))}
        </article>
      )}
    </section>
  );
}