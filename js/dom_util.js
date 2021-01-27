import {
    getAllCameras,
    removeCamera,
    editCamera
} from "./api.js";

const productionYearInput = document.getElementById("production_year_input");
const countryInput  = document.getElementById("country_input");
const modelNameInput  = document.getElementById("model_name_input");
const batteryLifeInput  = document.getElementById("battery_life_input");
const weightInput = document.getElementById("weight_input");
const camerasContainer = document.getElementById("cameras_container");

export let cameras = [];

export const refetchAllCameras = async () => {
    cameras = await getAllCameras();
    renderCamerasList(cameras);
}


const cameraTemplate = ({ id, productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams }) => `
<div class="cameras__item" id="${id}">
    <h3>Model Name: ${modelName}</h3>
    <table class="table table-striped table-bordered table-hover">
        <tr>
            <th>Field Name</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>ID</td>
            <td>${id}</td>
        </tr>
        <tr>
            <td>Production Year</td>
            <td>${productionYear}</td>
        </tr>
        <tr>
            <td>Country Manufacturer</td>
            <td>${countryManufacturer}</td>
        </tr>
        <tr>
            <td>Battery Life(In hours)</td>
            <td>${batteryLifeInHours}</td>
        </tr>
        <tr>
            <td>Weight(In grams)</td>
            <td>${weightInGrams}</td>
        </tr>
    </table>
    <div class="item__buttons">
        <button class="item__edit" id="edit_button_${id}">Edit</button>
        <button class="item__delete" id="delete_button_${id}">Remove</button>
    </div>
</div>`;

export const clearInputs = () => {
    productionYearInput.value = "";
    countryInput.value = "";
    modelNameInput.value = "";
    batteryLifeInput.value = "";
    weightInput.value = "";
};

export const getInputValues = () => {
    const values = {
        productionYear: parseInt(productionYearInput.value),
        countryManufacturer: countryInput.value,
        modelName: modelNameInput.value,
        batteryLifeInHours: parseInt(batteryLifeInput.value),
        weightInGrams: parseInt(weightInput.value)
    };

    if(validate(values.productionYear, values.countryManufacturer, values.modelName, values.batteryLifeInHours, values.weightInGrams)) {
        return values;
    }
};

const addCameraToPage = ({ id, productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams }) => {
    camerasContainer.insertAdjacentHTML(
        "afterbegin",
        cameraTemplate({ id, productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams })
    );
    const editButton = document.getElementById(`edit_button_${id}`);
    const deleteButton = document.getElementById(`delete_button_${id}`);

    deleteButton.addEventListener("click", () => {
        removeCamera(id).then(refetchAllCameras);
    });

    editButton.addEventListener("click", () => {
        const { productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams } = getInputValues();
        editCamera(id, { id, productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams }).then(refetchAllCameras);
        clearInputs();
    });
};

const fillInputValues = ({ productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams }) => {
    productionYearInput.value = productionYear,
    countryInput.value = countryManufacturer,
    modelNameInput.value = modelName,
    batteryLifeInput.value = batteryLifeInHours,
    weightInput.value = weightInGrams
};

export const renderCamerasList = (cameras) => {
    camerasContainer.innerHTML = "";
    for(const camera of cameras) {
        addCameraToPage(camera);
    }
};

const validate = (productionYear, countryManufacturer, modelName, batteryLifeInHours, weightInGrams) => {
    if(isNaN(productionYear) || productionYear < 1665) {
        swal({
            title: "WTF",
            text: "You've entered wrong Production Year",
            icon: "error",
            button: "Continue",
        });
        return false;
    } else if (!isNaN(countryManufacturer) || /\d/.test(countryManufacturer)) {
        swal({
            title: "WTF",
            text: "You've entered wrong Country Manufacturer",
            icon: "error",
            button: "Continue",
        });
        return false;
    } else if(!isNaN(modelName)) {
        swal({
            title: "WTF",
            text: "You've entered wrong Model Name",
            icon: "error",
            button: "Continue",
        });
        return false;
    } else if(isNaN(batteryLifeInHours) || batteryLifeInput < 0) {
        swal({
            title: "WTF",
            text: "You've entered wrong Battery Life",
            icon: "error",
            button: "Continue",
        });
        return false;
    } else if(isNaN(weightInGrams) || weightInGrams < 100) {
        swal({
            title: "WTF",
            text: "You've entered wrong Weight",
            icon: "error",
            button: "Continue",
        });
        return false;
    } else {
        swal({
            title: "Well DONE",
            text: "Hey, man, everything is fine",
            icon: "success",
            button: "Continue",
        });
        return true;
    }
}