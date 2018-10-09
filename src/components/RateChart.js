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
    }
};
