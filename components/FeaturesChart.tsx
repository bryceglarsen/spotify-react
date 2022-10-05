import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import { spotifyStyle } from 'styles'
import { Card } from 'antd';

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    let currentTrack = data.filter((track: {[key:string]: any}) => track.track_number === label)[0]
    console.log(currentTrack)
    return (
      <Card size="small" title={currentTrack.key} style={{ opacity: 0.75 }}>
        {payload[0].name}: {payload[0].value}
      </Card>
    )
  }
  return null;
};

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
        <ReferenceLine y={(data.reduce((acc, cur) => acc + cur[feature], 0) / data.length)} stroke={spotifyStyle.inactive.color} strokeDasharray="4" />
        <XAxis dataKey="track_number"/>
        <Tooltip cursor={{fill: '#212121', opacity: 0.5}} content={<CustomTooltip data={data} />} />
      </BarChart>
    </ResponsiveContainer>
  )
}