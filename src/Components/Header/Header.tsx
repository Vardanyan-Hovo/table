// src/components/Header.tsx

import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./style.css";

const Header: React.FC = () => {
  return (
    <header>
      <div className=" flex justify-around w-screen" id="HeadId">
        <h1>Persons Data Table</h1>
        <Navbar/>
      </div>
    </header>
  );
};

export default Header;
