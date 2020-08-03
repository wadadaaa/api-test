import React from 'react'
import { func } from 'prop-types';

const Toggle = ({ toggleTheme }) => {
  return (
    <button onClick={toggleTheme} >
    </button>
  );
};

Toggle.propTypes = {
  toggleTheme: func.isRequired,
}

export default Toggle;