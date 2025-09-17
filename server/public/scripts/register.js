const formRegister = document.querySelector("form#form-register");
formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valid = formRegister.checkValidity();

    if (!valid) {
        formRegister.reportValidity();
        return
    }

    formRegister.classList.toggle('in-submit')
    const formData = new FormData(formRegister);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });

    const jsonResponse = await response.json();
    formRegister.classList.toggle('in-submit')
    console.log(jsonResponse);

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);

    if (jsonResponse.data) {
        window.location.href = '/';
        return;
    }

})