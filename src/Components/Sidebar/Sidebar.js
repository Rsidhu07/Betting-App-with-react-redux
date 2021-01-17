import './Sidebar.css';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setRandomNumber, setWinningUsers} from '../../store/actions/action';


const Sidebar = (props) => {

    const { checkedUsers, onSetRandonNumber, onSetWinningUsers } = props;

    const checkWinner = (checkedUsersList) => {
        const randomNum = (Math.floor((Math.random()*10) + 1));

        onSetRandonNumber(randomNum);

        const winningUser = checkedUsersList.filter((checkUser) => {
            return checkUser.bet == randomNum;
        });


        return winningUser;
    };

    const startButtonHandler =() => { 

        if (props.checkedUsers.length < 9){
            return alert('Select 9 Players');
        }

        const winningUsers = checkWinner(checkedUsers);

        onSetWinningUsers(winningUsers)

        console.log('winning user is ====.>>', winningUsers);


        return props.history.push('/result');
    };

    return (
        <div className='Sidebar'>
            <h2 className='h2-heading'>Playing 9</h2>

            {props.checkedUsers.map((checkedUser)=>{
                return (
                    <div className ='userContainer' key={Math.random()*50}>

                        <img className='image' src={checkedUser.avatar} alt='loading Avatar' width='50' height='50'>
                        </img>
                        <div className='iconContainer'>
                            <h3 className='h3-name'>{checkedUser.name}</h3>
                            <i className="fas fa-trophy wins">
                                <h3 className='h3-wins'> {checkedUser.wins}</h3></i>
                            <i className="fas fa-atom bet">
                                <h3 className='h3-bet'>{checkedUser.bet}</h3></i>
                            <i className="fas fa-dollar-sign price">
                                <h3 className='h3-price'>{checkedUser.price}</h3></i>
                        </div>
                    </div>
                );
            })}
            <button onClick={startButtonHandler} className='start-button' type='button'>Start</button>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        checkedUsers: state.checkedUsers
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetRandonNumber:(randomNum)=>{dispatch(setRandomNumber(randomNum))},
        onSetWinningUsers : (winningUsers) => { dispatch(setWinningUsers(winningUsers))}    
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Sidebar));
