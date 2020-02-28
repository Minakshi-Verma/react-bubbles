import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [bool, setBool] =useState(false)
  // fetch your colors data from the server when the component mounts
    useEffect(()=>{
    axiosWithAuth()
    .get("/api/colors")
    .then(res=>{
     console.log("I am the colordata response", res)
    // set that data to the colorList state property
      setColorList(res.data)
    })
    .catch(err=>console.log(err))
  }, [bool])
  

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setBool= {setBool} bool= {bool} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
