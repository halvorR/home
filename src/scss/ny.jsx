import React, {PropTypes} from 'react';

export default class Ny extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>MyComponent</div>
        <div>Ny comitt</div>
        <div>Ny comitt</div>
      </div>
    );
  }
}

Ny.propTypes = {
  ny = PropTypes.String
};
