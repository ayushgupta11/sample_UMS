export default{
    addUser(state, payload){ state.users.push(payload) },
    updateUserdata(state, payload){ state.users = payload }
}