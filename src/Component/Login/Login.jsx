import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css'

function Login({ setUserData }) {
  let navigate = useNavigate();
  const [serverError, setServerError] = useState([]);
  let [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = async (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const validationRegisterUser = (user) => {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(), //pattern(/^[A-Z][a-z]{3,8}$/).
    });
    return schema.validate(user, { abortEarly: false });
  }

  const submitRegister = async (e) => {
    e.preventDefault();
    let resultValidation = validationRegisterUser(user)
    if (resultValidation.error) {
      setErrorList(resultValidation.error.details);
    } else {
      setErrorList([]);
      try {
        const result = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin", user,);
        if (result.data.message === 'success') {
          localStorage.setItem("token", result.data.token);
          setUserData(result.data.token);
           navigate('/home');
        }
      } catch (error) {
        let err = [];
        if (error.response.data.message === 'invalid account') {
          err.push(error.response.data);
          setServerError(err)
        }

      }

    }
  }

  return (
    <>
      <section className='h-100'>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: 185 }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Fake API Store</h4>
                      </div>
                      <form onSubmit={submitRegister}>
                        {errorList.map((err, index) => <div id={index} className="alert alert-danger container ">{err.message}</div>)}
                        {serverError.map((err, index) => <div id={index} className="alert alert-danger container ">{err.message}</div>)}
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input onChange={onChange} className="form-control" type="email" name="email" placeholder="Phone number or email address" />
                        </div>
                        <div className="form-outline mb-4">
                          <input onChange={onChange} className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className={`btn btn-primary btn-block fa-lg mb-3 ${styles['gradient-custom-2']}`} >Log
                            in</button>
                          <p><Link className="text-muted" to="/forget-password">I Forgot My Password</Link></p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link type="button" to="/register" className="btn btn-outline-danger">Create new</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={`col-lg-6 d-flex align-items-center ${styles['gradient-custom-2']}`}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Login