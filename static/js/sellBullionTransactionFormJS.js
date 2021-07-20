window.onload = function(){
    console.log('sell transaction js connect');
}



function selectedKachiItem(event){
   var eventElement = event.target; //console.log(eventElement);
   //console.log(eventElement.tagName);
   if(eventElement.tagName==='LI'){
   document.querySelector(`#${eventElement.id}`).classList.remove('list-group-item-light');
   document.querySelector(`#${eventElement.id}`).classList.add('list-group-item-primary');
   var r = eventElement.querySelector('.tunchNumSpan').innerHTML;
   //console.log(r);
   addRemoveButton(eventElement);
   addFineWeightOutput(eventElement);
   }else if(eventElement.tagName==='SPAN'){alert('select again')

   }else{return;}

}

function addRemoveButton(eventElement){
    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Remove'));
    button.classList.add('btn','btn-sm','btn-danger','my-1','p-2',eventElement.id);
    button.setAttribute('data-id',eventElement.id);
    button.setAttribute('onclick','removeKachiData(event)');
    document.querySelector(`#${eventElement.id}`).appendChild(button);
}

function addFineWeightOutput(eventElement){

}

function createKachiTable(){

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

}