import { selectMap, mapsWrap } from '../inits/definitions.js';
import { test, maps, actualQuestionIndex } from '../components/questionBar.js';
import { Map } from '../components/classes.js';

export const MAX_MAP_COUNT = 5;
export let mapCount = 0;
export const setMapCoundToMapsLength = (value) => mapCount = value;
let resultImage = document.querySelector(".maps-wrap");

export function initMapLoader() {
  /* Nahrávání map PAGE 1 */
  document.querySelector('#map-upload').addEventListener('change', handleMap);
  document.querySelector('.maps-wrap').addEventListener('click', deleteMap);
  observe();  
}

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
  debugger;
  if (e.target.matches('.close-map')) {
    document.querySelector('#map-upload').value = null;
    let clickedMap = e.target.closest('.map-wrap');    
    if (checkIfQuestionContainsMap(clickedMap.id)) {
      alert('Mapu nelze smazat, protože je vykreslena v některých otázkách');      
      return;
    }
    clickedMap.remove();
    mapCount--;
  }
  if (document.querySelector('.maps-wrap').children.length === 0) {
    selectMap.item(0).selected = true;
  }
}

function checkIfQuestionContainsMap(mapId) {
  debugger;
  let questionsWhichContainsMapId = [];
  for (let i = 0; i < test.questions.length; i++) {
    if (mapId === test.questions[i].map) {
      questionsWhichContainsMapId.push(i+1);
    }
  }
  if (selectMap.children[selectMap.selectedIndex].value === mapId) {
    questionsWhichContainsMapId.push(actualQuestionIndex+1);
  }
  if (questionsWhichContainsMapId.length === 0) {
    return false;
  }
  return true;
}

// sledovane zmeny
const config = {
  childList: true
}

// sledovany node
const targetNode = resultImage;
console.log("targetNOde: ", targetNode);

function observe() {
  const callback = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        debugger;
        if (mutation.addedNodes[0]) {  
          console.log("here ", mutation.addedNodes[0]) 
          let mapName = mutation.addedNodes[0].querySelector('input').value;
          createUniqueMapId(mutation.addedNodes[0].querySelector('img').getAttribute('src'));
          selectMap.add(new Option(`${mapName}`,`${maps[maps.length - 1].mapId}`))
          maps[maps.length-1].title = mapName;
          mutation.addedNodes[0].setAttribute('id', maps[maps.length -1 ].mapId)
        }
        if (mutation.removedNodes[0]) {
          debugger;
          let mapIdToDelete = mutation.removedNodes[0].id;
          console.log('mapId ', mapIdToDelete);
          
          // smazat z pole maps mapu ktera ma id smazaneho nodu
          test.maps = maps.filter(map =>  map.mapId != mapIdToDelete)

          selectMap.removeChild(selectMap.querySelector(`option[value="${mapIdToDelete}"]`));
        }
      }
    })
  }
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

const randomId = function(length = 6) {
  return Math.random().toString(36).substring(2, length+2);
};

function createUniqueMapId(lastAddedMapSrc) {
  for (let i = 0; i < 100; i++) {
    let newId = randomId();
    if (!checkDuplicitiesInMaps(newId)) {
      maps.push(new Map(newId, "", lastAddedMapSrc));
      return;
    }
  }
}

function checkDuplicitiesInMaps(id) {
  return maps.find(element => element === id);
}
