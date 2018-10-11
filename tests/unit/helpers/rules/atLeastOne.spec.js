import atLeastOne from '@/helpers/rules/atLeastOne';

describe('atLeastOne', () => {
    describe('getMessage', () => {
        it('should spit out the correct error message', () => {
            const expected = atLeastOne.getMessage();

            expect(expected).toEqual('Please select at least one option above.');
        });
    });

    describe('validate', () => {
        it('should make sure at lease one item to be passed in for true', () => {
            const expected = atLeastOne.validate(['item1', 'item2']);

            expect(expected).toBe(true);
        });

        it('should make sure no item to be passed in for false', () => {
            const expected = atLeastOne.validate([]);

            expect(expected).toBe(false);
        });
    });
});
