jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
}));

import { render } from '@testing-library/react';
import * as React from 'react';

import { getMapMock } from '../jest/util';
import ReactMapboxGl, { FitBounds } from '../map';

let mockfitBounds = jest.fn();
let mockon = jest.fn();

const getMock = (override = {}) =>
  getMapMock({
    fitBounds: mockfitBounds,
    on: mockon,
    remove: jest.fn(),
    getCenter: jest.fn().mockReturnValue({ lat: 2, lng: 1 }),
    getZoom: jest.fn(),
    getBearing: jest.fn(),
    getPitch: jest.fn(),
    flyTo: jest.fn(),
    ...override,
  });
describe('Map', () => {
  beforeEach(() => {
    mockfitBounds = jest.fn();
    mockon = jest.fn();
  });

  it('Should render the map correctly', () => {
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock() as any,
    });
    render(<MapboxMap style="" />);
  });

  it('Should call fitBounds with the right parameters', () => {
    const fitBoundsValues: FitBounds = [
      [0, 1],
      [2, 3],
    ];
    const fitBoundsOptions = { linear: true };
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock() as any,
    });

    render(
      <MapboxMap
        style=""
        fitBounds={fitBoundsValues}
        fitBoundsOptions={fitBoundsOptions}
      />,
    );

    expect(mockfitBounds).toHaveBeenCalledWith(
      fitBoundsValues,
      fitBoundsOptions,
      {
        fitboundUpdate: true,
      },
    );
  });

  it('Should update fitBounds if fitBoundsOptions changes', () => {
    const flyTo = jest.fn();
    const fitBoundsValues: FitBounds = [
      [0, 1],
      [2, 3],
    ];
    const fitBoundsOptions = { offset: [150, 0] as [number, number] };
    const newFitBoundsOptions = { offset: [0, 0] as [number, number] };

    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
        fitBounds: mockfitBounds,
      }) as any,
    });

    const { rerender } = render(
      <MapboxMap
        style=""
        fitBounds={fitBoundsValues}
        fitBoundsOptions={fitBoundsOptions}
      />,
    );

    rerender(
      <MapboxMap
        style=""
        fitBounds={fitBoundsValues}
        fitBoundsOptions={newFitBoundsOptions}
      />,
    );

    expect(mockfitBounds.mock.calls[1][1]).toBe(newFitBoundsOptions);
  });

  it.skip('Should calc the center from fitbounds if center is not given', () => {
    const fitBoundsValues: FitBounds = [
      [0, 3],
      [2, 9],
    ];
    const mockMap = getMock() as any;
    const MapboxMap = ReactMapboxGl({ accessToken: '', mapInstance: mockMap });

    render(<MapboxMap style="" fitBounds={fitBoundsValues} />);

    const lastCall: any = mockMap.mock.calls[mockMap.mock.calls.length - 1];
    expect(lastCall[0].center).toEqual([1, 6]);
  });

  it('Should listen onStyleLoad event', () => {
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock() as any,
    });

    render(<MapboxMap style="" onStyleLoad={jest.fn()} />);

    expect(mockon).toHaveBeenCalledWith('load', expect.any(Function));
  });

  it('Should update the map center position', () => {
    const flyTo = jest.fn();
    const center: [number, number] = [3, 4];
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });

    const { rerender } = render(<MapboxMap style="" center={[1, 2]} />);

    rerender(<MapboxMap style="" center={center} />);

    expect(flyTo.mock.calls[0][0].center).toEqual(center);
  });

  it('Should update maxBounds', () => {
    const flyTo = jest.fn();
    const maxBoundsProps: FitBounds = [
      [1, 0],
      [0, 1],
    ];
    const mockMaxBounds = jest.fn();

    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        setMaxBounds: mockMaxBounds,
        flyTo,
      }) as any,
    });

    const { rerender } = render(<MapboxMap style="" />);

    rerender(<MapboxMap style="" maxBounds={maxBoundsProps} />);

    expect(mockMaxBounds).toHaveBeenCalledWith(maxBoundsProps);
  });

  // Handling zoom prop
  it('Should not update zoom when using same reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });

    const zoom: [number] = [3];

    const { rerender } = render(<MapboxMap style="" zoom={zoom} />);

    rerender(<MapboxMap style="" zoom={zoom} />);

    expect(flyTo).not.toHaveBeenCalled();
  });

  it('Should update the zoom on broken reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });

    const { rerender } = render(<MapboxMap style="" zoom={[1]} />);

    rerender(<MapboxMap style="" zoom={[1]} />);

    expect(flyTo).toHaveBeenCalled();
  });

  // Handling bearing prop
  it('Should not update bearing when using same reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });
    const bearing: [number] = [3];

    const { rerender } = render(<MapboxMap style="" bearing={bearing} />);

    rerender(<MapboxMap style="" bearing={bearing} />);

    expect(flyTo).not.toHaveBeenCalled();
  });

  it('Should update the bearing on broken reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });

    const { rerender } = render(<MapboxMap style="" bearing={[1]} />);

    rerender(<MapboxMap style="" bearing={[1]} />);

    expect(flyTo).toHaveBeenCalled();
  });

  // Handling pitch prop
  it('Should not update pitch when using same reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });
    const pitch: [number] = [3];

    const { rerender } = render(<MapboxMap style="" pitch={pitch} />);

    rerender(<MapboxMap style="" pitch={pitch} />);

    expect(flyTo).not.toHaveBeenCalled();
  });

  it('Should update the pitch on broken reference equality', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });

    const { rerender } = render(<MapboxMap style="" pitch={[1]} />);

    rerender(<MapboxMap style="" pitch={[1]} />);

    expect(flyTo).toHaveBeenCalled();
  });

  it('Should pass animation options and flyTo options', () => {
    const flyTo = jest.fn();
    const MapboxMap = ReactMapboxGl({
      accessToken: '',
      mapInstance: getMock({
        flyTo,
      }) as any,
    });
    const zoom: [number] = [3];
    const flyToOptions = {
      speed: 0.1,
      curve: 0.9,
    };
    const animationOptions = {
      offset: [20, 60],
    };

    const { rerender } = render(
      <MapboxMap
        style=""
        zoom={zoom}
        flyToOptions={flyToOptions}
        animationOptions={animationOptions}
      />,
    );

    rerender(
      <MapboxMap
        style=""
        zoom={[1]}
        flyToOptions={flyToOptions}
        animationOptions={animationOptions}
      />,
    );

    expect(flyTo.mock.calls[0][0]).toEqual({
      ...flyToOptions,
      ...animationOptions,
      bearing: undefined,
      center: { lat: 2, lng: 1 },
      pitch: undefined,
      zoom: 1,
    });
  });
});
