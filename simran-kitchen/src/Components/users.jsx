import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assests/logo.jpeg';
import './admin.css';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        // Perform any logout logic here
        navigate('/');
    };

    // const handleEdit = (userId) => {
    //     // Implement edit user logic here
    //     console.log('Edit user:', userId);
    // };

    const handleDelete = async (userId) => {
        // Implement delete user logic here
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="logo" className="logo" />
                    <h1 className="name">Simran's Kitchen</h1>
                </div>
                <div className="navbar-right">
                    <div className="nav-links">
                        <Link to="/admin" className="nav-link">Home</Link>
                        <Link to="/users" className="nav-link">Users</Link>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>

            <div className="users-container">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>
                                    {/* <button onClick={() => handleEdit(user._id)}>Edit</button> */}
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
