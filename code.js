let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let tasks=document.querySelector(".tasks");
let edit_menu=document.querySelector(".edit_menu");
let Deleteall=document.querySelector(".deleteall");
let edit_text=document.querySelector(".edit_menu .text")
let save=document.querySelector(".edit_menu .save");
let cancel=document.querySelector(".edit_menu .cancel");


let arr=[];
if(window.localStorage.getItem("tasks"))
{   
    arr=JSON.parse(window.localStorage.getItem("tasks"));
    console.log(arr);
    addtasktopage(arr);
}

submit.onclick=function(){
    
    if(input.value!=="")
    {
        addtaskitem(input.value);
        input.value="";
    }
}

function addtaskitem(text)
{
    let object={
        id:Date.now(),
        title:text,
        completed:false,
    }
  arr.push(object);
  addtasktopage(arr);
  local(arr);
}
//append element in page
function addtasktopage(arrayofele)
{
    tasks.innerHTML="";

    arrayofele.forEach(function(ele){
    let item= document.createElement('div');
    item.className="task";
    if (ele.completed)
    {
      item.className = "task done";
    }
    item.setAttribute("data-id",ele.id);
    let text=document.createTextNode(ele["title"]);
    item.appendChild(text);
    let span=document.createElement('span');
    let span2=document.createElement('span');
    span.className="del";
    span2.className="Edit";
    span.appendChild(document.createTextNode("Delete"));
    span2.appendChild(document.createTextNode("Edit"));
    item.appendChild(span);
    item.appendChild(span2);
    tasks.appendChild(item); 
})
}

function local(array)
{
   window.localStorage.setItem("tasks",JSON.stringify(array));
}

//deleting ele
tasks.addEventListener("click",function(e){
    if(e.target.classList.contains("del"))
    {
      e.target.parentElement.remove();
      deletefromlocal(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("task"))
    {
    e.target.classList.toggle("done");
    //in local storatge
    Toggle(e.target.getAttribute("data-id"));
    }
    if(e.target.classList.contains("Edit"))
    {
      Deleteall.style.display="none";
      edit_menu.style.display="block";
      console.log(e.target.parentElement.getAttribute("data-id"))
      Save(e.target.parentElement.getAttribute("data-id"));
     }
})

cancel.onclick=function(){
        console.log("cancel");
        Deleteall.style.display="block";
        edit_menu.style.display="none";
}

function Save(edit_id)
{
  save.onclick=function()
  {
  if(edit_text.value!=="")
    {
        for(let i=0;i<arr.length;i++)
          {
            if(arr[i].id==edit_id)
            {
              arr[i].title=edit_text.value;
              edit_text.value="";
            }  
          }
        console.log(edit_id);
        console.log(edit_text.value);
    }
    local(arr);
    addtasktopage(arr);
    edit_menu.style.display="none";
    Deleteall.style.display="block";
  } 
  
}



function deletefromlocal(Id)
{
    arr=arr.filter((rem)=>rem.id!=Id)
    local(arr);
}


Deleteall.onclick=function(){
  window.localStorage.removeItem("tasks");
  tasks.innerHTML="";
}

function Toggle(id_toggle)
{ 
  console.log(arr)
  for(let i=0;i<arr.length;i++)
  {
    if(arr[i].id==id_toggle)
    {
      arr[i].completed==false?(arr[i].completed=true):(arr[i].completed=false);
    }  
  }
 local(arr);
}
