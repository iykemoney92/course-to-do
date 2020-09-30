import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
          students: []
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/students/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                students: response.data.map(student => student.username),
                username: response.data[0].username
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
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
    
      onChangeDate(date) {
        this.setState({
          date: date
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
          credit_unit: this.state.credit_unit
        }
    
        console.log(course);
    
        axios.post('http://localhost:5000/courses/add', course)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }
    render(){
        return (
    <div>
      <h3>Create New Course Log</h3>
      <form onSubmit={this.onSubmit}>
        <div > 
          <label>Username: </label>
          
          <TextField select ref="userInput"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.students.map(function(student) {
                  return <option 
                    key={student}
                    value={student}>{student}
                    </option>;
                })
              }
          </TextField>
        </div>
        <div > 
          <label>Name: </label>
          <TextField required type="text"
              
              value={this.state.name}
              onChange={this.onChangeName}
               />
        
        </div>
        
        <div > 
          <label>Credit Unit: </label>
          <TextField required type="number"
              
              value={this.state.credit_unit}
              onChange={this.onChangeCreditUnit}
               />
        </div>
        <div > 
          <label>Description: </label>
          <TextField required type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
               />
        
        </div>
        <div >
          <label>Duration (in minutes): </label>
          <TextField required type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}/>
          </div>
        <div >
          <label>Date: </label>
          <div>
            <TextField
            type="date"
              defaultValue={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div >
          <Button type="submit"  color="primary" >Create New Course</Button>
        </div>
      </form>
    </div>
     )
    }
}
