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



//new code
//start processing of user event 
function paymentType(event){
    /*
    //1. check if the bullionForm div has elements present : kachiBullioonForm ChoursaBUllionForm
    //if these div has elements means they have to removed before cause a new entry of credit/debit will now be affected
    let elementList = ['.inputForm']; //these elements must not be present in the DOM if the user click on this button again 
    let isTrue = checkIfElementPresent(elementList); //this is a control method to see that no wrong data is feeded
    if(isTrue){
        removeChild(isTrue);
    } */
    // 1.display the header
    displayHeader(event);
    //2. display select Payment method
    document.querySelector('.paymentMethods').classList.remove('d-none');
    //console.log(document.querySelector('.cash'));//to check f the class is toggled or not between credit/debit
    //console.log(document.querySelector('.pure'));
}
/*
function checkIfElementPresent(elementClassNameArr){
    let infoObject = {};
    elementClassNameArr.forEach(e=>{
        var el = document.querySelector(e);
        if(el!==null){
            return infoObject;
        }else{
            return false;
        }
    });
}

function removeChild(infoObject){ // infoObject will contain two info 1. the child to remove 2. the parentElement identifier

} */

function displayHeader(event){
    document.querySelector('.paymentTypeHeader').classList.remove('d-none');
    if(event.target.classList.contains('credit')){
        
        document.querySelector('.headerText').innerHTML = "Receive Payment (Credit)";
        changeButtonState('credit');
        addClass('credit','debit');
    }else{
        
        document.querySelector('.headerText').innerHTML = "Make Payment (Debit)";
        changeButtonState('debit');
        addClass('debit','credit'); //toggle class credit and debit .... 
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

function addClass(addClass,removeClass){ //add or remove class to identify if the entry is for credit or debit .
    let paymentMethods = ['.cash','.bullion','.dual','.product']; 
    //let bullionType =['.pure','.choursa','.kachi'];
    //let bullionPayment = ['.kachiBullionForm','.choursaBullionForm','.pureBullionForm'];
    paymentMethods.forEach(e=>{
        toggleClass(e,addClass,removeClass);
    }); /*
    bullionType.forEach(e=>{ 
        toggleClass(e,addClass,removeClass);
    });
    bullionPayment.forEach(e=>{
        toggleClass(e,addClass,removeClass);
    }); */
}

function toggleClass(e,addClass,removeClass){
    if(document.querySelector(e).classList.contains(removeClass)){
        document.querySelector(e).classList.remove(removeClass);
    }
    document.querySelector(e).classList.add(addClass);
}

function defineVariables(event){
    if(event.target.parentElement.parentElement.classList.contains('paymentMethods')){ //console.log('hi');
        return  ['cash','bullion','dual','product'];
    }/*
    else if(event.target.parentElement.parentElement.classList.contains('bullionType')){
        return  ['pure','choursa','kachi'];
    } */
}
function selectPaymentMethod(event){ //console.log(event.target.parentElement.parentElement);
    //hide div selectPaymentType class
    document.querySelector('.selectPaymentType').classList.add('collapse');
    document.querySelector('.selectPaymentType').setAttribute('id','selectPaymentType');
    document.querySelector('.collapseBtnPaymentType').classList.remove('d-none');

    //let paymentMethod = ['cash','bullion','dual','product'];
    //let bullionType = ['pure','choursa','kachi'];
    let variables = defineVariables(event);
    variables.forEach(e=>{
        if(event.target.classList.contains(e)){ // console.log( `${e} is nt present`);
            document.querySelector(`.${e}`).classList.add('bg-secondary','text-white','shadow','rounded','mb-3','p-3','bg-black','activePayment');
            //document.querySelector(`.${e}`).setAttribute('disabled',true);
            displayForm(event); //this function will allow for display the form of specific type.
        }else{
           
            document.querySelector(`.${e}`).classList.remove('bg-secondary','text-white','shadow','rounded','mb-3','p-3','bg-black','activePayment');
            //document.querySelector(`.${e}`).removeAttribute('disabled');
            

        }
    });
    
       
    
}

function displayForm(event){
    document.querySelector('.commonFormData').classList.remove('d-none');
    let classListName;
    let cashClassListName = ['.cashPaymentForm','.bullionRate','.miscInfo'];
    let bullionClassListName = ['.bullionDetails','.bullionType'];
    let dualClassListName = [];
    let productClassListName = [];
    if(event.target.classList.contains('cash')){
        classListName = cashClassListName;
        classListName.forEach(e=>{
            document.querySelector(e).classList.remove('d-none');
        });
        hideForm([bullionClassListName,dualClassListName,productClassListName]);
    }
    else if(event.target.classList.contains('bullion')){
            classListName = bullionClassListName;
            classListName.forEach(e=>{// console.log(document.querySelector(e));
            document.querySelector(e).classList.remove('d-none'); document.querySelector(e);
        });
        hideForm([cashClassListName,dualClassListName,productClassListName]);
        selectBullionType(event);
    }
    /*else{
        bullionClassListName.forEach(e=>{
            document.querySelector(e).classList.add('d-none'); });
        cashClassListName.forEach(e=>{
            document.querySelector(e).classList.add('d-none'); });
    
    }*/
}

function hideForm(classListNameArray){
    classListNameArray.forEach(e=>{ //console.log(e);
        e.forEach(e=>{ //console.log(e);
            document.querySelector(e).classList.add('d-none');
        });
    });
}

function selectBullionType(event){
    document.querySelector('.collapseBtnPaymentMethod').classList.remove('d-none');
    document.querySelector('.paymentMethods').classList.add('collapse'); 
    document.querySelector('.paymentMethods').setAttribute('id','selectPaymentMethods');

    /*

    if(event.target.classList.contains('pure')){ //console.log('pure');
        //hideForm([['.kachiBullionForm'],['.choursaBullionForm']]);

        //document.querySelector('.pureBullionForm').classList.remove('d-none');
       // document.appendChild(document.createElement('input').classList.add(''));
       let attr = {
        'div':{'class':'input-group mb-3 inputForm'},
        'span1':{'class':'input-group-text spanOne'},
        'input':{'type':'number','step':'any','name':'bullionWeight','class':'form-control','placeholder':'Bullion in Grams','aria-label':'BullionWeight','aria-describedby':'bullionWeight'},
        'span2':{'class':'input-group-text spanTwo mx-1 bg-danger text-white','onclick':'removeFormFields(event)'}
    };
    let element = ['div','span','input','span'];
    for(var i=0;i<element.length;i++){ 
        let el = document.createElement(element[i]);//console.log(el);
        if(i===0){
            setAttributes(el,attr.div);
            el.classList.add('inputPureForm');
            document.querySelector('.pureBullionForm').appendChild(el);
        }else if(i===1){
            el.appendChild(document.createTextNode('Bullion Wt.(Grms)'));
            document.querySelectorAll('.inputPureForm').forEach(e=>{
                if(e.querySelector('.spanOne')===null){
                    setAttributes(el,attr.span1);
                    e.appendChild(el);
                }
            });
        }else if(i===2){
            document.querySelectorAll('.inputPureForm').forEach(e=>{
                if(e.querySelector('input')===null){
                    setAttributes(el,attr.input);
                    e.appendChild(el);
                }
            });
            //setAttributes(el,attr.input);
        }else{
            el.appendChild(document.createTextNode('X'));
            document.querySelectorAll('.inputPureForm').forEach(e=>{
                if(e.querySelector('.spanTwo')===null){
                    setAttributes(el,attr.span2);
                    e.appendChild(el);}
                //}
            });

        }
    }console.log(document.querySelector('.pureBullionForm'));
        
    }
    else if(event.target.classList.contains('choursa')){
        let attr = {
            'div':{'class':'input-group mb-3 inputForm'},
            'span1':{'class':'input-group-text spanOne'},
            'inputTunch':{'type':'number','step':'any','name':'bullionTunch','class':'form-control','placeholder':'Bullion Tunch (%)','aria-label':'BullionTunch','aria-describedby':'bullionTunch'},
            'span2':{'class':'input-group-text spanTwo mx-1 bg-danger text-white','onclick':'removeFormFields(event)'},
            'span3':{'class':'input-group-text spanThree'},
            'inputWeight':{'type':'number','step':'any','name':'bullionWeight','class':'form-control','placeholder':'Bullion in Grams','aria-label':'BullionWeight','aria-describedby':'bullionWeight'},
            'span4':{'class':'input-group-text spanFour'},
            'inputFine':{'type':'number','step':'any','name':'bullionFine','class':'form-control','placeholder':'Bullion Fine Wt','aria-label':'BullionFine','aria-describedby':'bullionFine'},
            
        };

        let element = ['div','span','input','span','div','span','input','div','span','input' ];
        for(var i=0;i<element.length;i++){
            var el = document.createElement(element[i]);
        }
        //hideForm([['.pureBullionForm'],['.kachiBullionForm']]);

        //document.querySelector('.choursaBullionForm').classList.remove('d-none');
        
    }
    else if(event.target.classList.contains('kachi')){

        //hideForm([['.choursaBullionForm'],['.pureBullionForm']]);

        //document.querySelector('.kachiBullionForm').classList.remove('d-none');
    } */
}


function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  } 

function removeFormFields(event){
    let el = event.target;
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
}

// start processing of user dismissing the selected event
