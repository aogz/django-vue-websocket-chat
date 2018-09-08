<template>
    <form :submit.prevent="sendMessage">
        <input name="message" placeholder="Your message" autocomplete="off" class="form-control" required="required"/>
    </form>
</template>


<script>
    export default {
        name: 'MessageForm',
        methods: {
            sendMessage() {

            }
        }
    }
</script>