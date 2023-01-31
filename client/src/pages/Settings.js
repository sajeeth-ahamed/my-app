import '../page-styles/Staff.css'
import DASH from '../components/Dash-bord';
import React, { useState } from 'react';
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { Navigate, Link } from 'react-router-dom';
import { isAuthenticated } from '../services/Auth';
import { Header, Icon, Button, Form, FormField } from 'semantic-ui-react'

const Settings = () => {

  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }
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
      //sending register api request
      RegisterApi(inputs).then((response) => {
        storeUserData(response.data.idToken);
      }).catch((err) => {
        if (err.response.data.error.message == "EMAIL_EXISTS") {
          setErrors({ ...errors, custom_error: "Already this email has been registered!" })
        } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
          setErrors({ ...errors, custom_error: "Password should be at least 6 characters!" })
        }

      }).finally(() => {
        setLoading(false)
      })
    }
    console.log(initialStateErrors, errors);
    setErrors(errors);

    window.location.reload(false);
    alert("User Added")

  }

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  if (!isAuthenticated()) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <DASH>
        <div className='page'>

          <div className="ui dividing header">
            <Header as='h1'>
              <Icon name='settings' />
              <Header.Content>
                Account Settings
                <Header.Subheader>Manage your preferences</Header.Subheader>
              </Header.Content>
            </Header>
          </div>

          <br />

          <div className='register'>
            <div >
              <h2>Register a new User</h2>
            </div>

            <br />

            <Form onSubmit={handleSubmit} className="register-form" action="" >
              <div className="form-group">
                <FormField>
                  <label htmlFor="exampleInputEmail1" >Name</label>
                  <input type="text" className="username" onChange={handleInput} name="name" id="" placeholder="Username" />
                  {errors.name.required ?
                    (<span className="text-danger" >
                      Name is required.
                    </span>) : null
                  }
                </FormField>

              </div>
              <div className="form-group">
                <FormField>
                  <label htmlFor="exampleInputEmail1" >Email</label>
                  <input type="text" className="mail" onChange={handleInput} name="email" id="" placeholder="Email" />
                  {errors.email.required ?
                    (<span className="text-danger" >
                      Email is required.
                    </span>) : null
                  }
                </FormField>


              </div>
              <div className="form-group">
                <FormField>
                  <label htmlFor="exampleInputPassword1" >Password</label>
                  <input className=" pass" type="password" onChange={handleInput} name="password" id="" placeholder="Password" />
                  {errors.password.required ?
                    (<span className="text-danger" >
                      Password is required.
                    </span>) : null
                  }
                </FormField>

              </div>
              <div className="form-group">
                <span className="text-danger" >
                  {errors.custom_error ?
                    (<p>{errors.custom_error}</p>)
                    : null
                  }
                </span>
                {/* {loading ?
                  (<div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>) : null
                } */}
              </div>
              <div className="clearfix"></div>
            </Form>
            <br />
            < Button type="submit" className="ui primary button" disabled={loading} value="Register" onClick={handleSubmit}>Register </Button>
          </div>
          <br />
          <br />
          {/* <div className='pass-change'>
            <div >
              <h2>Change Your Account Password</h2>
            </div>

            <br />

            <Form>
              <Form.Field>
                <label>Current Password</label>
                <input placeholder='Current password' />
              </Form.Field>

              <Form.Field>
                <label>New Password</label>
                <input placeholder='New password' />
              </Form.Field>
              <Button primary type='confirm'>Confirm</Button>
            </Form>
          </div> */}

        </div>

      </DASH >
    </div >
  );
};

export default Settings;