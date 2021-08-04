//import {convertNumberToWords} from './numberToWordJS.js';


window.onload = function(){
    console.log('js connected');
   //bullionFunc();
};
/*
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

    if(document.querySelector('#transactionTypeSell').checked){
        document.querySelectorAll('.sellBullionForm').forEach(element=>{
            element.classList.remove('d-none');
        });
        document.querySelector('#sellBullionType').removeAttribute('disabled');
    }else{
        document.querySelectorAll('.sellBullionForm').forEach(element=>{
            element.classList.add('d-none');
        });
        document.querySelector('#sellBullionType').setAttribute('disabled',true);
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
        document.querySelector('.cashDebitWord').innerHTML = convertNumberToWords(document.querySelector('.bullionRateCheckTrue').value*document.querySelector('#buyBullionWeight').value/1000);

    }
    if(status==='false'){
        document.querySelector('.cashDebitInfo').innerHTML = document.querySelector('.bullionRateCheckFalse').value;
        transactionStatusFunc();
        document.querySelector('.cashDebitWord').innerHTML = convertNumberToWords(document.querySelector('.bullionRateCheckFalse').value);
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
        document.querySelector('.cashTransactionInfo').classList.add('d-none');
        document.querySelector('#buyBullionWeight').setAttribute('disabled',true);
        

    }else{ //console.log('flase');
        document.querySelector('.transactionCompleteForm').classList.add('d-none')
        document.querySelector('#bullionType').setAttribute('disabled',true);
        document.querySelector('.transactionCompletePureBullionForm').classList.add('d-none');
        document.querySelector('.cashTransactionInfo').remove('d-none');
        //document.querySelector('#bullionfineWeight').setAttribute('disabled',true);
        document.querySelector('#buyBullionWeight').removeAttribute('disabled',true);
    }

}

function bullionTypeFunc(){
    if(document.querySelector('#bullionType').value==='9999_bullion'&&document.querySelector('#bullionType').value!==""){
        document.querySelector('.transactionCompletePureBullionForm').classList.remove('d-none');
        document.querySelector('.fineBullionForm').classList.remove('d-none');
        document.querySelector('#fineBullionWeight').removeAttribute('disabled');
        document.querySelector('#bullionFineWeight').removeAttribute('disabled');
        //document.querySelector('#buyBullionWeight').setAttribute('disabled',true);
        document.querySelector('#bullionFineWeight').value= document.querySelector('#fineBullionWeight').value;
        completeCashTransactionInfo();
    }else{
        document.querySelector('.transactionCompletePureBullionForm').classList.add('d-none');
        document.querySelector('.fineBullionForm').classList.add('d-none');
        document.querySelector('#fineBullionWeight').setAttribute('disabled',true);
        //document.querySelector('#buyBullionWeight').removeAttribute('disabled',true);
       // document.querySelector('#bullionfineWeight').setAttribute('disabled',true);
    }

    if(document.querySelector('#bullionType').value==='choursa' && document.querySelector('#bullionType').value!==""){ //console.log("choursa");
        document.querySelectorAll('.choursaForm').forEach(element=>{element.classList.remove('d-none')});
        document.querySelector('#bullionChoursaWeight').removeAttribute('disabled');
        document.querySelector("#bullionChoursaTunch").removeAttribute('disabled')
        document.querySelector('#bullionFineWeight').removeAttribute('disabled');
        //document.querySelector('#buyBullionWeight').setAttribute('disabled',true);
        document.querySelector('#bullionFineWeight').value= document.querySelector('#bullionChoursaWeight').value*document.querySelector('#bullionChoursaTunch').value/100;
        document.querySelector('.transactionCompletePureBullionForm').classList.remove('d-none');
        completeCashTransactionInfo();
 
    }else{
        document.querySelectorAll('.choursaForm').forEach(element=>{element.classList.add('d-none')});
        document.querySelector("#bullionChoursaTunch").setAttribute('disabled',true);
        document.querySelector('#bullionChoursaWeight').setAttribute('disabled',true);
        //document.querySelector('#buyBullionWeight').removeAttribute('disabled',true);
        document.querySelector('.choursaForm').classList.add('d-none');
    }

    if(document.querySelector('#bullionType').value==='kachi'&&document.querySelector('#bullionType').value!==""){
        document.querySelectorAll('.kachiFormFields').forEach((element)=>{element.classList.remove('d-none')});
    }else{
        document.querySelectorAll('.kachiFormFields').forEach((element)=>{element.classList.add('d-none')});
    }

}

function completeCashTransactionInfo(){
    document.querySelector('.completeCashTransactionInfo').classList.remove('d-none');
    document.querySelector('.completeCashDebitInfo').innerHTML = document.querySelector('#bullionFineWeight').value*document.querySelector('.bullionRateCheckTrue').value/1000;
    var wordAmt = convertNumberToWords(document.querySelector('#bullionFineWeight').value*document.querySelector('.bullionRateCheckTrue').value/1000);
    document.querySelector('.completeCashDebitWord').innerHTML=wordAmt;
} */
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

/*
function addKachiFormFields(action){
    var len = document.querySelectorAll('.tableIndex').length;
    if(action!=='remove'){
    var delElement = document.querySelector('.removeFormFields').classList.remove('d-none');
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
    inputTunchNum.setAttribute('name',`tunchNumber`);
    inputTunchNum.classList.add('tunchNumClass');
    inputTunchNum.setAttribute('oninput','uniquenessOfKachi()'); // add
    var inputTunch = createElement('input');
    var inputWeight = createElement('input');
    inputTunch.setAttribute('type','number');
    inputTunch.setAttribute('step','any');
    inputTunch.setAttribute('name',`kachiTunch`);
    inputTunch.classList.add('kachiTunchClass');
    inputTunch.setAttribute('oninput','computeKachiFiness(".kachiWeightClass",".kachiTunchClass")');
    inputWeight.setAttribute('type','number');
    inputWeight.setAttribute('step','any');
    inputWeight.setAttribute('name',`kachiWeight`);
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
    console.log(table);
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
    document.querySelectorAll('.transactionCompletePureBullionForm').forEach((element)=>{
        element.classList.remove('d-none');

    });
    document.querySelector('#bullionFineWeight').removeAttribute('disabled');

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





function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


function sellBullionTypeFunc(){
    if(document.querySelector('#sellBullionType').value===""){
        document.querySelector('.errorMsgBullionType').classList.remove('d-none');
    }
} */


function bullionFunc1(event,action,inaction){
   displayAction(action);
   hideAction(inaction);

}

function displayAction(action){
    document.querySelectorAll(action).forEach(element=>{
        element.classList.remove('d-none');
        enableAction(element);
    });
}

function enableAction(element){
    let formFields = ['input','radio','checkbox','select'];
    formFields.map(fields=>{
        element.querySelectorAll(fields).forEach(field=>{
            field.removeAttribute('disabled');
        });
    });
}

function hideAction(inaction){
    document.querySelectorAll(inaction).forEach(element=>{
        element.classList.add('d-none');
        disableAction(element);
    });
}

function disableAction(element){
    let formFields = ['input','radio','checkbox','select'];
    formFields.map(fields=>{
        element.querySelectorAll(fields).forEach(field=>{
            field.setAttribute('disabled',true);
        });
    });
}

function calculateAmountEstimated(divClass,displayAt,dataExtractFrom){
    //it first finds the limitedElement that is the limited area of the html page to query the place where the amount will be displayed
    // and any amount in number will be displayed in words too ...
    //the arguments required 1. the limitedElement defined by the div class within which these elements exist 
    // 2. the value element 
    //disaplyAt is an array of class names where the calculated amt and number in words will be affixed
    var limitedElement = document.querySelector(divClass);
    //console.log(limitedElement.querySelector('input[]'))
    limitedElement.querySelector(displayAt[0]).innerHTML =  parseFloat(limitedElement.querySelector(`input[name=${dataExtractFrom[0]}]`).value)*parseFloat(limitedElement.querySelector(`input[name=${dataExtractFrom[1]}]`).value/1000);
    var wordString = convertNumberToWords(limitedElement.querySelector(displayAt[0]).innerHTML );
    limitedElement.querySelector(displayAt[1]).innerHTML = wordString;
}

function pendingAmount(divClass,displayAt,dataExtractFrom){
    //to claculate pending cash amount the logic should be estimated amount - cash Amount 
    // we are going to have a <span>estimated cash amount</span> from which we will extract data 
    //1. from where to extract data ---- one from span and other from input 
    //2. what operation to carry out
    //3.where to display the data .
    limitedElement = document.querySelector(divClass);
    limitedElement.querySelector(displayAt[0]).innerHTML= parseFloat(document.querySelector(dataExtractFrom[0]).innerHTML)-parseFloat(document.querySelector(`input[name=${dataExtractFrom[1]}]`).value);
    if(parseFloat(limitedElement.querySelector(displayAt[0]).innerHTML)<0){
        //limitedElement.querySelector(displayAt[1]).style.fontColor='green';
        var wordString = convertNumberToWords(Math.abs(limitedElement.querySelector(displayAt[0]).innerHTML));
        limitedElement.querySelector(displayAt[1]).innerHTML = `Amount In Excess : ${wordString}`;
    }else if(parseFloat(limitedElement.querySelector(displayAt[0]).innerHTML)>0){
        var wordString = convertNumberToWords(limitedElement.querySelector(displayAt[0]).innerHTML);
        limitedElement.querySelector(displayAt[1]).innerHTML = wordString;
    }else{
        var wordString = convertNumberToWords(limitedElement.querySelector(displayAt[0]).innerHTML);
    limitedElement.querySelector(displayAt[1]).innerHTML = wordString;}
}


function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function validateForm(){
    //validate the data entry ....
    //date data ... date must not be of future unless a special case suggest
    //input ... weight amount must not be in negative 
    // select must not be value=""
    //logic when we submit the form 
    // all the formfields without disabled attribute will be validated for its data entry i.e input and select only in my case.
    //input can be weight /name/amount 
    
    let errorElements = [];
    let formFields = ['input','select'];
    //console.log(document.querySelector('input'));
    formFields.map(fields=>{
        if(fields!=='select'){
            document.querySelectorAll(fields).forEach(field=>{
                if(field.getAttribute('disabled')){
                    return;
                }else{
                    if(field.getAttribute('type')==='radio'){ 
                        let attrName = field.getAttribute('name');
                        //console.log(attrName);
                        let element = document.querySelectorAll(`input[name=${attrName}]`);
                        for(var i=0;i<element.length;i++){
                            // console.log(element[i]);
                            
                                //errorElements.push(element[i]);
                            
                            if(i===element.length-1){return; //to make sure that loop is run 1 less than the length of element list
                            }else{
                                if(element[i].checked || element[i+1].checked){
                                    
                                    if(element[i+1].parentElement.parentElement.querySelector('.errorMsg')){
                                    
                                        restoreFormFields(element[i+1]);
                                        for(var i=0;i<element.length;i++){
                                            sliceArray(element[i],errorElements);
                                        }
                                    }else{
                                        return;
                                    }  
                                }else{
                                    errorElements.push(element[i]);
                                    errorElements.push(element[i+1]);
                                    
                                    
                                    if(element[i].parentElement.parentElement.querySelector('.errorMsg')!==null){
                                        return;
                                    }else{
                                    element[i+1].parentElement.parentElement.appendChild(createElementFunc('li','*one of the options must be selected'));
                                    decorateErrorFormFields(element[i+1]);
                                    

                                
                                    //console.log(element[i+1].parentElement.parentElement);
                                    }
                                }
                            } 
                        }
                    }else if(field.getAttribute('type')==='checkbox'){

                    }else if(field.getAttribute('type')==='number'){
                        if(field.getAttribute('aria-type')){
                            if(field.getAttribute('aria-type')==='amount'||field.getAttribute('aria-type')==='weight'){
                                if(field.value < 0 || field.value === '-0'){
                                    errorElements.push(field);
                                    
                                    //field.appendChild(createElementFunc('li'));
                                    if(field.parentElement.parentElement.querySelector('.errorMsg')){
                                        return;
                                    }else{
                                        field.parentElement.parentElement.appendChild(createElementFunc('li','*negative value is not accepted'));
                                        decorateErrorFormFields(field);
                                        //document.querySelector('.submitButton').setAttribute('disabled',true);//disable submit
                                        
                                    }
                                   
                                       
                                }else{
                                    restoreFormFields(field);
                                    sliceArray(field,errorElements);
                                    document.querySelector('.submitButton').removeAttribute('disabled');// enable submit
                                }
                            }
                        }

                    }else if(field.getAttribute('type')==='text'){
                        var regex = [a-zA-Z][a-zA-Z ]+[a-zA-Z]*$;
                        var isValid = regex.test(field.value);
                        if(isValid){
                            //if true then valid match
                            restoreFormFields(field);
                            sliceArray(field,errorElements);
                            document.querySelector('.submitButton').removeAttribute('disabled');// enable submit
                        }else{
                            //else if match is not valid
                            if(field.parentElement.parentElement.querySelector('.errorMsg')){
                                return;
                            }else{
                                field.parentElement.parentElement.appendChild(createElementFunc('li','*negative value is not accepted'));
                                decorateErrorFormFields(field);
                                errorElements.push(field);
                                //document.querySelector('.submitButton').setAttribute('disabled',true);//disable submit
                                
                            }
                        }
                        
                    }else{return;}
                    
                }
            });


        }else{//for fields select

            document.querySelectorAll(fields).forEach(field=>{
                if(field.getAttribute('disabled')){
                    return;
                }else{
                    if(field.value!==""){
                        //if values of the field is acceptable
                        restoreFormFields(field);
                        sliceArray(field,errorElements);
                        //document.querySelector('.submitButton').removeAttribute('disabled');// enable submit
    
                    }else{
                        // if the field value is not acceptable
                        if(field.parentElement.parentElement.querySelector('.errorMsg')){
                            return;
                        }else{
                            field.parentElement.parentElement.appendChild(createElementFunc('li','*select valid option'));
                            decorateErrorFormFields(field);
                            errorElements.push(field);
                            
                           // document.querySelector('.submitButton').setAttribute('disabled',true);//disable submit
                            
                        }
    
                    }
                }
                
            });
            
        }
    });

   
    setOnClickValidation(errorElements);
    if(errorElements.length!==0){
        return;
    }else{
        
        document.querySelector('.submitButton').setAttribute('type','submit');
    
    }
}

function setOnClickValidation(errorElements){
    errorElements.map(element=>{
        if(element.type==='radio'||element.type==='checkbox'){
            element.setAttribute('onclick','validateForm()');
        }else if(element.type==='number'|| element.type==='text'){
            element.setAttribute('onkeyup','validateForm()');
        }
        
    });
}

function sliceArray(element,arrayList){ // this function is to remove the element when error is corrected 
    let indexElement = arrayList.indexOf(element);//arrayList is a variable holding the array of elements that are error
    arrayList.slice(indexElement,1);
}


function decorateErrorFormFields(element){
    element.parentElement.parentElement.classList.add('border-1','border-danger','border','shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');
   
}

function restoreFormFields(element){ // this function will restore the form fields once the error is corrected 
    
    element.parentElement.parentElement.classList.remove('border-1','border-danger','border','shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');
    if(element.parentElement.parentElement.querySelector('.errorMsg')){
        element.parentElement.parentElement.removeChild(element.parentElement.parentElement.querySelector('.errorMsg'));
    }else{
        return;
    }
}

function createElementFunc(element,msg){ // this will ceate a list containing the error msg ...
    let liElement = document.createElement(element);
    liElement.classList.add('list-group','list-group-flush','text-danger','text-capitalize','errorMsg');
    liElement.appendChild(document.createTextNode(msg));
    return liElement;
}

function dateLimit(dateClass){
    document.querySelector(dateClass).max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}



