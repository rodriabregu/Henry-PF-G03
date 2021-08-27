import { useEffect, useState } from "react";
import axios from 'axios';

import config from '../../config';

import { NavLink as Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import './usersInfo.css';

const UsersInfo = () => {

    const [users, setUsers] = useState()

    let token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1OR2xnbWV1eXIwNGxVckxaNDlNdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1rcG84enZneS51cy5hdXRoMC5jb20vIiwic3ViIjoiVkNvYUl0VXA1ZDhZSDdqYVpLQkVrSVpvc0JwQUlrS0tAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWtwbzh6dmd5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjI5ODE5NDY5LCJleHAiOjE2MzA2ODM0NjksImF6cCI6IlZDb2FJdFVwNWQ4WUg3amFaS0JFa0lab3NCcEFJa0tLIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.JBIr53DrV2DEf-ophMsklcvZjsp2XbwX1knR79pN-u3x3wU4WTWj7l27gnvbTavJ3QdI1a6PwMbMkiHnrmXeQHqokqxAsaqEcuqRKvj0YtM3PsxtUzYmiy-EA4HXN7zrsGZiHjV98HZ4mYTYCsqRiTvarfMNmcIcVH2avRMMnxHPMrFHNY9Mdp1de3IG6JNDN3keN1RZftexiX8T7x2KH64aP4L1R8hdFuTGrIWswtmf0Djee2TqdZ3GSx5_t-PLXLmdw_ouUoFH7sHmiNyrYHMcEXi5-ezm3I11z_6FvtgtAAwvhE3Isrpa-eS2GQGs1IhhsMQ3UCCCSWhdEMTxOA'
    const [message, setMessage] = useState('')

    useEffect(() => {
//        axios.get('http://localhost:3001/api/getUsersInfo')
        axios.get(`http://${config.REACT_APP_API_URL}:${config.port}/api/getUsersInfo`)
        .then(resp => {
                console.log(resp.data)
                setUsers(resp.data)
            })
    }, [])


    const handleChange = async (e) => {
        /*
        console.log('quiero ser ',e.target.value)

        var USER_ID = e.target.id //Campo SUB en user Ej. Facundo Auth0
        var API_ID = 'dev-kpo8zvgy.us.auth0.com' //Auth0 Management API System API
        var options = {
            method: 'POST',
            url: `https://${API_ID}/api/v2/users/${USER_ID}/permissions`,
            headers: {
                'content-type': 'application/json',
                'authorization': token,
                'cache-control': 'no-cache'
            },
            body: {
                "permissions": [
                    {
                        resource_server_identifier: "http://securityApi", //aca va la SecurityApi del proyecto nuestro Grupo03henry_securityApi (API audience)
                        permission_name: e.target.value  //permiso que le quiero agregar
                    }
                ]
            }
        }

        console.log(options)

        axios.request(options)
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err))
            */

        let body = {
            id: e.target.id,
            rol: e.target.value
        }
        console.log('mandando ', body)
//        axios.put(`http://localhost:3001/api/putRol`, { id: e.target.id, rol: e.target.value })
        axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/putRol`, { id: e.target.id, rol: e.target.value })
        .then(resp => {
                setMessage(resp.data)
                setTimeout(() => {
                    setMessage('')
                }, 5000)

            })
            .catch(err => {
                setMessage(err.response)
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
    }

    const changeIsActive = (e) => {
        const id = e.target.name;
        const isActive = e.target.value;
//        axios.put('http://localhost:3001/api/deleteUser', { id, isActive })
        axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/deleteUser`, { id, isActive })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    const reset=(e)=>{
        setMessage(`User's ${e.target.id} new password: crotone123`)

        setTimeout(()=>{
            setMessage('')
        },10000)
    }

    return (
        <div className='table-users'>
            <div className='div-btndashuser'>
                <Link to='/adashboard' style={{ textDecoration: 'none' }}>
                <button className='btn-dashuser'> <FiArrowLeftCircle/> Dashboard</button>
                </Link>
            </div>
            <div>
                <h1>Users Info</h1>
                <div className='div-table'>
                    <table>
                        <tr style={{backgroundColor:'#b6b6ec'}}>
                            <td>id</td>
                            <td>userType</td>
                            <td>isActive</td>
                            <td>userName</td>
                            <td>Email</td>
                            <td>Rol</td>
                            <td>Password Reset</td>
                        </tr>
                        {
                            users?.map(u =>
                                <tr>
                                    <td>{u.id}</td>
                                    <td>{u.userType}</td>
                                    {/* <td>{u.isActive ? 'True':'False'}</td> */}
                                    <td>
                                        <span>yes</span>
                                        <input type="radio" name={`${u.id}`} value="true" onClick={changeIsActive} defaultChecked={u.isActive ? true : false} radioGroup={`radio${u.id}`} />
                                        <span>no</span>
                                        <input type="radio" name={`${u.id}`} value="false" onClick={changeIsActive} defaultChecked={!u.isActive ? true : false} radioGroup={`radio${u.id}`} />

                                    </td>
                                    <td>{u.userName}</td>
                                    <td>{u.email}</td>
                                    <select id={u.id} select onChange={handleChange}>
                                        <option value={u.userType} selected disabled hidden>
                                            {u.userType}
                                        </option>
                                        <option>Admin</option>
                                        <option>User</option>
                                        <option>Blocked</option>
                                    </select>
                                    <td><button id={u.id} onClick={reset}>Reset</button></td>
                                </tr>
                            )
                        }
                    </table>
                </div>
            </div>
            <div>{message}</div>
        </div >


    )

}



export default UsersInfo;
