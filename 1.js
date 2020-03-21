document.addEventListener('DOMContentLoaded', function () {
    //ONCE ALL DOM CONTENT IS LOADED THIS FUNCTION RUNS
    //ADD TASK BUTTON
    let addbtn=document.querySelector('#add-task');
    addbtn.addEventListener('click',addTask);
    //DELETE TASK BUTTON
    let delbtn=document.getElementById('task-list');
    delbtn.addEventListener('click',delitem);
    //CLEAR ALL TASKS BUTTON
    let clrbtn=document.querySelector('#clear-all');
    clrbtn.addEventListener('click',clrall);
    //EVENT HANDLER FOR clear all
    function clrall(e){
        localStorage.removeItem('tasks');
        backToDefault();
    }
    //FUNCTION TO BRING BACK TO DEFAULT SETTINGS WHEN NO TASKS ARE PENDING
    function backToDefault(){
        document.querySelector('.default').style.display='block';
        document.querySelector('#tasklist').style.display='none';
    }
    //EVENT HANDLER FOR DELETING ITEM
    function delitem(e){
        let tasks=JSON.parse(localStorage.getItem('tasks'));
        if(e.target.tagName==='I'){
            tasks=(tasks.filter((task)=>{
                return task.name==e.target.parentElement.id ?false:true;
            }));
            delbtn.removeChild(e.target.parentElement.parentElement);
            if(tasks.length==0){
                localStorage.removeItem('tasks');
                backToDefault();
            }else{
            localStorage.setItem('tasks',JSON.stringify(tasks));
            }
        }
        e.preventDefault();
    }
    //FUNCTION TO DISPLAY ON LOAD
    function display(){
        let tasks=localStorage.getItem('tasks');
        if(tasks!==null){
            tasks=JSON.parse(tasks);
            document.querySelector('.default').style.display="none";
            let tl=document.querySelector('#tasklist');
            tl.style.display="block";
            let ul=tl.children[0];
            tasks.forEach(task => {
                let li=document.createElement('li');
                li.className='z-depth-2';
                li.innerHTML=`<a href='#' class="right" name='delete' id='${task.name}'><i class="material-icons" style='color:red'>close</i></a>${task.name}`;
                ul.appendChild(li);
                
            });
        }
    }
    display();
    function addTask(e){
        let task_name=document.querySelector('#task-name');
        if(task_name.value.length!==0)
        {
            document.querySelector('.default').style.display="none";
            let tl=document.querySelector('#tasklist');
            tl.style.display="block";
            let ul=tl.children[0];
            let tasks=localStorage.getItem('tasks');
            if(tasks===null){
                let li=document.createElement('li');
                li.className='z-depth-2';
                li.innerHTML=`<a href='#' class="right" name='delete' id='${task_name.value}'><i class="material-icons" style='color:red'>close</i></a>${task_name.value}`;
                ul.appendChild(li);
                tasks=[];
                tasks.push({
                    name:`${task_name.value}`,
                    time:new Date()
                });
                localStorage.setItem('tasks',JSON.stringify(tasks));
            }
            else{
                let li=document.createElement('li');
                li.className='z-depth-2';
                li.innerHTML=`<a href='#' class="right" name='delete' id='${task_name.value}'><i class="material-icons" style='color:red'>close</i></a>${task_name.value}`;
                ul.appendChild(li);
                tasks=JSON.parse(tasks);
                tasks.push({
                    name:`${task_name.value}`,
                    time:new Date()
                });
                localStorage.setItem('tasks',JSON.stringify(tasks));
            }
            task_name.value='';
        }
        e.preventDefault();
    }
    
});