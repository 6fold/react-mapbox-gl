import * as React from 'react';

import { renderWithMap, getMapMock } from '../jest/util';
import ScaleControl from '../scale-control';

describe('ScaleControl', () => {
  it.skip('should render the component', () => {
    renderWithMap(
      <ScaleControl />,
      getMapMock({
        _canvas: {
          clientwidth: 900,
        },
        getBounds: jest.fn().mockReturnValue({
          _ne: { lng: 0, lat: 0 },
          _sw: { lng: 0, lat: 0 },
        }),
      }),
    );
  });
});
