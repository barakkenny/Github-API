import React from "react";
import "./SearchBar.css";

function SearchBar({setSearchRepo }) {
  

  return (
    <section className="search__content">
      <input
        className="search"
        type="text"
        onChange={(e) => setSearchRepo(e.target.value)}
        placeholder="Search Repo"
      />


    </section>
  );
}

export default SearchBar;