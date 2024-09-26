const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    /*If field empty give alert*/
    if(inputBox.value === ''){
        /*change alert to not be alert but field warning*/
        alert("You must write something!");
    }
    
    else{
        /* creating one html elemenet with tag line li, and storing element in li variable*/
        let li = document.createElement("li");
        /* add text inside li into innerhtml */
        li.innerHTML = inputBox.value;
        /* display li under listContainer*/
        listContainer.appendChild(li);
        let span = document.createElement("span");
        /* Cross Icon*/
        span.innerHTML = "\u00d7";
        /*display cross*/
        li.appendChild(span);
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        }
        else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
        }
}, false);