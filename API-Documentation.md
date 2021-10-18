### Users
1. `POST /users/`  
Creates a new user with a random username.

### Posts
1. `POST /posts/`  
Creates a new post  
Required fields in body : `title,body,userId`

2. `GET /posts/:userId`  
Fetches the posts for a particular user  
Requires `userId` as a path parameter

3. `GET /posts/`  
Fetches all posts from all users

### Comments
1. `POST /comments/add`  
Adds a comment to a post  
Required fields in body : `body,userId,postId`  

2. `POST /comments/show`  
Fetches all comments for a particular post  
Required fields in body : `postId`