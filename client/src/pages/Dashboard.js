import React from 'react';
import '../page-styles/Staff.css'
import IMG from '../images/square-logo-remove-bg.png';
import DASH from '../components/Dash-bord';
import { Header, Image, List } from 'semantic-ui-react';
import { isAuthenticated } from '../services/Auth';
import { Navigate } from 'react-router-dom';

const All = () => {

    if (!isAuthenticated()) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <DASH>
                <div className='page'>
                    <Header as='h1' dividing>
                        <Image circular src={IMG} /> Welcome to qRec
                    </Header>
                    <Header as='h2'> qRec is a QR based attendance system.</Header>
                    <br />
                    <List verticalAlign='middle' size='large'>
                        <ul>
                            <List.Item>
                                <li> Attendance Management keeps track of your employee or students present/absent details.</li>
                            </List.Item>
                            <List.Item> <br />
                                <li>        It is the system to document the time your employees/students work and the time they take off.</li>
                            </List.Item>
                            <List.Item> <br />
                                <li>       This is a computer vision based attendance system prototype that was developed for the DreamSpace Academy to manage the students attendances in a proper way.</li>
                            </List.Item>
                            <List.Item> <br />
                                <li>     This system is using the QR technology as an identity to index the employees/students.</li>
                            </List.Item>
                            <List.Item> <br />
                                <li>      Every students or employees will have an identity card that was printed with a QR code. When they scan the QR code, it takes attendance of the particular student or employee.</li>
                            </List.Item>
                            <List.Item> <br />
                                <li>     This computerized system is using a camera as the QR code reader, because it is based on computer vision technology.</li>
                            </List.Item> <br />
                        </ul>
                    </List>
                </div>
            </DASH>
        </div>

    );
};

export default All;