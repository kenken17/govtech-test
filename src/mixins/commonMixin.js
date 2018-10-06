const commonMixin = {
    methods: {
        getDateStr(date) {
            const dateToken = date.split('-');

            let monStr = new Date(Date.parse(`${dateToken[0].toLowerCase()} 1, 2018`)).getMonth() + 1;
            monStr = (`00${monStr}`).slice(-2);

            return `${dateToken[1]}-${monStr}`;
        }
    }
};

export default commonMixin;
