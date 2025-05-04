import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-6">
      404 Not Found
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
