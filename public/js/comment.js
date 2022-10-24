async function commentFormHandler(event) {
    event.preventDefault();
    const comment_str = document.querySelector('input[name="comment-body]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if(comment_str) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_str
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').getElementsByClassName.display = 'block';
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);