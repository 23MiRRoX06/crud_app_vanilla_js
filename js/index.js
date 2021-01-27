import {
    clearInputs,
    renderCamerasList,
    getInputValues,
    cameras,
    refetchAllCameras
} from "./dom_util.js";
import {
    addCamera,
} from "./api.js";

const searchInput = document.getElementById("search_input");
const createButton = document.getElementById("create_button");
const searchButton = document.getElementById("search_button");
const cancelSearchButton = document.getElementById("cancel_search_button");
const sortButton = document.getElementById("sort_button");
const countButton = document.getElementById("count_button");

createButton.addEventListener("click", (event) => {
    event.preventDefault();
    const { id, productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams } = getInputValues();
    clearInputs();
    addCamera({id,
        productionYear,
        countryManufacturer,
        modelName,
        batteryLifeInHours,
        weightInGrams})
        .then(
            refetchAllCameras
        );
});

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const foundCameras = cameras.filter(
        (camera) => camera.modelName.search(searchInput.value) !== -1
    );
    renderCamerasList(foundCameras);
});

cancelSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderCamerasList(cameras);
    searchInput.value = "";
});

countButton.addEventListener("click", () => {
    const totalWeight = cameras.map((camera) => parseInt(camera.weightInGrams)).reduce((total, current) => total + current);
    countButton.parentElement.childNodes[5].textContent = `Total weight:  ${totalWeight}`;
});

sortButton.addEventListener("click", () => {
    cameras.sort((first, second) => first.batteryLifeInHours - second.batteryLifeInHours)
    renderCamerasList(cameras);
});


refetchAllCameras();