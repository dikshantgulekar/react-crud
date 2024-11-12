import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import '../index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Showusers() {
  var [userData, setUserData] = useState([]);
  var navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, "crud/users");
        const snapShot = await get(dbRef);
        if (snapShot.exists()) {
          var mydata = snapShot.val();
          var temporaryArray = Object.keys(mydata).map((userid) => {
            return {
              ...mydata[userid],
              uid: userid,
            };
          });
          setUserData(temporaryArray);
        } else {
          alert("No data found");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Error fetching data");
      }
    }

    fetchData();
  }, []);

  async function deleteData(userid) {
    console.log(userid);
    const db = getDatabase(app);
    const dbRef = ref(db, "crud/users/" + userid); 
    await remove(dbRef);

    // window.location.reload();

    toast.success("DELETE SUCCESSFUL!",{ position: 'top-center' });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  }

  async function deleteAll() {
    console.log('test');
    const db = getDatabase(app);
    const dbRef = ref(db, "crud/users/"); 
    await remove(dbRef);

    toast.success("DELETE SUCCESSFUL!", { position: 'top-center' });
      setTimeout(() => {
        navigate('/');
      }, 2000);
  }

  return (
    <>
      <Menu />
      <h1 className="text-center">User List</h1>
      
      {userData && userData.length > 0 && (
        <div className="container">
            <div id="deleteallbtn" className="text-end">
            <button className="btn btn-dark" onClick={() => {
                        deleteAll();
                      }}>
                      DELETE ALL<MdDelete />
                </button>
            </div>
            <br/>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/edit-users/${item.uid}`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <Link
                      onClick={() => {
                        deleteData(item.uid);
                      }}
                    >
                      <MdDelete />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        </div>
        
      )}
      <ToastContainer />
    </>
  );
}
