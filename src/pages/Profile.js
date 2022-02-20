import { useEffect } from "react";

export default function Profile() {

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <section className="section">
      <h1>Profile</h1>
      <p>My name is Rizki Hutama, i'm a junior web developer</p>
    </section>
  );
}