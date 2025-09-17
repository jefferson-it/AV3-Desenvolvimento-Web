const formComment = document.querySelector("#comment-form");
const listComments = document.querySelector("#comment-list");

formComment.addEventListener("submit", async e => {
    e.preventDefault();

    formComment.classList.toggle('in-submit')
    const formData = new FormData(formComment);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/feedback/${postId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });

    const jsonResponse = await response.json();
    formComment.classList.toggle('in-submit')

    if (jsonResponse.flash) alert(`${jsonResponse.flash.type}: ${jsonResponse.flash.message}`);

    if (jsonResponse.data) {
        const item = await (await fetch(`/api/feedback/f/${jsonResponse.id}?mode=complete`)).json();

        let olderComments = listComments.innerHTML;
        listComments.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${item.authorName}</span>
                <span class="comment-date">${item.date_str}</span>
            </div>
            <p class="comment-text">
               ${item.content}
            </p>

            ${olderComments}
        `;
    }
})