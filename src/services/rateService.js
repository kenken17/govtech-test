import api from '@/services/apiService';

const rateService = {
    getMonthlyRates(data) {
        return api.get(`search.json?resource_id=5f2b18a8-0883-4769-a635-879c63d3caac&${data}`);
    }
};

export default rateService;

