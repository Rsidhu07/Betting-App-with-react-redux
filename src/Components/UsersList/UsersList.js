import './UsersList.css';
import React from 'react';
import { connect } from 'react-redux';
import { getUsers, checkedUsers, uncheckedUser } from '../../store/actions/action';
import { useEffect } from 'react';

const UsersList = (props) => {


    const {onGetUsers, onCheckedUsers, onUncheckedUser} = props;

    useEffect(() => {
        
        onGetUsers();

    }, [onGetUsers]);

    const onCheckedHandler = (userName, isChecked) => {
        const newSelectedUser = props.usData.find((el) => {
            return el.name === userName;
        });

        if(props.checkedUsers.length=== 9 && isChecked ===false){
            onUncheckedUser(newSelectedUser);
            return alert('only 9 players can be selected to play');
        }
        
        if(!isChecked){
            onCheckedUsers(newSelectedUser);
        } else {
            onUncheckedUser(newSelectedUser);
        }
    };

    const renderTableData = (tableData) => {

        return tableData.map((tableElement) => {
            
            return (
                <tr key={Math.random()*12}>
                    <td><input type="checkbox" checked ={tableElement.select} onChange ={()=>{onCheckedHandler(tableElement.name,tableElement.select)}}></input></td>
                    <td>{tableElement.name}</td>
                    <td>{tableElement.level}</td>
                    <td><img src={tableElement.avatar} width='30' height='30' alt='Avatar Img'>
                        </img></td>
                    <td>{tableElement.bet}</td>
                    <td>{tableElement.wins}</td>
                    <td>{tableElement.lost}</td>
                    <td>{tableElement.price}</td>
                </tr>);
        })
    };

    const renderTableHeader = (tableData) => {
        const headers = Object.keys(tableData[0]);
        return headers.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
    };

    if(props.loading){
        return (
            <div className= 'UsersList'>
                <p>Loading .....</p>
            </div>
        );
    }

    

    return (
        <div className= 'UsersList'>
           <table id='usersTable'>
                <tbody>
                  <tr>{renderTableHeader(props.usData)}</tr>
                  {renderTableData(props.usData)}
               
                </tbody>
           </table>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        usData: state.usersData,
        loading: state.loading,
        checkedUsers: state.checkedUsers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUsers: () =>{ dispatch(getUsers()) },
        onCheckedUsers:(selectedUser)=> {dispatch(checkedUsers(selectedUser)) },
        onUncheckedUser: (selectedUser) => { dispatch(uncheckedUser(selectedUser))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);
