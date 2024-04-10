// src/components/Header.tsx

import React from 'react';
import Navbar from '../Navbar/Navbar';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between bg-transparent'>
      <h1 className="bg-transparent ">Persons Data Table</h1>
      <Navbar/>
    </header>
  );
};

export default Header;