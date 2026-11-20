import { getChannels } from "../services/api.js";
import { updateBlacklist, updateFavorite, updateLastWatched } from "./update.js";


const chansContainer = document.querySelector("#channels");


function showChannels(data){
    if (!data.length) {
        chansContainer.innerHTML =
        "<tr class='h-10 flex justify-center items-center'><td>No channel found</td></tr>";
        return;
    }

    chansContainer.innerHTML = ""
    chansContainer.innerHTML = data.map(ch =>`
        <tr data-id="${ch.id}" data-watchedat=${ch.lastWatchedAt} data-watched=${!ch.lastWatchedAt ? 'false':"true"} data-isfavorite=${ch.isFavorite} class="channel ${ch.isBlacklisted ? "hidden blacklist" : ""} border-b border-gray-900 px-1 chan-hover" >
            <td>&nbsp; ${ch.channelNumber}</td><td><img src="${ch.logo}" alt="Channel Logo" class="w-12.75"></td>
            <td class="h-12.75 flex justify-between items-center">${ch.name}
                <span class="w-17.5 flex justify-around items-center text-[17px]">
                    <span ${ch.isBlacklisted ? 'title="▫️Click to remove from black list.\n▫️Right click to delete"' : ""}>
                        <i  class="fa-solid fa-ban ${ch.isBlacklisted ? "text-red-400" : ""} hover:scale-125 hover:text-red-400" ></i>
                    </span>
                    <span data-isfavorite=${ch.isFavorite} class="fav-icon">
                        <i class="${ch.isFavorite ? "fas" : "far"} fa-star ${ch.isFavorite ? "favorite" : "not-favorite"} hover:scale-125 cursor-pointer"></i>
                    </span>
                    
                </span>
            </td>
        </tr>
    `).join("");
    // =================== To remember the last channels menu
    const lastMenu = localStorage.getItem("last-menu") || "main"
    localStorage.setItem("last-menu", lastMenu);

    if(lastMenu == "favorites"){
        handleFavorites()
    }
    else if(lastMenu == "blacklist"){
        handleBlacklist();
    }

 
}

const video = document.querySelector("#player video");
const player = document.querySelector("#player");
const emptyPlayer = document.querySelector("#player #empty-player");

const chanInfo = document.querySelector("#chan-info");

const name = chanInfo.querySelector("#name");
const program = chanInfo.querySelector("#program");
const number = chanInfo.querySelector("#number");
const country = chanInfo.querySelector("#country");
const starts = chanInfo.querySelector("#s-time");
const ends = chanInfo.querySelector("#e-time");


function showChannelInfo(data){
    document.addEventListener("click", (e)=>{

        if(e.target.closest(".channel")){
            const id = e.target.closest(".channel").dataset.id;
            
            const filtered = data.find(ch => ch.id == id);
            // console.log(filtered)
        
            name.textContent = filtered.name;
            country.textContent = filtered.country;
            number.textContent = filtered.channelNumber;
            program.textContent = filtered.epg.currentProgram;
            starts.textContent = filtered.epg.startTime;
            ends.textContent = filtered.epg.endTime;
   
            video.classList.remove("hidden");
            video.src = filtered.streamUrl;
            emptyPlayer.classList.add("hidden")
            player.classList.remove("border-2")
            // ===> Search For: Unified Streaming
    // "previewImage":
        }
    });
}

// ================================
const sideBar = document.querySelector("#side-bar");

function someClickEvents(){
    
    document.addEventListener("click", (e)=>{
        // --------------------------------- Reload
        if(e.target.classList.contains("fa-rotate-right")) location.reload();
        
        // --------------------------------- Active Channel
        if(e.target.closest(".channel")){
            const channels = document.querySelectorAll(".channel");
            for(let ch of channels){
                ch.classList.remove("active")
            }
            e.target.closest(".channel").classList.add("active");
            const id = e.target.closest(".channel").dataset.id
            updateLastWatched(id)

        }
        // --------------------------------- Hide/Show
        if(e.target.closest("#side-bar-btn")){
            sideBar.classList.toggle("-left-[100%]")
            sideBar.classList.toggle("left-0")
            console.log("GH")
        }
        // ============================================ Favorite a channel
        if(e.target.closest(".fa-star")){
            let favIcon = e.target.closest(".fav-icon");
            let tr = e.target.closest("tr");
            
            // console.log(e.target.closest("tr"))
            const id = e.target.closest("tr").dataset.id

            if(favIcon.dataset.isfavorite == "true"){
                favIcon.innerHTML = `<i class="far fa-star not-favorite cursor-pointer hover:scale-125"></i>`
                favIcon.dataset.isfavorite = "false";
                tr.dataset.isfavorite = "false"
                updateFavorite(id, false);
                
                    
            }else{
                favIcon.innerHTML = `<i class="fas fa-star favorite cursor-pointer hover:scale-125"></i>`
                favIcon.dataset.isfavorite = "true"
                tr.dataset.isfavorite = "true";
                
                updateFavorite(id, true);
                // console.log(tr)
                // ====================> If its also black listed
                // console.log(e.target.closest("tr").querySelector(".fav-icon"));

                tr.querySelector(".fa-ban").classList.remove("text-red-400");
                tr.classList.remove("blacklist");
                updateBlacklist(id, false);
                // blacklist()

                console.log(tr);
            }
        }
        // ------------------------------------------------ Blacklist a channel
        if(e.target.closest(".fa-ban")){
            const tr = e.target.closest("tr");
            const id = tr.dataset.id;
            let favIcon = e.target.closest("tr").querySelector(".fav-icon");

            if(!tr.closest(".blacklist")){
                updateBlacklist(id, true);
                tr.classList.add("hidden",  "blacklist");
                tr.querySelector(".fa-ban").classList.add("text-red-400");
                // ====================> If its also favorite
                favIcon.innerHTML = `<i class="far fa-star not-favorite cursor-pointer hover:scale-125"></i>`
                console.log(e.target.closest("tr").querySelector(".fav-icon"));
                e.target.closest("tr").querySelector(".fav-icon").dataset.isfavorite = "false";
                // console.log(e.target.closest("tr").querySelector(".fav-icon"));
                updateFavorite(id, false);


            }else{
                // console.log("==> back from B", tr.closest(".blacklist"))
                updateBlacklist(id, false);
                tr.classList.remove("blacklist");
                tr.classList.add("hidden");
            }
        }

        // ----------------------------------- Show Favorites
        showFavirote(e)
        // ---------------------------------- Show Blacklist
        showBlacklist(e)
        // ----------------------------------- Show Last Watched
        showHistories(e)
    })
}


function handleFavorites(){
    const channels = document.querySelectorAll(".channel");
    for(let ch of channels){
        if(ch.dataset.isfavorite == "true"){
            ch.classList.remove("hidden");
        }else{
            ch.classList.add("hidden");
        }
    }
} 
function showFavirote(event){
    if(!event.target.closest("#favorites")) return;
    localStorage.setItem("last-menu", "favorites");
    handleFavorites()
}

function handleBlacklist(){
    const channels = document.querySelectorAll(".channel")
    for(let ch of channels){
        if(!ch.closest(".blacklist")){
            ch.classList.add("hidden");

        }else{
            ch.classList.remove("hidden");
        }
    }
}
function showBlacklist(event){
    if(!event.target.closest("#blacklist")) return;
    localStorage.setItem("last-menu", "blacklist");
    handleBlacklist()
}

async function showHistories(event){
    if(!event.target.closest("#histories")) return;
    // const data = await getChannels()
    // showChannels(data)

    const channels = document.querySelectorAll(".channel");
    const watched = [...document.querySelectorAll(".channel[data-watched='true']")];
    console.log(watched.reverse())
    console.log(watched)
    channels.forEach(ch => ch.classList.add("hidden"))
        // if(ch.dataset.watched != 'true'){
            
        // }
    
    console.log(watched.length);
    console.log(watched[watched.length-1]);
    console.log(watched[watched.length-1]);

    if(watched.length > 5){

        watched.sort((a,b)=> Number(b.dataset.watchedat) - Number(a.dataset.watchedat))
        .slice(0, 5).forEach(w => w.classList.remove("hidden"))
    }else{
        watched.forEach(w => w.classList.remove("hidden"))
    }

    // if(watched.length > 5){
    //     console.log(watched.length )
    //     for(let x = 0; x < 5; x++){
    //         watched[x].classList.remove("hidden");
    //     }
    // }else{
    //     for(let ch of watched){
    //     // if(ch.dataset.watched != 'true'){
    //         ch.classList.remove("hidden");
    //     // }
    // }
    // }
}


export {showChannels, showChannelInfo, someClickEvents}