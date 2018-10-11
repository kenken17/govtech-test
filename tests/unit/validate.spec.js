import atLeastOne from '@/helpers/rules/atLeastOne';
import { Validator } from '@/validate';

describe('validate', () => {
    it('should register the atLeastOne custom rule', () => {
        const spy = jest.spyOn(Validator, 'extend');

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('atLeastOne', atLeastOne);
    });
});
