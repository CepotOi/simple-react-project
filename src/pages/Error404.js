export default function Error404(error) {
  return (
    <>
      <h2 style={{ color: 'red' }}>Error : {error.status}</h2>
      <h3>{error.message}</h3>
    </>
  );
}