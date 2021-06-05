import React, { useState } from "react";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import console from "node:console";

function ListAdder(props) {
  const [fields, setFields] = useState(props.value);

  function handleChange(i, event) {
    const values = [...Object.entries(props.value)];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...Object.entries(props.value)];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...Object.entries(props.value)];
    values.splice(i, 1);
    setFields(values);
  }
 
  const type= props.type =="cv"? "none":""

  return (
    <table className="ListAdder">
      <thead>
        <tr>
          <th>Service</th>
          <th style={{display: type}}>Price</th>
          <th>
            <button type="button" onClick={() => handleAdd()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
      {Object.entries(props.value).map(([title, price]) => {
        return(
          <tr>
            <td style={{display: type}}>{title}</td>
            <td>{price}</td>
            <td>
              <button type="button" onClick={() => handleRemove(1)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        )
        })}
      </tbody>
    </table>
  );

  //     {props.value.map((name, id) => {
  //       console.log(name);
  //       console.log(id);
  //       return (
  //         <tr key={`${name}-${id}`}>
  //           <input
  //             type="text"
  //             placeholder="Enter text"
  //             value={name || "Add your " + props.type}
  //             onChange={(e) => handleChange(id, e)}
  //           />
  //           <input type="number" placeholder="€" value={name.value || 0} />
  //           <button type="button" onClick={() => handleRemove(id)}>
  //             <FontAwesomeIcon icon={faTrashAlt} />
  //           </button>
  //         </tr>
  //       );
  //     })}
  //
  // );
}
export default ListAdder;
