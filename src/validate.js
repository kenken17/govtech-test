import atLeastOne from '@/helpers/rules/atLeastOne';
import VeeValidate, { Validator } from 'vee-validate';

Validator.extend('atLeastOne', atLeastOne);

export default VeeValidate;
