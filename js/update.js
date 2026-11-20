const URL = "https://6af5eb63f6270fa08d68de84.mockapi.io/api/channels"


async function updateFavorite(id, value){
    await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isFavorite: value})
    });

    console.log("Updated");
}

async function updateBlacklist(id, value){
    await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isBlacklisted: value})
    });

    console.log("Updated");
}


async function updateLastWatched(id){
    const date = Date.now()
    await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({lastWatchedAt: date})
    });

    console.log("Updated:", id, "DATE:", date);
}

export {updateFavorite, updateBlacklist, updateLastWatched}