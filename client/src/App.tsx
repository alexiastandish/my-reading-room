import { Link } from 'react-router-dom';
import './App.css';

function App() {
  // Todo: add favicon
  return (
    <div className="w-full h-full">
      <h1 className="">Reading Room Sections</h1>
      <Link to={'/books'}>
        <button className="bg-blue-500 text-white p-2 rounded-md">Books</button>
      </Link>
      <Link to={'/magazines'}>
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Magazines
        </button>
      </Link>
    </div>
  );
}

export default App;
