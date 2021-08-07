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
                btnElement.classList.remove('btn-active','btn-success');
                btnElement.classList.add('btn-white','btn-inactive');
            }else{ 
                btnElement.classList.remove('btn-inactive','btn-white');
                btnElement.classList.add('btn-active','btn-success');
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
        document.querySelector('.addPurchaseDiv').querySelectorAll('button').forEach(button=>{
            button.removeAttribute('disabled');
        });
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

function extractData(name){ //this func is to extract data from the html page 
    let arr =[];
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
    //console.log(productId);
    let inputElement = document.querySelector('.purchaseProductListTableBody').querySelectorAll('input');
     inputElement.forEach(element=>{
        if(element.value===productId){
         removeCalulation(element.parentElement);//passing argument (row element to capture the data and manipulate the formCalculation)
         element.parentElement.parentElement.removeChild(element.parentElement);
        }
    });
    restoreProdutListState(productId);
    //console.log(selectedElement);
    
    //removeCalulation(productIdentity);//to remove the data from form calulaton on removing of the item .
    /*let rowElement = document.querySelector(target).querySelectorAll('tr');
    console.log(rowElement.length);
    tbody = document.querySelector(target);
    console.log(tbody);
    tbody.removeChild(rowElement[rowElement.length-1]);*/

    // to check if any product is present in the table if not then hide the heading and the final form calulation 

    let rowElement = document.querySelector('.purchaseProductListTableBody').querySelectorAll('tr');
    if(rowElement.length===0){ 
        document.querySelector('.purchaseTableDiv').classList.add('d-none');
        document.querySelector('.purchaseProductFinalAmount').classList.add('d-none');
    }


}

function removeCalulation(element){ //func to remove the data from the final calculation after the product is removed.
    let elementObject = {};
   
        elementObject.purchaseWeight = element.querySelector('input[name="purchaseWeight"]').value;
        elementObject.purchaseTunch = element.querySelector('input[name="purchaseTunch"]').value;
        elementObject.purchaseLabourPerKg = element.querySelector('input[name="purchaseLabourPerKg"]').value;
        console.log(elementObject);

            document.querySelector('.purchaseProductFinalAmount').querySelectorAll('input').forEach(inputElement=>{
                
                if(inputElement.getAttribute('name')==='netWeight'){ 
                    if(elementObject.purchaseWeight!==""){
                        inputElement.value = inputElement.value - elementObject.purchaseWeight;
                    }
                }
                 if(inputElement.getAttribute('name')==='purchaseSilver'){
                    if(elementObject.purchaseTunch!==""){
                        inputElement.value = inputElement.value-(elementObject.purchaseWeight*elementObject.purchaseTunch/100);
                    }
                }
                 if(inputElement.getAttribute('name')==='purchaseCash'){ 
                    if(elementObject.purchaseLabourPerKg!==""){
                        inputElement.value = inputElement.value-(elementObject.purchaseWeight*elementObject.purchaseLabourPerKg/1000);
                    }  
                }
            });  
}

function restoreProdutListState(productId){
    document.querySelector('#productListInPurchaseForm').querySelector('.modal-body').querySelectorAll('button')
        .forEach(button=>{
            if(button.dataset.productId===productId){
                if(button.querySelector('.itemPresentMsg')){
                    button.removeChild(button.querySelector('.itemPresentMsg'));
                }
                
            }
        })
}

//function to control form data entry ...........
function formDataControl(event){ 
    if(event.target.tagName==='SELECT'){
        if(event.target.value===""){ 
            let span= document.createElement('span');
            span.classList.add('text-capitalize','text-danger','errorMsgSpan');
            span.style.fontSize="small";
            event.target.classList.add('border', 'border-1','border-danger','rounded');
            span.appendChild(document.createTextNode('*please select appropriate option.'))
            event.target.parentElement.appendChild(span);
            validFormSubmit(false);
            
        }else{
            if(event.target.parentElement.querySelector('.errorMsgSpan')){
                event.target.parentElement.removeChild(event.target.parentElement.querySelector('.errorMsgSpan'));
                event.target.classList.remove('border', 'border-1','border-danger','rounded');
                validFormSubmit(true);
            }
           
        }
    }
    if(event.target.tagName==='INPUT'){ console.log('input');
        var patt = -/[0-9]/;
        if(event.target.value===""||event.target.value<0||event.target.value===(event.target.value).match(patt)){ console.log('value less 0');
            let span= document.createElement('span');
            span.classList.add('text-capitalize','text-danger','errorMsgSpan');
            span.style.fontSize="small";
            event.target.classList.add('border', 'border-1','border-danger','rounded');
            span.appendChild(document.createTextNode('*negative values are not permitted'))
            event.target.parentElement.appendChild(span);
            validFormSubmit(false);
        }else{
            if(event.target.parentElement.querySelector('.errorMsgSpan')){
                event.target.parentElement.removeChild(event.target.parentElement.querySelector('.errorMsgSpan'));
                event.target.classList.remove('border', 'border-1','border-danger','rounded');
                validFormSubmit(true);
            }
        }
    }
}

function dateLimit(dateClass){ console.log('datecontrol');
    let formFields = ['select','input'];
    formFields.map(fields=>{
        document.querySelectorAll(fields).forEach(field=>{
            if(field.getAttribute('disabled')){
                return;
            }else{
                field.setAttribute('onfocusout','formDataControl(event)');
            }
        });
    });
    document.querySelector(dateClass).max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    document.querySelectorAll('select').forEach(select=>{ 
        if(!select.getAttribute('disabled')){ 
            select.classList.remove('d-none');
        }
    });
}

function validFormSubmit(isTrue){ // tru : enables submit btn &&& flase: disables submit btn.
    if(isTrue){ console.log(isTrue);
        document.querySelectorAll('.submitForm').forEach(button=>{ console.log(button.parentElement);
            if(!button.parentElement.parentElement.querySelector('input').getAttribute('disabled')){
                button.removeAttribute('disabled');
            }
        });
    }else{ console.log(isTrue);
        document.querySelectorAll('.submitForm').forEach(button=>{ console.log(button.parentElement);
            if(!button.parentElement.parentElement.querySelector('input').getAttribute('disabled')){
                button.setAttribute('disabled',true);
            }
        });
    }
}


