<template>
    <div class="rate">
        Rate component.
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Rate',
    props: {},
    methods: {
        ...mapActions('rateModule', [
            'getMonthlyRates'
        ])
    },
    created() {
        this
            .getMonthlyRates('resource_id=5f2b18a8-0883-4769-a635-879c63d3caac&limit=5')
            .then((data) => {
                console.log('>>>', data);
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
