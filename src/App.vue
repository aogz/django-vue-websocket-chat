<template>
    <div class="container">
        <div class="row" id="chat-block">
            <div class="col-md-2">
                <ChannelsList></ChannelsList>
                <UserList></UserList>
            </div>
            <div class="col-md-10">
                <ChatWrapper></ChatWrapper>
            </div>
        </div>
    </div>
</template>

<script>
    import ChannelsList from './components/ChannelsList'
    import UserList from './components/UserList'
    import ChatWrapper from './components/ChatWrapper'

    export default {
        name: 'app',
        components: {ChannelsList, UserList, ChatWrapper}
    }
</script>

<style>
    @import '~vuejs-noty/dist/vuejs-noty.css';

    #chat-block {
        min-height: calc(100vh - 220px);
    }
</style>