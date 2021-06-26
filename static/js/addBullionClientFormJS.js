window.onload= function(){
    console.log('js connected to add client form');
    formControl();
};

function formControl(){
    
    if(document.getElementById('openingTransactionType').value!=='none'&&document.getElementById('openingTransactionType').value!==''){
         var elements = document.querySelector('.transactionTypeNotNone');
        elements.classList.remove('d-none');
        document.querySelector('.transactionTypeNoneFormControl').removeAttribute('disabled');
        document.querySelector('.text-info1').classList.add('d-none')
    }else{
        
        document.querySelector('.transactionTypeNotNone').classList.add('d-none');
        document.querySelector('.transactionTypeNoneFormControl').setAttribute('disabled',true);
        document.querySelector('.text-info1').classList.remove('d-none');
    }

    if(document.getElementById('openingTransactionElement').value==='cash'){
        document.querySelector('.transactionTypeCash').classList.remove('d-none');
        document.querySelector('#openingTransactionBalanceCash').removeAttribute('disabled');
    }else{
        document.querySelector('.transactionTypeCash').classList.add('d-none');
        document.querySelector('#openingTransactionBalanceCash').setAttribute('disabled',true);
    }
    if(document.getElementById('openingTransactionElement').value==='bullion'){
        document.querySelector('.transactionTypeBullion').classList.remove('d-none');
        document.querySelector('#openingTransactionBalanceBullion').removeAttribute('disabled');
    }else{
        document.querySelector('.transactionTypeBullion').classList.add('d-none');
        document.querySelector('#openingTransactionBalanceBullion').setAttribute('disabled',true);
    }
    if(document.getElementById('openingTransactionElement').value==='both'){
        document.querySelector('.transactionTypeCash').classList.remove('d-none');
        document.querySelector('#openingTransactionBalanceCash').removeAttribute('disabled');
        document.querySelector('.transactionTypeBullion').classList.remove('d-none');
        document.querySelector('#openingTransactionBalanceBullion').removeAttribute('disabled');
    }else{
        
    }
}