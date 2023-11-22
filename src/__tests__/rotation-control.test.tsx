import * as React from 'react';
import RotationControl from '../rotation-control';
import { renderWithMap, getMapMock } from '../jest/util';

describe('RotationControl', () => {
  it('should render the component', () => {
    const { container } = renderWithMap(<RotationControl />, getMapMock());
    expect(container).toBeDefined();
  });
});
