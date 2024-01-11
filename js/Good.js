let goods = document.querySelectorAll(".js-product")
let store = JSON.parse(localStorage.getItem('goods'))
!store ? localStorage.setItem('goods', JSON.stringify([]))
    : ""

// Плюрализация для цен
function numberPlural(value) {
    let result = ""
    let counter = 1
    for (let i = value.length-1; i >= 0; i--) {
        if(counter === 3) {
            result += value[i] + " "
            counter = 1
        }else {
            result += value[i]
            ++counter
        }
    }
    let newString = ""
    for (let i = result.length - 1; i >= 0; i--) {
        newString += result[i];
    }
    return newString + " ₸"
}

// Восстановление данных из LS
goods.forEach(good => {
    store.forEach(storeItem => {
        if (storeItem?.id === good.dataset.id && storeItem?.price === good.dataset.productPrice) {
            good.querySelector(".js-buy").disabled = true
        }
    })
})

// Проверка на наличие в LS
const checkExisting = function (elem) {
    let store = JSON.parse(localStorage.getItem('goods'))
    let isExist = false
    store.forEach(storeItem => {
        if(storeItem?.id === elem.dataset?.id){
            isExist = true
            return isExist;
        }
    })
    return isExist
}


// Добавление в LS
goods.forEach(good => {
    let btn = good.querySelector(".js-buy")
    let quantitySpan = good.querySelector(".js-goods__card-quantity")
    btn.addEventListener('click', () => {
        let store = JSON.parse(localStorage.getItem('goods'))
        const isExist = checkExisting(good)
        if(isExist === false) {
            localStorage.setItem("goods", JSON.stringify([
                ...store,
                {
                    href: good.dataset.productHref,
                    id: good.dataset.id,
                    name: good.dataset.productName,
                    price: good.dataset.productPrice,
                    quantity: good.dataset.productQuantity,
                    size: good.dataset.productSize,
                    src: good.dataset.productSrc,
                    totalprice: JSON.stringify(Number(good.dataset.productPrice) * Number(good.dataset.productQuantity))
                }
            ]))
        }
        btn.disabled = true

        btn.style.backgroundColor = "#8A8A8A"
    })
})

// Контроль над изменением размера
goods.forEach(good => {
    let buyBtn = good.querySelector(".js-buy")
    let sizeBtns = good.querySelectorAll(".js-product-size")
    let price = good.querySelector(".js-goods__card-price")
    sizeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            good.dataset.id = btn.dataset.id
            good.dataset.productSize = btn.dataset.productSize
            good.dataset.productPrice = btn.dataset.productPrice
            good.dataset.productQuantity = btn.dataset.productQuantity

            let isExist = checkExisting(btn)
            buyBtn.disabled = isExist;
            isExist ? buyBtn.style.backgroundColor = "#8A8A8A" : buyBtn.style.backgroundColor = "#784CD4"

            sizeBtns.forEach(button => button.classList.remove("active"))
            btn.classList.add("active")
            price.textContent = numberPlural(good.dataset.productPrice)
        })
    })
})

// Увелечения количества товара
goods.forEach(good => {
    let buyBtn = good.querySelector(".js-buy")
    let quantitySpan = good.querySelector(".js-goods__card-quantity")
    let increaseBtn = good.querySelector(".increase")
    let decreaseBtn = good.querySelector(".decrease")
    increaseBtn?.addEventListener("click", () => {
        let store = JSON.parse(localStorage.getItem('goods'))

        store = store?.map(storeItem => {
            if(storeItem.id === good.dataset.id){
                storeItem = {
                    ...storeItem,
                    quantity: JSON.stringify(Number(storeItem.quantity) + 1)
                }
                quantitySpan.textContent = storeItem.quantity
                return storeItem
            }
            return storeItem
        })


        localStorage.setItem("goods", JSON.stringify(store))
    })
    decreaseBtn?.addEventListener("click", () => {
        let store = JSON.parse(localStorage.getItem('goods'))
        store = store.map(storeItem => {
            if(storeItem?.id === good.dataset.id){
                storeItem = {
                    ...storeItem,
                    quantity: JSON.stringify(Number(storeItem.quantity) - 1)
                }

                if(Number(storeItem.quantity) < 1){
                    return null;
                }
                return storeItem
            }

            return storeItem
        })
        store = store.filter(storeItem => storeItem !== null)
        store = store.filter(storeItem => storeItem !== undefined)
        store.forEach(item => {
            if(item.id === good.dataset.id){
                Number(item.quantity) === null || Number(item.quantity) ===undefined ? quantitySpan.textContent = "1" :
                    quantitySpan.textContent = item.quantity
            }
        })
        let isExist;
        store.forEach(item => {
            item.id === good.dataset.id ? isExist = true : isExist = false;
        })
        buyBtn.disabled = isExist;
        !isExist ? buyBtn.style.backgroundColor = "#784cd4" : ""
        localStorage.setItem("goods", JSON.stringify(store))
    })
})

// Добавление в корзину
let busket = document.querySelector(".js-cart")
store.forEach(storeItem => {
    // элемент div с классом "busket__item".
    const busketItem = document.createElement('div');
    busketItem.className = 'js-product';
    busketItem.setAttribute('data-id', storeItem.id);
    busketItem.setAttribute('data-product-name', storeItem.name);
    busketItem.setAttribute('data-product-size', storeItem.size);
    busketItem.setAttribute('data-product-price', storeItem.price);
    busketItem.setAttribute('data-product-quantity', storeItem.quantity);
    busketItem.setAttribute('data-product-href', storeItem.href);
    busketItem.setAttribute('data-product-src', storeItem.src);
    busketItem.classList.add('busket__item');

    // элемент метки с классом "busket__checkbox" и его содержимое
    const label = document.createElement('label');
    label.setAttribute('for', `item-${storeItem.id}`);
    label.classList.add('busket__checkbox');
    label.innerHTML = `
        <input type="checkbox" id=\item-${storeItem.id}\>
        <div>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L3.5 6L1 3.72727" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    `;

    //  метка к busketItem
    busketItem.appendChild(label);

    //  элемент с классом "busket__item-img" и его содержимое
    const imgLink = document.createElement('a');
    imgLink.setAttribute('href', storeItem.href);
    imgLink.classList.add('busket__item-img');
    imgLink.innerHTML = `
        <img src="img/busket-1.jpg" alt="">
    `;

    // imgLink в busketItem
    busketItem.appendChild(imgLink);

    //  элемент div с классом "busket__item-info" и его содержимое
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('busket__item-info');
    itemInfo.innerHTML = `
        <a href="#" class="busket__item-title">${storeItem.name}</a>
        <div class="busket__item-size">${storeItem.size} мл.</div>
        <div class="busket__item-count">${storeItem.quantity} шт.
    `;

    //  itemInfo в busketItem
    busketItem.appendChild(itemInfo);

    // элементы div с классами "busket__item-price" и "busket__item-counter" и их содержимое
    const itemPrice = document.createElement('div');
    itemPrice.classList.add('busket__item-price');
    itemPrice.textContent = numberPlural(storeItem.price);

    const itemCounter = document.createElement('div');
    itemCounter.classList.add('busket__item-counter');
    itemCounter.innerHTML = `
        <button class="decrease">
            <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.16602 1H12.8327" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <span>${storeItem.quantity}</span>
        <button class="increase">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16663V15.8333" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.16602 10H15.8327" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    // Добавляем itemPrice и itemCounter в busketItem
    busketItem.appendChild(itemPrice);
    busketItem.appendChild(itemCounter);

    // элемент кнопки с классом "busket__item-remove" и его содержимое
    const removeButton = document.createElement('button');
    removeButton.classList.add('busket__item-remove');
    removeButton.setAttribute('type', 'button');
    removeButton.innerHTML = `
        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.33333H2.66667M2.66667 4.33333H16M2.66667 4.33333L2.66602 16C2.66602 16.442 2.84161 16.866 3.15417 17.1785C3.46673 17.4911 3.89065 17.6667 4.33268 17.6667H12.666C13.108 17.6667 13.532 17.4911 13.8445 17.1785C14.1571 16.866 14.3327 16.442 14.3327 16V4.33333M5.16602 4.33333V2.66667C5.16602 2.22464 5.34161 1.80072 5.65417 1.48816C5.96673 1.17559 6.39065 1 6.83268 1H10.166C10.608 1 11.032 1.17559 11.3445 1.48816C11.6571 1.80072 11.8327 2.22464 11.8327 2.66667V4.33333M6.83398 8.5V13.5M10.166 8.5V13.5" stroke="#C70000" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

// Добавьте кнопку removeButton в busketItem
    busketItem.appendChild(removeButton);

    busket.appendChild(busketItem);
})

// Увелечения и уменьшение количества товара
document.querySelectorAll(".busket__item")?.forEach(good => {
    let quantitySpan = good.querySelector(".busket__item-counter").querySelector("span")
    let increaseBtn = good.querySelector(".increase")
    let decreaseBtn = good.querySelector(".decrease")
    let deleteBtn = good.querySelector(".busket__item-remove")
    increaseBtn?.addEventListener("click", () => {
        let store = JSON.parse(localStorage.getItem('goods'))
        store = store?.map(storeItem => {
            if(storeItem.id === good.dataset.id){
                storeItem = {
                    ...storeItem,
                    quantity: JSON.stringify(Number(storeItem.quantity) + 1)
                }
                quantitySpan.textContent = storeItem.quantity
                return storeItem
            }
            return storeItem
        })

        localStorage.setItem("goods", JSON.stringify(store))
    })
    decreaseBtn?.addEventListener("click", () => {
        console.log("click")
        let store = JSON.parse(localStorage.getItem('goods'))
        store = store.map(storeItem => {
            if(storeItem.id === good.dataset.id){
                storeItem = {
                    ...storeItem,
                    quantity: JSON.stringify(Number(storeItem.quantity) - 1)
                }

                if(Number(storeItem.quantity) < 1){
                    good.remove()
                    return null;
                }
                return storeItem
            }

            return storeItem
        })
        store = store.filter(storeItem => storeItem !== null)
        store = store.filter(storeItem => storeItem !== undefined)
        store.forEach(item => {
            if (item.id === good.dataset.id) {
                Number(item.quantity) === null || Number(item.quantity) === undefined ? quantitySpan.textContent = "1" :
                    quantitySpan.textContent = item.quantity

            }
        })
        let isExist;
        store.forEach(item => {
            item.id === good.dataset.id ? isExist = true : isExist = false;
        })
        localStorage.setItem("goods", JSON.stringify(store))
    })
    deleteBtn?.addEventListener("click", () => {
        let store = JSON.parse(localStorage.getItem('goods'))
        store = store.map(storeItem => {
            if (storeItem?.id === good.dataset.id) {
                good.remove()
                return null
            }
            return storeItem
        })
        console.log(store)
        store = store.filter(storeItem => storeItem !== null)
        store = store.filter(storeItem => storeItem !== undefined)
        console.log(store)
        localStorage.setItem("goods", JSON.stringify(store))
    })
})


