import React from 'react'
import { signInWithPopup  } from 'firebase/auth'
import { auth, provider } from '../firebase/firebase.js'
import { useNavigate } from 'react-router-dom';

const Login = ({setLoggedIn}) => {
    const navigate = useNavigate()

    const login = () => {
        signInWithPopup(auth, provider)
        .then(function(){
            const username = auth.currentUser.displayName
            const email = auth.currentUser.email
            // setloggedIn.setloggedIn(true)
            setLoggedIn(true);
            navigate('/booklist')
            // console.log(username, email)
        })
        .catch(function(error){
            console.log(error)
        })
    };

    return(
        <div className='container pt-5 pb-5'>
            <div className="row pt-5">
                <div className="col-md-3 mx-auto mt-5">
                    <div>
                        <button onClick={login}  className='btn search-btn'>Continue With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;