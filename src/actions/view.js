export const translate = (x, y) => ({
  type: 'VIEW.TRANSLATE',
  x,
  y,
});

export const zoomIn = () => ({type: 'VIEW.ZOOM_IN'});

export const zoomOut = () => ({type: 'VIEW.ZOOM_OUT'});
