import rateService from '@/services/rateService';
import httpErrorHelper from '@/helpers/httpErrorHelper';

const rateModule = {
    namespaced: true,
    state: {
        data: null
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        }
    },
    actions: {
        getMonthlyRates({ commit }, payload) {
            return rateService
                .getMonthlyRates(payload)
                .then((res) => {
                    if (!res.data.result) return httpErrorHelper.handleNoData();

                    commit('setData', res.data.result);

                    return res.data.result;
                })
                .catch((err) => {
                    httpErrorHelper.handleRequestError(err);
                });
        }
    }
};

export default rateModule;
