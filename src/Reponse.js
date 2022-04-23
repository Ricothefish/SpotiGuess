import React, { useEffect, useState }from "react";
import './styles/reponse.css'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: '80256b057e324c5f952f3577ff843c29',
})


function Reponse({ accessToken, trackId  }) {

    spotifyApi.setAccessToken(accessToken)

    const [titre,setTitre] = useState()
    const [album,setAlbum] = useState()
    const [artiste,setArtiste] = useState()
    const [urlImage,setUrlImage] = useState()


useEffect(()=>{
    spotifyApi.getTrack(trackId)
    .then(function (data) {
        console.log('getTrack', data.body);
        setTitre(data.body.name)
        setAlbum(data.body.album.name)
        setArtiste(data.body.artists[0].name)
        setUrlImage(data.body.album.images[1].url)
        
        
    }, function (err) {
        console.log(err);
    });
},[])
    

 
 
    return(urlImage ? <div className="reponse">
        
        
                <p className="title"> {titre}</p>
                
                <p className="artist">{artiste}</p>
                
                <img className="cover" src={urlImage}/>
    
    
    
    </div>
    :null)
}

export default Reponse