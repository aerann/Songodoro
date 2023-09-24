import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const client_id = "bed79c7d486340ef8ed0ce8e76fece28"
  // const client_key = process.env.REACT_APP_CLIENT_KEY
  const redirect_uri = "http://localhost:5173/"
  const auth_endpoint = "https://accounts.spotify.com/authorize"
  const SPACE_DELIMITER = "%20"
  const SCOPES = ["playlist-modify-private", "playlist-modify-public"]
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);



  const [accessToken, setAccessToken] = useState("")
  const [isLoggedIn, toggleIsLoggedIn ] = useState(false)
  const [playlistID, setPlaylistID] = useState("")

  const getParamsFromUrl = (hash) => {
    const stringAfterHashtag = hash.substring(1); 
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value; 
      return accumulater
    }, {});
    return paramsSplitUp
  }

    useEffect(() => {
      if (window.location.hash){
        toggleIsLoggedIn(!isLoggedIn)
        const params = getParamsFromUrl(window.location.hash)
        setAccessToken(params.access_token)
      }
    }, [])

    const handleLogin = () => {
      window.location = `${auth_endpoint}?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES_URL_PARAM}`
    }

    var songIds = ""

    const callapi = async (e) => {
      e.preventDefault()
      const res = await axios.get("https://api.spotify.com/v1/recommendations", {
          headers: {
              Authorization: `Bearer ${accessToken}`
          },
        params: {
        'limit': 6,
        'seed_genres': 'sleep, classical, ambient, chill, study',
        'target_danceability': '0.3',
        'target_duration_ms': '300000',
        'target_instrumentalness': '1',
        'target_speechiness': '0'
        }
      })
      console.log(res)

      for(let i = 0; i < 5; i++){
            songIds += "spotify%3Atrack%3A"+res.data.tracks[i].id+"%2C";
      }
      console.log("songid", songIds)

      const userid = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
      console.log('hi', userid)
      const myuser = (userid.data.id)
      console.log('myuser', myuser)

      const d = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  
      
      const createplaylist = await axios.post(`https://api.spotify.com/v1/users/${myuser}/playlists`, { 
          'name' : `Your Songodoro - ${d}`, 
          'description' : `Your custom Songodoro study playlist for ${d}, encouraging you to keep going!`,
          'public': true 
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type' : 'application/json'
          }
        }
      )
      console.log('did it create', createplaylist)

      const playlistID = createplaylist.data.id
      setPlaylistID(playlistID)
      console.log('yas', playlistID)

    
      const addSongsToPlaylist = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${songIds}spotify%3Atrack%3A4zJFlydxSMdcQfXMzCiLbq`, {
        "position": 0
      }, 
      {
          headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type' : 'application/json'
        }
      }
      )
  }

  return (
    <>
      {!isLoggedIn && <button onClick={handleLogin}>Login to Spotify</button>}
      <button onClick={callapi}>Generate me my Songodoro!</button>

      
      {playlistID && 
        <iframe src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
    </>
  )
}

export default App


