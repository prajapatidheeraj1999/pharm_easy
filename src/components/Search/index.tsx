"use client"
import { useEffect, useState, useCallback, ChangeEventHandler } from 'react';
import axios from 'axios';
import { debounce } from '@/utils/debounce';
import Cart from '../Cart';
import { Product } from '../Cart/data';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);


  //fetching data from database
  const fetchResults = async (query: string, page: number) => {
    setLoading(true);
    try {
        console.log("fetch function is working")
      const response = await axios.get('https://dummyjson.com/products/search', {
        params: { q: query, limit: 10, skip: (page - 1) * 10 },
      });
      setResults((prevResults) => [...prevResults, ...response.data.products]);
      setHasMore(response.data.products.length > 0);
    } catch (err) {
      setError('Failed to fetch results');
    }
    setLoading(false);
  };


  useEffect(() => {
    if (page >= 1) {
      fetchResults(query, page);
    }

  }, [page, query]);

 
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 &&
      hasMore && !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


   //search functionality
   const handelSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPage(1);
    console.log("query",query,e.target.value,e)
      setResults([]);
      if (query.trim() !== '') {
        fetchResults(query, 1);
      }
  };
  const debouncedSearch = debounce(handelSearch, 300);
console.log("outer query",query)
  return (
    <div className="container mx-auto px-4">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full p-2 border rounded my-5"
        value={query}
        onChange={(e) =>{setQuery(e.target.value), debouncedSearch(e)}}
      />
      {error && <div className="text-red-500 p-4">{error}</div>}
      {results&& <Cart products={results}/>}
      {loading && <div className="text-center p-4">Loading...</div>}
      {!hasMore && !loading && <div className="text-center p-4">No more results</div>}
    </div>
  );
};

export default Search;
