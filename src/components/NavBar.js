import React from 'react';
import '../styles/NavBar.css';

const NavBar = props => {
  return (
    <div>
      <div className='NavWrapper'>
        <ul className='nav'>
          <li className='nav-item' id='all' onClick={props.getFilteredList}>
            All issues
          </li>
          <li className='nav-item' id='open' onClick={props.getFilteredList}>
            Open Issues
          </li>
          <li className='nav-item' id='pull_request' onClick={props.getFilteredList}>
            Pull Requests
          </li>
          <li className='nav-item' id='closed' onClick={props.getFilteredList}>
            Closed Issues
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
