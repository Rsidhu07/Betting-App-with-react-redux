
import axios from 'axios';


export const GETUSERS = 'GETUSERS';
export const GETUSERSBEGIN = 'GETUSERSBEGIN';
export const GETUSERSSUCCESS ='GETUSERSSUCCESS';
export const GETUSERSFAIL = 'GETUSERSFAIL';
export const CHECKED_USERS ='CHECKED_USERS';
export const UNCHECKED_USER = 'UNCHECKED_USER';
export const UPDATE_CHECKED_USERS = 'UPDATE_CHECKED_USERS';
export const SET_RANDOM_NUMBER   = 'SET_RANDOM_NUMBER';
export const SET_WINNING_USERS = 'SET_WINNING_USERS';


export const setWinningUsers = (winningUsers) => {
    return {
        type: SET_WINNING_USERS,
        winningUsers:winningUsers
    };
};

export const setRandomNumber = (randomNum) => {
    return {
        type: SET_RANDOM_NUMBER,
        randomNum:randomNum
    };
};

export const updateCheckedUsers = () => {
    return {
        type: UPDATE_CHECKED_USERS
    };
}


export const uncheckedUser = (selectedUser) => {
    
    return {
        type: UNCHECKED_USER,
        uncheckedUser:selectedUser
    };
};

export const checkedUsers = (selectedUser) => {
    return {
        type: CHECKED_USERS,
        checkedUser: selectedUser
    };
};

export const getUsersBegin = () => {
    return {
        type: GETUSERSBEGIN
    };
};

export const getUsersSuccess =(usersData) => {

    return {
        type: GETUSERSSUCCESS,
        usersData : usersData
    };
};

export const getUsersFail = () => {
    return {
        type: GETUSERSFAIL
    };
};



export const getUsers = () => {
    return async dispatch => {

        try {
            dispatch(getUsersBegin());

            const res = await 
                axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json');
            
            if(res) {
                
                const newData = res.data.map((dataElement) => {
                    const {Name,Price, Bet} =dataElement;
                    return {
                        select:false,
                        name: Name,
                        level: Math.floor(Math.random()*10),
                        avatar: dataElement['Profile Image'],
                        bet: Bet,
                        wins: Math.floor(Math.random()*30),
                        lost: Math.floor(Math.random()*20),
                        price: Price
                    };
                });


                dispatch(getUsersSuccess(newData));
            
            }

        } catch (e) {
            dispatch(getUsersFail());
            console.log('did not get the api data', e);
        }

        
    };
};