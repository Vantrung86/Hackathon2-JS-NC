
//tạo id
function uuid() {
    return Math.floor(Math.random() * 89798484545);
}

//hiển thị
function handleShow() {
    let data = JSON.parse(localStorage.getItem("contents")) || [];
    let text = "";
    for (let i = 0; i < data.length; i++) {
        text += 
        `
            <li>
                <i onclick="handleDelete(${data[i].id})" class="fa-solid fa-xmark"></i>
                <i class="fa-solid fa-crown"></i>
                ${data[i].name}
                <button onclick="handleDown(${data[i].id})" class="decrease">-</button>
                <span id="score">${data[i].count}</span>
                <button onclick="handleUp(${data[i].id})" class="increase">+</button>
            </li>
        `     
    }
    document.getElementsByTagName("ul")[0].innerHTML = text;
    handleTotal();
}
handleShow();

//thêm
function handleAdd() {
    let contents = JSON.parse(localStorage.getItem("contents")) || [];
    let valueInput = document.querySelector("input").value;
    if(valueInput){
        let obj = {
            name: valueInput,
            id: uuid(),
            count: 0,         
        }
        contents.push(obj);
        localStorage.setItem("contents", JSON.stringify(contents));
        handleShow();
        document.querySelector("input").value = "";
    }
}

//xoá
function handleDelete(id) {
    let contents = JSON.parse(localStorage.getItem("contents")) || [];
    let isConfirm = confirm("Bạn có chắc chắn muốn xoá người chơi ?");
    if (isConfirm) {
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].id == id) {
                contents.splice(i,1);
                localStorage.setItem("contents", JSON.stringify(contents));
                handleShow();
            }          
        }
    }
}

//Giảm
function handleDown(id) {
    let contents = JSON.parse(localStorage.getItem("contents")) || [];
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id == id && contents[i].count > 0) {
           contents[i].count = --contents[i].count;
           localStorage.setItem("contents", JSON.stringify(contents));
           handleShow();
        }       
    }
}

//Tăng
function handleUp(id) {
    let contents = JSON.parse(localStorage.getItem("contents")) || [];
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id == id) {
           contents[i].count = ++contents[i].count;
           localStorage.setItem("contents", JSON.stringify(contents));
           handleShow();
        }       
    }
}

//tổng điểm và tổng số người chơi
function handleTotal() {
    let contents = JSON.parse(localStorage.getItem("contents")) || [];
    let sumUsers = contents.length;
    let totalPoints = 0;
    for (let i = 0; i < contents.length; i++) {
        totalPoints += contents[i].count  
    }
    document.getElementById("users").innerHTML = sumUsers;
    document.getElementById("points").innerHTML = totalPoints;
}

//Đồng hồ
function handleStart() {
    setInterval(() => {
    document.getElementById("clock").innerHTML= ++document.getElementById("clock").innerHTML
    },1000);
}

function handleReset() {
    document.getElementById("clock").innerHTML= 0;
    // clearInterval(handleStart);
}


