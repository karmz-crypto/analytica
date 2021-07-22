window.onload = function(){
    console.log('sell transaction js connect');
}

function sellBullionTypeFunc(){
    
    var bullionType = document.querySelector('#sellBullionType').value;
    if(bullionType==='kachi'){
        document.querySelector('.sellKachiInputDiv').classList.remove('d-none');
    }else{
        document.querySelector('.sellKachiInputDiv').classList.add('d-none');
    }
    if(bullionType==='choursa'){
        chcekForKachiData();
    }

}

function selectedKachiItem(event){
   var eventElement = event.target; //console.log(eventElement);
   //console.log(eventElement.tagName);
   if(eventElement.tagName==='LI'){
   document.querySelector(`#${eventElement.id}`).classList.remove('list-group-item-light');
   document.querySelector(`#${eventElement.id}`).classList.add('list-group-item-primary');
   tableRowId = `row${eventElement.id}`; //this id will be of the row holding the kachi data
   var tunchNum = eventElement.querySelector('.tunchNumSpan').innerHTML;
   //console.log(r);
   var kachiWeight = eventElement.querySelector('.kachiWeightSpan').innerHTML;
   var kachiTunch = eventElement.querySelector('.kachiTunchSpan').innerHTML;
   addRemoveButton(eventElement);
   addFineWeightOutput(eventElement);
   createKachiTable(tunchNum,kachiWeight,kachiTunch,tableRowId);
   }else if(eventElement.tagName==='SPAN'){alert('select again')

   }else{return;}

}

function addRemoveButton(eventElement){
    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Remove'));
    button.classList.add('btn','btn-sm','btn-danger','my-1','p-2',eventElement.id);
    button.setAttribute('data-id',eventElement.id); //the data Attribute of data-id is the transactionId of the kachi 
    button.setAttribute('onclick','removeKachiData(event)');
    document.querySelector(`#${eventElement.id}`).appendChild(button);
}

function addFineWeightOutput(eventElement){

}

function createKachiTable(tunchNum,kachiWeight,kachiTunch,tableRowId){
    var rowElement = document.createElement('tr');
    rowElement.setAttribute('id',tableRowId);
    rowElement.classList.add('tableRowClass');//this class is to check if a row of data exist when switched frm kachi to some other option
    var tunchNumTh = document.createElement('th');//so that if it exist it will be deleted
    tunchNumTh.setAttribute('scope','row');
   // var tunchNumTd = document.createElement('td');
    var kachiWeightTd = document.createElement('td');
    var kachiTunchTd = document.createElement('td');
    var fineWeightTd = document.createElement('td');
    tunchNumTh.appendChild(document.createTextNode(tunchNum));
    kachiWeightTd.appendChild(document.createTextNode(kachiWeight));
    kachiTunchTd.appendChild(document.createTextNode(kachiTunch));
    var fineWeight = parseFloat(kachiWeight)*parseFloat(kachiTunch)/100;
    fineWeightTd.appendChild(document.createTextNode(fineWeight));
    rowElement.appendChild(tunchNumTh);
    rowElement.appendChild(kachiWeightTd);
    rowElement.appendChild(kachiTunchTd);
    rowElement.appendChild(fineWeightTd);
    document.querySelector('.tableBody').appendChild(rowElement);
}

function removeKachiData(event){ //remove removeButton and also remove the data from the main html page.
    event.target.setAttribute('id','tempId');
    var Id = document.querySelector('#tempId').dataset.id;
    //console.log(Id);
    //var dataElement = document.querySelector(event.target.tagName);
    //console.log(dataElement);
    document.querySelector(`#${Id}`).removeChild(document.querySelector('#tempId'));
    document.querySelector(`#${Id}`).classList.remove('list-group-item-primary');
    document.querySelector(`#${Id}`).classList.add('list-group-item-light');
    //now remove the data from main html page ..........
    var rowId = `row${Id}`;
    document.querySelector('.tableBody').removeChild(document.querySelector(`#${rowId}`)); 

}

function chcekForKachiData(){
    if(document.querySelector('.tableRowClass')!==null){ //console.log('test');
        document.querySelector('#modalButtonId').click();
        
    }else{
        //if no kachi data present then what to do 
    }
}

function kachiDataAction(action){
    //to del kachi data or to not change the option form kachi to other
    if(action==='remove'){
        document.querySelector('#closeButtonId').click();
        document.querySelectorAll('.tableRowClass').forEach(element=>{
            document.querySelector('.tableBody').removeChild(element);
        });
    }else{
        document.querySelector('#closeButtonId').click();
        document.querySelector('#sellBullionType').selectedIndex ='1';
        sellBullionTypeFunc();
    }
}