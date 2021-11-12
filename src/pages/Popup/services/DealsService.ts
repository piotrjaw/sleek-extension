import requestService from './RequestService';

export default class DealsService {
  async getDeals() {
    return await requestService.get('deals');
  }

  async activate(deal_id: string) {
    return await requestService.post(`deals/${deal_id}/activate`, {});
  }
}
