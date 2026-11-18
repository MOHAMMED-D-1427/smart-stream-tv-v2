
const $ = query => document.querySelector(query)

const popup = $("#confirm-popup")

function deleteChannel(){
    let id = null;
    let channel = null
    document.addEventListener("contextmenu", (e)=>{
        if(!e.target.closest(".fa-ban")) return ;
        e.preventDefault()

        id = e.target.closest("tr").dataset.id;
        channel = e.target.closest("tr");
        const chName = e.target.closest("tr td").textContent
        $(".ch-name").textContent = chName
        popup.classList.remove("invisible");

    });
    // -------------------
    document.addEventListener("click", (e)=>{
        if(e.target.closest("#cancel")){
            popup.classList.add("invisible")
        }
        if(e.target.matches("#confirm-popup")){
            popup.classList.add("invisible")
        }
        if(e.target.matches("#confirm")){
            deleteById(id)
            channel.remove()
            console.log("==> Delete!", id);
            popup.classList.add("invisible")
        }
    })
}

const URL = "https://6af5eb63f6270fa08d68de84.mockapi.io/api/channels"

async function deleteById(id){
    try{
        await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/type"},
        })
    }catch(err){
        console.log("Delete Error!, ", err.message)
    }
}


export {deleteChannel};
