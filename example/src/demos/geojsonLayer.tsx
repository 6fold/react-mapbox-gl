import * as React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from '../../../';
import * as MapboxGL from 'mapbox-gl';

const { token, styles } = require('./config.json');

const geojson = require('./geojson.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  flex: 1
};

const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'white'
};

const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint: MapboxGL.CirclePaint = {
  'circle-color': 'white'
};

export interface Props {
  onStyleLoad?: (map: any) => any;
}

class GeoJsonLayer extends React.Component<Props> {
  private center = [-77.01239, 38.91275] as [number, number];

  private onClickCircle = (evt: any) => {
    console.log(evt);
  };

  private onStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  public render() {
    return (
      <Map
        style={styles.dark}
        center={this.center}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoad}
      >
        <GeoJSONLayer
          data={geojson}
          circleLayout={circleLayout}
          circlePaint={circlePaint}
          circleOnClick={this.onClickCircle}
          symbolLayout={symbolLayout}
          symbolPaint={symbolPaint}
        />
      </Map>
    );
  }
}

export default GeoJsonLayer;
