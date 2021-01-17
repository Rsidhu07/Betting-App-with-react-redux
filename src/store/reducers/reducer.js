import * as actions from '../actions/action';

const initialState ={
    usersData: null,
    checkedUsers:[],
    loading: true,
    winningUsers: [],
    randomNum: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actions.GETUSERSSUCCESS :
            return {
                ...state,
                usersData: action.usersData,
                loading:false
            };
        case actions.GETUSERSBEGIN : 
            return {
                ...state,
                loading:true
            };
        
        case actions.GETUSERSFAIL :
            return {
                ...state,
                loading: false
            };

        case actions.CHECKED_USERS:
            const newUsersData = state.usersData.map((elObj) => {
                return elObj.name === action.checkedUser.name? { ...elObj, select:true} : elObj ;
            });
            
            return {
                ...state,
                usersData: newUsersData,
                checkedUsers: [
                    ...state.checkedUsers,
                    action.checkedUser
                ]
            };
        
        case actions.UNCHECKED_USER: 
            const newUserData = state.usersData.map((elObj) => {
                return elObj.name === action.uncheckedUser.name? { ...elObj, select:false} : elObj ;
            });

            return {
                ...state,
                usersData:newUserData,
                checkedUsers: state.checkedUsers.filter((checkedUserObj) => { 
                    return checkedUserObj.name!== action.uncheckedUser.name;
                })
            };

        case actions.UPDATE_CHECKED_USERS:
            return {
                ...state,
                checkedUsers: []
            };

        case actions.SET_RANDOM_NUMBER:
            return {
                ...state,
                randomNum: action.randomNum
            };

        case actions.SET_WINNING_USERS:
            return {
                ...state,
                winningUsers: action.winningUsers
            };
        
        default: 
            return state;
    }
};

export default reducer;