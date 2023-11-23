import * as React from 'react';

import { withMap } from '../context';
import { MockComponent, renderWithMap, getMapMock } from '../jest/util';
import layerMouseTouchEvents from '../layer-events-hoc';

const LayerHOC = withMap(layerMouseTouchEvents(MockComponent));

describe('layer-events-hoc', () => {
  it('Should default the id if none is passed', () => {
    const { container } = renderWithMap(<LayerHOC />, getMapMock());
    expect(container.querySelector('h1')).toHaveTextContent('layer-1');
  });

  it('should listen all mouse and touch events', () => {
    const mapMock = getMapMock();
    renderWithMap(<LayerHOC />, mapMock);

    const events = [
      'click',
      'mouseenter',
      'mouseleave',
      'mousedown',
      'touchstart'
    ];

    expect(mapMock.on.mock.calls.map((call) => call[0])).toEqual(events);
  });
});
