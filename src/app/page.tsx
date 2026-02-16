import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">Home Page</h2>
      <Link href="/tickets">Go to tickets</Link>
    </div>
  );
};

export default HomePage;
