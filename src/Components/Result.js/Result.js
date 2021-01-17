import React, { useEffect } from 'react';
import './Result.css';
import { connect } from 'react-redux';
import { updateCheckedUsers } from '../../store/actions/action';


const Result = (props) => {

    const {onUpdateCheckedUsers, checkedUsers, history} = props;

    useEffect(()=> {
        if(checkedUsers.length === 0){
            return history.push('/');
        }
    },[]);

    const clickHander = () => {

        //resetting checkedUsers array in state
        onUpdateCheckedUsers();
        return props.history.push('/');
    };

    return (
        <div className='Result'>
            
            {checkedUsers.map((checkedUser) => {
                return (
                    <div className='card'>
                        <img className='result-img' src={checkedUser.avatar} width='60' height='60' alt='Avatar'></img>
                        <h3 className='h3-result-name'> { checkedUser.name }</h3>
                        <h3 className='h3-result-level'> level { checkedUser.level }</h3>
                        <div className='result-iconContainer'>
                            <i className="fas fa-trophy result-wins">
                                <h3 className='h3-result-wins'> {checkedUser.wins}</h3></i>
                            <i className="fas fa-atom result-bet">
                                <h3 className='h3-result-bet'>{checkedUser.bet}</h3></i>
                            <i className="fas fa-dollar-sign result-price">
                                <h3 className='h3-result-price'>{checkedUser.price}</h3></i>
                        </div>
                        <h3 className='h3-lose'>Lose</h3>
                    </div>
                );
            })}

            <button onClick={clickHander} className='back-button' type='button'>Back</button>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        checkedUsers: state.checkedUsers,
        randomNum: state.randomNum,
        winningUsers: state.winningUsers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCheckedUsers: ()=> { dispatch(updateCheckedUsers())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);