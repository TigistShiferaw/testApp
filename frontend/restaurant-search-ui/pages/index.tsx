import type { NextPage } from 'next';
import Search from '../components/Search';
import Results from '../components/Results';

const Home: NextPage = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl text-center">Restaurant Search</h1>
      <Search />
      <Results />
    </div>
  );
};

export default Home;
