import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Course = props => ( 
    <TableRow key={props.course.name}>
    <TableCell component="th" scope="row">
    {props.course.username}
    </TableCell>
    <TableCell align="right">{props.course.name}</TableCell>
    <TableCell align="right">{props.course.credit_unit}</TableCell>
    <TableCell align="right">{props.course.description}</TableCell>
    <TableCell align="right">{props.course.duration}</TableCell>
    <TableCell align="right">{props.course.date.substring(0,10)}</TableCell>
    <TableCell align="right"><Link href={"/edit/"+props.course._id}>
        Edit
      </Link></TableCell>
    
  </TableRow>
)

export default class Courses extends Component{
    constructor(props) {
        super(props);
    
        this.deleteCourse = this.deleteCourse.bind(this)
    
        this.state = {courses: []};
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/courses/')
          .then(response => {
            this.setState({ courses: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteCourse(id) {
        axios.delete('http://localhost:5000/course/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          courses: this.state.courses.filter(el => el._id !== id)
        })
      }
    
      exerciseList() {
        return this.state.courses.map(currentcourse => {
          return <Course course={currentcourse} deleteCourse={this.deleteCourse} key={currentcourse._id}/>;
        })
      }
    render(){
        return (
            <div>
                <div>
                        <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Credit Unit</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { this.exerciseList() }
                </TableBody>
                </Table>
                </TableContainer>
                </div>
                <div><Button href="/create" variant="contained" color="primary">Add New Course</Button>
              </div>
              
            </div>
     )
    }
}
