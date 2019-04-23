const updateUser = (data) => {
    // return {
    //     type: "UPDATE_USER",
    //     user
    // }
//   console.log(data)
    return      ( dispatch )=> { 
        dispatch({
              
            type:'UPDATE_USER',
            payload:data

        })
       
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export {
    updateUser,
    removeUser
}