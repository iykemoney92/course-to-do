import React, { Component } from 'react';


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
    
        console.log(course);
    
        axios.post('http://localhost:5000/students/add', course)
          .then(res => console.log(res.data));
    
        this.setState({
          username: '',
          email: ''
        })
      }
    render(){
        return (
            <div></div>
     )
    }
}
