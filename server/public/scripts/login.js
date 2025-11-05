const formLogin = document.querySelector("form#form-login");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valid = formLogin.checkValidity();

    if (!valid) {
        formLogin.reportValidity();
        return
    }

    formLogin.classList.toggle('in-submit')
    const formData = new FormData(formLogin);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });

    const jsonResponse = await response.json();
    formLogin.classList.toggle('in-submit')

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);


    if (jsonResponse.data) {
        window.location.href = '/';
        return
    }

})