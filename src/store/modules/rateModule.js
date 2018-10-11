import rateService from '@/services/rateService';
import httpErrorHelper from '@/helpers/httpErrorHelper';

const rateModule = {
    namespaced: true,
    state: {
        ratesResult: null,
        selected: []
    },
    getters: {
        getRatesAverages: (state) => {
            const averages = [{}];

            if (state && state.ratesResult && state.ratesResult.records && state.ratesResult.records.length) {
                // initiate all to 0
                state.selected.forEach((sel) => {
                    averages[0][sel] = 0;
                });

                state.ratesResult.records.forEach((item) => {
                    // sum the records
                    state.selected.forEach((sel) => {
                        averages[0][sel] += +item[sel];
                    });
                });

                // divided them
                state.selected.forEach((sel) => {
                    averages[0][sel] /= state.ratesResult.records.length;
                    averages[0][sel] = Math.round(averages[0][sel] * 100) / 100;
                });

                return averages;
            }

            return [];
        },
        getRatesRecords: (state) => {
            if (state && state.ratesResult && state.ratesResult.records && state.ratesResult.records.length) {
                return state.ratesResult.records;
            }

            return [];
        },
        getSelected: state => state.selected
    },
    mutations: {
        clearRatesResult(state) {
            state.ratesResult = null;
        },
        setRatesResult(state, data) {
            state.ratesResult = data;
        },
        setSelected(state, data) {
            state.selected = data;
        }
    },
    actions: {
        clearRatesResult({ commit }) {
            commit('clearRatesResult');
        },
        getMonthlyRates({ commit }, payload) {
            const selections = [];

            // Get both the banks and fc
            payload.selections.forEach((item) => {
                selections.push(`banks_${item}`);
                selections.push(`fc_${item}`);
            });

            const dataStr = `between[end_of_month]=${payload.startDateStr},${payload.endDateStr}&fields=end_of_month,${selections.join(',')}&limit=1000`;

            return rateService
                .getMonthlyRates(dataStr)
                .then((res) => {
                    if (!res || !res.data || !res.data.result) return httpErrorHelper.handleNoData();

                    commit('setSelected', selections);
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
