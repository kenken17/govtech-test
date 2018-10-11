import commonFilter from '@/filters/commonFilter';

describe('commonFilter', () => {
    describe('dateFormat', () => {
        it('should return empty string when no value is provided', () => {
            const expected = commonFilter.dateFormat();

            expect(expected).toEqual('');
        });

        it('should return date format in MMM-YYYY when value is provided', () => {
            const expected = commonFilter.dateFormat('2018-01');

            expect(expected).toEqual('Jan-2018');
        });

        it('should return date format in MMM-YYYY when value is provided', () => {
            const expected = commonFilter.dateFormat('2018-12');

            expect(expected).toEqual('Dec-2018');
        });
    });
});
