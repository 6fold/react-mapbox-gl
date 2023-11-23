import * as React from 'react';

import { renderWithMap, getMapMock } from '../jest/util';
import RotationControl from '../rotation-control';

describe('RotationControl', () => {
  it('should render the component', () => {
    const { container } = renderWithMap(<RotationControl />, getMapMock());
    expect(container).toBeDefined();
  });
});
