import rateService from '@/services/rateService';
import httpErrorHelper from '@/helpers/httpErrorHelper';

const rateModule = {
    namespaced: true,
    state: {
        ratesResult: null
    },
    mutations: {
        setData(state, data) {
            state.ratesResult = data;
        }
    },
    actions: {
        getMonthlyRates({ commit }, payload) {
            const dataStr = `between[end_of_month]=${payload.startDateStr},${payload.endDateStr}&fields=end_of_month,${payload.selections.join(',')}`;

            return rateService
                .getMonthlyRates(dataStr)
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
