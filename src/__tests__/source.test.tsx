import * as React from 'react';
import Source from '../source';
import { renderWithMap, getMapMock } from '../jest/util';
import { GeoJSONSourceRaw } from 'mapbox-gl';

describe('Source', () => {
  const EMPTY_GEOJSON_SRC: GeoJSONSourceRaw = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  };

  it('Should render source with geoJsonSource', () => {
    const mapMock = getMapMock({
      getSource: jest.fn()
    });
    const sourceId = 'source-1';

    renderWithMap(
      <Source id={sourceId} geoJsonSource={EMPTY_GEOJSON_SRC} />,
      mapMock
    );

    expect(mapMock.addSource.mock.calls[0]).toEqual([
      sourceId,
      {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      }
    ]);
  });
});
