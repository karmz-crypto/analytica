window.onload = function(){
    console.log('js connected');
   // manageLocalStore();
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
    if(document.querySelector('#bullionRateFalse').checked){
        document.querySelector('#transactionPending').removeAttribute('disabled');
        document.querySelector('#transactionPending').setAttribute('checked',true);
        document.querySelector('#transactionComplete').setAttribute('disabled',true);
    }else{
    document.querySelector('#transactionPending').removeAttribute('disabled');
    document.querySelector('#transactionComplete').removeAttribute('disabled');
    document.querySelector('#transactionPending').removeAttribute('checked');
    }
}

function transactionCompleteFunc(){
    if(document.querySelector('#transactionComplete').checked){
        //console.log('true');
        document.querySelector('.transactionCompleteForm').classList.remove('d-none');
        document.querySelector('#bullionType').removeAttribute('disabled');
        

    }else{ //console.log('flase');
        document.querySelector('.transactionCompleteForm').classList.add('d-none')
        document.querySelector('#bullionType').setAttribute('disabled',true);
        document.querySelector('.transactionCompletePureBullionForm').classList.add('d-none');
        //document.querySelector('#bullionfineWeight').setAttribute('disabled',true);
    }

}

function bullionTypeFunc(){
    if(document.querySelector('#bullionType').value==='9999_bullion'&&document.querySelector('#bullionType').value!==""){
        document.querySelector('.transactionCompletePureBullionForm').classList.remove('d-none');
        document.querySelector('#bullionFineWeight').removeAttribute('disabled');
        document.querySelector('#bullionFineWeight').value= document.querySelector('#buyBullionWeight').value;
    }else{
        document.querySelector('.transactionCompletePureBullionForm').classList.add('d-none');
       // document.querySelector('#bullionfineWeight').setAttribute('disabled',true);
    }

    if(document.querySelector('#bullionType').value==='choursa' && document.querySelector('#bullionType').value!==""){ console.log("choursa");
        document.querySelector('.choursaForm').classList.remove('d-none');
        document.querySelector("#bullionChoursaTunch").removeAttribute('disabled')
        document.querySelector('#bullionFineWeight').removeAttribute('disabled');
        document.querySelector('#bullionFineWeight').value= document.querySelector('#buyBullionWeight').value*document.querySelector('#bullionChoursaTunch').value/100;
        document.querySelector('.transactionCompletePureBullionForm').classList.remove('d-none');
 
    }else{
        document.querySelector('.choursaForm').classList.add('d-none');
        document.querySelector("#bullionChoursaTunch").setAttribute('disabled',true);
    }

    if(document.querySelector('#bullionType').value==='kachi'&&document.querySelector('#bullionType').value!==""){
        document.querySelectorAll('.kachiFormFields').forEach((element)=>{element.classList.remove('d-none')});
    }else{
        document.querySelectorAll('.kachiFormFields').forEach((element)=>{element.classList.add('d-none')});
    }

}
/*
function addKachiFormFields(){
    if(localStorage.getItem('FormState')!==null){
        var prevValue = parseInt(localStorage.getItem('FormState'));
        var newValue = document.querySelector('#totalNumberOfKachi').value;
        console.log(`prevValue: ${prevValue}`);
        console.log(`new value: ${newValue}`);
        addFormFields(newValue-prevValue);
        localStorage.setItem('FormState',`${newValue}`);
        }
        else{
        var numOfFormFields = document.querySelector('#totalNumberOfKachi').value;
        addFormFields(numOfFormFields);    
        localStorage.setItem('FormState',`${numOfFormFields}`);
    
    }

    

}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function manageLocalStore(){
    localStorage.removeItem('FormState');
}

function addFormFields(numberOfFields){
    if(numberOfFields<0){
        removeFormFields(-(numberOfFields));
    }
    else
    {
    for (var i=0;i<numberOfFields;i++){
        var spanElement = document.createElement('span');
    //console.log(spanElement);
    var divElement = document.createElement('div');
    var inputElement = document.createElement('input');
    //console.log(inputElement);
    divElement.appendChild(spanElement);
    divElement.appendChild(inputElement);
    //console.log(divElement);
    divElement.classList.add('input-group', 'mb-3');
    spanElement.classList.add('input-group-text');
    spanElement.setAttribute('id',`bullionTunchKachiSpan${i}`);
    var textNode = document.createTextNode(`Kachi Tunch ${i+1}`);
    spanElement.appendChild(textNode);
    setAttributes(inputElement,{"type":"number","required":"true", "step":"any", "class":"form-control bullionKachiTunch", "name":"bullionKachiTunch", "placeholder":"kachi Tunch (%)", "aria-label":"kachiTunch", "aria-describedby":`bullionKachiTunchSpan${i}`});
    var attchPoint = document.querySelector('.kachiFormFields');
    attchPoint.classList.add('border','rounded','p-2','mx-1');
    attchPoint.appendChild(divElement);
    }
    }
}

function removeFormFields(numberOfFields){
    console.log(numberOfFields);
    document.querySelector('.kachiFormFields').innerHTML="";
    addFormFields(parseInt(localStorage.getItem('FormState'))- numberOfFields);

}
*/

function addKachiFormFields(action){
    if(action!=='remove'){
    document.querySelector('.removeFormFields').classList.remove('d-none');
    var table = createElement('table');
    var tr1 = createElement('tr');
    var tunchNum = createElement('td');
    var th1 = createElement('th');
    var tunch = createElement('td');
    var weight = createElement('td');
    var th2 = createElement('th');
    var th3 = createElement('th');
    var tr2 = createElement('tr');
    var tr3 = createElement('tr');
   // var hr = createElement('hr');
    appendChild(table,tr1);
    appendChild(table,tr2);
    appendChild(table,tr3);
    appendChild(tr1,th1);
    appendChild(tr1,tunchNum);
    appendChild(tr2,th2);
    appendChild(tr2,weight);
    appendChild(tr3,th3);
    appendChild(tr3,tunch);
    //appendChild(document.querySelector('.kachiFormFields',hr));
    appendChild(document.querySelector('.kachiFormFields'),table);
    var inputTunchNum = createElement('input');
    inputTunchNum.setAttribute('type','text');
    inputTunchNum.setAttribute('name','tunchNumber[]');
    inputTunchNum.classList.add('tunchNumClass');
    inputTunchNum.setAttribute('oninput','uniquenessOfKachi()'); // add
    var inputTunch = createElement('input');
    var inputWeight = createElement('input');
    inputTunch.setAttribute('type','number');
    inputTunch.setAttribute('step','any');
    inputTunch.setAttribute('name','kachiTunch[]');
    inputTunch.classList.add('kachiTunchClass');
    inputTunch.setAttribute('oninput','computeKachiFiness(".kachiWeightClass",".kachiTunchClass")');
    inputWeight.setAttribute('type','number');
    inputWeight.setAttribute('step','any');
    inputWeight.setAttribute('name','kachiWeight[]');
    inputWeight.classList.add('kachiWeightClass');
    appendChild(tunchNum,inputTunchNum);
    appendChild(tunch,inputTunch);
    appendChild(weight,inputWeight);
    th1.appendChild(document.createTextNode('Tunch No:'));
    th2.appendChild(document.createTextNode('Weight(Grms) :'));
    th3.appendChild(document.createTextNode('Tunch(%) :'));
    table.style.width = '100%';
    table.style.fontSize ='small';
    table.classList.add('my-2','p-2','tableIndex');
    //computeKachiFiness('.kachiWeightClass','.kachiTunchClass');
    }else{ //console.log('in else');
        
        
        removeKachiFormFields('.tableIndex');
    }

    

    
}

function createElement(element){
    return document.createElement(element);
}

function appendChild(parent,child){
    return parent.appendChild(child);
}

function computeKachiFiness(weightClass,tunchClass){
    //check for unqueness of kachi entries..........

    //uniquenessOfKachi(); 
    document.querySelector('.transactionCompletePureBullionForm').classList.remove('d-none');
     var fineWeight = 0;
    

    var tunchElement = document.querySelectorAll(tunchClass);
    var weightElement = document.querySelectorAll(weightClass);
    for(var i=0;i<tunchElement.length;i++){
       fineWeight = fineWeight+(tunchElement[i].value*weightElement[i].value/100);
    }
    
    

    document.querySelector('#bullionFineWeight').value = parseInt(fineWeight);
}

function removeKachiFormFields(identifier){
    
    var element = document.querySelectorAll(identifier);
    for(var i=0;i<element.length;i++){
        if(i===element.length-1){
            document.querySelector('.kachiFormFields').removeChild(element[i]);
            //console.log(document.querySelector(identifier));
            if(document.querySelector(identifier)===null){
                document.querySelector('.removeFormFields').classList.add('d-none');
            }
        }
    } 
    uniquenessOfKachi();
}

function uniquenessOfKachi(){

    var tunchNumElement = document.querySelectorAll('.tunchNumClass');
    if(tunchNumElement.length!==1){
        for(var i=0;i<tunchNumElement.length;i++){ 
            for(var j=i+1;j<tunchNumElement.length;j++){ //console.log(`i:${i} and j:${j}`);
            console.log(`tunchNum${i} is ${tunchNumElement[i].value} and tunchNum${j} is ${tunchNumElement[j].value}`);
                if(tunchNumElement[i].value===tunchNumElement[j].value){// console.log('in if');
                    tunchNumElement[i].classList.add('text-danger','fw-bold');
                    tunchNumElement[j].classList.add('text-danger','fw-bold');
                    var liElement = createElement('li');
                    liElement.classList.add('list-group-item', 'list-group-item-danger','tunchNumMsg','p-2');
                    liElement.appendChild(document.createTextNode('Similar Tunch Number Not Permissible'));
                    appendChild(document.querySelector('.kachiFormFields'),liElement);
                    document.querySelector('.kachiFormFieldsAddBtn').setAttribute('disabled','true'); //console.log('if comp');
                    return;
                }else{
                    document.querySelectorAll('.tunchNumClass').forEach((element)=>{element.classList.remove('text-danger','fw-bold');});
                    document.querySelector('.kachiFormFieldsAddBtn').removeAttribute('disabled');
                    if(document.querySelector('.tunchNumMsg')!==null){
                    document.querySelector('.kachiFormFields').removeChild(document.querySelector('.tunchNumMsg'));
                    
                }
    
    
                }
            }
        }
    }else{
        document.querySelectorAll('.tunchNumClass').forEach((element)=>{element.classList.remove('text-danger','fw-bold');});
        document.querySelector('.kachiFormFieldsAddBtn').removeAttribute('disabled');
        if(document.querySelector('.tunchNumMsg')!==null){
        document.querySelector('.kachiFormFields').removeChild(document.querySelector('.tunchNumMsg'));
        
    }
    
}
}

function validateInputData(identifier,identity){


}

