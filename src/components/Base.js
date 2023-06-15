import React from 'react'
import CustomNavbar from './CustomNavbar';

//  Base component
//  This component is used to wrap all other components
//  It contains the navbar and the children components
const Base = ({children}) => {
  return (
    <div >
      <CustomNavbar/>
      { children }

    </div>
  );
}

export default Base;