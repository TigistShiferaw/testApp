import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Results = () => {
  const { restaurants, status, error } = useSelector(
    (state: RootState) => state.restaurants
  );

  if (status === 'loading') {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-5 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-5 max-w-4xl mx-auto">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-bold">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.cuisine}</p>
          <p>{restaurant.address.street}, {restaurant.address.building}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
