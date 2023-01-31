import '../page-styles/Staff.css'
import DASH from '../components/Dash-bord';
import AttenDataService from "../services/attendance.services";
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/Auth';
import { Table, Icon, Header, Form, Label, Pagination } from 'semantic-ui-react'

const Attendance = ({ getStaffId }) => {

    const [attendance, setAttendance] = useState([]);
    const [name, setName] = useState("");
    const [staffID, setStaffID] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        getAttendance();
    }, [])

    const getAttendance = async () => {
        const data = await AttenDataService.getAllAttendance();
        console.log(data.docs);
        setAttendance(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    const PaginationExamplePagination = () => (
        <Pagination defaultActivePage={5} totalPages={10} />
    )


    if (!isAuthenticated()) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <DASH>
                <div className='page'>
                    <div className='ui dividing header'>
                        <h1>Attendance Management</h1>
                    </div>
                    <div  >
                        <Header as='h3' block >
                            <Form className='ui form' >
                                <div className='ui small header center aligned container '> Search :</div>  <hr />
                                <Form.Group inline >

                                    <Form.Input
                                        className='ui input center aligned container '
                                        label='StaffID'
                                        placeholder='Type Here'
                                        width={6}
                                        onChange={(e) => setStaffID(e.target.value)}
                                    />
                                    <Form.Input
                                        className='ui input center aligned container '
                                        label='Name'
                                        placeholder='Type Here'
                                        width={6}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </Form.Group>
                            </Form>

                            <Form className='ui form' >
                                <Form.Group inline>
                                    <Form.Input
                                        label='Date'
                                        placeholder='xx'
                                        width={6}
                                        type='number'
                                        maxLength={2}

                                        onChange={(e) => setDate(e.target.value)} />
                                    <Form.Input
                                        label='Month'
                                        placeholder='xx'
                                        width={4}
                                        type='number'
                                        maxLength={2}

                                        onChange={(e) => setMonth(e.target.value)} />
                                    <Form.Input
                                        label='Year'
                                        placeholder='xxxx'
                                        width={6}
                                        type='number'
                                        maxLength={4}
                                        onChange={(e) => setYear(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Header>
                    </div>
                    <br />
                    <div>
                        <div>

                            <Table celled PaginationExamplePagination>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Department</Table.HeaderCell>
                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {attendance
                                    .sort((a, b) => a.time < b.time ? 1 : -1)
                                    .filter((doc) => {
                                        return (
                                            doc.StaffID.includes(staffID)
                                            &&
                                            doc.name.includes(name)
                                            &&
                                            doc.Year.includes(year)
                                            &&
                                            doc.Month.includes(month)
                                            &&
                                            doc.date_only.includes(date)
                                        )
                                    })
                                    .map((doc) => {
                                        return (
                                            <Table.Body >
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Label basic size="medium">
                                                            {doc.Year} - {doc.Month} - {doc.date_only}
                                                        </Label>
                                                    </Table.Cell>
                                                    <Table.Cell>{doc.StaffID}</Table.Cell>
                                                    <Table.Cell>{doc.name}</Table.Cell>
                                                    <Table.Cell>{doc.department}</Table.Cell>
                                                    <Table.Cell>{doc.time}</Table.Cell>
                                                    <Table.Cell positive><Icon name='checkmark' />Present</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        )
                                    })
                                }

                            </Table>

                        </div>

                        <br />
                        <br />
                    </div>
                </div>

            </DASH>
        </div>
    )

};



export default Attendance