<template>
    <div class="home md-layout md-alignment-top-center">
        <div class="md-layout-item md-size-60 md-medium-size-90 md-small-size-100"><Rate /></div>
    </div>
</template>

<script>
// @ is an alias to /src
import Rate from '@/components/Rate.vue';

export default {
    name: 'home',
    components: {
        Rate
    }
};
</script>
