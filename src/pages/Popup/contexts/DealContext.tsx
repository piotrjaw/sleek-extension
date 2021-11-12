import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IDeal } from '../interfaces/IDeal';
import useService from '../hooks/useService';
import DealsService from '../services/DealsService';
import { UserContext } from './UserContext';

interface IProps {
  children: ReactNode;
}

export interface IDealContext {
  deals: IDeal[];
  getDeals: () => Promise<void>;
  activate: (deal_id: string) => Promise<void>;
}

export const DealContext = createContext<IDealContext>({
  deals: [],
  getDeals: async () => {},
  activate: async () => {},
});

export const DealProvider = ({ children }: IProps) => {
  const service = useService(DealsService) as DealsService;

  const { token } = useContext(UserContext);

  const [deals, setDeals] = useState([]);
  const getDeals = useCallback(async () => {
    const deals = await service.getDeals();
    setDeals(deals || []);
  }, [service]);

  const activate = useCallback(
    async (deal_id: string) => {
      try {
        await service.activate(deal_id);
      } finally {
        await getDeals();
      }
    },
    [service, getDeals]
  );

  useEffect(() => {
    getDeals();
  }, [token, getDeals]);

  const value = useMemo(
    () => ({
      activate,
      deals,
      getDeals,
    }),
    [deals, getDeals, activate]
  );

  return <DealContext.Provider value={value}>{children}</DealContext.Provider>;
};
