import '../page-styles/Staff.css'
import DASH from '../components/Dash-bord';
import StaffDataService from "../services/staffs.services";
import React, { useState, useRef, useEffect } from "react";
import { doc } from 'firebase/firestore';
import { Form } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { isAuthenticated } from '../services/Auth';

const QrCode = ({ id, setStaffId }) => {

  const [staff, setStaff] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const detailsHandler = async () => {
    setMessage("");
    try {
      const docSnap = await StaffDataService.getStaff(id);
      console.log("The record is : ", docSnap.data())
      setStaff(docSnap.data().staff);
      QrCreate(docSnap.data().staff);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }

  useEffect(() => {
    console.log("The id here is:", id);
    if (id !== undefined || id !== "") {
      detailsHandler();
    }
  }, [id])

  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const downloadQRCode = async (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/jpeg");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = "qr.jpeg";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const QrCreate = async (id) => {
    setUrl(id);
  }

  const qrcode = (
    <QRCode
      value={url}
      size={400}
      bgColor={"#ffffff"}
      level={"H"}
      bgSize={400}
      includeMargin={true}
    />
  );

  if (!isAuthenticated()) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <DASH>
        <div className="page">
          <div className="ui dividing header">
            <h1>QR Generator</h1>
          </div>

          <div className="ui qrcode center aligned container">
            <div ref={qrRef}>{qrcode}</div>
            <div className="input__group">

              <Form key={doc.id}>
                <div className="ui small header" >
                  Staff ID : &nbsp; &nbsp;
                  <div class="ui input">
                    <input type="text" defaultValue={staff} value={staff} readOnly />
                  </div>
                </div>
              </Form>

              <br />
              <br />

              <div onClick={downloadQRCode} type="submit" className="ui blue button">
                Download
              </div>

            </div>
          </div>
        </div>

      </DASH>
    </div>

  );
};

export default QrCode;