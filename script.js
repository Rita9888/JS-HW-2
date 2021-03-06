var inputData = document.querySelector("input[type ='text']");
var ulSpisok = document.querySelector("ul");
var liSpisok = document.getElementsByTagName("li");
var spans = document.getElementsByClassName("delete-button");
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var d = new Date();
var month=new Array("января","февраля","марта","апреля","мая","июня",
"июля","августа","сентября","октября","ноября","декабря");
var  modal = document.getElementById('modal');
var btn = document.getElementById('info');
var close = document.getElementsByClassName("close")[0];

btn.onclick = function (){
    modal.style.display = "block";
}

close.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function (event){
    if(event.target == modal){
        this.modal.style.display = "none";
    }
}

function LineTrough(){
    for(let li of liSpisok){
        li.addEventListener('click', function(){
            this.querySelector('.node-value').style.textDecoration = "line-through";
            //li.style.textDecoration = "line-through";
        })
    }
}

function deleteTodo(){
    for(let span of spans){
        span.addEventListener('click', function(){
            span.parentElement.remove();
            event.stopPropagation();
        })
    }
}

function loadTodo(){
    if(localStorage.getItem('todoList')){
        ulSpisok.innerHTML = localStorage.getItem('todoList');
    }

    deleteTodo();
}


inputData.addEventListener('keypress', function(keyPressed){
    if(keyPressed.which === 13){
        var liNew = document.createElement("li");
        var deleteSpan = document.createElement("span");
        var valueSpan = document.createElement('span');
        var dateSpan = document.createElement("span");

        deleteSpan.innerHTML = 'Удалить';
        deleteSpan.className = 'delete-button';

        var dateNew = (" " +d.getDate()+ " " + month[d.getMonth()]
        + " " + d.getFullYear() + " г.");
        dateSpan.textContent = dateNew;
        dateSpan.className = "node-date";
       
        var newTodo = this.value;
        this.value = " ";
        valueSpan.textContent = newTodo;
        valueSpan.className = 'node-value';
        if(newTodo.length > 0 && newTodo !== " "){
            ulSpisok.appendChild(liNew).append(deleteSpan, valueSpan, dateSpan);
        }
        deleteTodo();
        LineTrough();
    }
})

saveBtn.addEventListener('click', function(){
    localStorage.setItem('todoList', ulSpisok.innerHTML);
})

clearBtn.addEventListener('click', function(){
    ulSpisok.innerHTML = "";
    localStorage.setItem('todoList', ulSpisok.innerHTML);
})

deleteTodo();
loadTodo();
LineTrough();

