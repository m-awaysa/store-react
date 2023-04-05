import axios from 'axios';
import Joi from 'joi';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../Common/CustomInput/CustomInput';

import styles from './Register.module.css';

function Register() {
  let navigate = useNavigate();
  const [serverError, setServerError] = useState([]);
  let [errorList, setErrorList] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });
  let [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const registerSchema = Joi.object({
    name: Joi.string().max(20).min(2).required(),
    age: Joi.number().min(20).max(80).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(16).required(), //pattern(/^[A-Z][a-z]{3,8}$/).
    cPassword: Joi.string().required().min(3).max(16)//.valid(Joi.ref('password')).messages({
    // 'any.only': 'password not match',
    //  }),
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name))
    if (validation.error) {
      setErrorList({ ...errorList, [name]: validation.error.details[0].message })
    } else {
      const err = { ...errorList }
      delete err[name];
      setErrorList({ ...err })
    }
    setInput({ ...input, [name]: value })
  };


  const submitRegister = async (e) => {
    e.preventDefault();

    let err = [];
    if (Object.keys(errorList).length === 0) {
      try {
        let { data } = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup", input);
        if (data.message === 'success') {
          navigate('/login');
          toast.success('Registered successfully please confirm your email');
        } else if (data.message === 'validation error') {
          data.err[0].forEach((error) => {
            if (error.message === "\"cPassword\" must be [ref:password]") {
              err.push({ message: "password not match" })
            } else {
              err.push(error)
            }
          })
          setServerError(err)
        }
      } catch (error) {
        let err = [];
        if (error.response.data.messgae === 'email exist') {
          toast.warning('email already exist');
          err.push({ message: 'email already exist' });
          setServerError(err)
        }
      }
    } else {
      toast.warning('wrong input');
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
                      {serverError.map((err, index) => <div id={index} className="alert alert-danger container col-8">{err.message}</div>)}
                      <form method='post' action='/handle'onSubmit={submitRegister}>
                        <p>Register</p>
                        <CustomInput key={1} error={errorList.name} type="text" placeholder="Enter your Name" onChange={onChange} name="name" />
                        <CustomInput key={2} error={errorList.email} type="email" placeholder="Enter your email" onChange={onChange} name="email" />
                        <CustomInput key={3} error={errorList.password} type="password" placeholder="Enter your Password" onChange={onChange} name="password" />
                        <CustomInput key={4} error={errorList.cPassword} type="password" placeholder="Password Confirmation" onChange={onChange} name="cPassword" />
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className={`btn btn-primary btn-block fa-lg mb-3 ${styles['gradient-custom-2']}`}>Register
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">already have an account?</p>
                          <Link type="button" to="/login" className="btn btn-outline-danger">Login</Link>
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

export default Register