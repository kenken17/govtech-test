import api from '@/services/apiService';

const rateService = {
    getMonthlyRates(data) {
        return api.get(`search.json?${data}`);
    }
};

export default rateService;

