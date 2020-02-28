import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {useHistory} from 'react-router-dom';

const BubblePage = (props) => {
  let history = useHistory()
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

  const logout = (e)=>{
    e.preventDefault()        
    window.localStorage.removeItem('token'); 
    props.history.push('/')    

    }   
  

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setBool= {setBool} bool= {bool} />
      <Bubbles colors={colorList} />
      <button type = "submit"onClick = {logout}>Log out</button>
    </>
  );
};

export default BubblePage;
