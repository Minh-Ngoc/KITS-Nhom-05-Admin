import axios from "axios";
import { GET_CATEGORY, ADD_CATEGORY } from "api";

export const categories = {
    state: {
        categoryList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setCategories(state, categoryList) {
        return {
            ...state,
            categoryList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
        fetchCategories() {
            axios.get(GET_CATEGORY)
            .then(res => this.setCategories(res.data.category))
            .catch(err => console.log(err))
      },
        addCategory(data) {
            axios.post(ADD_CATEGORY, data)
                .then(res => this.setCategories(res.data.category))
                .catch(err => console.log(err))
      }
    }),
    selectors: (slice, createSelector) => ({
        selectCategories() {
            return slice(state => state.categories)
        },

    })
};