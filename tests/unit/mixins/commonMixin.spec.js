import commonMixin from '@/mixins/commonMixin';

describe('commonMixin', () => {
    describe('methods', () => {
        describe('getDateStr', () => {
            it('should output date string format to YYYY-MM', () => {
                const expected = commonMixin.methods.getDateStr('Jan-2018');

                expect(expected).toEqual('2018-01');
            });

            it('should output date string format to YYYY-MM', () => {
                const expected = commonMixin.methods.getDateStr('Dec-2018');

                expect(expected).toEqual('2018-12');
            });
        });
    });
});
