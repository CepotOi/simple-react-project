import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Error404 from './Error404';

export default function BlogDetails() {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const isMounted = useRef(true);

  useEffect(() => {
    document.title = 'Blog Details';

    const fetchData = async () => {
      const res = await fetch(`https://api.spaceflightnewsapi.net/v3/blogs/${params.id}`);
      if (!res.ok) throw new Error('Could not fetch blogs');
      const data = await res.json();
      if (isMounted.current) {
        setBlog(data);
        setLoading(false);
        setError(null);
      }
    };

    fetchData().catch(err => {
      setError({
        status: 404,
        message: err.message
      });
      setLoading(false);
    });

    return () => isMounted.current = false;
  }, [params]);

  if (error) {
    return (
      <section className="section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Error404 status={`${error.status}`} message={`${error.message}`} />
        )}
      </section>
    );
  }

  return (
    <section className="section">
      <h1>Blog Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article className="article">
          <h2>{blog.title}</h2>
          <img src={blog.imageUrl} alt={blog.title} className="article-image" />
          <p>{blog.summary}</p>
          <p>Site : {blog.newsSite}</p>
          <p>Published At :
            &nbsp;<time>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(blog.publishedAt))}</time>
          </p>
          <p>Updated At :
            &nbsp;<time>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(blog.updatedAt))}</time>
          </p>
          <a href={`${blog.url}`} target="_blank" rel="noreferrer">Source</a>
        </article>
      )}
    </section>
  );
};