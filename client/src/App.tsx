import { Link } from 'react-router-dom';
import './App.css';

function App() {
  // Todo: add favicon
  return (
    <div className="w-full h-full">
      <h1 className="">Reading Room Sections</h1>
      <Link
        to="/books"
        className="bg-blue-600 text-white p-2 rounded-md"
        data-discover="true"
      >
        Books
      </Link>
      <Link
        to="/magazines"
        className="bg-blue-600 text-white p-2 rounded-md"
        data-discover="true"
      >
        Magazines
      </Link>
    </div>
  );
}

export default App;
