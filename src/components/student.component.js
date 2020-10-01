import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Container from '@material-ui/core/Container';

export default class Student extends Component{
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          email: ''
        }
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
      onChangEmail(e) {
        this.setState({
          email: e.target.value
        })
      }
      onSubmit(e) {
        e.preventDefault();
    
        const student = {
          username: this.state.username,
          email: this.state.email
        }
    
        console.log(student);
    
        axios.post('http://localhost:5000/students/add', student)
          .then(res => console.log(res.data));
    
        this.setState({
          username: '',
          email: ''
        })
      }
    render(){
        return (
            <Container>
            <h3>Add Student</h3>
            <form onSubmit={this.onSubmit}>
            <Box>
                <TextField fullWidth required type="text"
                    label="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                     />
              </Box><Box>
                <TextField fullWidth required type="text"
                    label="Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                     />
              </Box>
        <Box>
              <Button type="submit"  color="primary" variant="contained">Create New Student</Button>
              </Box>
                </form>
                </Container>
     )
    }
}
