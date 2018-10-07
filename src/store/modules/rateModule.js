import rateService from '@/services/rateService';
import httpErrorHelper from '@/helpers/httpErrorHelper';

const rateModule = {
    namespaced: true,
    state: {
        ratesResult: null
    },
    mutations: {
        clearRatesResult(state) {
            state.ratesResult = null;
        },
        setRatesResult(state, data) {
            state.ratesResult = data;
        }
    },
    actions: {
        clearRatesResult({ commit }) {
            commit('clearRatesResult');
        },
        getMonthlyRates({ commit }, payload) {
            const dataStr = `between[end_of_month]=${payload.startDateStr},${payload.endDateStr}&fields=end_of_month,${payload.selections.join(',')}`;

            return rateService
                .getMonthlyRates(dataStr)
                .then((res) => {
                    if (!res.data.result) return httpErrorHelper.handleNoData();

                    commit('setRatesResult', res.data.result);

                    return res.data.result;
                })
                .catch((err) => {
                    httpErrorHelper.handleRequestError(err);
                });
        }
    }
};

export default rateModule;
