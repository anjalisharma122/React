import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";
import  Shimmer from "./Shimmer";


const Body = ()=>{
 
  const [listOfRestaurants ,setlistOfRestaurants] = useState([]);

  useEffect(()=>{
    fetchData(); 
  },[]);
  
  const fetchData =async() =>{
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
  

      const json = await data.json();
      console.log(json);
      setlistOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

      if(listOfRestaurants.length ===0){
        return <Shimmer/>;
      }
      
    return( 
        <div className="body">
            <div className="filter">
              <button className ="filter-btn" 
              onClick={()=>{
                filteredList = listOfRestaurants.filter(
                  (res)=>res.info.avgRating>4
                );
                setlistOfRestaurants(filteredList);
                
              }}
             
              > Top Rated Restaurants</button>
            </div>
            <div className="res-container">
              {
                listOfRestaurants.map(card=> {
                  return <RestaurantCard key={card.id} resData={card} />
                })
              }
            </div>
        </div>
    );
};

export default Body;