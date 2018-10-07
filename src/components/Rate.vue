<template>
    <div class="rate">
        <RateForm />
        <br />
        <RateTable />
    </div>
</template>

<script>
// @ is an alias to /src
import RateForm from '@/components/RateForm.vue';
import RateTable from '@/components/RateTable.vue';

export default {
    name: 'Rate',
    components: {
        RateForm,
        RateTable
    }
};
</script>
