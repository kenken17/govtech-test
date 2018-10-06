<template>
    <div class="rate">
        <form @submit.prevent="onSubmitData">
            <input type="text" v-model="startDate" placeholder="e.g. Jan-2018" />
            <input type="text" v-model="endDate" placeholder="e.g. Jun-2018" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import commonMixin from '@/mixins/commonMixin';

function onSubmitData() {
    const startDateStr = this.getDateStr(this.startDate);
    const endDateStr = this.getDateStr(this.endDate);

    this
        .getMonthlyRates(`between[end_of_month]=${startDateStr},${endDateStr}`)
        .then(() => {
        });
}

export default {
    name: 'Rate',
    data() {
        return {
            startDate: null,
            endDate: null
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
