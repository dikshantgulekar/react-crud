import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Menu from "./Menu";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebaseConfig";
import {getDatabase , ref, set, get} from 'firebase/database'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Editusers() {

  let navigate = useNavigate();
  let {userid} = useParams();
  console.log(userid);
  let [inputValue1 , setInputValue1] = useState("");
  let [inputValue2 , setInputValue2] = useState("");
  let [inputValue3 , setInputValue3] = useState("");
//   let [inputValue4 , setInputValue4] = useState("");
//   let [inputValue5 , setInputValue5] = useState("");

 useEffect(()=>{
    async function fetchData() {
        try {
          const db = getDatabase(app);
          const dbRef = ref(db, "crud/users/"+userid);
          const snapShot = await get(dbRef);
          if (snapShot.exists()) {
            const targetObject = snapShot.val();
            setInputValue1(targetObject.name);
            setInputValue2(targetObject.mobile);
            setInputValue3(targetObject.email);
            // setInputValue4(targetObject.password);
            // setInputValue5(targetObject.cpassword);
          } else {
            alert("No data found");
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          alert("Error fetching data");
        }
      }
  
      fetchData();
 }, [userid])

  const {
    register,
    formState: { errors },
    handleSubmit,
    // watch
  } = useForm();

  async function overwrite(value) {
    const db = getDatabase(app);
    const newDocRef = ref(db, "crud/users/"+ userid);
    set(newDocRef ,{

        name : inputValue1,
        mobile : inputValue2,
        email : inputValue3,
        // password : inputValue4,
        // cpassword : inputValue5

    })
    .then(()=>{
        // alert("data  save successfully")
        // navigate("/show-users")

        toast.success("UPDATE SUCCESSFUL!", { position: 'top-center' });
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
        <h1>UPDATE FORM</h1>

        <Form className="form-group" onSubmit={handleSubmit(overwrite)}>
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

          {/* <input
            {...register("password", { required: true })}
            type="text"
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
            type="text"
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
          <br /> */}
          <Button type="submit">UPDATE USER</Button>
        </Form>
      </Container>
      <ToastContainer />

    </>
  );
}
