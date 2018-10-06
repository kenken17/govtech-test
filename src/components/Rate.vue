<template>
    <div class="rate">
        <form @submit.prevent="onSubmitData">
            <input type="text" v-model.trim="startDate" v-validate="'required|date_format:MMM-YYYY'" data-vv-as="Start Date" name="startDate" placeholder="e.g. Jan-2018" />
            <span>{{ errors.first('startDate') }}</span>
            <input type="text" v-model.trim="endDate" v-validate="'required|date_format:MMM-YYYY'" data-vv-as="End Date" name="endDate" placeholder="e.g. Jun-2018" />
            <span>{{ errors.first('endDate') }}</span>
            <label>
                <input type="checkbox" v-model="selections" v-validate="'atLeastOne'" name="selections" value="banks_fixed_deposits_3m" /> Banks Fixed Deposits 3 Months
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="banks_fixed_deposits_6m" /> Banks Fixed Deposits 6 months
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="banks_fixed_deposits_12m" /> Banks Fixed Deposits 12 months
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="banks_savings_deposits" /> Banks Saving Deposits
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="fc_fixed_deposits_3m" /> Finance Companies Fixed Deposits 3 Months
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="fc_fixed_deposits_6m" /> Finance Companies Fixed Deposits 6 Months
            </label>
            <label>
                <input type="checkbox" v-model="selections" value="fc_fixed_deposits_12m" /> Finance Companies Fixed Deposits 12 Months
            </label>
            <span>{{ errors.first('selections') }}</span>
            <button type="submit">Submit</button>
        </form>

        <div>{{ratesResult}}</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import commonMixin from '@/mixins/commonMixin';

function onSubmitData() {
    this.$validator.validate().then((valid) => {
        if (!valid) return;

        const startDateStr = this.getDateStr(this.startDate);
        const endDateStr = this.getDateStr(this.endDate);

        this
            .getMonthlyRates({
                startDateStr,
                endDateStr,
                selections: this.selections
            })
            .then(() => {
            });
    });
}

export default {
    name: 'Rate',
    computed: {
        ...mapState('rateModule', [
            'ratesResult'
        ])
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            selections: []
        };
    },
    mixins: [commonMixin],
    methods: {
        ...mapActions('rateModule', [
            'getMonthlyRates'
        ]),
        onSubmitData
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
