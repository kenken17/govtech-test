<template>
    <div class="rate">
        <RateForm />
        <br />
        <RateTable />
        <br />
        <RateChart />
    </div>
</template>

<script>
// @ is an alias to /src
import RateForm from '@/components/RateForm.vue';
import RateTable from '@/components/RateTable.vue';
import RateChart from '@/components/RateChart';

export default {
    name: 'Rate',
    components: {
        RateForm,
        RateTable,
        RateChart
    }
};
</script>
