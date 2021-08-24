

function getPurchaseData(event){
    //console.log(event.target);
    let id = event.target.dataset.id;
   // console.log(id);   
    let url = `/api/transaction/purchase/${id}`;
    let modalElement = document.querySelector('#transactionDetailModal');
            let bodyElement =  modalElement.querySelector('.modal-body');
            bodyElement.innerHTML = ''; // clear the modal body and then set the innerHTML with the required data.
    
    fetch(url).then(res=>{
        if(res.status!==200){
            return;
        }
        res.json().then(data=>{ //console.log(data);
            //let fetchDiv = document.createElement('div');
            let nameListEl = document.createElement('li');
            nameListEl.innerHTML = `<li class="list-group-item list-group-item-success my-1">
            Client Name: <span class="mx-2 fw-bold">${data.client.clientName.toUpperCase()}</span></li>`
            bodyElement.appendChild(nameListEl);
          data.purchaseProductInfo.forEach(product=>{
               
              let paraEl = document.createElement('p');
              paraEl.classList.add('p-2','my-1','bg-light','border','border-1','border-success','rounded');
              paraEl.innerHTML =  `
               Product Desc : <span class="mx-3 fw-bold productDesc">${product.productId.productDesc}</span><br>
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
    }).catch(error=>{if(error){
        bodyElement.innerHTML = `<p class="text-center bg-light text-danger">Server Error in Fetching Your Data</p>`
    }}
       
    );

}

function searchTransaction(event){
    let parentEl = event.target.parentElement;
    let alternateButton = parentEl.querySelector('.btn-success');
    //console.log(parentEl);
    if(!event.target.classList.contains('btn-success')){
        
        console.log(alternateButton);
        alternateButton.classList.remove('btn-success');
        alternateButton.classList.add('btn-light');
        setTimeout(()=>{event.target.classList.remove('btn-light');
        event.target.classList.add('btn-success');},500);
        
    }

    if(!event.target.classList.contains('searchByNameBtn')){
        parentEl.parentElement.querySelector('.searchByName').classList.add('d-none');
        parentEl.parentElement.querySelector('.searchByDate').classList.remove('d-none');

    }else{
        parentEl.parentElement.querySelector('.searchByName').classList.remove('d-none');
        parentEl.parentElement.querySelector('.searchByDate').classList.add('d-none');
    }
}

function getPurchaseTransactionData(event,searchBy){
    let searchName={};
    if(searchBy==='name'){
         searchName.name = event.target.parentElement.querySelector('.inputSearchByName').value;
         if(searchName.name!==""){
            postDataToSearch(searchName);
         }
    }else{
         endDate = event.target.parentElement.querySelector('.inputSearchByDateEnd').value;
         startDate = event.target.parentElement.querySelector('.inputSearchByDateStart').value;
         console.log(endDate);
         console.log(startDate);
         if(endDate!==""||startDate!==""){

         }else{
             //if both the fields are empty;
         }
    }
    
}

function postDataToSearch(searchObj){ console.log(searchObj);
    if(!searchObj.hasOwnProperty('searchDateEnd')){ console.log('search name');
        let search = 'searchName';
        let url = `/api/transaction/purchase/${search}`;
        fetch(url,{
            method:"POST",
            body:JSON.stringify(searchObj),
            headers:{"content-type":"application/json; charset=UTF-8"}
        }).then(res=>{res.json().then(data=>{
           // console.log(data);
            //now insert the data to the DOM .. function to do so ...insertToDom(data);
            insertToDom(data);
            
            
        })}).catch();
    }
   

}

function insertToDom(data){ console.log(data);
    let makePaymentUrl = '/client/clientName';
    document.querySelector('.recentPurchaseTransactionDiv').classList.add('d-none');
    var searchEl = document.querySelector('.searchPurchaseTransactionDiv');
    searchEl.innerHTML = `Client Name : <span class="clientName mx-2 fw-bold"></span><br>
    <p class="fw-bold">Net Fine Silver :<span class="mx-2 tPurSilver"></span><br>Net Cash Amt : <span class="mx-2 tPurCash"></span><br></p>
    <a class="btn btn-sm btn-success my-2 p-2 makePayment" type="button">Make Payment </a>
    <p class="fw-bold text-center mt-2 text-decoration-underline">Purchase Details</p>`;
    searchEl.querySelector('.makePayment').setAttribute('href',makePaymentUrl);
    searchEl.classList.remove('d-none');
    data.forEach(data=>{
        searchEl.querySelector('.clientName').innerHTML=data.clientName.toUpperCase();
        var index = 1;
        var totalPurchaseSilver = 0;
        var totalPurchaseCash = 0;
        data.purchaseProduct.forEach(purchase=>{
            
            let liElement_1 = document.createElement('li');
            liElement_1.classList.add('list-group-item','list-group-item-success','mt-2');
            let spanIndex = document.createElement('span');
            spanIndex.classList.add('fw-bold','float-end');
            spanIndex.appendChild(document.createTextNode(`Transaction No: ${index}`));
            liElement_1.appendChild(spanIndex);
            liElement_1.appendChild(document.createElement('br'));
            let spanDate = document.createElement('span');
            spanDate.appendChild(document.createTextNode(`Date : ${new Date(purchase.date).toDateString()}`));
            liElement_1.appendChild(spanDate);
            liElement_1.appendChild(document.createElement('br'));
            let spanFineSilver = document.createElement('span');
            spanFineSilver.appendChild(document.createTextNode(`Fine Silver : ${purchase.purchaseSilver} Grms`));
            spanFineSilver.classList.add('mx-3','fw-bold');
            liElement_1.appendChild(spanFineSilver);
            liElement_1.appendChild(document.createElement('br'));
            let spanPurchaseCash = document.createElement('span');
            spanPurchaseCash.classList.add('mx-3','fw-bold');
            spanPurchaseCash.appendChild(document.createTextNode(`Labour Cash : ${purchase.purchaseCash} Rupees`));
            liElement_1.appendChild(spanPurchaseCash);
            searchEl.appendChild(liElement_1);
            let productIndex = 1;
            totalPurchaseCash += purchase.purchaseCash;
            totalPurchaseSilver += purchase.purchaseSilver;
            purchase.purchaseProductInfo.forEach(product=>{
                let liElement_2 = document.createElement('li');
                liElement_2.classList.add('list-group-item','list-group-item-light','p-2');
                let spanProductIndex = document.createElement('span');
                spanProductIndex.classList.add('fw-bold','float-end');
                spanProductIndex.appendChild(document.createTextNode(`# Product Index: ${productIndex}`));
                liElement_2.appendChild(spanProductIndex);
                liElement_2.appendChild(document.createElement('br'));
                let spanProductDesc = document.createElement('span');
                spanProductDesc.classList.add('fw-bold');
                spanProductDesc.appendChild(document.createTextNode(`Product : ${product.productId.productDesc.toUpperCase()}`));
                liElement_2.appendChild(spanProductDesc);
                let spanProductTunch = document.createElement('span');
                spanProductTunch.classList.add('float-end');
                spanProductTunch.appendChild(document.createTextNode(`Purity : ${product.productId.productTunch} %`));
                liElement_2.appendChild(spanProductTunch);
                liElement_2.appendChild(document.createElement('br'));
                let spanPurchaseWeight = document.createElement('span');
                spanPurchaseWeight.classList.add('fw-bold');
                spanPurchaseWeight.appendChild(document.createTextNode(`Purchase Weight : ${product.purchaseWeight} Grms`));
                liElement_2.appendChild(spanPurchaseWeight);
                liElement_2.appendChild(document.createElement('br'));
                let spanPurchaseTunch = document.createElement('span');
                spanPurchaseTunch.classList.add('fw-bold');
                spanPurchaseTunch.appendChild(document.createTextNode(`Purchase Tunch : ${product.purchaseTunch} %`));
                liElement_2.appendChild(spanPurchaseTunch);
                liElement_2.appendChild(document.createElement('br'));
                let spanLabour = document.createElement('span');
                spanLabour.classList.add('fw-bold');
                spanLabour.appendChild(document.createTextNode(`Labour : ${product.purchaseLabourPerKg} Rs/Kg`));
                liElement_2.appendChild(spanLabour);
                searchEl.appendChild(liElement_2);
                productIndex++;
            });
            index++;
        });
       document.querySelector('.tPurSilver').innerHTML = `${totalPurchaseSilver} Grms`;
       document.querySelector('.tPurCash').innerHTML = `${totalPurchaseCash} Rupees` ;
    });
    
    
}

