import Vue from 'vue';

const commonFilter = {
    dateFormat(value) {
        if (!value) return '';

        const months = 'JanFebMarAprMayJunJulAugSepOctNovDec';
        const dateToken = value.split('-');

        return `${months.substr((+dateToken[1] - 1) * 3, 3)}-${dateToken[0]}`;
    }
};

Vue.filter('dateFormat', commonFilter.dateFormat);

export default commonFilter;
