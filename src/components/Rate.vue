<template>
    <div class="rate">
        <form @submit.prevent="onSubmitData">
            <input type="text" v-model="startDate" placeholder="e.g. Jan-2018" />
            <input type="text" v-model="endDate" placeholder="e.g. Jun-2018" />
            <label>
                <input type="checkbox" v-model="fields" value="banks_fixed_deposits_3m" /> Banks Fixed Deposits 3 Months
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="banks_fixed_deposits_6m" /> Banks Fixed Deposits 6 months
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="banks_fixed_deposits_12m" /> Banks Fixed Deposits 12 months
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="banks_savings_deposits" /> Banks Saving Deposits
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="fc_fixed_deposits_3m" /> Finance Companies Fixed Deposits 3 Months
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="fc_fixed_deposits_6m" /> Finance Companies Fixed Deposits 6 Months
            </label>
            <label>
                <input type="checkbox" v-model="fields" value="fc_fixed_deposits_12m" /> Finance Companies Fixed Deposits 12 Months
            </label>
            <button type="submit">Submit</button>
        </form>

        <div>{{ratesResult}}</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import commonMixin from '@/mixins/commonMixin';

function onSubmitData() {
    const startDateStr = this.getDateStr(this.startDate);
    const endDateStr = this.getDateStr(this.endDate);

    this
        .getMonthlyRates({
            startDateStr,
            endDateStr,
            fields: this.fields
        })
        .then(() => {
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
            fields: []
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
