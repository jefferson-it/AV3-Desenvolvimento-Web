const form = document.querySelector("form#edit-post");

form.addEventListener("submit", async e => {
    e.preventDefault();

    form.classList.toggle('in-submit')
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });

    const jsonResponse = await response.json();
    form.classList.toggle('in-submit')
    console.log(jsonResponse);

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);
})