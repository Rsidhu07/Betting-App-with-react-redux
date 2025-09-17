import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Searchbar from './Components/Searchbar/Searchbar';
import UsersList from './Components/UsersList/UsersList';
import SideBarUI from './Components/SideBarUI/SideBarUI';
import Result from './Components/Result.js/Result';
import { Routes, Route } from 'react-router-dom';
import {Fragment} from 'react';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <div className='SideBar'>
                <SideBarUI />
                <Sidebar />    
              </div>
              <div className='UserAndSearchContainer'>
                <Searchbar />
                <UsersList />
              </div>
            </Fragment>
          }
        />
        <Route path="/result" element={<Result />} />
      </Routes>

      

     
    </div>
  );
}

export default App;
