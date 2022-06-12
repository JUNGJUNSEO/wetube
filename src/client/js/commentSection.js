const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComments = document.querySelectorAll(".video__delete-comment")
const likeComments = document.querySelectorAll(".video__like-comment")
let videoId = videoContainer.dataset.id;

const addComment = (comment) => {
  const videoComments = document.querySelector(".video__comments ul");
  videoComments.insertAdjacentHTML('afterbegin',`
            <li class="video__comment" data-id=${comment._id}>
              <div class="video__user-comment" >
                <a href="/users/${comment.owner}">
                  <img class="avatar" src=/${comment.avatarUrl}>
                </a>
                <div class="video__name-comment">
                  <span class="video__owner-comment">${comment.name}</span>
                  <span>${comment.text}</span>
                </div>
              </div>
              <div class="video__info-comment">
                <span class="video__date-comment">
                  ${new Date(comment.createdAt).toLocaleDateString("ko-kr", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                </span>
                <div>
                  <span class="video__like-comment" id="like">${comment.likes} LIKE</span>
                  <span class="video__delete-comment" id="delete">DELETE</span>
                </div>
              </div>

            </li>
            
            `)
  

};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newComment } = await response.json();
    addComment(newComment);
    const deleteComment = document.getElementById("delete")
    deleteComment.addEventListener("click", handleDeleteComment);
    const likeComment = document.getElementById("like")
    likeComment.addEventListener("click", handleLikeComment);
  }
};

const handleDeleteComment = async(event) =>{
    const element = event.path[3]
    const { dataset: {id: commentId}} = element
    const response = await fetch(`/api/videos/${videoId}/delete/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ commentId }),
      });
      if (response.status === 201){
          element.remove()
      };
      
}

const handleLikeComment = async(event) =>{
  const element = event.path[3]
  const { dataset: {id: commentId}} = element
  const response = await fetch(`/api/videos/${videoId}/like/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({ commentId }),
    });
    if (response.status === 201){
      const { newCommentLike } = await response.json();

      event.target.innerText = (newCommentLike > 1) ? `${newCommentLike} LIKES` : `${newCommentLike} LIKE`
          
    };
    
}


if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteComments) {
    deleteComments.forEach((comment) => {
        comment.addEventListener("click", handleDeleteComment)
    })
}

if (likeComments) {
  likeComments.forEach((like) => {
      like.addEventListener("click", handleLikeComment)
  })
}