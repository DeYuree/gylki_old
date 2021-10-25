const state = () => ({
    messageTimeout: null,
    message: {
        mainText: '',
        extraText: '',
        color: '',
        icon: '',
        isVisible: false
    }
})

const getters = {
    MESSAGE_TIMEOUT_GETTER: () => {
        return state.messageTimeout
    }
}

const actions = {
    INIT_MESSAGE: ({commit}, message) => {
        let message_obj = {
            mainText: message.mainText,
            extraText: message.extraText,
            color: message.color,
            icon: message.icon,
            isVisible: true
        }

        commit('SET_MESSAGE', message_obj)

        if (state.messageTimeout) {
			clearTimeout(state.messageTimeout);
        }
        
		state.messageTimeout = setTimeout(() => commit('CLEAR_MESSAGE'), 5000);
    },

    clearMessage: ({commit}) => {
        if (state.messageTimeout) {
			clearTimeout(state.messageTimeout);
        }
        commit('CLEAR_MESSAGE')
    }
}

const mutations = {
    SET_MESSAGE: (state, message) => {
        state.message = message
    },

    CLEAR_MESSAGE: (state) => {
        state.message = {
            isVisible: false,
            mainText: '',
            extraText: '',
            color: '',
            icon: ''            
        }
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}