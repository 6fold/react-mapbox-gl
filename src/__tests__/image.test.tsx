import { render } from '@testing-library/react';
import * as MapboxGl from 'mapbox-gl';
import * as React from 'react';

import Image, { Props } from '../image';
import { getMapMock } from '../jest/util';

describe('Image', () => {
  it('Should add image on mount', () => {
    const mapMock = getMapMock();
    const onLoaded = jest.fn();
    const onError = jest.fn();

    const imageId = 'image';
    const imageData = {} as Props['data'];
    const imageOptions = {};

    render(
      <Image
        id={imageId}
        map={mapMock as unknown as MapboxGl.Map}
        data={imageData}
        options={imageOptions}
        onError={onError}
        onLoaded={onLoaded}
      />,
    );

    expect(mapMock.addImage.mock.calls[0]).toEqual([
      imageId,
      imageData,
      imageOptions,
    ]);

    expect(onLoaded).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('Should remove image on unmount', () => {
    const mapMock = getMapMock({
      getStyle: jest.fn(() => ({})),
    });
    const onLoaded = jest.fn();
    const onError = jest.fn();

    const imageId = 'image';
    const imageData = {} as Props['data'];
    const imageOptions = {};

    const component = render(
      <Image
        id={imageId}
        map={mapMock as unknown as MapboxGl.Map}
        data={imageData}
        options={imageOptions}
        onError={onError}
        onLoaded={onLoaded}
      />,
    );

    expect(mapMock.addImage).toHaveBeenCalled();
    expect(onLoaded).toHaveBeenCalled();

    component.unmount();
    expect(mapMock.removeImage).toHaveBeenCalled();
  });

  it('Should not call removeImage when map styles are undefined', () => {
    const mapMock = getMapMock({
      getStyle: jest.fn(() => undefined),
    });

    const onLoaded = jest.fn();
    const onError = jest.fn();

    const imageId = 'image';
    const imageData = {} as Props['data'];
    const imageOptions = {};

    const component = render(
      <Image
        id={imageId}
        map={mapMock as unknown as MapboxGl.Map}
        data={imageData}
        options={imageOptions}
        onError={onError}
        onLoaded={onLoaded}
      />,
    );

    expect(onLoaded).toHaveBeenCalled();

    component.unmount();
    expect(mapMock.removeImage).not.toHaveBeenCalled();
  });
});
