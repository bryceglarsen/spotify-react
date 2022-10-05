import { Breadcrumb, Col, Divider, Image, Layout, Menu, Popover, Row, Space } from 'antd';
import { FeaturesChart } from 'components/FeaturesChart'
import { spotifyStyle } from 'styles'

export const TrackFeatures = ({ featuresData, selectedAlbum, selectedTrack, setSelectedTrack }) => {
  const features = [
    'danceability',
    'energy',
    'loudness',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo'
  ].sort()
  const numFeatures = features.length
  // create trellis or small multiples layout
  const layout = features.reduce((res, curr, index) => {
    let row = Math.floor(index/(Math.round(Math.sqrt(numFeatures))))
    if (row in res) {
      res[row].push(curr)
      return res
    } else {
      return (
      {
        ...res,
        [row]: [curr]
      }
    )
    }
  }, {})
  let updatedData = featuresData.map((rec, index) => ({...rec, track_number: [index+1]}));
  updatedData = updatedData.reduce((res, curr) => {
    const newObj = Object.fromEntries(
      Object.entries(curr).map(([k, v]) => isNaN(v) ? [k, v] : [k, Math.abs(v)])
    );
    return [...res, newObj]
  }, [])
  console.log('updated', updatedData)
  let rowCharts = []
  for (const [rowIndex, features] of Object.entries(layout)) {
    let featureCharts = features.map((feature) => {
      return (
        <Col key={feature} flex="auto" style={{ width: 'calc((100vh - 300px)/3)' }}>
        <h3 style={{ textAlign: 'left', textDecorationLine: 'underline' }}>{feature}</h3>
        <div style={{ width: '90%', height: '90%' }}>
          <FeaturesChart data={updatedData} feature={feature} selectedAlbum={selectedAlbum} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack}/>
        </div>
        </Col>
      )
    })
    rowCharts.push(
      <Row key={rowIndex} justify="space-evenly" wrap={false} flex="auto" style={{ marginTop: 10, height: 'calc((100vh - 250px)/3)' }}>
        {featureCharts}
      </Row>
    )
  }

  return (
    <div>
    {rowCharts}
    </div>
  )
}