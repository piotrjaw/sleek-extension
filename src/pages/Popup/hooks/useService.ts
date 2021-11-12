import { IGenericService } from '../interfaces/IGenericService';
import { IGenericServiceConstructor } from '../interfaces/IGenericServiceConstructor';

const services: Record<string, IGenericService> = {};

const useService = (ctor: IGenericServiceConstructor): IGenericService => {
  const service = services[ctor.name];

  if (!service) {
    services[ctor.name] = new ctor();
  }

  return services[ctor.name];
};

export default useService;
