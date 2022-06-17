import React, { useState, useEffect } from "react"

import SpotifyPlayer from "react-spotify-web-playback"

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    console.log('PLAYER', accessToken, trackUri)
    // setPlay(true)
  }, [trackUri])
  // showSaveIcon
  // callback={state => !state.isPlaying && setPlay(false)}

  // styles={{
  //   activeColor: "#fff",
  //   bgColor: "#333",
  //   color: "#fff",
  //   loaderColor: "#fff",
  //   sliderColor: "#1cb954",
  //   trackArtistColor: "#ccc",
  //   trackNameColor: "#fff",
  //   height: "55px",
  // }}


  if (!accessToken || !trackUri) return null
  return (
    <div>
      {trackUri}
      <SpotifyPlayer
        token={accessToken}
        uris={trackUri ? trackUri : []}
        play={play}
      />
    </div>

  )
}

export default Player