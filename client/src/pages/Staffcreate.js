import DASH from '../components/Dash-bord';
import StaffDataService from '../services/staffs.services';
import '../page-styles/Staff.css'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { storage } from '../firebase-config';
import { Form, Input, TextArea, Button, Image } from 'semantic-ui-react';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Staffcreate = () => {
  const [profile, setProfile] = useState("");
  const [staff, setStaff] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");
  const [remark, setRemark] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      staff === "" ||
      fname === "" ||
      lname === "" ||
      email === "" ||
      phone === "" ||
      department === "" ||
      dob === "" ||
      job === "" ||
      gender === ""
    ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newStaff = {
      imgUrl,
      staff,
      fname,
      lname,
      email,
      department,
      job,
      dob,
      gender,
      phone,
      remark
    }
    console.log(newStaff);

    try {
      await StaffDataService.addStaffs(newStaff);
      setMessage({ error: false, msg: "Staff added sucessfully" })
    } catch (err) {
      setMessage({ error: true, msg: err.message });

    }

    setProfile("");
    setImgUrl("");
    setStaff("");
    setFname("");
    setLname("");
    setEmail("");
    setDepartment("");
    setJob("");
    setDob("");
    setGender("");
    setPhone("");
    setRemark("");

    window.location.reload(false);


  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
    }
  }

  console.log("image :", profile)

  const uploadProfile = (e) => {
    e.preventDefault()
    if (!profile) return;
    const storageRef = ref(storage, `profiles/${profile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, profile);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          alert("Profile Updated")
        });
      }
    );
  }

  return (

    <div>
      <DASH>
        <div className='page'>
          <div className='ui dividing header'>
            <h1>Staff Registation</h1>
          </div>

          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissble
              onClose={() => setMessage("")}
            >
              {" "}
              {message?.msg}
            </Alert>
          )}


          <Form onSubmit={handleSubmit} success>

            <div className="ui center aligned container">
              <Image
                type={Input}
                src={imgUrl}
                control={Input}
                size='medium'
                centered
                rounded
              />
              <br />
              <div className='input box'>
                <div className="ui input">
                  <input
                    accept=".jpg, .png, .jpeg"
                    type="file"
                    placeholder="Search..."
                    onChange={handleChange}
                  />
                </div>
                &nbsp;
                <div className='ui small compact button' onClick={uploadProfile} >Save</div>
              </div>

            </div>
            <br />

            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-staff-id'
                control={Input}
                label='Staff ID'
                placeholder='Staff ID'
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
              />
              <Form.Field
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                placeholder='joe@schmoe.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <Form.Field
                id='form-input-control-phone-number'
                control={Input}
                label='Phone Number'
                placeholder='xxx xxxxxxx'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <Form.Field
                id='form-input-control-lab-name'
                control={Input}
                label='Department'
                placeholder='Lab'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-dateofbirth-name'
                control={Input}
                label='D.O.B'
                placeholder='Date of Birth'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <Form.Field
                id='form-input-control-role-name'
                control={Input}
                label='Job Role'
                placeholder='role'
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>

            <Form.Group widths='equal'>

              <Form.Field
                control={Input}
                id='form-input-control-gender-name'
                label='Gender'
                placeholder='Gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Field
                id='form-input-control-remark-name'
                control={TextArea}
                label='Remarks'
                placeholder='text'
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />

            </Form.Group>

            <Button className='ui blue button' type='submit'>
              Add
            </Button>
          </Form>
          <br /><br /><br />
        </div>

      </DASH>
    </div>
  )
}
export default Staffcreate;
