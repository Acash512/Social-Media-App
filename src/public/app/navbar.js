function loginIfNeeded() {
    window.currentUser = window.localStorage.user ? JSON.parse(window.localStorage.user) : null

    if (currentUser) {
        $('#navUserName').text(currentUser.name)
    } else {
        $.post("/api/users", {}, function (user) {
            window.localStorage.user = JSON.stringify(user)
            currentUser = user
            $('#navUserName').text(currentUser.name)
        })
    }
}

loginIfNeeded()

function bindPosts(posts){
    for (p of posts) {
        let postCard = $(`
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${p.user?p.user.name:window.currentUser.name}</h6>
                <p class="card-text">${p.body}</p>
            </div>
        </div>`)
        
        $('#posts-container').append(postCard)
    }
}

$('#content').load('/components/all-posts.html')

let navlinks = $('.navbar-nav .nav-link')

navlinks.click((event)=>{
    let component = $(event.target).attr('data-component')
    let componentUrl = `/components/${component}.html`
    $('#content').load(componentUrl)
})