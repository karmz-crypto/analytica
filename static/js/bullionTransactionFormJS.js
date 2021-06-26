window.onload = function(){
    console.log('js connected');
};

function bullionFunc(){
    if(document.querySelector('#transactionTypeBuy').checked){
       document.querySelectorAll('.buyBullionForm').forEach((element)=>{
           element.classList.remove('d-none');
       });
       document.querySelectorAll('.buyBullionFormCheck').forEach((element)=>{element.removeAttribute('disabled')});
    }else{
        document.querySelectorAll('.buyBullionForm').forEach((element)=>{
            element.classList.add('d-none');
        });
        document.querySelectorAll('buyBullionFormCheck').forEach((element)=>{element.setAttribute('disabled',true)});
    }
}

function silverRateStatusFunc(){
    if(document.querySelector('#bullionRateTrue').checked){
        document.querySelector('.bullionRateStatusTrue').classList.remove('d-none');
        document.querySelector('.bullionRateCheckTrue').removeAttribute('disabled');
        cashTransactionInfoFunc('true');
    }else{
        document.querySelector('.bullionRateStatusTrue').classList.add('d-none');
        document.querySelector('.bullionRateCheckTrue').setAttribute('disabled',true);
    }

    if(document.querySelector('#bullionRateFalse').checked){
        document.querySelector('.bullionRateStatusFalse').classList.remove('d-none');
        document.querySelector('.bullionRateCheckFalse').removeAttribute('disabled');
        cashTransactionInfoFunc('false');
    }else{
        document.querySelector('.bullionRateStatusFalse').classList.add('d-none');
        document.querySelector('.bullionRateCheckFalse').setAttribute('disabled',true);
    }
}

function cashTransactionInfoFunc(status){
    document.querySelector('.cashTransactionInfo').classList.remove('d-none');
    if(status==='true'){
        document.querySelector('.cashDebitInfo').innerHTML = document.querySelector('.bullionRateCheckTrue').value*document.querySelector('#buyBullionWeight').value/1000;
        transactionStatusFunc();
    }
    if(status==='false'){
        document.querySelector('.cashDebitInfo').innerHTML = document.querySelector('.bullionRateCheckFalse').value;
        transactionStatusFunc();
    }
}

function transactionStatusFunc(){
    document.querySelector('.transactionStatus').classList.remove('d-none');
    document.querySelector('#transactionPending').removeAttribute('disabled');
    document.querySelector('#transactionComplete').removeAttribute('disabled');
}