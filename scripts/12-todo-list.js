const todoList=[]
const secondTodoList=[]
const minMaxList=[]
const stringRepeating=[]
const finalTodo=[]
function addToList(task){
    if (task==='task1'){
        const taskElement=document.querySelector('.js-input-task1');
        console.log("added to first Todo list");
        todoList.push(taskElement.value);
        console.log(todoList);
        taskElement.value='';
        return todoList
    }else if(task==='task2'){
        const taskElement=document.querySelector('.js-input-task2');
        console.log("added to Second Todo list");
        secondTodoList.push(taskElement.value);
        console.log(secondTodoList);
        taskElement.value='';
        updateDiv();
        return secondTodoList
    }else if(task==='task3'){
        const taskElement=document.querySelector('.js-input-task3');
        console.log("added to minMax list");
        minMaxList.push(Number(taskElement.value));
        console.log(minMaxList);
        taskElement.value='';
        return minMaxList
    }else if(task==='task4'){
        const taskElement=document.querySelector('.js-input-task4');
        console.log("added to string list");
        stringRepeating.push(taskElement.value);
        console.log(stringRepeating);
        taskElement.value='';
        return stringRepeating
    }else if(task==='finaltask'){
        const textInputElement=document.querySelector('.js-input-final-text');
        const dateInputElement=document.querySelector('.js-input-final-date');
        console.log("object is adding to final list");
        finalTodo.push({name: textInputElement.value,date: dateInputElement.value});
        console.log(finalTodo);
        textInputElement.value='';
        dateInputElement.value='';
        updateDiv('final');
        return finalTodo
    }
}
document.querySelector('.js-task1-button').addEventListener('click',()=>{
    addToList('task1');
})
document.querySelector('.js-task2-button').addEventListener('click',()=>{
    addToList('task2');
});
document.querySelector('.js-task3-button').addEventListener('click',()=>{
    addToList('task3');
})
document.querySelector('.js-task4-button').addEventListener('click',()=>{
    addToList('task4');
})
document.querySelector('.js-final-task-button').addEventListener('click',()=>{
    addToList('finaltask');
})
document.querySelector('.js-get-minmax').addEventListener('click',()=>{
    updateMinMax();
})
document.querySelector('.js-get-repeating').addEventListener('click',()=>{
    updateReapeat();
})
function handleKeyDown(event){
    if (event.key==='Enter' && event.target.className==='js-input-task1'){
        addToList('task1');
    } else if(event.key==='Enter' && event.target.className==='js-input-task2'){
        addToList('task2');
    }else if(event.key==='Enter' && event.target.className==='js-input-task3'){
        addToList('task3');
    }else if(event.key==='Enter' && event.target.className==='js-input-task4'){
        addToList('task4');
    }else if(event.key==='Enter' && event.target.className==='js-input-final-task'){
        addToList('finaltask');
    }
}
function updateDiv(key=null){
    if(key){
        const divElement=document.querySelector('.js-div-final-todo');
        html=''
        finalTodo.forEach(function(todoobject,index){
            const {name,date}=todoobject;
            html+=`<div>${name}</div>
            <div>${date}</div>
            <button class="delete js-task-delete">Delete</button>`;
        })
        /* 
        for (let i=0;i<finalTodo.length;i++){
            const {name,date}=finalTodo[i]
            html+=`<div>${name}</div>
            <div>${date}</div>
            <button class="delete js-task-delete" 
            onclick="finalTodo.splice(${i},1);
            updateDiv('final');">Delete</button>`;
        }
        */
        divElement.innerHTML=html;
        document.querySelectorAll('.js-task-delete').forEach((deleteButton,index)=>{
            deleteButton.addEventListener('click',()=>{
                finalTodo.splice(index,1);
                updateDiv('final');
            })
        })
    }else{
        const divElement=document.querySelector('.js-div-todo2');
        divElement.innerHTML='';
        for (let i=0;i<secondTodoList.length;i++){
            divElement.innerHTML+=`<p>${secondTodoList[i]}</p>`;
        }
    }
}
function updateMinMax(){
    const paraElement=document.querySelector('.js-minMax-para')
    console.log(minMaxList)
    if (Array.isArray(minMaxList) && minMaxList.length > 0){
        let min=minMaxList[0];
        let max=minMaxList[0];
        for(let i=0;i<minMaxList.length;i++){
            if (min>minMaxList[i]){min=minMaxList[i];}
            if (max<minMaxList[i]){max=minMaxList[i];}
        }
        paraElement.innerHTML=`min: ${min}, max: ${max}`;
    } else{
        paraElement.innerHTML=`min: ${null}, max: ${null}`;
    }
}

function updateReapeat(){
    const paraElement=document.querySelector(".js-repeating-para");
    result={}
    for(let i=0;i<stringRepeating.length;i++){
        if (result[stringRepeating[i]]){
            result[stringRepeating[i]]++;
        }else{
            result[stringRepeating[i]]=1;
        }
    }
    console.log(result);
    paraElement.innerHTML=`<p>${JSON.stringify(result)}</p>`;
}