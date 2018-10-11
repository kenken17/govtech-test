import rateModule from '@/store/modules/rateModule';
import rateService from '@/services/rateService';
import httpErrorHelper from '@/helpers/httpErrorHelper';

let state = {};

describe('rateModule', () => {
    describe('getters', () => {
        describe('getRatesAverages', () => {
            it('should return empty arrray when no state result', () => {
                state = {
                    ratesResult: {
                        records: []
                    }
                };

                const expected = rateModule.getters.getRatesAverages(state);

                expect(expected).toEqual([]);
            });

            it('should return the averages from ratesResult', () => {
                state = {
                    selected: ['item1', 'item2'],
                    ratesResult: {
                        records: [{
                            item1: '0.1',
                            item2: '0.3'
                        }, {
                            item1: '0.1',
                            item2: '0.3'
                        }]
                    }
                };

                const expected = rateModule.getters.getRatesAverages(state);

                expect(expected).toEqual([{
                    item1: 0.1,
                    item2: 0.3
                }]);
            });
        });

        describe('getRatesRecords', () => {
            it('should return the records from ratesResult', () => {
                state = {
                    ratesResult: {
                        records: [{
                            item1: {}
                        }, {
                            item2: {}
                        }]
                    }
                };

                const expected = rateModule.getters.getRatesRecords(state);

                expect(expected).toEqual([{
                    item1: {}
                }, {
                    item2: {}
                }]);
            });
        });

        describe('getSelected', () => {
            it('should return selected state', () => {
                state = {
                    selected: ['fixed_deposits_3m']
                };

                const expected = rateModule.getters.getSelected(state);

                expect(expected).toEqual(['fixed_deposits_3m']);
            });
        });
    });

    describe('mutations', () => {
        describe('clearRatesResult', () => {
            it('should set the state to nul', () => {
                state.ratesResult = [];

                rateModule.mutations.clearRatesResult(state);

                expect(state.ratesResult).toEqual(null);
            });
        });

        describe('setRatesResult', () => {
            it('should set the state to nul', () => {
                state.ratesResult = [];

                rateModule.mutations.setRatesResult(state, [{
                    item1: {}
                }, {
                    item2: {}
                }]);

                expect(state.ratesResult).toEqual([{
                    item1: {}
                }, {
                    item2: {}
                }]);
            });
        });

        describe('setSelected', () => {
            it('should set the state to nul', () => {
                state.ratesResult = [];

                rateModule.mutations.setSelected(state, { selecteItem: {} });

                expect(state.selected).toEqual({
                    selecteItem: {}
                });
            });
        });
    });

    describe('actions', () => {
        describe('clearRatesResult', () => {
            it('should commit to the clearRatesResult mutation', () => {
                const mockStore = {
                    commit: jest.fn()
                };

                rateModule.actions.clearRatesResult({ commit: mockStore.commit });

                expect(mockStore.commit).toHaveBeenCalled();
                expect(mockStore.commit).toHaveBeenCalledWith('clearRatesResult');
            });
        });

        describe('getMonthlyRates', () => {
            let getMonthlyRates;
            let handleRequestError;
            let handleNoData;
            let payload;

            beforeEach(() => {
                getMonthlyRates = jest.spyOn(rateService, 'getMonthlyRates');
                handleRequestError = jest.spyOn(httpErrorHelper, 'handleRequestError');
                handleNoData = jest.spyOn(httpErrorHelper, 'handleNoData');

                payload = {
                    startDateStr: '2018-01',
                    endDateStr: '2018-06',
                    selections: ['fixed_deposits_3m']
                };
            });

            it('should call the getMonthlyRates API service', () => {
                const mockStore = {
                    commit: jest.fn()
                };
                const dataStr = `between[end_of_month]=${payload.startDateStr},${payload.endDateStr}&fields=end_of_month,banks_fixed_deposits_3m,fc_fixed_deposits_3m&limit=1000`;

                rateModule.actions.getMonthlyRates({ commit: mockStore.commit }, payload);

                expect(getMonthlyRates).toHaveBeenCalled();
                expect(getMonthlyRates).toHaveBeenCalledWith(dataStr);
            });

            it('should commit the set state when API return result', async () => {
                const mockStore = {
                    commit: jest.fn()
                };
                getMonthlyRates.mockResolvedValue({
                    data: {
                        result: [{
                            item1: {}
                        }, {
                            item2: {}
                        }]
                    }
                });

                await rateModule.actions.getMonthlyRates({ commit: mockStore.commit }, payload);

                expect(mockStore.commit).toHaveBeenCalled();
                expect(mockStore.commit).toHaveBeenCalledWith('setSelected', ['banks_fixed_deposits_3m', 'fc_fixed_deposits_3m']);
                expect(mockStore.commit).toHaveBeenCalledWith('setRatesResult', [{
                    item1: {}
                }, {
                    item2: {}
                }]);
            });

            it('should call the error handle no date when API return no result', async () => {
                const mockStore = {
                    commit: jest.fn()
                };
                getMonthlyRates.mockRejectedValue('error');

                try {
                    await rateModule.actions.getMonthlyRates({ commit: mockStore.commit }, payload);
                } catch (err) {
                    expect(handleRequestError).toHaveBeenCalled();
                }
            });

            it('should call the error handle when API return fail', async () => {
                const mockStore = {
                    commit: jest.fn()
                };
                getMonthlyRates.mockResolvedValue({});

                try {
                    await rateModule.actions.getMonthlyRates({ commit: mockStore.commit }, payload);
                } catch (err) {
                    expect(handleNoData).toHaveBeenCalled();
                }
            });
        });
    });
});
