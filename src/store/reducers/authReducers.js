const INITIAL_STATE={
     userObj:'',
}
const reducer = (states=INITIAL_STATE, action) => {
    switch(action.type) {
        case "UPDATE_USER": {
            return {...states, userObj: action.payload}
        }
        case "REMOVE_USER": {
            return {...states, userObj: null}
        }
        default: {
            return states;
        }
    }
}

export default reducer