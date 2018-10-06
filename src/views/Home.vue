<template>
    <div class="home">
        <Rate/>
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
