window.onload = function(){
    console.log('js connected')
    
}

function calculate(){
    

    var weight = document.getElementById('purchaseWeight').value;
    var tunch = document.getElementById('purchaseTunch').value;
    
    
    document.getElementById('purchaseSilver').value= Math.round(weight*tunch/100);
   
   document.getElementById('purchaseCash').value=Math.round((document.getElementById('purchaseWeight').value)*(document.getElementById('purchaseLabourInKg').value)/1000);
   

}