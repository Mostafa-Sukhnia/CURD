let title = document.querySelector('.title');
let price = document.querySelector('.price-1');
let taxes = document.querySelector('.taxes');
let abs = document.querySelector('.abs');
let discount = document.querySelector('.discount');
let total = document.querySelector('.total span');
let total0 = document.querySelector('.total');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let appDel = document.querySelector('.deleted');
let search = document.querySelector('.search');
let searchTit = document.querySelector('.search-tit');
let searchCate = document.querySelector('.search-cate');
let create = document.querySelector('.create-1');
let body = document.querySelector(`body`);
let light = document.querySelector('.fa-solid');
let dark = document.querySelector('.fa-regular');
let inp = document.querySelectorAll(`input`);
let but = document.querySelectorAll(`button`);
let save = document.querySelector(`.save`);

window.onload = ()=>{
if(localStorage.getItem(`Mood`) === `light`){
    lightMood();
}else{
    darkMood();
}
}

function lightMood(){
    body.style = `background-color:white;color:black;`;
    for(let i=0;i<inp.length;i++){
        inp[i].style = `background-color:rgb(255 0 0 / 1);`;
    }
    for(let i=0;i<but.length;i++){
        but[i].style = `background-color:black;`;
    }
    light.style = `display: none !important;`;
    dark.style = `display: block !important;`;
    localStorage.setItem(`Mood`,`light`);
}

function darkMood(){
    body.style = `background-color:#282828;color:white;`;
    for(let i=0;i<inp.length;i++){
        inp[i].style = `background-color:black;`;
    }
    for(let i=0;i<but.length;i++){
        but[i].style = `background-color:red;`;
    }
    light.style = `display: block !important;`;
    dark.style = `display: none !important;`;

    localStorage.removeItem(`Mood`);
    localStorage.setItem(`Mood`,`dark`);


}

function getTotal() {
    if (price.value === '') {
        total0.style.backgroundColor = 'red';
        total.innerHTML = '';
        return;
    } else {
        let taxesValue = taxes.value !== '' ? parseFloat(taxes.value) : 0;
        let absValue = abs.value !== '' ? parseFloat(abs.value) : 0;
        let discountValue = discount.value !== '' ? parseFloat(discount.value) : 0;
        let result = (parseFloat(price.value) + taxesValue + absValue) - discountValue;
        total.innerHTML = result;
        total0.style.backgroundColor = 'green';
    }
}

let arrpro = [];
if (localStorage.data != null) {
    arrpro = JSON.parse(localStorage.data);
} else {
    arrpro = [];
}

function createProduct() {
    getTotal();
    if (title.value === '' || price.value === '') {
        return;
    }

    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value !== '' ? taxes.value : 0,
        abs: abs.value !== '' ? abs.value : 0,
        discount: discount.value !== '' ? discount.value : 0,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    };

    if (count.value === '') {
        arrpro.push(newpro);
    } else {
        let counted = parseInt(count.value);
        for (let i = 0; i < counted; i++) {
            arrpro.push(newpro);
        }
    }

    localStorage.setItem('data', JSON.stringify(arrpro));
    clear();
    showData();
}

create.onclick = function() {
    createProduct();
};

function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    abs.value = '';
    count.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = '';
    total0.style.backgroundColor = 'red';
    create.innerHTML = 'Create';
    create.style.backgroundColor = 'red';
    count.style.display = 'block';
}

function showData() {
    let table = '';
    for (let i = 0; i < arrpro.length; i++) {
        table += `<tr>
            <td>${[i + 1]}</td>
            <td>${arrpro[i].title}</td>
            <td>${arrpro[i].price}</td>
            <td> +${arrpro[i].taxes}</td>
            <td> +${arrpro[i].abs}</td>
            <td style="background-color: green;"> - ${arrpro[i].discount}</td>
            <td style="background-color: red;">${arrpro[i].total}</td>
            <td>${arrpro[i].category}</td>
            <td><button onclick="update(${i})" class='updat'>update</button></td>
            <td><button onclick="del(${i})" class='delete'>delete</button></td>
        </tr>`;
    }
    if (arrpro.length > 0) {
        appDel.innerHTML = `<button onclick="deleteAll()">Delete All (${arrpro.length})</button>`;
    } else {
        appDel.innerHTML = '';
    }
    document.querySelector('.body').innerHTML = table;
}
showData();

function deleteAll() {
    localStorage.clear();
    arrpro = [];
    showData();
}

function del(x) {
    arrpro.splice(x, 1);
    localStorage.setItem('data', JSON.stringify(arrpro));
    showData();
}

function update(x) {    
    title.value = arrpro[x].title;
    price.value = arrpro[x].price;
    taxes.value = arrpro[x].taxes;
    abs.value =   arrpro[x].abs;
    discount.value = arrpro[x].discount;
    total.innerHTML = arrpro[x].total;
    category.value = arrpro[x].category;
    create.style = 'display:none';
    total0.style.backgroundColor = 'green';
    create.style.display = 'none';
    save.style.display = 'block';
    save.onclick = function() {
        arrpro[x].title = title.value.toLowerCase();
        arrpro[x].price = price.value;
        arrpro[x].taxes = taxes.value;
        arrpro[x].abs = abs.value;
        arrpro[x].total = total.innerHTML;
        arrpro[x].discount = discount.value;
        arrpro[x].category = category.value.toLowerCase();
        localStorage.setItem('data', JSON.stringify(arrpro));
        clear();
        showData();
    save.style.display = 'none';
    create.style.display = 'block';
    create.style.backgroundColor = 'black';

    };
}

let searchMood = 'title';
function searching(id) {
    if (id === 'title') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.focus();
    search.placeholder = `search by ${searchMood}`;
    search.value = '';
    showData();
}

function searchData(val) {
    let table = '';
    for (let i = 0; i < arrpro.length; i++) {
        if (searchMood === 'title') {
            if (arrpro[i].title.includes(val.toLowerCase())) {
                table += `<tr>
                    <td>${[i + 1]}</td>
                    <td>${arrpro[i].title}</td>
                    <td>${arrpro[i].price}</td>
                    <td>${arrpro[i].taxes}</td>
                    <td>${arrpro[i].abs}</td>
                    <td style="background-color: green;">${arrpro[i].discount}</td>
                    <td style="background-color: red;">${arrpro[i].total}</td>
                    <td>${arrpro[i].category}</td>
                    <td><button onclick="update(${i})" class='updat'>update</button></td>
                    <td><button onclick="del(${i})" class='delete'>delete</button></td>
                </tr>`;
            }
        } else {
            if (arrpro[i].category.includes(val.toLowerCase())) {
                table += `<tr>
                    <td>${[i + 1]}</td>
                    <td>${arrpro[i].title}</td>
                    <td>${arrpro[i].price}</td>
                    <td>${arrpro[i].taxes}</td>
                    <td>${arrpro[i].abs}</td>
                    <td style="background-color: green;">${arrpro[i].discount}</td>
                    <td style="background-color: red;">${arrpro[i].total}</td>
                    <td>${arrpro[i].category}</td>
                    <td><button onclick="update(${i})" class='updat'>update</button></td>
                    <td><button onclick="del(${i})" class='delete'>delete</button></td>
                </tr>`;
            }
        }
    }
    document.querySelector('.body').innerHTML = table;
}
