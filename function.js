
let container = document.getElementById("sub-container");
let categories = document.getElementById("categories");
let allProd;
let is_fetching = false;
let cart_container = document.getElementById("cart_container");
let cart_div = document.getElementById("cart_div");

cart_container.style.display = "none";

function openCart(){
    cart_container.style.display = "block";
}
function closeCart(){
    cart_container.style.display = "none";
}

// This is a function that get the product from the server
function fetchProd() {
    is_fetching = true;
    fetch("https://dummyjson.com/products")
        .then(result => result.json())
        .then(data => {
            let products = data.products;
            allProd = data.products;
            is_fetching = false;
            dispProd()
            // console.log(products);
            // let product = '';
            // container.innerHTML = "";
            // products.forEach(item => {
            //     product += ` <div class="prod">
            //     <div id="root">
            //      <img src ="${item.thumbnail}" width="180" height="120"
            //      <div><p id="color">${item.brand}</p></div>
            //      </div>
            //     </div>`
            // });

            // container.innerHTML += product;
            // console.log(product);
        })
}
fetchProd();

// This function displays the products after it has been feched
function dispProd() {
    container.innerHTML = `
        <div class="spinner-border text-primary loader" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `
    if (is_fetching == false) {
        container.innerHTML = "";
        allProd.forEach((item) => {
            container.innerHTML += ` <div onclick="oneProd(${item.id})" class="prod">
            <div id="root">
             <img src ="${item.thumbnail}" width="180" height="120"
             <div><p id="color">${item.brand}</p></div>
             </div>
            </div>`
        })
    }
}
dispProd()

// This function displays all categories selected by the user
function getCategories(cat) {
    console.log(cat);
    container.innerHTML = "";
    let my_categories = allProd.filter((el) => el.category == cat);
    console.log(my_categories);
    if (my_categories == "") {
        container.innerHTML = `<h1>There are no product for ${cat} category</h1>`
        return;
    } else {
        my_categories.forEach((item) => {
            container.innerHTML += ` 
                <div onclick="oneProd(${item.id})" class="prod" data-bs-toggle="modal" data-bs-target="#staticBackdrop${item.id}">
                    <div id="root">
                        <img src ="${item.thumbnail}" width="180" height="120" />
                    </div>
                    <div>
                        <p id="color">${item.brand}</p>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${item.thumbnail}" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onclick="addToCart(${item.id})" type="button" class="btn btn-primary">Add to cart</button>
                    </div>
                    </div>
                </div>
                </div>
            `
        })
    }
}

function oneProd(id) {
    console.log(id);
    localStorage.setItem('prodId', id);
    window.location.href = "oneProd.html";
}

// function addToCart(id){
//     let prod = allProd.find((el)=> el.id == id);
//     console.log(prod);
//     localStorage.setItem("cart", JSON.stringify(prod))
// }
