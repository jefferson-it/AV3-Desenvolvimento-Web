const form = document.querySelector("form#create-post");

form.addEventListener("submit", async e => {
    e.preventDefault();

    form.classList.toggle('in-submit')
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });

    const jsonResponse = await response.json();
    form.classList.toggle('in-submit')
    console.log(jsonResponse);

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);

    if (jsonResponse.id) {
        window.location.href = `/post/${jsonResponse.id}`;
        return;
    }
})