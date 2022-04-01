import React from 'react';

import PropTypes from 'prop-types';

function SideBar({ children }) {
  return (
    <div className="sidebar">
      <aside>
        1111111
      </aside>
      {children}
    </div>
  );
}

export default SideBar;

SideBar.defaultProps = {
  children: PropTypes.func,
};

SideBar.propTypes = {
  children: PropTypes.func,
};
