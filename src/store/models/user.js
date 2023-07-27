import axios from "axios";
import { GET_USER_ALL } from "api";

export const users = {
    state: {
        userList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setUsers(state, userList) {
        return {
            ...state,
            userList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        fetchUsers() {
          axios.get(GET_USER_ALL)
            .then(res => this.setUsers(res.data))
            .catch(err => console.log(err))
      },
    }),
    selectors: (slice, createSelector) => ({
        selectUser() {
            return slice(state => state.users)
        },

    })
};