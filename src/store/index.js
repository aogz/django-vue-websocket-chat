import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        channels: [],
        users: [],
        messages: [],
        activeChannel: {},
    },
    mutations: {
        SET_ACTIVE_CHANNEL (state, channel) {
            state.activeChannel = channel
        },
        SET_USERS (state, users) {
            state.users = users
        },
        SET_CHANNELS (state, channels) {
            state.channels = channels
        },
        SET_MESSAGES (state, messages) {
            state.messages = messages
        },
        SET_CURRENT_USER (state, user) {
            state.currentUser = user
        },
        ADD_CHANNEL (state, channel) {
            state.channels.push(channel);
            if (state.channels.length === 1) state.activeChannel = channel
        }
    },
    actions: {
        loadChannels (context) {
            let promise = Vue.http.get(`/api/channels/`);
            promise.then(response => {
                context.commit('SET_CHANNELS', response.body);
                if (response.body.length > 0 && !context.state.activeChannel.id)
                    context.dispatch('selectChannel', response.body[0])
            }, response => {});

            return promise
        },
        loadMessages (context, {chat_id}) {
            let promise = Vue.http.get(`/api/messages/?channel__name=${chat_id}`);
            promise.then(response => {
                context.commit('SET_MESSAGES', response.results);
            }, response => {});

            return promise
        },
        loadUsers (context) {
            let promise = Vue.http.get(`/api/users/`);

            promise.then(response => {
                context.commit('SET_USERS', response.body);
            }, response => {});

            return promise
        },
        loadMe (context) {
            let promise = Vue.http.get(`/api/users/me/`);

            promise.then(response => {
                context.commit('SET_CURRENT_USER', response.body);
            }, response => {})

        },
        createChannel (context, channel) {
            let promise = Vue.http.post(`/api/channels/`, channel);

            promise.then(response => {
                context.commit('ADD_CHANNEL', response.body);
            }, response => {});

            return promise
        },
        selectChannel (context, channel) {
            context.commit('SET_ACTIVE_CHANNEL', channel);
            context.dispatch('loadMessages', {chat_id: channel.chat_id})
        }
    }
})