const form = document.getElementById('form')
const title = document.getElementById('title')
const email = document.getElementById('email')
const password = document.getElementById('password')
const list = document.getElementById('comment-list')


const showError = (element,message) =>{
    const formControl = element.parentElement;
    formControl.className = 'form-control error'
    const small  = formControl.querySelector('small')
    small.innerText = message
}

const createNewComment = (commentTitle,description) =>{
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
    listItem.className = 'list-item'

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";



    listItem.appendChild(avatarAndText);
    listItem.appendChild(buttonDiv);

	return listItem;
}


form.addEventListener('submit',(event)=>{
    event.preventDefault()

    if(title.value===''){
        showError(title,'Title is required')
    }else{
        commetList(title.value,description.value)
        title.value = ''
        description.value = ''
    }
})


const commetList = (title,description) =>{
    const listItem = createNewComment(title,description)
    list.appendChild(listItem)
}
