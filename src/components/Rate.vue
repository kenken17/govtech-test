<template>
    <div class="rate">
        <RateForm />
        <br />
        <RateTable />
        <br />
        <RateChart :chart-data="datacollection" />
    </div>
</template>

<script>
// @ is an alias to /src
import RateForm from '@/components/RateForm.vue';
import RateTable from '@/components/RateTable.vue';
import RateChart from '@/components/RateChart';
import { mapGetters } from 'vuex';

export default {
    name: 'Rate',
    components: {
        RateForm,
        RateTable,
        RateChart
    },
    computed: {
        ...mapGetters('rateModule', [
            'ratesRecords'
        ]),
        datacollection() {
            return {
                labels: [1, 2, 3, 4],
                datasets: [
                    {
                        label: 'Data One',
                        data: [1, 2]
                    }, {
                        label: 'Data One',
                        data: [3, 4]
                    }
                ]
            };
        }
    }
};
</script>
