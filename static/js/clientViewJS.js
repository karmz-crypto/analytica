window.onload = function(){
    console.log('je connect in client view');
    paymentStatusDecorationFunction();//this function decorates the status red or green as per status
}


function getFetchApiPurchase(event){   
   // const elementId = event.target.id;
    const element = document.querySelector(`#${event.target.id}`);
    element.setAttribute('onClick','');
    element.classList.add('text-danger');
    //console.log(element.dataset.id);
    const url = `/api/client/${element.dataset.id}/purchase`; //fetching client data which contains the purchase info
    //console.log(url);
    fetch(url)
        .then(function(res){
            if(res.status!==200){console.log(`looks like there was a problem ${res.status}`);return;}
            res.json().then(function(data){
                //creating elements and appending to display in the browser
                //adding data purchase of client 
                data.purchaseProduct.map((element)=>{
                    var divElement = createElement('div');//console.log(divElement);
                    var hrElement = createElement('hr');
                    appendElement(divElement,hrElement);
                   var key= Object.keys(element).filter(filterProperties).map((prop)=>{
                         return createElement('p'); console.log(prop);
                        
                    }); //console.log(key);

                    //getting the value of properties selected for display

                    var textObj = Object.entries(element).filter(getKeyValuePairs);//console.log(textObj);
                    
                    pt2 = textNode(`Item Name : ${element.product.productDesc}`);
                    pt1 = textNode(`Date : ${element.date.toString()}`);
                    pt3 = textNode(`Purchase Weight : ${element.purchaseWeight} grms`);
                    pt4 = textNode(`Purchase Tunch : ${element.purchaseTunch} %`);
                    pt5 = textNode(`Purchase Labour/Kg : ${element.purchaseLabourPerKg}.Rupees`);
                    pt6 = textNode(`Fine Silver : ${element.purchaseSilver} grms`)
                    pt7 = textNode(`Labour Cash : ${element.purchaseCash}.Rupees`)
                    var textArray = [pt1,pt2,pt3,pt4,pt5,pt6,pt7];
                    var i=0;
                   var divPara = key.map((keyPara)=>{appendElement(divElement,keyPara);
                    appendElement(keyPara,textArray[i]);i+=1;
                 });

                 var appendToElementid = document.getElementById(data._id);
                 //console.log(data._id);
                 //console.log(appendToElementid);
                 appendElement(appendToElementid,divElement);

                });//closing top map

                var accordionId = document.getElementById(`accordionClientPurchase${data._id}`);
                accordionId.classList.remove('d-none');
                //var linkDisableId = document.getElementById(`clientPurchaseApiLink${data._id}`);
                //linkDisableId.classList.add('text-danger','disabled');
            })//closing of res.json().then() brac
        })//then closeing brac
        .catch(error=>{console.log(error)});
}//closes the function getFetchApiPurchase()

function createElement(element){
    return document.createElement(element);
}

function appendElement(parentElement,childElement){
    return parentElement.appendChild(childElement)
}

function textNode(text){
    //console.log(text);
    //text = `${key}=${value}`;
    return document.createTextNode(text);
}

function filterProperties(keys){
    //console.log(typeof(keys));
    //console.log(keys);  
    if(keys!=='_id' && keys!=='client' && keys!=='__v'){
        return true } 
    return false ;    
}

function getKeyValuePairs(array){
    //console.log(typeof(array));
    //console.log(`in func ${array}`);
    if(array[0]!=='_id'&& array[0]!=='client'&&array[0]!=='__v'){ return true} return;
}

function paymentStatusDecorationFunction(){
    
}

