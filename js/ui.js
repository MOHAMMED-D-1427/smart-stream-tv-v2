

const chansContainer = document.querySelector("#channels");


function showChannels(data){
    if (!data.length) {
        chansContainer.innerHTML =
        "<tr class='h-10 flex justify-center items-center'><td>No channel found</td></tr>";
        return;
    }

    chansContainer.innerHTML = ""
    chansContainer.innerHTML = data.map(ch => `
        <tr class="channel border-b border-gray-900 px-1 chan-hover" data-id="${ch.id}">
            <td>&nbsp; ${ch.channelNumber}</td><td><img src="${ch.logo}" alt="Channel Logo" class="w-12.75"></td>
            <td class="h-12.75 flex justify-between items-center">${ch.name}
                <span class="w-12.5 flex justify-around items-center text-[17px]">
                    <i class="fa-solid fa-ban hover:text-red-400"></i>
                        <span data-isfavorite="${ch.isFavorite}" class="fav-icon">
                            <i class="${ch.isFavorite ? "fas" : "far"} fa-star ${ch.isFavorite ? "favorite" : "not-favorite"} cursor-pointer"></i>
                        </span>
                        
                    </span>
            </td>
        </tr>
    `).join("");


 
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
            // player.style.backgroundImage = `url(${filtered.logo})`
            // console.log(player)
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
        // console.log(notFavorite)
        // console.log(favorite)
        // --------------------------------- Reload
        if(e.target.classList.contains("fa-rotate-right")) location.reload();
        
        // --------------------------------- Active Channel
        if(e.target.closest(".channel")){
            const channels = document.querySelectorAll(".channel");
            for(let ch of channels){
                ch.classList.remove("active")
            }
            e.target.closest(".channel").classList.add("active")
        }
        // --------------------------------- Hide/Show
        if(e.target.closest("#side-bar-btn")){
            sideBar.classList.toggle("-left-[100%]")
            sideBar.classList.toggle("left-0")
            console.log("GH")
        }
        // ------------------------------------------------ Color Star Icon
        if(e.target.closest(".fa-star")){
            let favIcon = e.target.closest(".fav-icon");

            // console.log(favIcon)
            if(favIcon.isfavorite == "true"){
                favIcon.innerHTML = `<i class="far fa-star not-favorite cursor-pointer"></i>`
                favIcon.isfavorite = "false"
                    
            }else{
                favIcon.innerHTML = `<i class="fas fa-star favorite cursor-pointer"></i>`
                favIcon.isfavorite = "true"
                
            }
        }
        // ------------------------------------------------ Blacklist a channel
        if(e.target.closest(".fa-ban")){
            const tr = e.target.closest("tr")
            const id = tr.dataset.id;
            tr.remove()
        }

    })
}


export {showChannels, showChannelInfo, someClickEvents}