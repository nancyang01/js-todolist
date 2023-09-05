const txt = document.querySelector(".txt");
const add = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const del = document.querySelector(".delete");
const tab = document.querySelector(".tab");
const count = document.querySelector(".count");
const clear = document.querySelector(".clear");



let data = [];

// 渲染清單到頁面上
function renderData(newData){
    let str = "";
    newData.forEach(function(item){
        str += `             
        <li data-id="${item.id}">
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked}/>
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete">&#10005;</a>
        </li>`
    
    })
    list.innerHTML = str;
}

// renderData(newData);


// 新增清單
add.addEventListener('click',function(e){
    if(txt.value.trim() === ""){
        alert("請輸入待辦事項")
        return;
    }
    let obj = {
        content : txt.value, 
        id : new Date().getTime(),
        checked : ""
    };

    data.push(obj);
    filterList();
    txt.value = "";

})

// 刪除清單
// const label =document.querySelector(".checkbox")

list.addEventListener("click",function(e){
    let num = e.target.closest("li").getAttribute("data-id")
    let nums = data.findIndex(function(item){
        return item.id == num
    })
    if(e.target.getAttribute("class") === "delete"){
        data.splice(nums,1)

    }
    else if(e.target.nodeName === "INPUT"){
        if(data[nums].checked === ""){
            data[nums].checked = "checked"
        }
        else{
            data[nums].checked = ""
        }
    }
    filterList();
})

// 選單切換
let all_list = "全部"
const tabs = document.querySelectorAll(".tab li")
tab.addEventListener('click',function(e){
    all_list=e.target.dataset.status
    tabs.forEach(function(item){
        item.setAttribute("class", "");
    })
    e.target.setAttribute("class", "active");
    filterList();

})

clear.addEventListener("click",function(e){
    // console.log(e.target.textContent)
    if(e.target.textContent === "清除已完成項目"){
        data = data.filter(function(item){
            return item.checked !== "checked";
        })
        filterList();
    }
    else{
        return;
    }

})

function filterList(){
    let newData = [];
    if(all_list == "全部"){
        newData = data;
    }
    else if(all_list == "待完成"){
        newData = data.filter(function(item){
            return item.checked === ""
        })
        
    }
    else if(all_list == "已完成"){
        newData = data.filter(function(item){
            return item.checked === "checked"
        })
    }
    renderData(newData);
    undone();
    // console.log(newData);
}

function undone(){
    let undone_list = data.filter(function(item){
        return item.checked === ""
    })
    count.innerHTML = `              
    <p>${undone_list.length} 個待完成項目</p>`
}
