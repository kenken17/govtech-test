<template>
    <div class="rate">
        <RatesForm />
        <br />
        <RatesChart
            v-show="ratesRecords.length > 0"
            :chart-data="datacollection"
            :options="{responsive: false, maintainAspectRatio: false}"
            :width="400"
            :height="200" />
        <br />
        <RatesAverage />
        <br />
        <RatesTable />
    </div>
</template>

<script>
// @ is an alias to /src
import RatesForm from '@/components/RatesForm.vue';
import RatesTable from '@/components/RatesTable.vue';
import RatesAverage from '@/components/RatesAverage.vue';
import RatesChart from '@/components/RatesChart';
import { mapGetters } from 'vuex';

export default {
    name: 'Rates',
    data() {
        return {
            datacollection: null
        };
    },
    components: {
        RatesForm,
        RatesTable,
        RatesChart,
        RatesAverage
    },
    computed: {
        ...mapGetters('rateModule', {
            ratesRecords: 'getRatesRecords'
        })
    },
    watch: {
        ratesRecords(val) {
            if (val === null || val.length === 0) {
                this.datacollection = {
                    labels: [],
                    datasets: []
                };
            } else {
                const naming = {
                    banks_fixed_deposits_3m: {
                        label: 'Banks Fixed Deposits 3 mos.',
                        color: '#8cc679'
                    },
                    banks_fixed_deposits_6m: {
                        label: 'Banks Fixed Deposits 6 mos.',
                        color: '#c27af7'
                    },
                    banks_fixed_deposits_12m: {
                        label: 'Banks Fixed Deposits 12 mos.',
                        color: '#4ea3e4'
                    },
                    banks_savings_deposits: {
                        label: 'Banks Savings Deposits',
                        color: '#dd9666'
                    },
                    fc_fixed_deposits_3m: {
                        label: 'Finance Companies Fixed Deposits 3 mos.',
                        color: '#e8587c'
                    },
                    fc_fixed_deposits_6m: {
                        label: 'Finance Companies Fixed Deposits 6 mos.',
                        color: '#061283'
                    },
                    fc_fixed_deposits_12m: {
                        label: 'Finance Companies Fixed Deposits 12 mos.',
                        color: '#34888c'
                    },
                    fc_savings_deposits: {
                        label: 'Finance Companies Savings Deposits',
                        color: '#e6df44'
                    }
                };
                const labels = [];
                const datasets = [];

                // Get the label and data
                Object.keys(naming).forEach((name) => {
                    if (({}).hasOwnProperty.call(val[0], name)) {
                        datasets.push({
                            label: naming[name].label,
                            borderColor: naming[name].color,
                            backgroundColor: 'transparent',
                            data: val.map(item => +item[name])
                        });
                    }
                });

                val.forEach((item) => {
                    labels.push(item.end_of_month);
                });

                this.datacollection = {
                    labels,
                    datasets
                };
            }
        }
    }
};
</script>
