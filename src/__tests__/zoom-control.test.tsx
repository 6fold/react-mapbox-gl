import * as React from 'react';
import userEvent from '@testing-library/user-event';
import ZoomControl from '../zoom-control';
import { renderWithMap, getMapMock } from '../jest/util';

describe('ZoomControl', () => {
  const zoomIn = '#zoomIn';
  const zoomOut = '#zoomOut';

  it('should render the component', () => {
    const { container } = renderWithMap(<ZoomControl />, getMapMock());
    expect(container).toBeDefined();
  });

  describe('hovering over buttons', () => {
    it('should highlight buttons on mouseover', async () => {
      const { container } = renderWithMap(<ZoomControl />, getMapMock());
      const getButtonStyle = (tag: string) => {
        const style = container.querySelector(tag)?.getAttribute('style');
        return style!;
      };

      expect(getButtonStyle(zoomIn)).toContain('opacity: 0.95;');
      expect(getButtonStyle(zoomOut)).toContain('opacity: 0.95;');

      await userEvent.hover(container.querySelector(zoomIn)!);

      expect(getButtonStyle(zoomIn)).toContain('opacity: 1;');
      expect(getButtonStyle(zoomOut)).toContain('opacity: 0.95;');

      await userEvent.hover(container.querySelector(zoomOut)!);
      expect(getButtonStyle(zoomIn)).toContain('opacity: 0.95;');
      expect(getButtonStyle(zoomOut)).toContain('opacity: 1;');

      await userEvent.hover(container.querySelector(zoomIn)!);
      expect(getButtonStyle(zoomIn)).toContain('opacity: 1;');
      expect(getButtonStyle(zoomOut)).toContain('opacity: 0.95;');
    });

    it('should remove highlight from plus button on mouseout', async () => {
      const { container } = renderWithMap(<ZoomControl />, getMapMock());
      const getButtonStyle = (tag: string) => {
        const style = container.querySelector(tag)?.getAttribute('style');
        return style!;
      };

      expect(getButtonStyle(zoomIn)).toContain('opacity: 0.95;');

      await userEvent.hover(container.querySelector(zoomIn)!);
      expect(getButtonStyle(zoomIn)).toContain('opacity: 1;');

      await userEvent.unhover(container.querySelector(zoomOut)!);
      expect(getButtonStyle(zoomIn)).toContain('opacity: 0.95;');
    });

    it('should remove highlight from minus button on mouseout', async () => {
      const { container } = renderWithMap(<ZoomControl />, getMapMock());
      const getButtonStyle = (tag: string) => {
        const style = container.querySelector(tag)?.getAttribute('style');
        return style!;
      };

      expect(getButtonStyle(zoomOut)).toContain('opacity: 0.95;');

      await userEvent.hover(container.querySelector(zoomOut)!);
      expect(getButtonStyle(zoomOut)).toContain('opacity: 1;');

      await userEvent.unhover(container.querySelector(zoomOut)!);
      expect(getButtonStyle(zoomOut)).toContain('opacity: 0.95;');
    });
  });
});
