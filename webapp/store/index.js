export const state = () => ({
    user: {
        token: "",
        email: "",
    }
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}