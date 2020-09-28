import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { LibraryBooks, LocalLibrary } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';



export default class Nav extends Component{
    
    render(){
        return (
    <BottomNavigation showLabels >
      <BottomNavigationAction label="Students" icon={<LocalLibrary  />} />
      <BottomNavigationAction label="Courses" icon={<LibraryBooks/>} />
    </BottomNavigation>
     )
    }
}
