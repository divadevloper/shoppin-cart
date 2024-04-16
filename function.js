
let container = document.getElementById("sub-container")
fetch("https://dummyjson.com/products")
    .then(result => result.json())
    .then(data => {
        let products = data.products
        let product = '';
        products.forEach(item => {
            product += ` <div class="prod">
            <div id="root">
             <img src ="${item.thumbnail}" width="180" height="120"
             <div><p id="color">${item.brand}</p></div>
             </div>
            </div>`
        });
        container.innerHTML += product;
        console.log(product);
    })
