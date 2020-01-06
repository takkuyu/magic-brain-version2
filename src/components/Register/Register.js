import React from 'react';
import './Register.css';

class Register　extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name:''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://gentle-lake-86764.herokuapp.com/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response =>response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        return (
            <article className="br3 ba b--white-10 mv4 mw6 center" style={{height:'450px', width:'70%'}}>
                <main className="pa4 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent white w-100" 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent white w-100" 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
    
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;