import {CDN_URL} from "../utils/constants" ;

const RestaurantCard = (props) =>{
    const {resData}=props;
    // console.log(resData);
   
    const{
      cloudinaryImageId,
      name,
      avgRating,
      cuisines,
      costForTwo,
      
     }=resData?.info;
     const {
       deliveryTime 
     }=resData?.info?.sla ;
    
    return( 
        <div data-testid="resCard" className="m-4 p-4 w-[245px] rounded-2xl bg-[#FDF7E3] hover:bg-gray-200 border-t-2 border-r-1  border-gray-300 transition-all duration-300">
            <img 
            className="rounded-lg  w-full h-40 object-cover rounded-t-2xl"
            alt="res-card"
            src= {CDN_URL+cloudinaryImageId }
             /> 
            <h3 className ="font-bold py-4 text-lg" >{name}</h3>
            <h4>{cuisines.join(" ,")}</h4>
            <h4>{avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>

        </div>
        
    );
};



export const withPromotedLabel = (RestaurantCard) =>{
  return (props)=>{
    return(
      <div>
        <label className ="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    )
  }
}

export default RestaurantCard;