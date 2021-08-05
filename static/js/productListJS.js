
window.onload = ()=>{
    console.log('productList ejs connect');
};

function addPurchaseProduct(event){
    let eventElement = event.target;
    //console.log(eventElement.tagName);
    if(eventElement.tagName!=='BUTTON'){
        alert('Product Not Added Please Select Again')
    }else{
        let productId = eventElement.dataset.productId;
        //console.log(productId);
        createPurchaseProductTable(eventElement);
    }
    
}

function createPurchaseProductTable(eventElement){
   
    let isItemPresent = checkItemInList(eventElement); console.log(isItemPresent);
    if(isItemPresent){
        return;
    }else{
        document.querySelector('.purchaseTableDiv').classList.remove('d-none');
        document.querySelector('.purchaseProductFinalAmount').classList.remove('d-none');
        var tr = createElement('tr');
    var th = createElement('th');
    var td1 = createElement('td');
    var td2 = createElement('td');
    var td3 = createElement('td');
    var td4 = createElement('td');
    //var li = createElement('li');
    var inputHidden = createElement('input');
    var button = createElement('button');
    var inputWastage = createElement('input');
    var inputWeight = createElement('input');
    var inputLabour = createElement('input');
  /*
  let elements = ['tr','th','td','li','input','button'];
  elements.forEach(element=>{
      if(element==='td'){
          for(var i=0;i<4;i++){
              createElement('td');
          }
      }else{
        createElement(element);
      }
      
  });*/
  appendElement(tr,th);
  appendElement(tr,inputHidden);
  appendElement(tr,td1);
  appendElement(tr,td2);
  appendElement(tr,td3);
  appendElement(tr,td4);
  appendElement(td1,button);
  appendElement(td2,inputWastage);
  appendElement(td3,inputWeight);
  appendElement(td4,inputLabour);
  
  button.appendChild(document.createTextNode(eventElement.querySelector('span').innerHTML));
  var index = document.querySelectorAll('.tBodyIndex').length;
  th.appendChild(document.createTextNode(index+1));
  //console.log(tr);
  setAttributes(th,{"class":"tBodyIndex","scope":"row"});
  setAttributes(inputHidden,{"type":"hidden","value":" ","name":"purchaseProductId","value":eventElement.dataset.productId});
  setAttributes(button,{"type":"button", "class":" text-wrap list-group-item list-group-item-action","data-product-id":eventElement.dataset.productId, "style":"font-size: small;","onclick":"copyPasteData(event)","data-bs-toggle":"modal","data-bs-target":"#productDetailsModal"});
  setAttributes(inputWastage,{"type":"number", "step":"any", "name":"purchaseTunch", "min":"1", "max":"100", "style":"width: 110%;"});
  setAttributes(inputWeight,{"type":"number", "step":"any", "name":"purchaseWeight", "min":"1", "style":"width: 125%;"});
  setAttributes(inputLabour,{"type":"number", "step":"any", "name":"purchaseLabourPerKg", "min":"1", "style":    "width: 100%;","onfocusout":"formCalculation(event)"});
  document.querySelector('.purchaseProductListTableBody').appendChild(tr);
  
    }
    
    
}

function createElement(element){
    return document.createElement(element);
}
function appendElement(parentElement,childElement){
     parentElement.appendChild(childElement);
}
function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function checkItemInList(eventElement){
      let isPresent = false;
    var tableClass = document.querySelector('.purchaseProductListTableBody');
    tableClass.querySelectorAll('input').forEach(element=>{
        if(eventElement.dataset.productId===element.value){ 
                if(!eventElement.querySelector('.itemPresentMsg')){
                    let span = document.createElement('span');
                    span.classList.add('text-danger','text-capitalize','itemPresentMsg');
                    span.style.fontSize ="small";
                    span.appendChild(document.createTextNode('the product is already added. You can remove the product or change the weight of the purchase'));
                    eventElement.appendChild(span);
                }
                //console.log(eventElement.querySelectorAll('span'));
                
            
           
            isPresent = true;
        }
    });
    return isPresent;
  }

  function formCalculation(event){  //console.log('in func');
    let purchaseTunchArr = [];
    let purchaseWeightArr = [];
    let purchaseCashArr = [];
    let purchaseCash =0 ;
    let purchaseSilver =0;
    let purchaseWeight=0;
       document.querySelectorAll('input[name="purchaseTunch"]').forEach(element=>{
           purchaseTunchArr.push((element.value));
       });
       document.querySelectorAll('input[name="purchaseWeight"]').forEach(element=>{
            purchaseWeightArr.push((element.value));
        });
    document.querySelectorAll('input[name="purchaseLabourPerKg"]').forEach(element=>{
        purchaseCashArr.push((element.value));
    });

    for(var i=0;i<purchaseTunchArr.length;i++){
        purchaseWeight += parseFloat(purchaseWeightArr[i]);
        purchaseSilver += parseFloat(purchaseWeightArr[i])*parseFloat(purchaseTunchArr[i])/100;
        purchaseCash += parseFloat(purchaseWeightArr[i])*parseFloat(purchaseCashArr[i])/1000; 
        
    }
   // console.log(purchaseWeight,purchaseSilver,purchaseCash);
    document.querySelector('input[name="netWeight"]').value = purchaseWeight;
        document.querySelector('input[name="purchaseSilver"]').value = purchaseSilver;
        document.querySelector('input[name="purchaseCash"]').value = purchaseCash;

       
}
  
  function copyPasteData(event){ console.log('in copy paste');
      let eventElement = event.target;
      let productId = eventElement.dataset.productId;
      const url = `/api/product/${productId}`;
      fetch(url)
        .then(res=>{//console.log(res.status);
            if(res.status!==200){//display error msg on screen
                console.log(`looks like there was a problem ${res.status}`);
                return;
            }
                res.json().then(data=>{
                     //console.log(data.productDesc);
                     let span = document.querySelector('#productDetailsModal').querySelector('.modal-body').querySelectorAll('span');
                    span[0].innerHTML= data.productDesc;
                    span[1].innerHTML= data.productTunch;
                    document.querySelector('#productDetailsModal').querySelector('.removeBtn').setAttribute('data-product-id',productId); 
                   
                });
            
        })
                .catch(error=>{console.log(error)});

  }
