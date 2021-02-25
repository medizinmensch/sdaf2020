import gql_login from "../apollo/queries/login";
import cookie from "cookie";

export const state = () => ({
    user: {
        name: "",
        email: "",
    },
})

export const mutations = {
    setUser(state, user) {
        if (!!user) state.user = user
    },
    clearUser(state) {
        state.user = { email: "", token: "" }
    }
}

export const getters = {
    getUser(state) {
        return state.user
    },
    isLoggedIn(state) {
        return !!state.user.email
    }
}