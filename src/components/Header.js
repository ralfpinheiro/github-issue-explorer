import React from 'react';
import '../styles/Header.css';

const Header = props => {
  return (
    <div>
      <div className='Header'>
        <div className='container'>
          <h1 className='HeaderLogo' href='/'>
            Github Issue Viewer
          </h1>
          <h4 className='HeaderURL'>{props.currentURL}</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
