<template>
    <div class="chat-wrapper h-100">
        <h6>General</h6>
        <hr />
        <MessagesList></MessagesList>
        <MessageForm></MessageForm>
    </div>
</template>


<script>
    import MessagesList from './MessagesList'
    import MessageForm from './MessageForm'

    export default {
        name: 'ChatWrapper',
        components: {MessagesList, MessageForm}
    }
</script>