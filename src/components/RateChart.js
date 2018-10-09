import { Line, mixins } from 'vue-chartjs';
import { mapGetters } from 'vuex';

const { reactiveProp } = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    computed: {
        ...mapGetters('rateModule', [
            'ratesRecords',
            'selected'
        ])
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
        // this.renderChart({
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        //     datasets: [
        //         {
        //             label: 'xxx',
        //             backgroundColor: '#f87979',
        //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        //         }
        //     ]
        // });
    }
};
