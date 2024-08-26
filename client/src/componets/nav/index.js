import React from "react";
import NavStyles from "./Nav.module.css"
import {Link, Routes} from "react-router-dom"
import {connect} from "react-redux"
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux"
import {LOGOUT} from "../../redux/const/actionsTypes"
import { useNavigate } from "react-router-dom";
function Nav(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authenticated,
        setAuthenticated] = useState(false)

    useEffect(() => {
        if (props.auth.authData) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [props.auth])

    function handleLogOut(e) {
        e.preventDefault()
        navigate('/account/login');
        dispatch({type: LOGOUT})
    }
    return (
        <nav className={NavStyles.mainNav}>
            <div>
                <h3>LSYSTEM</h3>
            </div>
            <div>
                {authenticated ?
                 <div className={NavStyles.rightSideNav}>
                 <i class="fa-solid fa-user"></i>
                 <div>
                     <span className="d-blcok">Account</span>
                     <div className={NavStyles.container2}>
                         <Link className={`d-block ${NavStyles.linkBTN}`} to="/account/profile">Profile</Link>
                         <span className={NavStyles.or}>or</span>
                         <Link onClick={handleLogOut} className={NavStyles.linkBTN} to="/account/login">Logout</Link>
                     </div>
                 
                 </div>
             </div>
                 : 
                 <div className={NavStyles.rightSideNav}>
                 <i class="fa-solid fa-user"></i>
                 <div>
                     <span className="d-blcok">Account</span>
                     <div className={NavStyles.container2}>
                         <Link className={`d-block ${NavStyles.linkBTN}`} to="/account/login">Login</Link>
                         <span className={NavStyles.or}>or</span>
                         <Link className={NavStyles.linkBTN} to="account/signup">Singup</Link>
                     </div>
                 
                 </div>
             </div>
                }
              
            </div>

        </nav>
    )
}

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(Nav);



