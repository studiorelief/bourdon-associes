import markerSDK from '@marker.io/browser';
export async function initMarker() {
  // Only load marker if URL contains 'webflow'
  if (window.location.href.includes('webflow')) {
    await markerSDK.loadWidget({
      project: '67eea812a9008d0b3f74e9d0',
    });
  }
}
