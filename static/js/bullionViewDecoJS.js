window.onload = function(){
    console.log('deco bullion view connect');
    runFunctions();
    listDecoration();
    showBullionTransaction('all');
    currentDateListDeco();
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

function listDecoration(){
    var count=0;
    document.querySelectorAll('.listDesign').forEach(element=>{
        if(count%2===0){ 
            element.classList.add('bg-light');
        }else{element.classList.add('bg-white')}
        count +=1;
    });
}

function currentDateListDeco(){//to color the list of current date transaction
    document.querySelectorAll('.dateClass').forEach((element)=>{
        if(element.innerHTML===new Date().toDateString()){
            //console.log(element);
           // var x = document.getElementById("myLI").parentElement;
           element.parentElement.classList.add('border-2','rounded','border-success');
        }

    });
}

function showBullionTransaction(bullionType){ //console.log(bullionType);
    if(bullionType==='all'){
        document.querySelector('.allBtn').classList.add('bg-primary','text-white')
        document.querySelectorAll('.allList').forEach(element=>{
            element.classList.remove('d-none');
        });
        inactiveBullionTransaction(bullionType);
    }else if(bullionType==='9999_bullion'){
        document.querySelector('.fineBtn').classList.add('bg-primary','text-white');
        document.querySelectorAll('.fineBullionList').forEach(element=>{
            element.classList.remove('d-none');
        });
        inactiveBullionTransaction(bullionType);

    }else if(bullionType==='kachi'){
        document.querySelector('.kachiBtn').classList.add('bg-primary','text-white');
        document.querySelectorAll('.kachiBullionList').forEach(element=>{
            element.classList.remove('d-none');
        });
        inactiveBullionTransaction(bullionType);

    }else if(bullionType==='choursa'){
        document.querySelector('.choursaBtn').classList.add('bg-primary','text-white');
        document.querySelectorAll('.choursaBullionList').forEach(element=>{
            element.classList.remove('d-none');
        });
        inactiveBullionTransaction(bullionType);
    }else{

    }
}

function inactiveBullionTransaction(bullionType){ // the role of this func is to inactivate all the other list 
    var allListClass = ['.fineBullionList','.kachiBullionList','.choursaBullionList'];
    var allBtn = ['.fineBtn','.kachiBtn','.choursaBtn'];
    var fineListClass=['.allList','.kachiBullionList','.choursaBullionList']; //9999 bullion
    var fineBtn = ['.allBtn','.kachiBtn','.choursaBtn'];//9999 bullion
    var kachiListClass =['.allList','.fineBullionList','.choursaBullionList'];
    var kachiBtn = ['.allBtn','.fineBtn','.choursaBtn'];
    var choursaListClass =['.allList','.fineBullionList','.kachiBullionList'];
    var choursaBtn = ['.allBtn','.fineBtn','.kachiBtn'];
    if(bullionType==='all'){
        inactiveStateFunc(allListClass,allBtn);
    }
    if(bullionType==='9999_bullion'){
        inactiveStateFunc(fineListClass,fineBtn);
    }
    if(bullionType==='kachi'){
        inactiveStateFunc(kachiListClass,kachiBtn); 
    }
    if(bullionType==='choursa'){
        inactiveStateFunc(choursaListClass,choursaBtn);
    }
}

function inactiveStateFunc(allListClass,allBtn){
    allListClass.map(element=>{
        document.querySelectorAll(element).forEach(element=>{element.classList.add('d-none')});
    });
    allBtn.map(element=>{
        document.querySelectorAll(element).forEach(element=>{element.classList.remove('bg-primary','text-white')});
    });
}