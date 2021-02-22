console.log("Back-end code for admin");
$(document).ready(function(){
    var pc = $(".page-content").children();
    var lst = [];
    for (var i=0; i<pc.length; i++){
        if(pc[i].nodeName === "SCRIPT"){
            lst.push(pc[i].attributes.src.value);
        }
    }
    flag = 0
    for (var x=0; x<lst.length; x++){
        if(lst[x].includes('firebaseapp')){
            console.log('Hosted from Firebaseapp');
            flag = 1;
        }
    }
    if(flag==0){
        console.log('Hosted from Arcadier');
    }
});

// Write you admin side backend code here

