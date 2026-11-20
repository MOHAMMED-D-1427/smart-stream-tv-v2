import { getChannels } from "../services/api.js";
import { showChannels } from "./ui.js";


const search = document.querySelector("#search");

let filtered = [];

export function searchChannels(){        
        
        search.addEventListener("input", async (e)=>{
            const channels = await getChannels();
        filtered = channels.filter(ch =>
            (ch.name+ch.channelNumber).toUpperCase().includes(e.target.value.toUpperCase())
        )
        showChannels(filtered)
        localStorage.setItem("last-menu", "main");

    })
}




