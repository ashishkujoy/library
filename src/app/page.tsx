const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Home() {
  await delay(10000); // Simulate a loading delay
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
