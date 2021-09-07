
window.onload = ()=>{
    console.log('productList ejs connect');
};

function addProduct(event){
    let eventElement = event.target;
    console.log(eventElement);
    if(eventElement.tagName!=='BUTTON'){
        alert('Product Not Added Please Select Again')
    }else{
        //let productId = eventElement.dataset.productId;
        //console.log(productId);
        getPosition(eventElement);
    }
    
}

function getWindow(event){ //currently i have two window ..1..purchase ...2..sales 
    if(event.target.classList.contains('purchaseProduct')){
        document.querySelectorAll('.productLiBtn').forEach(product=>{
            product.classList.remove('saleProduct');
            product.classList.add('purchaseProduct');
        });
    }else{
        document.querySelectorAll('.productLiBtn').forEach(product=>{
            product.classList.remove('purchaseProduct');
            product.classList.add('saleProduct');
        });
    }
}

function getPosition(eventElement){
    let position = [];
    if(eventElement.classList.contains('purchaseProduct')){
         let purchase = ['.purchaseTableDiv','.purchaseProductFinalAmount','.purchaseProductListTableBody'];
         position = purchase;
    }else{
        let sale = ['.salesTableDiv','.salesProductFinalAmount','.salesProductListTableBody'];
        position = sale;
    }
    createProductTable(eventElement,position);
    
}

function createProductTable(eventElement,position){
    console.log(eventElement.dataset.productId);
   
    let isItemPresent = checkItemInList(eventElement,position); console.log(isItemPresent);
    if(isItemPresent){
        return;
    }else{
        document.querySelector(position[0]).classList.remove('d-none');
        document.querySelector(position[1]).classList.remove('d-none');
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
  if(eventElement.classList.contains('purchaseProduct')){ 
    setAttributes(th,{"class":"tBodyIndex","scope":"row"});
    setAttributes(inputHidden,{"type":"hidden","value":" ","name":"purchaseProductId","value":eventElement.dataset.productId});
    setAttributes(button,{"type":"button", "class":" text-wrap list-group-item list-group-item-action ","data-product-id":eventElement.dataset.productId,"data-action":"purchase", "style":"font-size: small;","onclick":"copyPasteData(event,'purchase')","data-bs-toggle":"modal","data-bs-target":"#productDetailsModal"});
    setAttributes(inputWastage,{"type":"number", "step":"any", "name":"purchaseTunch", "min":"1", "style":"width: 110%;"});
    setAttributes(inputWeight,{"type":"number", "step":"any", "name":"purchaseWeight", "min":"1", "style":"width: 125%;"});
    setAttributes(inputLabour,{"class":"purchaseTable","type":"number", "step":"any", "name":"purchaseLabourPerKg", "min":"1", "style":    "width: 100%;","onfocusout":"formCalculation(event)"});
    }else{
        setAttributes(th,{"class":"tBodyIndex","scope":"row"});
        setAttributes(inputHidden,{"type":"hidden","value":" ","name":"saleProductId","value":eventElement.dataset.productId});
        setAttributes(button,{"type":"button", "class":" text-wrap list-group-item list-group-item-action","data-product-id":eventElement.dataset.productId,"data-action":"sale", "style":"font-size: small;","onclick":"copyPasteData(event,'sale')","data-bs-toggle":"modal","data-bs-target":"#productDetailsModal"});
        setAttributes(inputWastage,{"type":"number", "step":"any", "name":"saleTunch", "min":"1", "style":"width: 110%;"});
        setAttributes(inputWeight,{"type":"number", "step":"any", "name":"saleWeight", "min":"1", "style":"width: 125%;"});
        setAttributes(inputLabour,{"class":"salesTable","type":"number", "step":"any", "name":"saleLabourPerKg", "min":"1", "style":    "width: 100%;","onfocusout":"formCalculation(event)"});
    }
  
  document.querySelector(position[2]).appendChild(tr);
  
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

  function checkItemInList(eventElement,position){
     console.log(eventElement);
      let isPresent = false;
    var tableClass = document.querySelector(position[2]);
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

    let tunchArray = [];
    let weightArray = [];
    let cashArray = [];
    let cash =0 ;
    let silver =0;
    let weight=0;
    if(event.target.classList.contains('purchaseTable')){ //console.log('purchase');
        document.querySelectorAll('input[name="purchaseTunch"]').forEach(element=>{
            tunchArray.push((element.value));
            console.log(tunchArray[0]);
        });
        document.querySelectorAll('input[name="purchaseWeight"]').forEach(element=>{
             weightArray.push((element.value));console.log(weightArray[0]);
         });
     document.querySelectorAll('input[name="purchaseLabourPerKg"]').forEach(element=>{
         cashArray.push((element.value));console.log(cashArray[0]);
     });
 
     for(var i=0;i<tunchArray.length;i++){
         weight += parseFloat(weightArray[i]);
         silver += parseFloat(weightArray[i])*parseFloat(tunchArray[i])/100;
         cash += parseFloat(weightArray[i])*parseFloat(cashArray[i])/1000; 
         
     }
     console.log(weight,silver,cash);
     document.querySelector('input[name="purchaseNetWeight"]').value = weight;
         document.querySelector('input[name="purchaseSilver"]').value = silver;
         document.querySelector('input[name="purchaseCash"]').value = cash;

    }else{ //console.log('sales');

        document.querySelectorAll('input[name="saleTunch"]').forEach(element=>{
            tunchArray.push((element.value));
        });
        document.querySelectorAll('input[name="saleWeight"]').forEach(element=>{
             weightArray.push((element.value));
         });
     document.querySelectorAll('input[name="saleLabourPerKg"]').forEach(element=>{
         cashArray.push((element.value));
     });
 
     for(var i=0;i<tunchArray.length;i++){
         weight += parseFloat(weightArray[i]);
         silver += parseFloat(weightArray[i])*parseFloat(tunchArray[i])/100;
         cash += parseFloat(weightArray[i])*parseFloat(cashArray[i])/1000; 
         
     }
     console.log(weight,silver,cash);
     document.querySelector('input[name="saleNetWeight"]').value = weight;
         document.querySelector('input[name="saleSilver"]').value = silver;
         document.querySelector('input[name="saleCash"]').value = cash;

    }
     

       
}
  
  function copyPasteData(event,target){ console.log('in copy paste');
      let eventElement = event.target; //consoel.log(eventElement);
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
                    document.querySelector('#productDetailsModal').querySelector('.removeBtn').setAttribute('data-action',target); 
                   
                });
            
        })
                .catch(error=>{console.log(error)});

  }
