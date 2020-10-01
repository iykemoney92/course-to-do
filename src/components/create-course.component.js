import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Container from '@material-ui/core/Container';

export default class CreateCourse extends Component{
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCreditUnit = this.onChangeCreditUnit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          description: '',
          duration: 0,
          date: new Date(),
          name: '',
          credit_unit:0,
          students: [],
          email:'',
          _id : ''
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/students/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                students: response.data.map(student => student),
                username: response.data[0].username,
                email: response.data[0].email,
                _id: response.data[0]._id
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
      onChangeUsername(e) {
        let student = this.state.students.find(student => student._id ==  e.target.value);
        this.setState({
          username: student.username,
          email: student.email,
          _id: student._id
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        })
      }
    
      onChangeDate(e) {
        this.setState({
          date: new Date(e.target.value)
        })
      }

      onChangeName(e){
          this.setState({
              name: e.target.value
          })
      }

      onChangeCreditUnit(e){
          this.setState({
              credit_unit: e.target.value
          })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const course= {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date,
          name: this.state.name,
          credit_unit: this.state.credit_unit,
          email: this.state.email
        }
    
        console.log(course);
    
        axios.post('http://localhost:5000/courses/add', course)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }
    render(){
        return (
    <Container>
      <h3>Create New Course Log</h3>
      <form onSubmit={this.onSubmit}>
        <Box>
          <TextField fullWidth select ref="userInput"
              required
              label="Username"
              value={this.state._id}
              onChange={this.onChangeUsername}>
              {
                this.state.students.map(function(student) {
                  return <option 
                    key={student._id}
                    value={student._id}>{student.username}
                    </option>;
                })
              }
          </TextField></Box>
        <Box>
          <TextField fullWidth required type="text"
              label="Name"
              value={this.state.name}
              onChange={this.onChangeName}
               />
        </Box>
        <Box>
          <TextField fullWidth required type="number"
              label="Credit Unit"
              value={this.state.credit_unit}
              onChange={this.onChangeCreditUnit}
               /></Box>
        <Box> 
          <TextField fullWidth required type="text"
              label="Description"
              value={this.state.description}
              onChange={this.onChangeDescription}
               />
        </Box>
        <Box>
          <TextField fullWidth required type="text" 
              className="form-control"
              label="Duration (in seconds)"
              value={this.state.duration}
              onChange={this.onChangeDuration}/>
          </Box>
          <Box>
            <TextField fullWidth
            type="date"
            label="Date"
              defaultValue={this.state.date}
              onChange={this.onChangeDate}
            /></Box>
        <Box>
          <Button type="submit"  color="primary" variant="contained">Create New Course</Button>
          </Box>
      </form>
    </Container>
     )
    }
}
