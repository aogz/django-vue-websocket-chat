<template>
    <div class="messages-block" v-chat-scroll>
        <div class="text-center mb-3" v-if="messages.count > messages.results.length">
            <button class="btn btn-sm btn-link" @click.prevent="loadMore()">Load previous message..</button>
        </div>
        <div v-for="message in messages.results" :key="message.id" class="w-100 bg-light p-2 small text-muted mb-1 rounded">
            <small class="mr-1">{{ message.sent_at }}</small> <a href="">@{{ message.sender.username }}</a>: {{ message.text }}
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex';

    export default {
        name: 'MessagesList',
        methods: {
            ...mapActions(['loadMore']),
        },
        computed: {
            ...mapState(['messages', 'activeChannel'])
        }
    }
</script>

<style scoped>
    .messages-block {
        height: calc(100vh - 230px);
        overflow: scroll;
    }

</style>