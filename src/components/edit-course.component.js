import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Container from '@material-ui/core/Container';

export default class EditCourse extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCreditUnit = this.onChangeCreditUnit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          description: '',
          duration: 0,
          name: '',
          credit_unit: 0,
          date: new Date(),
          students: [],
          _id:''
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/courses/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              description: response.data.description,
              duration: response.data.duration,
              name: response.data.name,
              credit_unit: response.data.credit_unit,
              date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://localhost:5000/students/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                students: response.data.map(student => student),
                
              });
              let student = response.data.find(student => student.username == this.state.username);
              this.setState({
                  _id : student._id
              });
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
          _id: student._id,
          email: student.email
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
    
        const course = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date,
          name: this.state.name,
          credit_unit: this.state.credit_unit,
          email: this.state.email
        }
    
        console.log(course);
    
        axios.post('http://localhost:5000/courses/update/' + this.props.match.params.id, course)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }
    render(){
        return (<Container>
            <h3>Update Course Log</h3>
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
                <Button type="submit"  color="primary" variant="contained">Update Course</Button>
                </Box>
            </form>
          </Container>
     )
    }
}
