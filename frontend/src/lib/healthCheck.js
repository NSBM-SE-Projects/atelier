import api from './api';

export const healthCheckService = {
  async checkBackend() {
    try {
      const response = await api.get('/health/backend');
      return {
        status: 'ready',
        message: response.data.message,
        timestamp: response.data.timestamp,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'BACKEND IS NOT RESPONDING',
        error: error.message,
      };
    }
  },

  async checkDatabase() {
    try {
      const response = await api.get('/health/database');
      return {
        status: 'ready',
        message: response.data.message,
        timestamp: response.data.timestamp,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'DATABASE CONNECTION FAILED',
        error: error.message,
      };
    }
  },


  async checkAll() {
    const frontendStatus = { status: 'ready', message: 'FRONTEND LOADED' };

    const backendResponse = await this.checkBackend();
    const databaseResponse = await this.checkDatabase();

    return {
      frontend: frontendStatus,
      backend: backendResponse,
      database: databaseResponse,
      allReady:
        frontendStatus.status === 'ready' &&
        backendResponse.status === 'ready' &&
        databaseResponse.status === 'ready',
    };
  },
};
