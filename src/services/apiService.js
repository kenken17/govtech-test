import axios from 'axios';
import constants from '@/constants';

const service = axios.create({
    baseURL: constants.APIUrl
});

export default service;
