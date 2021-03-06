import React from 'react'
import './styles/login.css'


const urlClientLocal = 'http://localhost:3000/'
const urlClientOnline= 'https://spotiguess.com'

const urlClient = urlClientOnline


const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=80256b057e324c5f952f3577ff843c29&response_type=code&redirect_uri=${urlClient}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

console.log('url',AUTH_URL)

function Login() {
    return (
        <div className='login'>
            <h1 className="titre-login">Le premier blindtest basé sur vos goûts musicaux.</h1>

            <a href={AUTH_URL}><button className="btn-login">Se connecter avec Spotify</button></a>

        <footer> Made by <a className='link' target="_blank" href='https://github.com/Ricothefish'>Aymeric GRANIER</a></footer>
        </div>


    )
}

export default Login