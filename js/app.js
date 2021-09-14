
const loadProducts = () => {

  const url = `https://fakestoreapi.com/products`;
  fetch(url)
  .then(res => res.json())
  .then (data =>showProducts(data) )

};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    
   const { count, rate } = product.rating;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    
    
    <div class="card trans-card mb-4">
    <div class = "card-body">
    <div>
    <img class="product-image" src=${image}></img>
      </div>

      <h4 class = "card-title mt-2">${(product.title).slice(0, 20)}</h4>


      <p class="card-text">Category: ${product.category}</p>
      <div class="d-flex justify-content-between">
      <p class="text-danger"> ${count} Reviews </p>
      <p class= "text-danger"> Rating: ${rate} </p>
      </div>
      <h5> Price: $ ${product.price} </h5>

      <button onclick="addToCart(${product.id}, ${product.price})" id="addToCart-btn" class="buy-now btn btn-success"> Add To Cart </button>

      <button type="button" onclick ="singleProduct(${product.id})" class="btn btn-light" data-bs-toggle="modal" data-bs-target = "#exampleModal"> Details </button>

      </div>
      </div>

      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};


// For Displaying single product
const singleProduct = (id)=> {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res => res.json())
  .then (data => displayModal(data));
}


//Displaying Modal

const displayModal = (product)=> {
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.querySelector(".modal-body")
  modalTitle.innerHTML=product.title;
  modalBody.innerHTML = product.description;
}




const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = (grandTotal).toFixed(2);
};
loadProducts();
