import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <section className="section">
      <h1>Wellcome</h1>
      <p>This web is build with ReactJs</p>
    </section>
  );
}