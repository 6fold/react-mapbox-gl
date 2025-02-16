import { render } from '@testing-library/react';
import * as React from 'react';

import { getMapMock } from '../jest/util';
import Layer, { ImageDefinitionWithOptions } from '../layer';

describe('Layer', () => {
  it('Should render layer with default options', () => {
    const children = [{ props: {}, type: 'symbol', key: '1' }];
    const mockMap = getMapMock();
    render(<Layer id="1" map={mockMap as any} children={children} />);

    expect(mockMap.addLayer.mock.calls[0]).toEqual([
      {
        id: '1',
        source: '1',
        type: 'symbol',
        layout: {},
        paint: {}
      },
      undefined
    ]);
  });

  it('Should set all parameters of add layer', () => {
    const before = 'test1';
    const children = [{ props: {}, type: 'symbol', key: '1' }];
    const mockMap = getMapMock();

    const props = {
      id: '123',
      type: 'symbol' as const,
      paint: {},
      layout: {},
      metadata: {},
      filter: []
    };

    const mappedProps = {
      minZoom: 2,
      maxZoom: 10,
      sourceLayer: 'sourceTest',
      sourceId: 'test'
    };

    render(
      <Layer
        children={children}
        map={mockMap as any}
        {...props}
        {...mappedProps}
        before={before}
      />
    );
    expect(mockMap.addLayer.mock.calls[0]).toEqual([
      {
        ...props,
        minzoom: 2,
        maxzoom: 10,
        source: 'test',
        'source-layer': 'sourceTest'
      },
      before
    ]);
  });

  it('Should render layer with default source', () => {
    const children = [{ props: {}, type: 'symbol', key: '1' }];
    const mockMap = getMapMock({ getSource: jest.fn(() => undefined) });

    render(<Layer id="1" map={mockMap as any} children={children} />);

    expect(mockMap.addSource.mock.calls[0]).toEqual([
      '1',
      {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      }
    ]);
  });

  it('Should set all parameters of add source with geojsonSourceOptions', () => {
    const children = [{ props: {}, type: 'symbol', key: '1' }];
    const mockMap = getMapMock({ getSource: jest.fn(() => undefined) });

    const geoJSONSourceOptions = {
      maxzoom: 10,
      buffer: 2,
      tolerance: 1,
      cluster: 10,
      clusterRadius: 50,
      clusterMaxZoom: 10
    };
    const layerSourceId = 'testId';
    render(
      <Layer
        children={children}
        map={mockMap as any}
        id={layerSourceId}
        geoJSONSourceOptions={geoJSONSourceOptions}
      />
    );

    expect(mockMap.addSource.mock.calls[0]).toEqual([
      layerSourceId,
      {
        type: 'geojson',
        ...geoJSONSourceOptions,
        data: {
          type: 'FeatureCollection',
          features: []
        }
      }
    ]);
  });

  it('Should set features based on children', () => {
    const mockMap = getMapMock();
    const feature = { coordinates: [-123, 45] };
    const children = [{ props: feature, type: 'symbol', key: '1' }];

    render(<Layer id="1" map={mockMap as any} children={children} />);

    expect(mockMap.getSource().setData.mock.calls[0]).toEqual([
      {
        type: 'FeatureCollection',
        features: [
          {
            geometry: { ...feature, type: 'Point' },
            properties: { id: 0 },
            type: 'Feature'
          }
        ]
      }
    ]);
  });

  it('Should set features to empty array when children disappear', () => {
    const mockMap = getMapMock();
    const feature = { coordinates: [-123, 45] };
    const children = [{ props: feature, type: 'symbol', key: '1' }];

    const { rerender } = render(
      <Layer id="1" map={mockMap as any} children={children} />
    );

    rerender(<Layer id="1" map={mockMap as any} children={undefined} />);

    expect(mockMap.getSource().setData.mock.calls[1]).toEqual([
      {
        type: 'FeatureCollection',
        features: []
      }
    ]);
  });

  it('Should flatten features', () => {
    const mockMap = getMapMock();

    const children: any = [
      <div key="1">Test</div>,
      [<div key="2">Test</div>, <div key="3">Test</div>]
    ];

    render(<Layer id="1" map={mockMap as any} children={children} />);

    expect(mockMap.getSource().setData.mock.calls[0][0].features).toHaveLength(
      3
    );
  });

  it('Should add images', () => {
    const mockMap = getMapMock();
    const images: ImageDefinitionWithOptions = ['test', new Image(), {}];
    const children = [{ props: {}, type: 'symbol', key: '1' }];

    render(
      <Layer id="1" children={children} map={mockMap as any} images={images} />
    );

    expect(mockMap.addImage.mock.calls[0]).toEqual(images);
  });

  it('Should render Polygon for fill', () => {
    const mockMap = getMapMock();
    const feature = {
      coordinates: [
        [
          [-123, 45],
          [123, 45]
        ]
      ]
    };
    const children = [{ props: feature, type: 'symbol', key: '1' }];

    render(
      <Layer id="1" type="fill" children={children} map={mockMap as any} />
    );

    expect(mockMap.getSource().setData.mock.calls[0]).toEqual([
      {
        type: 'FeatureCollection',
        features: [
          {
            geometry: { ...feature, type: 'Polygon' },
            properties: { id: 0 },
            type: 'Feature'
          }
        ]
      }
    ]);
  });

  it('Should render MultiPolygon for fill', () => {
    const mockMap = getMapMock();
    const feature = {
      coordinates: [
        [
          [
            [-123, 45],
            [123, 45]
          ]
        ]
      ]
    };
    const children = [{ props: feature, type: 'symbol', key: '1' }];

    render(
      <Layer id="1" type="fill" children={children} map={mockMap as any} />
    );

    expect(mockMap.getSource().setData.mock.calls[0]).toEqual([
      {
        type: 'FeatureCollection',
        features: [
          {
            geometry: { ...feature, type: 'MultiPolygon' },
            properties: { id: 0 },
            type: 'Feature'
          }
        ]
      }
    ]);
  });

  it('Should update minZoom and maxZoom if they change', () => {
    const mockMap = getMapMock();
    const children = [{ props: {}, type: 'symbol', key: '1' }];
    const { rerender } = render(
      <Layer map={mockMap as any} id="zoomer" children={children} />
    );

    rerender(
      <Layer map={mockMap as any} id="zoomer" children={children} minZoom={4} />
    );

    rerender(
      <Layer
        map={mockMap as any}
        id="zoomer"
        children={children}
        minZoom={4}
        maxZoom={10}
      />
    );

    rerender(
      <Layer
        map={mockMap as any}
        id="zoomer"
        children={children}
        minZoom={undefined}
        maxZoom={undefined}
      />
    );

    rerender(
      <Layer
        map={mockMap as any}
        id="zoomer"
        children={children}
        minZoom={undefined}
        maxZoom={6}
      />
    );

    expect(mockMap.setLayerZoomRange.mock.calls).toEqual([
      ['zoomer', 4, undefined],
      ['zoomer', 4, 10],
      ['zoomer', undefined, undefined],
      ['zoomer', undefined, 6]
    ]);
  });

  it('Should start listening onClick mouse event', () => {
    const mockMap = getMapMock();
    const id = 'layer-test';
    render(<Layer id={id} map={mockMap as any} onClick={jest.fn()} />);

    expect(mockMap.on.mock.calls[0][0]).toEqual('click');
    expect(mockMap.on.mock.calls[0][1]).toEqual(id);
  });
});
