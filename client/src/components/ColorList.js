import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useParams} from 'react-router-dom';


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setBool, bool }) => {
  console.log(colors);
  const {id} = useParams()
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
   
  

  const editColor = color => { 
    colors && colors.find(item=>`${item.id}`===id)   
    setEditing(true);
    setColorToEdit(color);
  };

  // useEffect(()=>{   

  //   const colorToUpdate = colors && colors.find(
  //   item =>`${item.id}` === id)    
  //   if(colorToUpdate){
  //   setColorToEdit(colorToUpdate)
  //   }
    
  //   },[colors, id])

  const saveEdit = (color,e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()    
    .put(`/api/colors/${color.id}`, color)
    .then(res=>{
    // editColor()
    console.log("I am the updated color", res)     
    updateColors(res.data)
    setBool(!bool) 
    })
    .catch(err=>console.log(err))
   
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => setBool(!bool))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors && colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
