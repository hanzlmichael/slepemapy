export let loadTestOverlay = document.querySelector('#load-test-overlay');

export function showLoader(element) {
  element.style.display = 'grid';
}

export function hideLoader(element) {
  element.style.display = 'none';
}
