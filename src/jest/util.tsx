import { render } from '@testing-library/react';
import * as MapboxGl from 'mapbox-gl';
import * as React from 'react';

import { MapContext } from '../context';

export const getMapMock = (override?: { [key: string]: any }) => ({
  addSource: jest.fn(),
  removeSource: jest.fn(),
  addLayer: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  setLayerZoomRange: jest.fn(),
  getLayer: jest.fn(),
  addImage: jest.fn(),
  loadImage: jest.fn(),
  removeImage: jest.fn(),
  hasImage: jest.fn(),
  getStyle: jest.fn(),
  getSource: jest.fn().mockReturnValue({ setData: jest.fn() }),
  project: jest.fn(),
  ...override
});

export const renderWithMap = (comp: JSX.Element, mapValue: any) => {
  return render(
    <MapContext.Provider value={mapValue}>{comp}</MapContext.Provider>
  );
};

export class MockComponent extends React.Component<{
  id: string;
  map: MapboxGl.Map;
  children?: JSX.Element | JSX.Element[];
}> {
  public render() {
    return <h1>{this.props.id}</h1>;
  }
}
