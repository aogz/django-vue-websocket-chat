<template>
    <div id="chats">
        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
            <a class="nav-link disabled text-muted">Chats</a>
            <a class="nav-link small" href="#" @click.prevent="selectChannel(channel)" v-for="channel in channels" :key="channel.id" :class="{'active': activeChannel.chat_id === channel.chat_id}">{{ channel.name }}</a>
        </div>
        <hr />
        <form @submit.prevent="createChannel({name: newChannelName})">
            <div class="input-group mb-3">
                <input type="text" class="form-control form-control-sm" placeholder="New chat" v-model="newChannelName" required="required"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-primary btn-sm" type="submit">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'

    export default {
        name: 'ChannelsList',
        data () {
            return {
                newChannelName: ''
            }
        },
        created () {
            this.loadChannels();
        },
        computed: mapState([
            'channels', 'activeChannel'
        ]),
        methods: {
            ...mapActions(['loadChannels', 'selectChannel']),
            createChannel (channel) {
                this.$store.dispatch('createChannel', channel).then(response => {
                    this.$noty.success('Channel was created');
                    this.newChannelName = '';
                }, response => {
                    if (response.body instanceof Object) {
                        for (let key in response.body) {
                            if (response.body.hasOwnProperty(key)) {
                                this.$noty.error(`${key}: ${response.body[key].join(', ')}`);
                            }
                        }
                    } else {
                        this.$noty.error(response.statusText);
                    }
                })
            }
        }
    }
</script>