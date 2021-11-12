import React, { memo, ReactElement, useCallback } from 'react';
import { IDeal } from '../../../../interfaces/IDeal';
import Button from '../../../Button';

import './Deal.css';

interface IProps {
  onActivate: (deal_id: string) => void;
  key: string;
}

const Deal = ({
  deal_type,
  deal_amount,
  deal_id,
  retailer_domains,
  retailer_name,
  activated,
  onActivate,
  key,
}: IDeal & IProps): ReactElement => {
  const handleActivate = useCallback(() => {
    onActivate(deal_id);
  }, [onActivate, deal_id]);

  return (
    <div key={key} className="sl-Deal">
      <span>{retailer_name}</span>
      <span>
        {retailer_domains.map((domain) => (
          <a href={`https://${domain}`} target="_blank">
            {domain}
          </a>
        ))}
      </span>
      <span>
        {activated ? (
          'Deal active ✓'
        ) : (
          <Button onClick={handleActivate}>Activate deal</Button>
        )}
      </span>
      <span>
        {deal_type === 'PERCENTAGE'
          ? `${(deal_amount * 100).toFixed(2)}%`
          : deal_amount.toFixed(2)}
      </span>
    </div>
  );
};

export default memo(Deal);
