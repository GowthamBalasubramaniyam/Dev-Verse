import React, { Fragment } from "react";
import Spinner from "../layout/Spinner.gif"; 

export default () => (
  <Fragment>
    <img
      src={Spinner}
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
      }}
      alt="Loading..."
    />  
    </Fragment> 
);