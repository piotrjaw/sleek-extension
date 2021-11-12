import requestService from './RequestService';

export default class UsersService {
  async getProfile() {
    return await requestService.get('users/profile');
  }

  async register(email: string) {
    return await requestService.post('users', { email });
  }

  async login(email: string) {
    return await requestService.post('users/login', { email });
  }
}
