import '../page-styles/Loginpage.css';
import logo from '../images/logo2.png'
import { useState } from 'react';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage'
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/Auth';


export default function Loginpage() {

    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true)
            //sending login api request
            LoginApi(inputs).then((response) => {
                storeUserData(response.data.idToken);
            }).catch((err) => {
                if (err.code = "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: "Invalid password or username." })
                }

            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({ ...errors });

    }

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/dash" />
    }

    return (

        <div>

            <section className="login-block">
                <img src={logo} width="200px" />
                <h1>Welcome to qRec</h1>
                <div className="r-container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handleSubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email" className="form-control" onChange={handleInput} name="email" id="" placeholder="Email" />
                                    {errors.email.required ?
                                        (<span className="text-danger" >
                                            Email is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" type="password" onChange={handleInput} name="password" placeholder="Password" id="" />
                                    {errors.password.required ?
                                        (<span className="text-danger" >
                                            Password is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <br />
                                    {loading ?
                                        (<div className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                                <span className="sr-only"> </span>
                                            </div>
                                        </div>) : null
                                    }
                                    <span className="text-danger" >
                                        {errors.custom_error ?
                                            (<p>{errors.custom_error}</p>)
                                            : null
                                        }
                                    </span>
                                    <input type="submit" className="btn btn-login float-right" disabled={loading} value="Login" />
                                </div>
                                <div className="clearfix"></div>
                                {/* <div className="form-group">
                                    Create new account ? Please <Link to="/register">Register</Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}