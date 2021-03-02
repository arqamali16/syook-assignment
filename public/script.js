let comments = [{title:'Hello',description:'How are you?'}]
const originalComments = []

const form = document.getElementById('form')
const search = document.getElementById('search')
const list = document.getElementById('comment-list')

search.addEventListener('input',(event)=>{
    // Shallow copy
    Object.assign(originalComments, comments)
    const searchString = search.value

    const filteredComments = originalComments.filter((value)=>  value.title.toLowerCase().includes(searchString.toLowerCase()));
    comments = filteredComments
    displayComments()
})


const showError = (element,message) =>{
    const formControl = element.parentElement;
    formControl.className = 'form-control error'
    const small  = formControl.querySelector('small')
    small.innerText = message
}

const deleteComment = (commentId) =>{
    const filtered = comments.filter((value, index)=> index !== parseInt(commentId, 10));
    comments = filtered
    displayComments()
}

const editForm  = (commentId) =>{
    const commnetValue = comments[commentId]
    const editForm =  document.createElement("form");
    editForm.className = 'edit-form'

    const titleEdit =  document.createElement("input");
    titleEdit.className = 'margin-buttom'
    titleEdit.value = commnetValue.title

    const descriptionEdit =  document.createElement("textarea");
    descriptionEdit.className = 'margin-buttom'
    descriptionEdit.value = commnetValue.description


    const saveButton =  document.createElement("button");
    saveButton.innerText = 'Save'
    saveButton.className = 'save-button'

    editForm.appendChild(titleEdit)
    editForm.appendChild(descriptionEdit)
    editForm.appendChild(saveButton)

    editForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        comments[commentId].title = titleEdit.value
        comments[commentId].description = descriptionEdit.value
        displayComments()
    })
    return editForm
}

const editComment = (commentId) =>{
    const selectedComment = document.getElementById(`list-item-${commentId}`)
    const slectedForm = editForm(commentId)
    selectedComment.innerHTML = ''
    selectedComment.appendChild(slectedForm)
}



const createNewComment = (commentTitle,description,index) =>{
    const imageDiv = document.createElement("div");
    const image =  document.createElement("img");
    image.className = 'avatar'
    image.src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
    image.alt = 'Avatar'
    image.className = 'list-item-avatar'
    imageDiv.className = 'list-item-avatar-meta'
    imageDiv.appendChild(image)

    const textSection = document.createElement("div");
    textSection.className = "text-content"

    const avatarAndText = document.createElement("div");
    avatarAndText.className = 'list-item-meta'
    avatarAndText.appendChild(imageDiv)
    avatarAndText.appendChild(textSection);

    const title = document.createElement("h4");
    title.innerText = commentTitle
    const label = document.createElement("p");
    label.innerText = description
    textSection.appendChild(title)
    textSection.appendChild(label)


    const buttonDiv = document.createElement("div");
    buttonDiv.className = 'list-item-button'
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    const listItem = document.createElement("li");
    listItem.className = 'list-item form-control'
    listItem.id = `list-item-${index}`

    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.id = index
    editButton.addEventListener('click',(event)=>{
        editComment(editButton.id)
    })


    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.id = index
    deleteButton.addEventListener('click',(event)=>{
        deleteComment(deleteButton.id)
    })



    listItem.appendChild(avatarAndText);
    listItem.appendChild(buttonDiv);

	return listItem;
}


form.addEventListener('submit',(event)=>{
    event.preventDefault()

    if(title.value===''){
        showError(title,'Title is required')
    }else{
        comments.push({title:title.value,description:description.value})
        displayComments()
        title.value = ''
        description.value = ''
    }
})


const displayComments = () =>{
    list.innerHTML = ''
    comments.forEach((element,index) => {
        const listItem = createNewComment(element.title,element.description,index)
        list.appendChild(listItem)
    });
}

displayComments()
