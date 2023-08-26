const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

async function productCard(){
   const card = document.querySelector('.cardContainer')
   try{
   const response = await fetch(apiUrl, {
      headers: {
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
      }
   })
   const data = await response.json()
   
   data.forEach(element => {
      card.innerHTML += `
      <div class="card" id="${element._id}" onclick="productPage(this)">
            <div class="cardImgContainer">
               <img src="${element.imageUrl}" alt="" class="cardImg">
            </div>
            <div class="cardText">
               <div class="cardName">
                  <p class="brandName">
                     ${element.brand}
                  </p>
                  <p class="modelName">
                     ${element.name}
                  </p>
               </div>
               <div class="cardPrice">
                  <p class="price">
                     ${element.price}€
                  </p>
               </div>
            </div>
         </div>
   `
   });
} catch (error) {
   console.log(error);
}
}

function productPage(id) {
   window.location.href = `../HTML/product.html?id=${id.id}`
}

productCard()

function addProduct() {
   window.location.href = '../HTML/backOffice.html'
}