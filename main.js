// select option js

const select =
document.querySelector('#pages');

select.addEventListener('change',()=>{

   window.location.href =
   select.value;

});



// swiper js
const swiper1 = new Swiper('.swiper1', {
  // Optional parameters
  loop: true,
  autoplay : true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  
});


// products js

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.slider-wrapper');
    container.innerHTML = '';
    data.forEach(product => {
        container.innerHTML += ` <div class="product-box swiper-slide">
                                    <img src="${product.img}" alt="#">
                                    <h3>${product.name}</h3>
                                    <button class="add-to-card" data-id = "${product.id}" ><i class="fa-solid fa-cart-shopping"></i><p>add to card</p></button>
                                    <p>$${product.price}</p>
                                </div>`
    });
  });

  fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.slider-wrapper2');
    container.innerHTML = '';
    data.forEach(product => {
      if (product.catetory === 'mobiles') {
        container.innerHTML += ` <div class="product-box swiper-slide">
                                    <img src="${product.img}" alt="#">
                                    <h3>${product.name}</h3>
                                    <button class="add-to-card" data-id = "${product.id}" ><i class="fa-solid fa-cart-shopping"></i><p>add to card</p></button>
                                    <p>$${product.price}</p>
                                </div>`
      }
        
    });
  });
   fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.slider-wrapper3');
    container.innerHTML = '';
    data.forEach(product => {
      if (product.catetory === 'appliances') {
        container.innerHTML += ` <div class="product-box swiper-slide">
                                    <img src="${product.img}" alt="#">
                                    <h3>${product.name}</h3>
                                    <button class="add-to-card" data-id ="${product.id}" ><i class="fa-solid fa-cart-shopping"></i><p>add to card</p></button>
                                    <p>$${product.price}</p>
                                </div>`
      }
        
    });
  });
 let allProducts = [];

// fetch products
fetch('products.json')
  .then(res => res.json())
  .then(data => {

    allProducts = data;

    const container = document.querySelector('.slider-wrapper4');

    data.forEach(product => {

      container.innerHTML += `
        <div class="product-box swiper-slide">

          <img src="${product.img}" alt="#">

          <h3>${product.name}</h3>

          <button 
            class="add-to-card"
            data-id="${product.id}"
          >
            add to card
          </button>

          <p>$${product.price}</p>

        </div>
      `;
    });
  });
  
  // products swiper 
  const swiper2 = new Swiper('.swiper2', {
  // Optional parameters
  loop: true,
  autoplay : true,
  slidesPerView: 6,
  spaceBetween: 20,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  
});


// card js 
const card = document.querySelector('.card');
const colsebtn = document.querySelectorAll('.fa-credit-card, .close, .close-btn');


colsebtn.forEach(btn => {
  btn.addEventListener('click', () => {
    card.classList.toggle('active');
  })
});


// add to card


document.addEventListener('click', (e) => {

  const btn = e.target.closest('.add-to-card');

  if(!btn) return;

  const productId = btn.dataset.id;

  const clickedproduct = allProducts.find(
    product => product.id == productId
  );

  if(clickedproduct){
    addToCart(clickedproduct);
    loadcart();
    totalprice();
  }

});

function addToCart(product) {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // check if product already exists
  const existingProduct = cart.find(
    item => item.id == product.id
  );

  if (existingProduct) {

    existingProduct.qty += 1;

  } else {

    cart.push({
      ...product,
      qty: 1
    });

  }

  localStorage.setItem('cart', JSON.stringify(cart));
  totalprice();

}

function loadcart() {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartContainer = document.querySelector('.items-container');

  cartContainer.innerHTML = '';

  cart.forEach(product => {

    cartContainer.innerHTML += `
      <div class="item-box">

        <img src="${product.img}" alt="#">
        <h3> $${product.price} </h3>

        <button class="minus" data-id = "${product.id}">-</button>

        <p class="count">${product.qty}</p>

        <button class="plus" data-id = "${product.id}">+</button>

        <button class="delete" data-id = "${product.id}">🥡</button>

      </div>
    `;
    const savedTotal =
  localStorage.getItem('totalPrice');

document.querySelector('.top-card h3')
.innerHTML =
 `Total price : ${savedTotal || 0}$`;
  });
}

document.addEventListener('click', (e)=>{

  // plus
  if(e.target.classList.contains('plus')){

      let cart = JSON.parse(
        localStorage.getItem('cart')
      ) || [];

      const productId = e.target.dataset.id;

      const product = cart.find(
        item => item.id == productId
      );

      if(product){
        product.qty++;
      }

      localStorage.setItem(
        'cart',
        JSON.stringify(cart)
      );

      loadcart();
      totalprice();
  }


  // minus
  if(e.target.classList.contains('minus')){

      let cart = JSON.parse(
        localStorage.getItem('cart')
      ) || [];

      const productId = e.target.dataset.id;

      const product = cart.find(
        item => item.id == productId
      );

      if(product && product.qty > 1){
          product.qty--;
      }

      localStorage.setItem(
        'cart',
        JSON.stringify(cart)
      );

      loadcart();
      totalprice();
  }


  // delete
  if(e.target.classList.contains('delete')){

      let cart = JSON.parse(
        localStorage.getItem('cart')
      ) || [];

      const productId = e.target.dataset.id;

      cart = cart.filter(
        item => item.id != productId
      );

      localStorage.setItem(
        'cart',
        JSON.stringify(cart)
      );

      loadcart();
      totalprice();
  }

});


function totalprice() {

  const tprice =
    document.querySelector('.top-card h3');

  let cart =
    JSON.parse(
      localStorage.getItem('cart')
    ) || [];

  const sum = cart.reduce(
    (acc,item)=>
      acc + item.price * item.qty,
    0
  );

  localStorage.setItem('totalPrice',sum);

  tprice.innerHTML =
    `Total price : ${sum}$`;

}

loadcart();