let cl = console.log;
const postContainer = document.getElementById(`postContainer`)
const postForm = document.getElementById(`postForm`)
const titleControl = document.getElementById(`title`)
const contentControl = document.getElementById(`content`)
let baserUrl = "https://jsonplaceholder.typicode.com/posts"

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const templating = (arr) => {
    let result = ``;
    arr.forEach(ele => {
        result += `
        <div class="col-md-4 mb-4">
        <div class="card">
            <div class="card-header">
               <h3>${ele.title}</h3>
            </div>
            <div class="card-body">
                <p>${ele.body}</p>
            </div>
            <div class="card-footer text-right">
           <button class="btn btn-primary">Edit</button>
           <button class="btn btn-danger">Delete</button>
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
            cl(xhr.response)
            let data = JSON.parse(xhr.response)
            if (methodName === "GET") {
                templating(data)
            }
        }
    }
    xhr.send(body)

}
makeApicall("GET", baserUrl);

const onPostSubmit = (eve) =>{
    eve.preventDefault();
    let postObj = {
        title : titleControl.value,
        body : contentControl.value ,
        userId : Math.floor(Math.random()* 10) + 1,
        id : uuid()
    }
    cl(postObj)
    makeApicall("POST",baserUrl,JSON.stringify(postObj))
}


postForm.addEventListener("submit", onPostSubmit)




// GET 
// POST 
// DELETE 
// PATCH / PUT 
 
// read all data  >> 100
// read single data only 
// delete all data 
// delete single data only 
// update single data only 
// `$(baseUrl)/:id`
// let baserUrl = "https://jsonplaceholder.typicode.com/posts"
// 
// // 1 create xhr Object
// let xhr = new XMLHttpRequest();
// // 2 configration 
// // xhr.open("GET, baseUrl ,true")
// xhr.open("GET",baserUrl)
// // 3. on response load 
// xhr.onload = function(){
//     if(xhr.status === 200){
//         // cl(xhr.response) >> api call success 
//         cl(xhr.status);
//         cl(xhr.readyState); // 4
//     }else{
//         alert(`Something went wrong`)
//     }
// }

// // // 4 sends
// xhr.send();

// xhr.status 
// 200 or 202 >> success 
// 404 >> not found 
// 403 >> forbidden 
// 503 >> services not available

// Bearer token or JWT 

// xhr.readyState 
// 0 >> Unsend >> xhr object created but open method is not called yet 
// 1 >> Open method is called 
// 2 >> send method is called
// 3 >> loading >> server is loading our request 
// 4 >> Done >> Request has been proccesed and responce (it may be success or fail )











