import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import { spotifyStyle } from 'styles'
import { Card } from 'antd';

export const FeaturesChart = ({ data, feature, selectedAlbum, selectedTrack, setSelectedTrack }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={data}
        syncId="features"
        margin={{
          bottom: 25
        }}
        onClick={(e: any) => {
          console.log(data.reduce((acc, cur) => acc + cur[feature], 0))
          if (e) {
            let selectedTrackHref = e.activePayload[0].payload.track_href
            let selectedAlbumTracks = selectedAlbum.tracks.items
            let newTrack = selectedAlbumTracks.filter((track) => track.href === selectedTrackHref)[0]
            setSelectedTrack(newTrack)
          }
        }}
      >
        <Bar dataKey={feature}>
          {data.map((entry, index) => (
            <Cell fill={entry.id === selectedTrack.id ? spotifyStyle.active.color : spotifyStyle.inactive.color} />
          ))}
        </Bar>
        <ReferenceLine y={(data.reduce((acc, cur) => acc + cur[feature], 0) / data.length)} stroke={spotifyStyle.accent.color} strokeDasharray="4" />
        <XAxis dataKey="track_number"/>
        <Tooltip cursor={{fill: '#212121', opacity: 0.5}} />
      </BarChart>
    </ResponsiveContainer>
  )
}