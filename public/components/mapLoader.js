const MAX_MAP_COUNT = 5;

/* Nahrávání map PAGE 1 */
document.querySelector('#map-upload').addEventListener('change', handleMap);
document.querySelector('.maps-wrap').addEventListener('click', deleteMap);
    
let mapCount = 0;
let resultImage = document.querySelector(".maps-wrap");

function handleMap(e) {  
	let input = e.target;
  let len = input.files.length;
  for (let i = 0; i < len; i++) {
    mapCount++;
    if (mapCount > MAX_MAP_COUNT) {
      mapCount--;
      return;
    }
    let reader = new FileReader()
    reader.onload = function() {
      let imageFile = reader.result;
      let name = input.files[i].name;
      if (input.files[i].size > 1000000) {
        alert("Maximální velikost mapy je 1 Mb!");
        mapCount--;
        return;
      }
      console.log(name);
      let html = `<div class="map-wrap">
      <div class="map-image">
        <img src="${imageFile}" alt="">
        <span class="close-map">&#x2716;</span>
      </div> 
      <div class="map-info">
        <div class="placeholder">Název mapy</div>
        <input type="text" readonly>
      </div>
    </div>`
      resultImage.insertAdjacentHTML('beforeend', html);
      let setName = document.querySelector('.map-wrap:last-child input');
      setName.value = `${name.split('.')[0]}`;
    }
    reader.readAsDataURL(input.files[i]);    
  }
}

function deleteMap(e) {
  if (e.target.matches('.close-map')) {
    document.querySelector('#map-upload').value = null;
    let clickedMap = e.target.closest('.map-wrap');
    clickedMap.remove();
    mapCount--;
  }
  if (document.querySelector('.maps-wrap').children.length === 0) {
    selectMap.item(0).selected = true;
  }
}