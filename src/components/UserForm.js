import React from 'react';
import '../styles/UserForm.css';

const UserForm = props => {
  return (
    <form onSubmit={props.getIssues}>
      <input className='UserForm' type='search' placeholder={props.placeholderText} onChange={props.handleChange} />
    </form>
  );
};

export default UserForm;
