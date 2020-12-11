import Vue from "vue";
import Vuex from "vuex";
import {User} from "@/interfaces/User";
import {Message, MsgType} from "@/interfaces/message.interface";
import auth from "@/auth/auth";

Vue.use(Vuex);

function messageExpiration() {
  return Date.now() + 5 * 1000; // 5 seconds
}

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null as null | User,
    messages: [] as Message[],
  },
  mutations: {
    /**
     * Log in a User to the store.
     * @param state
     * @param user the user object to store
     */
    loginUser(state, user: User) {
      state.isAuthenticated = true;
      state.user = user;
    },

    /**
     * Log out a User from the store.
     * @param state
     */
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },

    /**
     * Sets a property of the user.
     * @param state
     * @param key property name to modify
     * @param value new value
     */
    setUserProp(state, { key, value }) {
      if (state.user) {
        Vue.set(state.user, key, value);
      }
    },

    /**
     * Sets whether a User is authenticated. This is distinct from logging in/out a user because
     * we are not sure who the User is, just that the client has an auth token.
     * @param state
     * @param value whether the user is authenticated or not
     */
    setAuthenticated(state, value: boolean) {
      state.isAuthenticated = value;
    },

    /**
     * Sets the message.
     * @param state
     * @param message
     */
    pushMessage(state, message: Message) {
      state.messages.push(message);
    },
  },
  getters: {
    /**
     * Returns whether the client has an auth token. This does not necessarily mean that the
     * auth token is valid, but we may assume that it is.
     * @param state
     */
    isAuthenticated(state) {
      return state.isAuthenticated;
    },

    /**
     * Gets the current authenticated user.
     * @param state
     */
    user(state) {
      return state.user;
    },

    /**
     * Gets the messages to be displayed.
     * @param state
     */
    currentMessages(state) {
      return state.messages;
    }
  },
  actions: {
    /**
     * Dispatches a message for 5 seconds.
     * @param commit
     * @param message
     */
    message({ commit }, message: Message) {
      commit('pushMessage', message);
    },

    /**
     * Dispatches an error (shortcut for message)
     * @param commit
     * @param text
     */
    error({ dispatch }, text: string) {
      dispatch('message', { type: MsgType.ERROR, text, expiration: messageExpiration() })
    },

    /**
     * Dispatches an error (shortcut for message)
     * @param commit
     * @param text
     */
    success({ dispatch }, text: string) {
      dispatch('message', { type: MsgType.SUCCESS, text, expiration: messageExpiration() })
    }
  },
  modules: {}
});
