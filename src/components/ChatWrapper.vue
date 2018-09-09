<template>
    <div class="chat-wrapper h-100">
        <MessagesList></MessagesList>
        <hr />
        <div class="mt-3">
            <MessageForm></MessageForm>
        </div>
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