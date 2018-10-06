import VeeValidate, { Validator } from 'vee-validate';

Validator.extend('atLeastOne', {
    getMessage: () => 'Please select at least one option above.',
    validate: value => Object
        .keys(value)
        .some(key => !!value[key])
});

export default VeeValidate;
