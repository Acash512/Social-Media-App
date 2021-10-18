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

function bindPosts(posts) {
    for (p of posts) {

        let card = $(`
        <div class="card mt-3">
        </div>
        `)

        let cardBody = $(`
        <div class="card-body">
        </div>
        `)

        card.append(cardBody)

        cardBody.append(`
        <h5 class="card-title">${p.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${p.user ? p.user.name : window.currentUser.name}</h6>
        <p class="card-text">${p.body}</p>`)

        let row = $(`
        <div class="row">
        </div>
        `)

        let inputGroup = $(`
        <div class="input-group mt-3 col-lg-6" style="z-index:0">
        </div>
        `)

        row.append(inputGroup)
        
        let inputNewComment = $(`                  
        <input type="text" class="form-control" placeholder="Add new comment" aria-label="Add new comment"
            aria-describedby="btnAddComment">`)

        inputGroup.append(inputNewComment)

        let inputGroupAppend = $(
            `<div class ="input-group-append">
            </div>`
        )
        
        inputGroup.append(inputGroupAppend)

        let btnAddComment= $(`<button class ="btn btn-outline-secondary" type ="button" id="btnAddComment" 
            disabled>Post</button>`) 
            
        inputGroupAppend.append(btnAddComment)    
        
        let btnShowComments = $(`<button class="btn btn-secondary" type="button">
                Show Comments
            </button>`)
    
        cardBody.append(btnShowComments)  
        
        let ulComments = $(`
        <ul class="list-unstyled" id="comments">
        </ul>
        `)

        let post = p

        btnAddComment.click(addComment)
        
        inputNewComment.on('input',togglePostButton)
        
        inputNewComment.keypress((e)=>{
            if(e.which==13 && inputNewComment.val()!=''){
                addComment()
            }
        })

        function addComment(){
            $.post('/api/comments/add',{
                body:inputNewComment.val(),
                userId:window.currentUser.id,
                postId:post.id
            },function(comment){
                inputNewComment.val('')
                togglePostButton()
                bindComment(comment)
            })
        }

        function togglePostButton(){
            btnAddComment.prop('disabled',inputNewComment.val()=='')
        }

        btnShowComments.click(()=>{
            cardBody.append(row)
            cardBody.append(ulComments)

            $.post('/api/comments/show',{
                postId:post.id
            },function(comments){
                ulComments.empty()
    
                for(c of comments){
                    bindComment(c)
                }
            })
        })

        function bindComment(comment){
            let liComment = $(`
                <li class="media mt-3">
                    <div class="media-body p-3"
                        style="background-color: var(--light);border-radius:1em;border-top-left-radius:0em">
                        <h6>${comment.user?comment.user.name:window.currentUser.name}</h6>
                        <p>${comment.body}</p>
                    </div>
                </li>`)

            ulComments.append(liComment)
        }

        $('#posts-container').append(card)
    }
}

$('#content').load('/components/all-posts.html')

let navlinks = $('.navbar-nav .nav-link')

navlinks.click((event) => {
    let component = $(event.target).attr('data-component')
    let componentUrl = `/components/${component}.html`
    $('#content').load(componentUrl)
})