import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.jsx";

export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if (!token){
        return <Navigate to='/login'/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="#">Documentation</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        <h1>{import.meta.env.VITE_APP_NAME}</h1>
                    </div>
                    <div>
                        <h4>
                            {user.name} &nbsp; &nbsp;
                            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                        </h4>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
