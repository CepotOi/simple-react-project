import { useEffect } from "react";

export default function Contact() {

  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <section className="section">
      <h1>Contact</h1>
      <div>
        <p>Email : <a href="mailto:rizkihutama05@gmail.com">My Email</a></p>
        <p>Github pages : <a href="https://cepotoi.github.io" target="_blank" rel="noreferrer">My Portfolio</a></p>
      </div>
    </section>
  );
}