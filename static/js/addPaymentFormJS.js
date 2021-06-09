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
