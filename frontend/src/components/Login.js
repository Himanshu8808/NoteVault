import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password:""});
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.Success){
            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            navigate('/')
            props.showAlert("Welcome back! You've successfully logged in.","success")
        }
        else{
            props.showAlert("Login failed. Incorrect username or password.","danger")
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="mt-3">
            <h2>Login to continue to inotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Email Address</strong></label>
                    <input type="email" autoComplete="on" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"><strong>We'll never share your email with anyone else.</strong></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                    <input type="password" autoComplete="on" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login