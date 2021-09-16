import React from 'react';
import CustomInputNumber from '../components/CustomInputNumber';
import RoomAllocation from '../components/RoomAllocation';
import '../scss/app.scss';

const MainContainer = () => (
  <React.Fragment>
    <h1>Custom Input number</h1>
    <CustomInputNumber
      name="test"
      value={2}
      step={1}
      min={1}
      max={4}
      disabled={false}
      onChange={(e) => {
        if (e) {
          const { name, value } = e.target;
          console.log('[name]:', name, '[value]:', value);
        }
      }}
    />
    <h1>Room Allocation</h1>
    <RoomAllocation
      guest={10}
      room={3}
      onChange={result => console.log('RoomAllocation: ', result)}
    />
  </React.Fragment>
);

export default MainContainer;
