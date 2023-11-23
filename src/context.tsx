import * as MapboxGl from 'mapbox-gl';
import * as React from 'react';

export const MapContext = React.createContext<MapboxGl.Map | undefined>(
  undefined
);

export function withMap<T extends { map: MapboxGl.Map | undefined }>(
  Component: React.ComponentType<T>
) {
  return function MappedComponent(
    props: Omit<T, 'map'> & { map?: MapboxGl.Map | undefined }
  ) {
    return (
      <MapContext.Consumer>
        {(map) => (
          <Component
            // @ts-expect-error hack around TS not understanding that map is defined
            map={map}
            {...(props as T)}
          />
        )}
      </MapContext.Consumer>
    );
  };
}
