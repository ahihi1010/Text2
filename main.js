// var users = [
//   {
//     id: 1,
//     name: 'Quoc Cuong'
//   },
//   {
//     id: 2,
//     name: 'Song Thuong'
//   },
//   {
//     id: 3,
//     name: 'Ahihi'
//   },
// ];

// const { response } = require("express");

// var comments = [
//   {
//     id: 1,
//     user_id: 1,
//     content: 'Enh oi sao chua co luong'
//   },
//   {
//     id: 2,
//     user_id: 2,
//     content: 'Vua co do Anh oi'
//   },
//   {
//     id: 3,
//     user_id: 1,
//     content: 'Thank kiu em Oi'
//   }
// ]

// function getComments(){
//   return new Promise(function(resolve){
//     setTimeout(function(){
//           resolve(comments)
//     },1000)
//   })
// }

// function getUserById(userId){
//    return new Promise(function(resolve){
//       var result = users.filter(function(user){
//         return userId.includes(user.id);
//       });
//       setTimeout(function(){
//         resolve(result);
//       },1000)
//    },1000)
// }

// getComments()
// .then(function(comments){
//   var userId = comments.map(function(){
//     return comments.user_id;
//   });

//   return getUserById([1,2,3])
//     .then(function(users){
//        return {
//         users: users,
//         comments: comments
//        }
//         });
// })
// .then(function(data){
//   var html = '';
//   var ints = document.getElementById('Box');
//   data.comments.forEach(function(comments){
//     var user = data.users.find(function(user){
//       return user.id === comments.user_id;
//     });
//       html += `<li>${user.name}: <br \>${comments.content}</li>`
//   });
//   ints.innerHTML = html;
// })

// var abc = document.querySelector('.even');

// abc.onclick = function(){
//   alert('So cua ban la:' + Math.floor(Math.random() * 100 ));
// }
// var text = document.querySelector('.num')
// text.addEventListener('click', function(){
//   setTimeout(function(){
//     alert("So STT Cua May La: " + Math.floor(Math.random() * 1001));
//   },2000)
  
// })

// var promise1 = new Promise(function(resolve){
//    setTimeout(function(){
//     resolve([1,12,54,66]);
//    },2000)
// });

// var promise2 = new Promise(function(resolve){
//   setTimeout(function(){
//    resolve([2,3]);
//   },3000)
// });

// Promise.all([promise1,promise2])
//    .then(function([result1,result2]){
//       console.log(result1.concat(result2));
//     });

 

//Fetch
// var url = 'https://jsonplaceholder.typicode.com/posts';

// fetch(url)
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(gets){
//      var htmls = gets.map(function(post){
//     return `<li>
//        <h1>${post.title}</h1>
//        <p>${post.body}</p>  
//      </li>`
//   });
//   var html = htmls.join('');
//   document.getElementById('Box').innerHTML = html;
  
// })


// var api = 'http://localhost:3000/courses';

// fetch(api)
//   .then(function(response){
//      return response.json();
//   })
//   .then(function(node){
//     var node1 = node.map(function(cc){
//        return `<li>
//        <h1>${cc.name}</h1>
//        <img src="${cc.img}"></img>
//        <p>${cc.description}</p>
//        </li>`
//     });
//     var node2 = node1.join('');
//     document.getElementById('Box').innerHTML = node2; 
//   })



var postApi = 'http://localhost:3000/courses';

function start() {
    getUsers(renderUsers);
    handleCreate();
    handleCreateForm();
}

start();

function getUsers(callback) {
    fetch(postApi)
        .then(response => response.json())
        .then(callback);
}

function createUsers(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(postApi, options)
        .then(response => response.json())
        .then(callback);
}

function handleDeleteUsers(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(postApi + '/' + id, options)
        .then(response => response.json())
        .then(function() {
            var usersItem = document.querySelector('.user-item-' + id);
            if (usersItem) {
                usersItem.remove();
            }
        });
}

function updateUsers(id, data) {
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(postApi + '/' + id, options)
        .then(response => response.json())
        .then(renderUsers);
}

function renderUsers(users) {
    var listUsers = document.querySelector('#list-users');
    var htmls = users.map(user => {
        return `<li class="users-item-${user.id}">
            <h1 class="user-name-${user.id}">${user.name}</h1>
            <p class="user-comment-${user.id}">${user.description}</p>
            <button onclick="handleDeleteUsers(${user.id})">Delete</button>
            <button onclick="handleUpdate(${user.id})">Change</button>
        </li>`;
    });
    listUsers.innerHTML = htmls.join('');
}

function handleCreate() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var comment = document.querySelector('input[name="comment"]').value;
        var formData = {
            name: name,
            comment: comment
        };
        createUsers(formData, function() {
            getUsers(renderUsers);
        });
    };
}

function handleUpdate(id) {
    var createBtn = document.querySelector("#create");
    createBtn.innerText = "Save";

    // Lấy thông tin người dùng từ các phần tử hiện tại
    var nameInput = document.querySelector('input[name="name"]');
    var commentInput = document.querySelector('input[name="comment"]');
    var userName = document.querySelector('.user-name-' + id).innerText;
    var userComment = document.querySelector('.user-comment-' + id).innerText;

    // Hiển thị thông tin người dùng trong ô input
    nameInput.value = userName;
    commentInput.value = userComment;

    createBtn.onclick = function() {
        var name = nameInput.value;
        var comment = commentInput.value;
        var formData = {
            name: name,
            comment: comment
        };
        updateUsers(id, formData, function() {
            getUsers(renderUsers);
            nameInput.value = "";
            commentInput.value = "";
            createBtn.innerText = "Create";
            handleCreateForm();
        });
    };
}


function handleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var comment = document.querySelector('input[name="comment"]').value;

        var formData = {
            name: name,
            comment: comment,
        };
        createUsers(formData, function() {
            getUsers(renderUsers);
            document.querySelector('input[name="name"]').value = "";
            document.querySelector('input[name="comment"]').value = "";
        });
    };
}
