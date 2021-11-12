class RequestService {
  private readonly API_URL = 'http://localhost:8080/api/';

  async get(url: string) {
    const response = await fetch(this.getFullUrl(url), {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async post(url: string, body: Record<string, string>) {
    const response = await fetch(this.getFullUrl(url), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });
    return response.json();
  }

  private getFullUrl(url: string): string {
    return `${this.API_URL}${url}`;
  }

  private getHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return { Authorization: token || '', 'Content-Type': 'application/json' };
  };
}

export default new RequestService();
