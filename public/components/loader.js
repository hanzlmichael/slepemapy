let loadTestOverlay = document.querySelector('#load-test-overlay');

function showLoader(element) {
  element.style.display = 'grid';
}

function hideLoader(element) {
  element.style.display = 'none';
}

/* function testLoader() {
  showLoader(menuOverlay);
  setTimeout(() => {
    hideLoader(menuOverlay);
  }, "3000");
} */