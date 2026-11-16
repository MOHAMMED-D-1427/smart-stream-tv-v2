const URL = "https://6af5eb63f6270fa08d68de84.mockapi.io/api/channels"


async function updateFavorite(id, value){
    await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isFavorite: value})
    });

    console.log("Updated")
}

export {updateFavorite}