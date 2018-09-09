<template>
    <form @submit.prevent="sendMessage(newMessage)">
        <input name="message" v-model="newMessage" placeholder="Your message" autocomplete="off" class="form-control" required="required"/>
    </form>
</template>


<script>
    import { mapState } from 'vuex';

    export default {
        name: 'MessageForm',
        data () {
            return {
                newMessage: ''
            }
        },
        computed: {
            ...mapState(['activeChannel']),
        },
        methods: {
            sendMessage() {
                let data = {
                    command: !!this.activeChannel.username?'private_message':'channel_message',
                    message: this.newMessage,
                    chat_id: this.activeChannel.chat_id
                };

                this.$socket.send(JSON.stringify(data));

                this.newMessage = ''
            }
        }
    }
</script>