function loadAllPosts() {
    $.get('api/posts',bindPosts)
}

loadAllPosts()