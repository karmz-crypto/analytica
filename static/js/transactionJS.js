//const { post } = require("../../router/apiFetchRouter");

window.onload = ()=>{
    console.log('transaction js connected');
};

function changePage(event){
    let eventElement = event.target;
    let changePage=topBtnDesign(eventElement);
    if(changePage){
        pageView(event.target);
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

function pageView(eventElement){
    let purchaseElement = document.querySelector('.purchaseTransaction');
    let salesElement = document.querySelector('.salesTransaction');
    if(eventElement.classList.contains('purchase')){ //purchase
        if(purchaseElement.classList.contains('d-none')){
            closeForm('.addSalesDiv');
            salesElement.querySelector('fieldset').setAttribute('disabled',true);
            salesElement.classList.add('d-none');
            purchaseElement.classList.remove('d-none');
           
        }else{
            return;
        }
    }else{
        if(salesElement.classList.contains('d-none')){ //sales
            closeForm('.addPurchaseDiv');
            purchaseElement.querySelector('fieldset').setAttribute('disabled',true);
            purchaseElement.classList.add('d-none');
            salesElement.classList.remove('d-none');
        }else{
            return;
        }

    }

}
function metadataView(event){ //console.log('in func');
    let salesElement = document.querySelector('#salesDropdownMenuButton');
    let purchaseElement = document.querySelector('#purchaseDropdownMenuButton');
    let eventElement = event.target; //console.log(eventElement.parentElement);
    if(eventElement.parentElement.classList.contains('sale')){ //console.log('pur contains')
        salesElement.innerHTML = eventElement.innerHTML;
        viewMetaData(eventElement);
    }else if(eventElement.parentElement.classList.contains('purchase')){ //console.log('contains');
        purchaseElement.innerHTML = eventElement.innerHTML;
        viewMetaData(eventElement);
    }

}

function viewMetaData(eventElement){ //console.log('sale');
    if(eventElement.parentElement.classList.contains('purchase')){
        let purchaseMetaData = document.querySelector('.metadataViewPurchaseTable');
        if(eventElement.parentElement.classList.contains('weekly')){    
            purchaseMetaData.querySelector('.weeklyPurchase').classList.remove('d-none');
            doNotDisplay(eventElement,'.weeklyPurchase',purchaseMetaData);
        }else if(eventElement.parentElement.classList.contains('monthly')){
            purchaseMetaData.querySelector('.monthlyPurchase').classList.remove('d-none');
            doNotDisplay(eventElement,'.monthlyPurchase',purchaseMetaData);
        }else if(eventElement.parentElement.classList.contains('.yearlyPurchase')){
            purchaseMetaData.querySelector('.yearlyPurchase').classList.remove('d-none');
            doNotDisplay(eventElement,'.yearlyPurchase',purchaseMetaData);
        }else{
            purchaseMetaData.querySelector('.totalPurchase').classList.remove('d-none');
            doNotDisplay(eventElement,'.totalPurchase',purchaseMetaData);
        }
    }else{
        let saleMetaData = document.querySelector('.metadataViewSaleTable');
        if(eventElement.parentElement.classList.contains('weekly')){    
            saleMetaData.querySelector('.weeklySale').classList.remove('d-none');
            doNotDisplay(eventElement,'.weeklySale',saleMetaData);
        }else if(eventElement.parentElement.classList.contains('monthly')){
            saleMetaData.querySelector('.monthlySale').classList.remove('d-none');
            doNotDisplay(eventElement,'.monthlySale',saleMetaData);
        }else if(eventElement.parentElement.classList.contains('.yearlySale')){
            saleMetaData.querySelector('.yearlySale').classList.remove('d-none');
            doNotDisplay(eventElement,'.yearlySale',saleMetaData);
        }else{
            saleMetaData.querySelector('.totalSale').classList.remove('d-none');
            doNotDisplay(eventElement,'.totalSale',saleMetaData);
        }

    }
}

function doNotDisplay(eventElement,except,serachIn){
    let purchaseClassElements = ['.weeklyPurchase','.monthlyPurchase','.yearlyPurchase','.totalPurchase'];
    let saleClassElements = ['.weeklySale','.monthlySale','.yearlySale','.totalSale'];
    if(eventElement.parentElement.classList.contains('purchase')){
        purchaseClassElements.map(element=>{
            if(element===except){
                return;
            }else{
                serachIn.querySelector(element).classList.add('d-none');
            }
        });
    }else{
        saleClassElements.map(element=>{
            if(element===except){
                return;
            }else{
                serachIn.querySelector(element).classList.add('d-none');
            }
        });

    }
}

function formControl(event){
    eventElement = event.target;
    //console.log(eventElement.parentElement.parentElement);
    if(eventElement.classList.contains('addPurchaseBtn')){ //console.log('purchase');
        document.querySelector('.addPurchaseDiv').classList.remove('d-none');
        document.querySelector('.addPurchaseDiv').querySelector('fieldset').removeAttribute('disabled');
        document.querySelector('.addPurchaseDiv').querySelectorAll('button').forEach(button=>{
            button.removeAttribute('disabled');
        });
    }else{ //console.log('sales');
        document.querySelector('.addSalesDiv').classList.remove('d-none');
        document.querySelector('.addSalesDiv').querySelector('fieldset').removeAttribute('disabled');
        document.querySelector('.addSalesDiv').querySelectorAll('button').forEach(button=>{
            button.removeAttribute('disabled');
        });
    }
    if(!eventElement.parentElement.parentElement.querySelector('.formSubmitMsg').classList.contains('d-none')){
        eventElement.parentElement.parentElement.querySelector('.formSubmitMsg').classList.add('d-none');
    }
    
}

function closeForm(target){
    document.querySelector(target).querySelector('.resetForm').click();
    document.querySelector(target).querySelector('fieldset').setAttribute('disabled',true);
    document.querySelector(target).classList.add('d-none');
}

function purchasePostData(event,target){
    let inputName = [];
    //let selectName = [];
    let postObject = {};
    let url ;
    if(event.target.classList.contains('purchaseSubmitForm')){ 
         inputName =  ["purchaseDate","purchaseProductId","purchaseWeight","purchaseSilver","purchaseCash","purchaseTunch","purchaseLabourPerKg"];
         selectName = ["purchaseClientId"];
         postObject = {
            date : (extractData(inputName[0])),
            purchaseWeight : (extractData(inputName[2])),
            purchaseTunch : (extractData(inputName[5])),
            purchaseProductId : extractData(inputName[1]),
            purchaseLabourPerKg : (extractData(inputName[6])),
            clientId : document.querySelector(`select[name=${selectName[0]}]`).value,
            purchaseSilver : parseFloat(extractData(inputName[3])),
            purchaseCash : parseFloat(extractData(inputName[4])),
    };
    
         url = '/purchase/addPurchase';
    }else{
         inputName =  ["saleDate","saleProductId","saleWeight","saleSilver","saleCash","saleTunch","saleLabourPerKg"];
         selectName = ["saleClientId"];
         postObject = {
            date : (extractData(inputName[0])),
            saleWeight : (extractData(inputName[2])),
            saleTunch : (extractData(inputName[5])),
            saleProductId : extractData(inputName[1]),
            saleLabourPerKg : (extractData(inputName[6])),
            clientId : document.querySelector(`select[name=${selectName[0]}]`).value,
            saleSilver : parseFloat(extractData(inputName[3])),
            saleCash : parseFloat(extractData(inputName[4])),
    };
    
         url = '/sales/addSales';
    }
    
   
    //postData ={product:{purchaseProductId,purchaseWeight,purchaseTunch,purchaseLabourPerkg}}
    console.log(postObject);
    
    fetch(url,{
        method:"POST",
        body:JSON.stringify(postObject),
        headers:{"content-type":"application/json; charset=UTF-8"}
    }).then(res=>{res.json().then(data=>{
        if(data===true){
            
            (document.querySelector(target).parentElement).querySelector('.formSubmitMsg').querySelector('.formSubmitMsg-msg').innerHTML = "your data was succesfully submitted !!"
            closeForm(target);
            (document.querySelector(target).parentElement).querySelector('.formSubmitMsg').classList.remove('d-none');
           // setTimeout(()=>{window.location.reload();},3000);
        }
    })}).catch();
}

function extractData(name){ //this func is to extract data from the html page 
    //console.log(name);
    let arr =[];
    var elements = document.querySelectorAll(`input[name=${name}]`);
    console.log(elements[0]);
    if(elements.length!==1){
        for(var i=0;i<elements.length;i++){
             arr.push(elements[i].value); //console.log(elements[i].value);
        } return arr;
    }else{
        let arr = []
        let data = ['purchaseProductId','saleProductId','purchaseTunch','saleTunch','purchaseWeight','saleWeight','purchaseLabourPerKg','saleLabourPerKg'];
        
       
            if(data.indexOf(elements[0].name)>=0){ console.log(`found the index of ${elements[0].name}`);
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
    console.log(event.target);
    //console.log(productId);
    let target = event.target.dataset.action;console.log(target);
    if(target==='purchase'){ //console.log('purchase');
        var inputElement = document.querySelector('.purchaseProductListTableBody').querySelectorAll('input');
    }else{ //console.log('sales');
        var inputElement = document.querySelector('.salesProductListTableBody').querySelectorAll('input');
    }
     inputElement.forEach(element=>{
        if(element.value===productId){
         removeCalulation(element.parentElement,target);//passing argument (row element to capture the data and manipulate the formCalculation)
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
    if(target==='purchase'){
        let rowElement = document.querySelector('.purchaseProductListTableBody').querySelectorAll('tr');
        if(rowElement.length===0){ 
            document.querySelector('.purchaseTableDiv').classList.add('d-none');
            document.querySelector('.purchaseProductFinalAmount').classList.add('d-none');
        }
    }else{
        let rowElement = document.querySelector('.salesProductListTableBody').querySelectorAll('tr');
        if(rowElement.length===0){ 
            document.querySelector('.salesTableDiv').classList.add('d-none');
            document.querySelector('.salesProductFinalAmount').classList.add('d-none');
        }
    }
    


}

function removeCalulation(element,target){ //func to remove the data from the final calculation after the product is removed.
    let elementObject = {};
    if(target==='purchase'){
        var identifier = ['purchaseWeight','purchaseTunch','purchaseLabourPerKg','.purchaseProductFinalAmount','purchaseNetWeight','purchaseSilver','purchaseCash'];
    }else{
        var identifier = ['saleWeight','saleTunch','saleLabourPerKg','.salesProductFinalAmount','saleNetWeight','saleSilver','saleCash'];
    }
   
        elementObject.weight = element.querySelector(`input[name=${identifier[0]}]`).value;
        elementObject.tunch = element.querySelector(`input[name=${identifier[1]}]`).value;
        elementObject.labourPerKg = element.querySelector(`input[name=${identifier[2]}]`).value;
        //console.log(elementObject);

            document.querySelector(identifier[3]).querySelectorAll('input').forEach(inputElement=>{
                
                if(inputElement.getAttribute('name')===identifier[4]){ 
                    if(elementObject.weight!==""){
                        inputElement.value = inputElement.value - elementObject.weight;
                    }
                }
                 if(inputElement.getAttribute('name')===identifier[5]){
                    if(elementObject.tunch!==""){
                        inputElement.value = inputElement.value-(elementObject.weight*elementObject.tunch/100);
                    }
                }
                 if(inputElement.getAttribute('name')===identifier[6]){ 
                    if(elementObject.labourPerKg!==""){
                        inputElement.value = inputElement.value-(elementObject.weight*elementObject.labourPerKg/1000);
                    }  
                }
            });  
}

function restoreProdutListState(productId){
    document.querySelector('#productListForm').querySelector('.modal-body').querySelectorAll('button')
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
        if(event.target.value===""){ if(event.target.parentElement.querySelector('.errorMsgSpan')){
            validFormSubmit(false);
        }else{
            let span= document.createElement('span');
            span.classList.add('text-capitalize','text-danger','errorMsgSpan');
            span.style.fontSize="small";
            event.target.classList.add('border', 'border-1','border-danger','rounded');
            span.appendChild(document.createTextNode('*please select appropriate option.'))
            event.target.parentElement.appendChild(span);
            validFormSubmit(false);
            }
            
            
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
            if(event.target.parentElement.querySelector('.errorMsgSpan')){
                validFormSubmit(false);
            }else{
                
                let span= document.createElement('span');
                span.classList.add('text-capitalize','text-danger','errorMsgSpan');
                span.style.fontSize="small";
                event.target.classList.add('border', 'border-1','border-danger','rounded');
                span.appendChild(document.createTextNode('*negative values are not permitted'))
                event.target.parentElement.appendChild(span);
                validFormSubmit(false);
                }
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


