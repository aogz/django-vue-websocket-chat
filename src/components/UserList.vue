<template>
    <div id="users">
        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
            <a class="nav-link disabled text-muted">Users</a>
            <a class="nav-link small" href="#" v-for="user in users" :class="{'active': activeChannel.chat_id === user.chat_id}" @click.prevent="selectChannel(user)">@{{ user.username }}</a>
        </div>
        <hr />
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'

    export default {
        name: 'UserList',
        created () {
            this.loadUsers()
        },
        methods: {
            ...mapActions(['loadUsers', 'selectChannel'])
        },
        computed: {
            ...mapState(['users', 'activeChannel']),
        }
    }
</script>