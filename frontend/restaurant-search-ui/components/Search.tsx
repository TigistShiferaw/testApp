import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchRestaurants } from '../features/restaurantsSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchRestaurants(query));
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-400 rounded"
        placeholder="Search for cuisine, name, or street"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
