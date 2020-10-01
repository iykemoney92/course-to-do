import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { LibraryBooks, LocalLibrary } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


let handleNav = (event, newValue) => {
  switch(newValue){
    case 1:
      window.location.replace('/');
      break;
      case 0:
        window.location.replace('/student');
        break;
    default:
      break;
  }
  console.log([event, newValue]);
}

export default class Nav extends Component{
    
  
  render(){
        return (
    <BottomNavigation showLabels onChange={handleNav}>
      <BottomNavigationAction label="Students" icon={<LocalLibrary  />} />
      <BottomNavigationAction label="Courses" icon={<LibraryBooks/>} />
    </BottomNavigation>
     )
    }
}
