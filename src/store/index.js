import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        channels: [],
        users: [],
        messages: {
            results: [],
            count: 0,
            page: 1
        },
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
            state.messages = messages;
            state.messages.results = state.messages.results.reverse();
        },
        NEXT_PAGE (state) {
            state.messages.page++;
        },
        ADD_MESSAGES (state, messages) {
            state.messages.results = [...messages.results.reverse(), ...state.messages.results]
            state.messages.page = messages.page;
        },
        SET_CURRENT_USER (state, user) {
            state.currentUser = user
        },
        ADD_CHANNEL (state, channel) {
            state.channels.push(channel);
            if (state.channels.length === 1) state.activeChannel = channel
        },

        // Sockets implementation
        SOCKET_ONOPEN (state, event)  {
            console.info('Connected to websockets server..')
        },
        SOCKET_ONCLOSE (state, event)  {
            console.log('Close')
        },
        SOCKET_ONERROR (state, event)  {
            console.error('Error: ', event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
            console.log('Message: ', message)
            if (state.activeChannel.chat_id === message.channel.is_private?message.channel.name:message.channel.chat_id) {
                state.messages.results.push(message)
            } else {
                console.log('another one')
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.log('Reconnect: ', count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            console.log('Reconnect Error')
        },
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
        loadMessages (context, {chat_id, page}) {
            if (!page) page = 1;

            let promise = Vue.http.get(`/api/messages/?channel__name=${chat_id}&page=${page}`);
            promise.then(response => {
                if (page === 1)
                    context.commit('SET_MESSAGES', {page: page, ...response.body});
                else
                    context.commit('ADD_MESSAGES', {page: page, ...response.body});
            }, response => {});

            return promise
        },
        loadMore (context){
            context.commit('NEXT_PAGE');
            context.dispatch('loadMessages', {chat_id: context.state.activeChannel.chat_id, page: context.state.messages.page})
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