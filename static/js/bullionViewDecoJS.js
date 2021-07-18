window.onload = function(){
    console.log('deco bullion view connect');
    runFunctions();
}

function runFunctions(){
    decoBullionStockSummary();
    decoPendingTransactionSummary();
}

function decoBullionStockSummary(){
    document.querySelectorAll('.presentClass').forEach((element)=>{
        element.style.color = 'green';
    });

    document.querySelectorAll('.absentClass').forEach((element)=>{
        element.style.color = 'red';
    });

    if(document.querySelectorAll('.kachiTag').length!==0){
        document.querySelector('.noKachiStock').classList.add('d-none');
        document.querySelector('.kachiTransactionLink').classList.remove('d-none');
    }else{
        document.querySelector('.noKachiStock').classList.remove('d-none');
        document.querySelector('.kachiTransactionLink').classList.add('d-none');
    }

    if(document.querySelectorAll('.choursaTag').length!==0){
        document.querySelector('.noChoursaStock').classList.add('d-none');
        document.querySelector('.choursaTransactionLink').classList.remove('d-none');
    }else{
        document.querySelector('.noChoursaStock').classList.remove('d-none');
        document.querySelector('.choursaTransactionLink').classList.add('d-none');
    }

    if(document.querySelectorAll('.bullion9999Tag').length!==0){ //console.log('if');
        document.querySelector('.no9999BullionStock').classList.add('d-none');
        document.querySelector('.bullion9999TransactionLink').classList.remove('d-none');
    }else{ console.log('else');
        document.querySelector('.no9999BullionStock').classList.remove('d-none');
        document.querySelector('.bullion9999TransactionLink').classList.add('d-none');
    }

    if(document.querySelector('.bullionStockAccordian').getAttribute('aria-expanded')!=='true'){ //console.log('closed');
        document.querySelector('.carouselActive').classList.remove('d-none');
    }else{ //console.log('open');
        document.querySelector('.carouselActive').classList.add('d-none');
    }

}

function decoPendingTransactionSummary(){
    if(document.querySelector('.pendingTransacAccordian').getAttribute('aria-expanded')!=='true'){ //collapse
        document.querySelector('.pendingTransactionCollapseTrue').classList.remove('d-none');
        document.querySelector('.pendingTransactionCollapseFalse').classList.add('d-none');
    }else{
        document.querySelector('.pendingTransactionCollapseTrue').classList.add('d-none');
        document.querySelector('.pendingTransactionCollapseFalse').classList.remove('d-none');
    }
}