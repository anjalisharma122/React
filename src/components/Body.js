import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";
import  Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus" ;


const Body = ()=>{
 
  const [listOfRestaurants ,setListOfRestaurants] = useState([]);
  const [searchText ,setSearchText]= useState("");
  const [filteredRestaurants ,setFilteredRestaurants] = useState([]);

  
  

  useEffect(()=>{
    fetchData(); 
  },[]);
  
  const fetchData =async() =>{
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
  

      const json = await data.json();
      console.log(json);
      setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   
    setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    const onlineStatus =useOnlineStatus() ;

    if(onlineStatus === false) 
      return (
        <h1>
          Looks like you're offline !! Please check your internet ;
        </h1>
      )
     

     
     return listOfRestaurants.length ===0 ?(
        <Shimmer/> 
      ):( 
        <div className="body">
            <div className="filter">
              <div className="search">
                <input 
                type="text" 
                className ="search-box" 
                value={searchText}
                onChange={(e)=>{
                  setSearchText(e.target.value);
                }}/>
                <button onClick={ ()=>{
                  console.log(searchText);
                  const filteredRestaurant =
                  listOfRestaurants.filter((res)=>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                  setFilteredRestaurants(filteredRestaurant);
                }}
                >
                  Search 
                </button>
              </div>
              <button
               className ="filter-btn" 
              onClick={()=>{
                const filteredList = listOfRestaurants.filter(
                  (res)=>res.info.avgRating>4
                );
                setListOfRestaurants(filteredList);
                
              }}
             
              > Top Rated Restaurants</button>
            </div>
            <div className="res-container">
              {
                filteredRestaurants.map((card)=> (
                  <Link
                  key={card.info.id} 
                  to={"/restaurants/"+card.info.id}><RestaurantCard resData={card} />
                  </Link>
                ))
              }
            </div>
        </div>
    );
};

export default Body;