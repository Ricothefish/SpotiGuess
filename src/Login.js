import React from 'react'
//import { Container} from 'react-bootstrap'
import './styles/login.css'




const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=80256b057e324c5f952f3577ff843c29&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"



function Login() {
    return (
        <div className='login'>
            <h1 className="titre-login">Le premier blindtest basé sur vos goûts musicaux.</h1>

            <a href={AUTH_URL}><button className="btn-login">Se connecter avec Spotify</button></a>

        </div>


    )
}

export default Login