jest.mock('mapbox-gl', () => ({
  Map: {},
}));

jest.mock('../util/overlays', () => ({
  overlayState: jest.fn(() => ({})),
  overlayTransform: jest.fn(() => []),
  anchors: [],
}));

import * as React from 'react';

import { renderWithMap, getMapMock } from '../jest/util';
import Popup, { defaultClassName } from '../popup';

describe('Popup', () => {
  it('Should render component', () => {
    const { container } = renderWithMap(
      <Popup coordinates={[0, 0]} />,
      getMapMock(),
    );
    expect(container).toBeDefined();
  });

  it('Should add custom className', () => {
    const { container } = renderWithMap(
      <Popup className="custom-classname" coordinates={[0, 0]} />,
      getMapMock(),
    );

    expect(container.querySelectorAll('.custom-classname')).toHaveLength(1);
  });

  it('Should concat custom className to defaultClassName', () => {
    const { container } = renderWithMap(
      <Popup className="custom-classname" coordinates={[0, 0]} />,
      getMapMock(),
    );

    expect(container.querySelectorAll('.custom-classname')[0]).toHaveAttribute(
      'class',
      `custom-classname ${defaultClassName[0]} `,
    );
  });
});
