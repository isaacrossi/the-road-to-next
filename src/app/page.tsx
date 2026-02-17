import Link from "next/link";
import { ticketsPath } from "@/src/paths";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">Home Page</h2>
      <Link href={ticketsPath()}>Go to tickets</Link>
    </div>
  );
};

export default HomePage;
