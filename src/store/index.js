import Vue from 'vue';
import Vuex from 'vuex';

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
        }
    },
    actions: {
        loadChannels (context) {
            let promise = Vue.http.get(`/api/channels/`);
            promise.then(response => {
                context.commit('SET_CHANNELS', response.results);
                if (response.results.length > 0 && !context.state.activeChannel)
                    context.commit('SET_ACTIVE_CHANNEL', response.results[0])
            });

            return promise
        },
        loadMessages (context) {
            let promise = Vue.http.get(`/api/channels/`);
            promise.then(response => {
                context.commit('SET_CHANNELS', response.results);
                if (response.results.length > 0 && !context.state.activeChannel)
                    context.commit('SET_ACTIVE_CHANNEL', response.results[0])
            });

            return promise
        },
        loadUsers (context) {
            let promise = Vue.http.get(`/api/users/`);

            promise.then(response => {
                context.commit('SET_USERS', response.users);
            });

            return promise
        },
        loadMe (context) {
            let promise = Vue.http.get(`/api/users/me/`);

            promise.then(response => {
                context.commit('SET_CURRENT_USER', response);
            })

        },
    }
})