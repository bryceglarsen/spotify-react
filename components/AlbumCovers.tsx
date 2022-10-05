import { Image } from 'antd';
import { spotifyStyle } from 'styles'

export const AlbumCover = ({ 
    album,
    selectedAlbum,
    setSelectedAlbum,
    setSelectedTrack,
    audioFeatures,
    setSelectedFeatures,
    numAlbums
  }) => {
  let selected = album.id === selectedAlbum.id
  let albumCover = album.images[1]
  let firstTrack = album.tracks.items[0]
  let albumStyle = {}
  if (!selected) {
    albumStyle = {
      padding: selected ? 0 : 15,
      filter: 'grayscale(100%)'
    }
  } else {
    albumStyle = {
      ...spotifyStyle.activeBorder
    }
  }
  function handleClick(){
    setSelectedTrack(firstTrack)
    setSelectedAlbum(album)
    setSelectedFeatures(audioFeatures)
  }

  return (
    <div key={album.name} >
      <Image
        src={albumCover.url}
        preview={false}
        style={{ cursor: 'pointer', ...albumStyle }}
        onClick={() => handleClick()}
      />
    </div>
  )
}