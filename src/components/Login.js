import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import app from '../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'crud/users');

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userArray = Object.values(users);
        
        // Find a matching user with the same email and password
        const user = userArray.find(user => user.email === data.email && user.password === data.password);

        if (user) {
          toast.success("Login successful!", { position: 'top-center' });
          setTimeout(() => {
            navigate('/loginSuccess');
          }, 2000);
        } else {
          toast.error("Invalid email or password", { position: 'top-center' });
        }
      } else {
        toast.error("No users found in the database", { position: 'top-center' });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Error during login", { position: 'top-center' });
    }
  };

  return (
    <>
      <Menu />
      <Container className="mt-5">
        <h1 className="text-center mb-4">LOGIN PAGE</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: "Email is required" })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: "Password is required" })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100">SUBMIT</Button>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}
