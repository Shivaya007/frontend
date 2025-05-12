import React, {useState,useEffect} from "react";
import Navbar from '../components/Navbar';
import Cardss from '../components/Cardss';
import Footer from '../components/Footer';

import Carousal from '../components/Carousal';


export default function Home() {
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);


  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      console.log(response[0], response[1]);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };
  

  useEffect(()=>{
        loadData()
  },[])
  return (
  <div>
      <div><Navbar /></div>
      <div><Carousal/></div>
      <div className="container">
      {foodCat.length !== 0 ? foodCat.map((data) => (
  <div key={data._id} className='row mb-3'>
    <div className="fs-3 m-3">
      {data.CategoryName}
    </div>
    <hr/>
    {foodItem.length !== 0
      ? foodItem.filter((item) => item.CategoryName === data.CategoryName)
          .map((filterItems) => (
            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
              <Cardss 
                foodItems={filterItems}
                options={filterItems.options[0]}
              />
            </div>
          ))
      : <div>No such data found</div>}
  </div>
)) : <div>""""""""""</div>}

      
      
      </div>
      <div><Footer/>
    </div>
</div>  
);
}

