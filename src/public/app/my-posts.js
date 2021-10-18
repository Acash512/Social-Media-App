function loadMyPosts() {
    $.get(`api/posts/${window.currentUser.id}`,bindPosts)
}

loadMyPosts()