<template>
    <div class="messages-block" v-chat-scroll>
        <div class="text-center mb-3" v-if="messages.count > messages.results.length">
            <button class="btn btn-sm btn-link" @click.prevent="loadMore()">Load previous message..</button>
        </div>
        <div v-for="message in messages.results" :key="message.id" class="w-100 d-flex">
            <div class="meta bg-light ml-1 p-2 small text-muted mb-1 rounded align-self-start">
                <b>@{{ message.sender.username }}</b>
            </div>
            <div class="text-muted ml-1 bg-light p-2 small mb-1 w-100 rounded d-flex">
                {{ message.text }}
                <small class="ml-auto date">
                    {{ message.sent_at }}
                </small>
            </div>
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

    .date {
          white-space: nowrap;
    }

</style>