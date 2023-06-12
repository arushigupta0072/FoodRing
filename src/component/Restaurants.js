import RestaurantItem from "./RestaurantItem";
import "../../style.css";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import SearchRestaurantOrFood from "./SearchRestaurantOrFood";
import { useState, useEffect } from "react";
import { RESTAURANTS_URL } from "../config";


const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const[sort,setSort]=useState("")
  const [sorts, setSorts] = useState([]);
  const [allRestaurant, setAllRestaurant] = useState([]);

  const getFilterRestaurants = (searchText) => {
    const data = allRestaurant?.filter((res) =>
      res.data.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(data);
    setRestaurants(data);
  };

  const sorting=(title)=>{

    setSort(title);
    console.log(sort)
    if(sort=="Cost: Low to High"){
      // setRestaurants([]);
      const sortdata=restaurants.sort(function(a,b){return ((a.data.costForTwo)-(b.data.costForTwo))})
      console.log(sortdata)
   
      setRestaurants(sortdata)
    }
    if(sort=="Cost: High to Low"){
      // setRestaurants([]);
      const sortdatas=restaurants.sort(function(a,b){return ((b.data.costForTwo)-(a.data.costForTwo))})
    
      setRestaurants(sortdatas);
    }
    if(sort=="Rating"){
      const rating=restaurants.sort(function(a,b){return((parseFloat(a.data.avgRating))-(parseFloat(b.data.avgRating)))})
      setRestaurants(rating);
    }
    if(sort=="Delivery Time"){
      const Time=restaurants.sort(function(a,b){return((parseFloat(a.data.maxDeliveryTime))-(parseFloat(b.data.maxDeliveryTime)))})
      setRestaurants(Time);
    }

    

  }

  const getRestaurants = async () => {
    const data = await fetch(RESTAURANTS_URL);
    const resturantsData = await data.json();
    console.log(resturantsData);
    setSorts(resturantsData?.data?.sorts);
    setRestaurants(resturantsData?.data?.cards[2]?.data?.data.cards);
    setAllRestaurant(resturantsData?.data?.cards[2]?.data?.data.cards);
    console.log(restaurants);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return restaurants.length > 0 ? (
    <>
      <SearchRestaurantOrFood getFilterRestaurants={getFilterRestaurants} />
      <div className="restaurants-container">
        <div className="restaurants">
          <h2 className="length">{restaurants.length} restaurants</h2>
          <div className="restaurants-sort">
            
            <form action="#"  className="round">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                className="sort-selection--style"
                onChange={(e)=>sorting(e.target.value)}
              >
                {sorts?.map((sort, index) => {
                  return (
                    <>
                    
                      <option value={`${sort.title}`}>{sort.title}</option>
                      
                      <option value="#" disabled></option>
                    </>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
        <div className="restaurant-container">
          {restaurants?.map((item) => {
            return (
              <Link to={"/restaurants/" + item.data.id} key={item.data.id}>
                <RestaurantItem {...item.data} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <Shimmer />
  );
};

export default Restaurants;
