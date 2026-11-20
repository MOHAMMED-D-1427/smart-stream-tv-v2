import { getChannels } from "../services/api.js";

const URL = "https://6af5eb63f6270fa08d68de84.mockapi.io/api/channels"


const $ = q => document.querySelector(q)

const popup = $("#add-channel-popup");
const form = $("#add-channel-form")

const channelRegex = /^[A-Za-z0-9 _.&-]{5,20}$/;
const numberRegex = /^[^0](\d{0,4})$/;
const logoRegex = /^http[s]?:\/\/.{8,}$/;

const nameError = $("#name-error")
const numberError = $("#number-error")
const logoError = $("#logo-error")

const rules = {
    "channel-name": {regex: channelRegex, error: nameError, msg: "Name must contain 5-39 letters."},
    "channel-number": {regex: numberRegex, error: numberError, msg: "Channel number must contain only 1-5 digits."},
    "channel-logo": {regex: logoRegex, error: logoError, msg: "Logo URL must be a valid HTTP or HTTPS URL."},
};

const channel = {isFavorite: false, isBlacklisted: false,
    category: "DOCUMENTARY",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    epg: {
        currentProgram: "Evening Debate",
        startTime: "20:07",
        endTime: "21:37",
}};

function validateField(input){
    const rule = rules[input.id];
    if(!rule) return;

    const value = input.value;
    const validate = value.trim() != "" && rule.regex.test(value);

    rule.error.textContent = validate ? "" : rule.msg

    if(validate){
        switch (input.id){
            case "channel-name":
                channel["name"] = value
                break;
            case "channel-number":
                channel["channelNumber"] = value
                break;
            case "channel-logo":
                channel["logo"] = value
                break;
        }
    }
    return validate
}

form.addEventListener("input", (e)=>{
    validateField(e.target);
    
})


async function createChannel(channel){
    const res = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(channel)
    });

    if(!res.ok){
        throw new Error(`Unable to add channel (HTTP ${res.status})`);
    }
}

function addChannel(){
    document.addEventListener("click", (e)=>{
        if(e.target.closest("#add-channel-cancel")){
            popup.classList.add("invisible")
        }
        if(e.target.matches("#add-channel-popup")){
            popup.classList.add("invisible")
        }
        if(e.target.matches("#add-channel-btn")){
            popup.classList.remove("invisible")
        }
    })
    validateAndCreate()

}

function validateAndCreate(){
    form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll("#channel-name, #channel-number, #channel-logo");
    
    if(validateField(inputs[0]) && validateField(inputs[1]) && validateField(inputs[2])){
        const channels = await getChannels();
        const id = ++channels.length
        channel["id"] = id;
        console.log("Saved: ",channel)
        createChannel(channel);
        form.reset();
        popup.classList.add("invisible")
        return ;
    }

})
}

export {addChannel}


