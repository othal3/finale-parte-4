const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"

function homePage() {
   window.location.href = '../HTML/index.html'
}

async function product() {
   const idParams = new URLSearchParams(window.location.search);
   const getId = idParams.get('id')

   try{
      const response = await fetch(`${apiUrl}${getId}`, {
         headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
         }
      })
      const data = await response.json()
      document.querySelector('main').innerHTML= `
      <div id="container">
      <div id="spec">
      <img src="${data.imageUrl}" alt="" id="imgProduct">
      <div id="text">
         <h3 id="brand">${data.brand}</h3>
         <h1 id="name">${data.name}</h1>
         <h3 id="price">${data.price}€</h3>
      </div>
      </div>
      <div id="descriptionContainer">
      <h2>DESCRIZIONE</h2>
      <p id="description">${data.description}</p>
      </div>
      </div>
      
      `
   }catch (error) {
      console.log(error);
   }
}

product()