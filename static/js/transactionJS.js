//const { post } = require("../../router/apiFetchRouter");

window.onload = ()=>{
    console.log('transaction js connected');
};

function changePage(event){
    let eventElement = event.target;
    let changePage=topBtnDesign(eventElement);
    if(changePage){
        pageView();
    }else{
        console.log('failed to load the page');
    }
}

function topBtnDesign(eventElement){
    if(eventElement.classList.contains('btn-active')){
        return false;
    }else{
        //eventElement.classList.add('btn-active','btn-primary');
        eventElement.parentElement.parentElement.querySelectorAll('button').forEach(btnElement=>{
            if(btnElement.classList.contains('btn-active')){
                btnElement.classList.remove('btn-active','btn-primary');
                btnElement.classList.add('btn-white','btn-inactive');
            }else{ 
                btnElement.classList.remove('btn-inactive','btn-white');
                btnElement.classList.add('btn-active','btn-primary');
            }
        });
        return true;
    }
}

function pageView(){

}

function show(){ //temp
    document.querySelector('.salesTransaction').classList.remove('d-none');
    document.querySelector('.purchaseTransaction').classList.add('d-none');
}

function metadataView(event){ console.log('in func');
    let salesElement = document.querySelector('#salesDropdownMenuButton');
    let purchaseElement = document.querySelector('#purchaseDropdownMenuButton');
    let eventElement = event.target; console.log(eventElement.parentElement);
    if(eventElement.parentElement.classList.contains('sales')){ console.log('pur contains')
        salesElement.innerHTML = eventElement.innerHTML;
    }else if(eventElement.parentElement.classList.contains('purchase')){ console.log('contains');
        purchaseElement.innerHTML = eventElement.innerHTML;
    }

}

function purchaseFormControl(event){
    eventElement = event.target;
    if(eventElement.classList.contains('addPurchaseBtn')){
        document.querySelector('.addPurchaseDiv').classList.remove('d-none');
        document.querySelector('.addPurchaseDiv').querySelector('fieldset').removeAttribute('disabled');
    }
}

function closeForm(target){
    document.querySelector(target).querySelector('.resetForm').click();
    document.querySelector(target).querySelector('fieldset').setAttribute('disabled',true);
    document.querySelector(target).classList.add('d-none');
}

function purchasePostData(target){
    purchaseInputName = ["date","purchaseProductId","purchaseWeight","purchaseSilver","purchaseCash","purchaseTunch","purchaseLabourPerKg"];
    purchaseSelectName=["clientId"];
    let postObject = {
            date : (extractData("date")),
            purchaseWeight : (extractData('purchaseWeight')),
            purchaseTunch : (extractData('purchaseTunch')),
            purchaseProductId : extractData('purchaseProductId'),
            purchaseLabourPerKg : (extractData('purchaseLabourPerKg')),
            clientId : document.querySelector('select[name="clientId"]').value,
            purchaseSilver : parseFloat(extractData('purchaseSilver')),
            purchaseCash : parseFloat(extractData('purchaseCash')),
    };
    
    //postData ={product:{purchaseProductId,purchaseWeight,purchaseTunch,purchaseLabourPerkg}}
    console.log(postObject);
    let url = '/purchase/addPurchase';
    fetch(url,{
        method:"POST",
        body:JSON.stringify(postObject),
        headers:{"content-type":"application/json; charset=UTF-8"}
    }).then(res=>{res.json().then(data=>{
        if(data===true){

            (document.querySelector(target).parentElement).querySelector('.formSubmitMsg').querySelector('.formSubmitMsg-msg').innerHTML = "your data was succesfully submitted !!"
            closeForm(target);
            (document.querySelector(target).parentElement).querySelector('.formSubmitMsg').classList.remove('d-none');
        }
    })}).catch();
}

function extractData(name){
    let arr =[];
    let retrunData;
    var elements = document.querySelectorAll(`input[name=${name}]`);
    if(elements.length!==1){
        for(var i=0;i<elements.length;i++){
             arr.push(elements[i].value); console.log(elements[i].value);
        } return arr;
    }else{
        let arr = []
        let data = ['purchaseProductId','purchaseTunch','purchaseWeight','purchaseLabourPerKg'];
       
            if(elements[0].name===data[0]||elements[0].name===data[1]||elements[0].name===data[2]){
                arr.push(elements[0].value);
                return arr;
            }else{
                
                return elements[0].value;
            }
        
        
    }
}

// func to control ui after post of form data ....
function uiControlOfMsgDiv(event){ // class formSubmitMsg 
    event.target.parentElement.classList.add('d-none');


}

function removeProduct(event){//target paramenter is for the target table body(tbody) from which to remove the product.
    let productId = event.target.dataset.productId;
    let selectedElement;
    console.log(productId);
    let inputElement = document.querySelector('.purchaseProductListTableBody').querySelectorAll('input');
    selectedElement= inputElement.forEach(element=>{
        if(element.value===productId){
         removeCalulation(element);
         element.parentElement.parentElement.removeChild(element.parentElement);
    }
    });
    
    //console.log(selectedElement);
    
    //removeCalulation(productIdentity);//to remove the data from form calulaton on removing of the item .
    /*let rowElement = document.querySelector(target).querySelectorAll('tr');
    console.log(rowElement.length);
    tbody = document.querySelector(target);
    console.log(tbody);
    tbody.removeChild(rowElement[rowElement.length-1]);*/


}

function removeCalulation(element){
   console.log(element)

}