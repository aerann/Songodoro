import { useEffect, useState } from 'react'

import './App.css'


function App() {
  const client_id = "bed79c7d486340ef8ed0ce8e76fece28"
  // const client_key = process.env.REACT_APP_CLIENT_KEY
  const redirect_uri = "http://localhost:5173/"
  const auth_endpoint = "https://accounts.spotify.com/authorize"


  const [accessToken, setAccessToken] = useState("")

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
        const params = getParamsFromUrl(window.location.hash)
        setAccessToken(params.access_token)
      }
    }, [])

    const handleLogin = () => {
      window.location = `${auth_endpoint}?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`
    }

  return (
    <>
      <button onClick={handleLogin}>login</button>
      <iframe src="https://open.spotify.com/embed/album/0kT2Dn4QknHk92h76ZcMk0?utm_source=generator" width="100%" height="100%" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </>
  )
}

export default App



  // var authParameters = {
  //   method: 'POST',  
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
  // };

  // useEffect(() => {
  //   authorize()
  // }, [])

  // async function authorize(){
  //   const response = await fetch('https://accounts.spotify.com/api/token', authParameters)
  //   const jsonResponse = await response.json(); //parse it as json
  //   setAccessToken(jsonResponse.access_token)
  //   console.log(accessToken)
  // }

  // `${auth_endpoint}?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`}
