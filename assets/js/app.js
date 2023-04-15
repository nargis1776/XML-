let cl = console.log;

const postContainer = document.getElementById(`postContainer`)
const postForm = document.getElementById(`postForm`)
const submitBtn = document.getElementById(`submitBtn`)
const updateBtn = document.getElementById(`updateBtn`)
const titleControl = document.getElementById(`title`)
const contentControl = document.getElementById(`content`)
let baserUrl = "https://jsonplaceholder.typicode.com/posts"

let dataArray = []

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const onPostEdit = (ele) => {
    //   cl(ele.parentElement.parentElement.id)
    let getEditId = ele.closest(`.card`).id;
    localStorage.setItem(`updateId`, getEditId)
    let editUrl = `${baserUrl}/${getEditId}`
    updateBtn.classList.remove(`d-none`)
    submitBtn.classList.add(`d-none`)
    makeApicall("GET", editUrl)
}

const onPostDelete = (ele) =>{
   let deleteId = ele.closest(".card").id;
cl(deleteId)
let deleteUrl = `${baserUrl}/${deleteId}`
cl(deleteUrl);
makeApicall("DELETE",deleteUrl)   // backend change >> remove object with id delete

let getcard = document.getElementById(deleteId);
cl(getcard);
getcard.remove(); //forntend chnage >> remove ui object
}
const templating = (arr) => {
    let result = ``;
    arr.forEach(ele => {
        result += `
        <div class="col-md-4 mb-4">
        <div class="card" id="${ele.id}">
            <div class="card-header">
               <h3>${ele.title}</h3>
            </div>
            <div class="card-body">
                <p>${ele.body}</p>
            </div>
            <div class="card-footer text-right">
           <button class="btn btn-primary" onclick="onPostEdit(this)">Edit</button>
           <button class="btn btn-danger" onclick="onPostDelete(this)">Delete</button>
            </div>
        </div>
    </div>
        `
    });
    postContainer.innerHTML = result;
}

function makeApicall(methodName, apiUrl, body) {
    let xhr = new XMLHttpRequest();
    xhr.open(methodName, apiUrl);
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            // cl(xhr.response)
            let data = JSON.parse(xhr.response)
            if (methodName === "GET") {
                if (Array.isArray(data)) {
                    dataArray = data.reverse();
                    templating(data)
                } else {
                    cl(data)
                    titleControl.value = data.title;
                    contentControl.value = data.body;
                }
            }
        }
    }
    xhr.send(body)
}
makeApicall("GET", baserUrl);

const onPostSubmit = (eve) => {
    eve.preventDefault();
    let postObj = {
        title: titleControl.value,
        body: contentControl.value,
        userId: Math.floor(Math.random() * 10) + 1,
        id: uuid()
    }
    cl(postObj)
    dataArray.unshift(postObj)
    templating(dataArray)
    postForm.reset();
    makeApicall("POST", baserUrl, JSON.stringify(postObj))
}

const onPostUpdate = () => {
    let getupdateId = localStorage.getItem("updateId");
    cl(getupdateId)
    let updateUrl = `${baserUrl}/${getupdatedId}`;

    let obj = {
        title: titleControl.value,
        body: contentControl.value,
    }
    makeApicall("PATCH", updateUrl, JSON.stringify(obj))
    postForm.reset();
    updateBtn.classList.add(`d-none`);
    submitBtn.classList.remove(`d-none`);

    let getCard = [...document.getElementById(getupdateId).children];
    cl(getCard)
    getCard[0].innerHTML = `
                <h3>${obj.title}</h3>
                 `
    getCard[1].innerHTML = `
                <p>${obj.boby}</p>
                 `
}
postForm.addEventListener("submit", onPostSubmit);
updateBtn.addEventListener("click", onPostUpdate)






