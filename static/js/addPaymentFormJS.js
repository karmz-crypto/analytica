window.onload = function(){
    console.log('addPaymentForm Connected');
};

function selectFormType(){ //debit/bullion
    if(document.getElementById('debitPaymentId').checked && document.getElementById('bullionPaymentId').checked ){
        document.getElementById('debitBullion').classList.remove('d-none');
    }else{ 
        document.getElementById('debitBullion').classList.add('d-none');
    }
    //credit/bullion
    if(document.getElementById('creditPaymentId').checked && document.getElementById('bullionPaymentId').checked){
        document.getElementById('creditBullion').classList.remove('d-none');
    } else{ 
        document.getElementById('creditBullion').classList.add('d-none');
    } 
    // debit/product
    if(document.getElementById('debitPaymentId').checked && document.getElementById('productPaymentId').checked ){
        document.getElementById('debitProduct').classList.remove('d-none');
    } else {
        document.getElementById('debitProduct').classList.add('d-none');
    }
    // credit/product
    if(document.getElementById('creditPaymentId').checked && document.getElementById('productPaymentId').checked){
        document.getElementById('creditProduct').classList.remove('d-none');
    } else {
        document.getElementById('creditProduct').classList.add('d-none');
    }
    if(document.getElementById('checkRadioProductCredit').checked){
        document.getElementById('checkProductCreditAddToStock').classList.add('d-none');
        document.getElementById('productCreditAddToStock').classList.remove('d-none');
    }else{
        document.getElementById('checkProductCreditAddToStock').classList.remove('d-none');
        document.getElementById('productCreditAddToStock').classList.add('d-none');
    }
    //debit/cash
    if(document.getElementById('debitPaymentId').checked && document.getElementById('cashPaymentId').checked){
        document.getElementById('debitCash').classList.remove('d-none');
    }else{
        document.getElementById('debitCash').classList.add('d-none');
    }
        //within debit/cash  {conditionalchecks}
    if(document.getElementById('checkBhawCashAmountSpanDebit').checked){
        document.getElementById('checkBhawCashAmountDebit').classList.add('d-none');
        var element =document.getElementsByClassName('bhawCashAmountDebit');//.forEach((element)=>{console.log(element);element.classList.remove('d-none')});
        for(var i=0;i<element.length;i++){
            element[i].classList.remove('d-none');
        }
    }else{
        var element =document.getElementsByClassName('bhawCashAmountDebit');//.forEach((element)=>{console.log(element);element.classList.remove('d-none')});
        for(var i=0;i<element.length;i++){
            element[i].classList.add('d-none');}
    }

    if(document.getElementById('paymentModeRTGS').checked || document.getElementById('paymentModeCheque').checked){
        document.getElementById('paymentModeInfoDebit').classList.remove('d-none');
    }else{
        document.getElementById('paymentModeInfoDebit').classList.add('d-none');
    }
    //credit/cash 
    if(document.getElementById('creditPaymentId').checked && document.getElementById('cashPaymentId').checked){
        document.getElementById('creditCash').classList.remove('d-none');
    }else{
        document.getElementById('creditCash').classList.add('d-none');
    }
    //withing cash/credit
    if(document.getElementById('checkBhawCashAmountSpanCredit').checked){
        document.getElementById('checkBhawCashAmountCredit').classList.add('d-none');
        var element =document.getElementsByClassName('bhawCashAmountCredit');//.forEach((element)=>{console.log(element);element.classList.remove('d-none')});
        for(var i=0;i<element.length;i++){
            element[i].classList.remove('d-none');
        }
    }else{
        var element =document.getElementsByClassName('bhawCashAmountCredit');//.forEach((element)=>{console.log(element);element.classList.remove('d-none')});
        for(var i=0;i<element.length;i++){
            element[i].classList.add('d-none');}
    }

    if(document.getElementById('paymentModeRTGSCredit').checked || document.getElementById('paymentModeChequeCredit').checked){
        document.getElementById('paymentModeInfoCredit').classList.remove('d-none');
    }else{
        document.getElementById('paymentModeInfoCredit').classList.add('d-none');
    }

}


function getTunch(event){ //this function is to fetch data 

    const productId=document.getElementById('productSelector').value;

    fetch(`/api/product/${productId}`).then((res)=>{
        if(res.status!==200){
            console.log(`looks like there was a problem ${res.status}`);
            return;
        }
        res.json().then((data)=>{
            document.getElementById('productTunchDebit').value=data.productTunch;
            document.getElementById('productWeightDebit').value=data.productInStock; 
            if(data.productInStock>0){
            document.getElementById('debitProductSpanErrorMsg').innerHTML=`*max weight allowed is ${data.productInStock},else you will receive an error msg on submission`;
            document.getElementById('fineSilverDebitProduct').value=data.productTunch*data.productInStock/100;
            document.getElementById('productWeightDebit').removeAttribute('disabled');
            }else {
                document.getElementById('productWeightDebit').setAttribute('disabled',true);
                document.getElementById('debitProductSpanErrorMsg').innerHTML=`*Product in stock is ${data.productInStock}, cannot be used for payning payment. please select another product`;
            }
        })
    }).catch()
}

function formCalculation(){
    document.getElementById('fineSilverDebitBullion').value=
    document.getElementById('debitBullionWeight').value*document.getElementById('debitBullionTunch').value/100;

    document.getElementById('fineSilverCreditBullion').value=
    document.getElementById('creditBullionWeight').value*document.getElementById('creditBullionTunch').value/100;

    //product debit form checks and calculations
    document.getElementById('productWeightDebit').removeAttribute('onfocus');
    document.getElementById('productWeightDebit').setAttribute('oninput','formCalculation()');
    document.getElementById('fineSilverDebitProduct').value=
    document.getElementById('productWeightDebit').value*document.getElementById('productTunchDebit').value/100;

    //product credit 
    document.getElementById('fineSilverCredit').value =
     document.getElementById('productTunchCredit').value*document.getElementById('productWeightCredit').value/100;
     

    
}

function formControl(event){
    
}

//start processing of user event 
function paymentType(event){
    // 1.display the header
    disaplyHeader(event);
    //2. display select Payment method
    document.querySelector('.paymentMethods').classList.remove('d-none');

   

}

function disaplyHeader(event){
    if(event.target.classList.contains('credit')){
        
        document.querySelector('.paymentTypeHeader').classList.remove('d-none');
        document.querySelector('.headerText').innerHTML = "Receive Payment (Credit)";
        changeButtonState('debit');
    }else{
        document.querySelector('.paymentTypeHeader').classList.remove('d-none');
        document.querySelector('.headerText').innerHTML = "Make Payment (Debit)";
        changeButtonState('credit');
    }
}

function changeButtonState(className){ //after onclick the btn will display its state active/inactive.
    
        if(className==='credit'){
            document.querySelector('.credit').classList.remove('list-group-item-secondary','text-white');
            document.querySelector('.debit').classList.add('list-group-item-secondary','text-white');
        }else{
            document.querySelector('.credit').classList.add('list-group-item-secondary','text-white');
            document.querySelector('.debit').classList.remove('list-group-item-secondary','text-white');
        }
    
}
function selectPaymentMethod(event){
    //hide div selectPaymentType class
    document.querySelector('.selectPaymentType').classList.add('collapse');
    document.querySelector('.selectPaymentType').setAttribute('id','selectPaymentType');
    document.querySelector('.collapseBtnPaymentType').classList.remove('d-none');

    let paymentMethod = ['cash','bullion','dual','product'];
    paymentMethod.forEach(e=>{
        if(!event.target.classList.contains(e)){ // console.log( `${e} is nt present`);
            document.querySelector(`.${e}`).classList.remove('bg-secondary','text-white','shadow','rounded','mb-3','p-3','bg-black');
            document.querySelector(`.${e}`).setAttribute('disabled',true);
        }
        if(event.target.classList.contains(e)){
            event.target.classList.add('bg-secondary','text-white','shadow','rounded','mb-3','p-3','bg-black');
            document.querySelector(`.${e}`).removeAttribute('disabled');
            displayForm(event); //this function will allow for display the form of specific type.
        }
    });
    
}

function displayForm(event){
    let cashClassListName = ['.commonFormData','.cashPaymentForm','.bullionRate','.miscInfo'];
    if(event.target.classList.contains('cash')){
        cashClassListName.forEach(e=>{
            document.querySelector(e).classList.remove('d-none');
        });
    }else{
        cashClassListName.forEach(e=>{
            document.querySelector(e).classList.add('d-none');
        });
    }
}

// start processing of user dismissing the selected event
