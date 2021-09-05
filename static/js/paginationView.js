window.onload = ()=>{
    //console.log('pagination is connected');
    paginationView();
};

function paginationView(){
    var tBodyClassArray = ['.itemPurchasedAccordianTbody','.itemSaleAccordianTbody'] ;//table body to be affected with pagnation
    tBodyClassArray.forEach(element=>{
        var tBodyElement = document.querySelector(element);
        if(tBodyElement!==null){
            var childCount = tBodyElement.childElementCount; //console.log(childCount);
           // var numberOfPages = numberOfPage(childCount);
            if(childCount>=1){
                addPagination(tBodyElement);
                createPageStructure(tBodyElement);
            }
        }
    });
}

function addPagination(tBodyElement){ //this decides if the pagination nav is be visible or not based on the row count i.e childCount
    var tableElement = tBodyElement.parentElement; // pagination nav is next to table and will always be the case for this logic to work.
    //document.querySelector(siblingElement.nextSibling).classList.remove('d-none');
    var nextSibling = tableElement.nextElementSibling; // capturing the pagination nav and displaying it 
    nextSibling.classList.remove('d-none');
}

function createPageStructure(tBodyElement){ //this creates a page like structure 
    var childElementCollection = tBodyElement.children //returns a collection of childs i.e <tr> in this case
    onLoadPageStructure(childElementCollection,tBodyElement);
    //console.log(childElement.item(0)); * way to access items within a collection 
   
}

function onLoadPageStructure(childElementCollection,tBodyElement){
    // collection frm 0-9 to be visible else invisible
    for(var i=0;i<1;i++){ // i should be < 10 in real.
        childElementCollection.item(i).classList.remove('d-none');
    }
    // previous button on pagination must be disabled 
    var tableElement = tBodyElement.parentElement;
    var nextSibling = tableElement.nextElementSibling;
    //selecting the button with class previous to disable it 
    nextSibling.querySelector('.previous').setAttribute('disabled',true);
    nextSibling.querySelector('.previous').classList.add('text-muted');
    nextSibling.querySelector('.activePage').classList.add('bg-secondary','text-white');

}

function changeTablePage(event,tableBody){ //onclick event handler of paginationNav 
    // first connect  the previous button and page 1 button of pagination Nav with changePage function by default it is nt present.
    var eventElement = event.target;
    var parentElement = eventElement.parentElement.parentElement;
    var tableBodyClassName ;
    //console.log(parentElement); 
    if(parentElement.classList.contains('purchase')){
        parentElement.querySelector('.previous').setAttribute('onclick','changeTablePage(event,"itemPurchasedAccordianTbody")');
        parentElement.querySelector('.pageOne').setAttribute('onclick','changeTablePage(event,"itemPurchasedAccordianTbody")');
    }else{
        parentElement.querySelector('.previous').setAttribute('onclick','changeTablePage(event,"itemSaleAccordianTbody")');
        parentElement.querySelector('.pageOne').setAttribute('onclick','changeTablePage(event,"itemSaleAccordianTbody")');
    }
    
    parentElement.querySelector('.previous').removeAttribute('disabled');
    parentElement.querySelector('.previous').classList.remove('text-muted');
    
    parentElement.querySelector('.activePage').classList.remove('bg-secondary','text-white','activePage');
    eventElement.classList.add('bg-secondary','text-white','activePage');
    var numOfPage = numberOfPage(tableBody);//tableBody is the selector of the table tBody class name passed on click event
    //console.log(numOfPage);
    changePageNumber(eventElement,numOfPage);
}

function numberOfPage(tableBody){
    var numOfRows = document.querySelector(`.${tableBody}`).childElementCount;
    return Math.ceil(numOfRows/1);
}

function changePageNumber(eventElement,numOfPage){
    //console.log(eventElement);
    var pageInputValue = eventElement.parentElement.parentElement.parentElement.querySelector('input');
    if(eventElement.classList.contains('next')){
        if(pageInputValue.value===numOfPage.toString()){
            return;
        }else{
        pageInputValue.value =  (parseInt(pageInputValue.value)+1).toString();}
    }
    if(eventElement.classList.contains('pageOne')){
        pageInputValue.value = "1";
    }
    if(eventElement.classList.contains('pageTwo')){
        pageInputValue.value = "2";
    }
    if(eventElement.classList.contains('pageThree')){
        pageInputValue.value = "3";
    }
    if(eventElement.classList.contains('previous')){
        if(pageInputValue.value==="1"){
            return;
        }else{
        pageInputValue.value =  (parseInt(pageInputValue.value)-1).toString();}
    }
}