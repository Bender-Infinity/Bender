import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity>
    <Entity camera="" look-controls="" wasd-controls-enabled="true" {...props}/>
  </Entity>
);