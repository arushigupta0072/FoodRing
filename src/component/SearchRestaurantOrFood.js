import { useState } from "react";
import Shimmer from "./Shimmer";

const SearchRestaurantOrFood = ({ getFilterRestaurants }) => {
  const [searchText, setSearchtext] = useState("");

  const filterRestaurants = (e) => {

      console.log(e);
      getFilterRestaurants(searchText);
    
  };

  return (
    <div className="search-container">
      <input
        placeholder="🔎 &nbsp;Search for restaurant, cusinie or a dish"
        className="search-input"
        onChange={(e) => setSearchtext(e.target.value)}
        onKeyUp={filterRestaurants}
      />
    </div>
  );
};

export default SearchRestaurantOrFood;
