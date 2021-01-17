import React, { useEffect } from 'react';
import './Result.css';
import { connect } from 'react-redux';
import { updateCheckedUsers } from '../../store/actions/action';


const Result = (props) => {

    const {onUpdateCheckedUsers, checkedUsers, history, winningUsers, randomNum} = props;

    useEffect(()=> {
        if(checkedUsers.length === 0){
            return history.push('/');
        }
    },[]);

    const clickHander = () => {

        //resetting checkedUsers array in global state
        onUpdateCheckedUsers();
        return props.history.push('/');
    };

    //get lose or win class(logic can be improved)
    const getWinLoseClass = (checkedUserInCard) => {
        
        let classLoseWin =[];
            winningUsers.forEach(winningUser => {
                if(checkedUserInCard.name === winningUser.name){
                    return classLoseWin.push('h3-win');
                }
                return classLoseWin.push('');
            });

        console.log('classlose win is ===>>>', classLoseWin);

        if(classLoseWin.length>0){
            return classLoseWin.join('');
        } else {
            return '';
        }

        
    };
    
    return (
        <div className='Result'>

            <button onClick={clickHander} className='back-button' type='button'>Back</button>
            <h3 className='text-result'>Result:</h3>
            <div className='resultNumber'><h3>{randomNum}</h3></div>
            <div className='resultUsersContainer'>
                {checkedUsers.map((checkedUser) => {
                    return (
                        <div className={(((getWinLoseClass(checkedUser)) === '' )? ('card') : ('card card-win'))} key ={Math.random()*12}>
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
                            <h3 className={ 
                                (((getWinLoseClass(checkedUser)) === '' )? ('h3-lose') : ('h3-win'))}>
                                {(((getWinLoseClass(checkedUser)) === '' )? ('LOSE') : ('WINNER'))}
                            </h3>
                        </div>
                    );
                })}

            </div>
            
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