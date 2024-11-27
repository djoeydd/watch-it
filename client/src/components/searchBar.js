import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?_limit=10`
        );
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="relative bg-transparent pt-7 w-3/5">
        <input
          type="search"
          placeholder="Search..."
          className="w-full h-9 px-3 rounded-2xl text-white bg-gray-800 focus:outline-purple-800 z-50 max-w-200 align-middle"
        />
      </div>
    </>
  );
};

export default Search;
