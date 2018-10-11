<template>
    <div class="home md-layout md-alignment-top-center">
        <div class="md-layout-item md-size-60 md-medium-size-90 md-small-size-100"><Rates /></div>
    </div>
</template>

<script>
// @ is an alias to /src
import Rates from '@/components/Rates.vue';

export default {
    name: 'home',
    components: {
        Rates
    }
};
</script>
