import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();
    const host = process.env.REACT_APP_HOST;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        // Check if password and confirm password match
        if (password !== cpassword) {
            // Passwords do not match, show an error message
            props.showAlert("Password mismatched", "danger");
            return; // Exit the function early
        }
        const url = `${host}/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.Success){
            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            navigate('/')
            props.showAlert("Congratulations! Your account has been created successfully.","success")
        }
        else{
            props.showAlert("Invalid credentials. Please ensure all fields are filled correctly.","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                    <input type="text" placeholder='Min 3 characters' className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Email Address</strong></label>
                    <input type="email" placeholder="Enter a valid email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"><strong>We'll never share your email with anyone else.</strong></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                    <input type="password" placeholder="Min 8 characters" className="form-control" id="password" name="password" onChange={onChange} minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"><strong>Confirm Password</strong></label>
                    <input type="password" placeholder="Min 8 characters" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={8} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup