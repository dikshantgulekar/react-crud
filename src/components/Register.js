import React, {  useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Menu from "./Menu";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import {getDatabase , ref, set, push} from 'firebase/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RegisterComp() {

  let navigate = useNavigate();
  let [inputValue1 , setInputValue1] = useState("");
  let [inputValue2 , setInputValue2] = useState("");
  let [inputValue3 , setInputValue3] = useState("");
  let [inputValue4 , setInputValue4] = useState("");
  let [inputValue5 , setInputValue5] = useState("");


  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  async function myfunction(value) {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "crud/users"));
    set(newDocRef ,{

        name : inputValue1,
        mobile : inputValue2,
        email : inputValue3,
        password : inputValue4,
        cpassword : inputValue5

    })
    .then(()=>{
        // alert("data  save successfully")
        // navigate("/show-users")

        toast.success("REGISTER SUCCESSFUL!", { position: 'top-center' });
        setTimeout(() => {
            navigate('/show-users');
        }, 3000); 
    })
    .catch((error)=>{
        toast.error("Something went wrong", { position: 'top-center' });
      console.error("Login error:", error);
    })

    var record = JSON.stringify(value);
    console.log(record);


  }
  return (
    <>
      <Menu />

      <Container>
        <h1>Register Form</h1>

        <Form className="form-group" onSubmit={handleSubmit(myfunction)}>
          <input
            {...register("name", { required: true, minLength: 8 })}
            className="form-control"
            type="text"
            placeholder="name"
            value={inputValue1}
            onChange={(ev)=>{setInputValue1(ev.target.value)}}
          />

          {errors.name?.type === "required" && (
            <p className="alert alert-danger">Name is required</p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="alert alert-danger">Name mimLength:8</p>
          )}
          <br />

          <input
            {...register("mobile", {
              required: true,
              maxLength: 10,
              minLength: 10,
              pattern: /^[0-9]+$/,
            })}
            className="form-control"
            type="text"
            placeholder="mobile"
            value={inputValue2}
            onChange={(ev)=>{setInputValue2(ev.target.value)}}
          />

          {errors.mobile?.type === "required" && (
            <p className="alert alert-danger">Mobile number is required</p>
          )}
          {errors.mobile?.type === "minLength" && (
            <p className="alert alert-danger">
              Mobile number must be exactly 10 digits
            </p>
          )}
          {errors.mobile?.type === "maxLength" && (
            <p className="alert alert-danger">
              Mobile number must be exactly 10 digits
            </p>
          )}
          {errors.mobile?.type === "pattern" && (
            <p className="alert alert-danger">
              Mobile number must contain only digits
            </p>
          )}
          <br />

          <input
            {...register("email", {
              required: true,
              pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
            })}
            className="form-control"
            type="text"
            placeholder="email"
            value={inputValue3}
            onChange={(ev)=>{setInputValue3(ev.target.value)}}
          />

          {errors.email?.type === "required" && (
            <p className="alert alert-danger">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="alert alert-danger">Invalid email format</p>
          )}
          <br />

          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control"
            placeholder="Enter  Password"
            value={inputValue4}
            onChange={(ev)=>{setInputValue4(ev.target.value)}}
          />
          {errors.password?.type === "required" && (
            <p className="alert alert-danger"> password is required</p>
          )}
          <br />
          <input
            {...register("cpassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            type="password"
            className="form-control"
            placeholder="Enter  Confirm Password"
            value={inputValue5}
            onChange={(ev)=>{setInputValue5(ev.target.value)}}
          />

          {errors.cpassword?.type === "required" && (
            <p className="alert alert-danger">Confirm Password is Required</p>
          )}
          {errors.cpassword?.type === "validate" && (
            <p className="alert alert-danger">
              Confirm Password does not macth
            </p>
          )}
          <br />
          <Button type="submit">ADD USER</Button>
        </Form>
      </Container>
      <ToastContainer />

    </>
  );
}
