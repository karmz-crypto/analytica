
function getPurchaseData(event){
    //console.log(event.target);
    let id = event.target.dataset.id;
   // console.log(id);   
    let url = `/api/transaction/purchase/${id}`;
    
    fetch(url).then(res=>{
        if(res.status!==200){
            return;
        }
        res.json().then(data=>{ //console.log(data);
            //let fetchDiv = document.createElement('div');
            
            let modalElement = document.querySelector('#transactionDetailModal');
            let bodyElement =  modalElement.querySelector('.modal-body');
            bodyElement.innerHTML = ''; // clear the modal body and then set the innerHTML with the required data.
           
          data.purchaseProductInfo.forEach(product=>{
               
              let paraEl = document.createElement('p');
              paraEl.classList.add('p-2','my-1','bg-light','border','border-1','border-success','rounded');
              paraEl.innerHTML =  ` Product Desc : <span class="mx-3 fw-bold productDesc">${product.productId.productDesc}</span><br>
              Product Tunch : <span class="mx-3 fw-bold productTunch">${product.productId.productTunch}</span> % <br>
              Purchase Tunch : <span class="mx-3 fw-bold productTunch">${product.purchaseTunch}</span> % <br>
              Purchase Weight : <span class="mx-3 fw-bold productWeight">${product.purchaseWeight}</span> Grms <br>
              Labour/Kg : <span class="mx-3 fw-bold productLabour">${product.purchaseLabourPerKg}</span> Rs <br>`;
              bodyElement.appendChild(paraEl);
          });
            liElement_1 = document.createElement('li');
            liElement_1.classList.add('list-group-item','list-group-item-success','p-2','fw-bold');
            liElement_1.appendChild(document.createTextNode(`Fine Silver : ${data.purchaseSilver} Grms`));
            bodyElement.appendChild(liElement_1);
            liElement_2 = document.createElement('li');
            liElement_2.classList.add('list-group-item','list-group-item-success','p-2','fw-bold');
            liElement_2.appendChild(document.createTextNode(`Purchase Cash : ${data.purchaseCash} Rupees`));
            bodyElement.appendChild(liElement_2);
           
        })
    }).catch();

}

