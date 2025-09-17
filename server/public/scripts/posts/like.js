const likeBtn = document.querySelector("#like-btn");

likeBtn.addEventListener("click", async e => {
    e.preventDefault();

    const response = await fetch(`/api/post/${postId}/like`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }
    });
    const jsonResponse = await response.json();

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);

    if (jsonResponse.success) {
        likeBtn.innerHTML = jsonResponse.liked ?
            `<i class="fas fa-heart"></i> Curtido` :
            `<i class="fa-regular fa-heart"></i> Curtir`
    }
})