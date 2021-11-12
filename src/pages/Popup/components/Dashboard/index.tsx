import React, { memo, ReactElement, useCallback, useContext } from 'react';
import Button from '../Button';
import { UserContext } from '../../contexts/UserContext';
import { DealContext } from '../../contexts/DealContext';
import Deal from './components/Deal';

const Dashboard = (): ReactElement => {
  const { logout } = useContext(UserContext);
  const { deals, activate } = useContext(DealContext);

  const handleSignOut = useCallback(() => {
    if (logout) {
      logout();
    }
  }, [logout]);

  return (
    <div>
      {deals.map((deal) => (
        <Deal key={deal.deal_id} {...deal} onActivate={activate} />
      ))}
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default memo(Dashboard);
