import React from 'react';
import { DealProvider } from './contexts/DealContext';
import { UserProvider } from './contexts/UserContext';
import Wrapper from './components/Wrapper';

import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <UserProvider>
        <DealProvider>
          <Wrapper />
        </DealProvider>
      </UserProvider>
    </div>
  );
};

export default Popup;
