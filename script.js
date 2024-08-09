const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("adrress")
const addressWarn = document.getElementById("address-warn")


let cart = []

// Abrir o modal 
cartBtn.addEventListener("click", function () {
    updateCartModal()
    cartModal.style.display = "flex"
})

// // Fechar o modal quando clicar fora 
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})


// Apenas fechar o modal  
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})


// pegando os produtos  

menu.addEventListener("click", function (event) {
    console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)

    }


})

// Colocando no carrinho 

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

// atualizar o carrinho 

function updateCartModal() {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemsElement = document.createElement("div")
        cartItemsElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemsElement.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
        <p class="font-medium">${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        
        <button class= "remove-from-cart-btn" data-name="${item.name}">
        Remover
        </button>
    
        
        </div>
    `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length
}

// Função para remover item do carrinho 

cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        console.log(name)

    }
    

})

function removeItemCart(nome) {
    const index = cart.findIndex(item => item.nome === nome)

    if(index !== -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }
        cart.splice(index, 1)
        updateCartModal()

    }
}

// addressInput.addEventListener("input", function(event){
//     let inputVale = event.target.value
// })

checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return
    if(addressInput.value === '') {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
    }
})