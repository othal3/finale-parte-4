const nameProduct = document.getElementById('name')
const descriptionProduct = document.getElementById('description')
const brandProduct = document.getElementById('brand')
const imageUrlProduct = document.getElementById('imageUrl')
const priceProduct = document.getElementById('price')
const nameModify = document.getElementById('nameModify')
const descriptionModify = document.getElementById('descriptionModify')
const brandModify = document.getElementById('brandModify')
const imageUrlModify= document.getElementById('imageUrlModify')
const priceModify = document.getElementById('priceModify')
const idModify = document.getElementById('productId')
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/"
let errorForm = {}


async function save() {
   const formValidation = formCompilation()

   if(formValidation){
   const product = {
      name: nameProduct.value,
      description: descriptionProduct.value,
      brand: brandProduct.value,
      imageUrl: imageUrlProduct.value,
      price: priceProduct.value
   }
   console.log(product)

   try{
      const response = await fetch(apiUrl, {
         method: 'POST',
         body: JSON.stringify(product),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
         }
         })
   } catch (error){
      console.log(error)
   }

   location.reload()
   } else {
      const errorSpan = document.querySelectorAll('.newProduct span')
      for(let i = 0; i<errorSpan.length; i++) 
      errorSpan[i].innerHTML = ''
      for (const field in errorForm) {
         const errorMessage = document.getElementById(`${field}Error`)
         console.log
         errorMessage.textContent = ''
         errorMessage.textContent = errorForm[field]
      }
   }
}

async function table(){
   const table = document.getElementById('tableBody')
   table.innerHTML = ''
   try{
   const response = await fetch(apiUrl, {
      headers: {
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
      }
   })
   const data = await response.json()

   
   data.forEach(element => {
      table.innerHTML += `
      <tr>
         <td><div>${element.name}</div></td>
         <td><div>${element.description}</div></td>
         <td><div>${element.brand}</div></td>
         <td><div>${element.imageUrl}</div></td>
         <td><div>${element.price}€</div></td>
         <td id="${element._id}"><i class="bi bi-trash3-fill" onclick="removeItem(this)"></i> <i class="bi bi-pencil-square" onclick="modifyForm(this)"></i></td>
      </tr>
   `
   });
} catch (error) {
   console.log(error);
}
}

function formCompilation(){
let validation = true
errorForm = {}

   if(nameProduct.value || nameModify.value != "") {}
   else errorForm.name = 'il campo del nome é oblligatorio'
   if(descriptionProduct.value || descriptionModify.value != "") {}
   else errorForm.description = 'il campo della descrizione é oblligatorio'
   if(brandProduct.value || brandModify.value != "") {}
   else errorForm.brand = 'il campo del brand é oblligatorio'
   if(imageUrlProduct.value || imageUrlModify.value != "") {}
   else errorForm.imageUrl = `il campo dell'immagine é oblligatorio`
   if(priceProduct.value || priceModify.value != "") {}
   else errorForm.price = 'il campo del prezzo é oblligatorio'
   if(Object.keys(errorForm).length != 0) validation = false


   return validation
}

function homePage() {
   window.location.href = '../HTML/index.html'
}

async function removeItem(id) {
   const getId= id.parentNode.id
   try {
      await fetch(`${apiUrl}${getId}`,{
         method: 'DELETE',
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
         }
         })
      } catch (error){
         console.log(error)
   }

   location.reload()
}

async function modifyForm(id) {
   document.getElementById('modify').style.visibility = 'visible'
   document.querySelector('body').style.overflow = 'hidden'
   const getId= id.parentNode.id
   const formValidation = formCompilation()

   try{
   const response = await fetch(`${apiUrl}${getId}`, {
      headers: {
         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
      }
   })
   const data = await response.json()
   nameModify.value = data.name
   descriptionModify.value = data.description
   brandModify.value = data.brand
   imageUrlModify.value = data.imageUrl
   priceModify.value = data.price
   idModify.value = getId
}catch (error) {
   console.log(error);
}
   
}

async function modifyItem() {
   const getId = document.getElementById('productId').value
   const formValidation = formCompilation()

   if(formValidation){
   const product = {
      name: nameModify.value,
      description: descriptionModify.value,
      brand: brandModify.value,
      imageUrl: imageUrlModify.value,
      price: priceModify.value
   }
   console.log(product)

   try{
      const response = await fetch(`${apiUrl}${getId}`, {
         method: 'PUT',
         body: JSON.stringify(product),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyZGMyMTFmMTc1YzAwMTRjNTU4YjMiLCJpYXQiOjE2OTI4MTI2NTUsImV4cCI6MTY5NDAyMjI1NX0.vy3jgn_-PbF1Sw7Zit0KYxj_dgq1ZUOMUXgluvaOCCM"
         }
         })
   } catch (error){
      console.log(error)
   }

   location.reload()
   } else {
      const errorSpan = document.querySelectorAll('#modifyProduct span')
      for(let i = 0; i<errorSpan.length; i++) 
      errorSpan[i].innerHTML = ''
      for (const field in errorForm) {
         const errorMessage = document.getElementById(`${field}ModifyError`)
         console.log
         errorMessage.textContent = ''
         errorMessage.textContent = errorForm[field]
      }
   }
}
table()
