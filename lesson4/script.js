let inp = document.querySelector("input");
let btn1 = document.querySelector("#a");
let btn2 = document.querySelector("#b");
let btn3 = document.querySelector("#c");
let btn4 = document.querySelector("#d");
let btn5 = document.querySelector("#f");
let btn6 = document.querySelector("#j");
// let reg = /([A-Z])([a-z])/g;//g-global, i-registr
let p1 = document.querySelector("#a1");
let p2 = document.querySelector("#b2");
let p3 = document.querySelector("#c3");
let p4 = document.querySelector("#d4");
let p5 = document.querySelector("#f5");
let p6 = document.querySelector("#j6");

// *Три цифры после которых идет пробел
btn1.onclick = () => {
    let str = inp.value;
    p1.innerHTML = str.match(/(\d){3}\s/g);
    console.log(str.match(/(\d){3}\s/g));
}
// *@gmail или @mail 
btn2.onclick = () => {
    let str = inp.value;
    p2.innerHTML = str.match(/@(gmail|mail)/g);
    console.log(str.match(/@(gmail|mail)/g));
}

//*Число после которого идет + или - или или / потом другое число 
btn3.onclick = () => {
    let str = inp.value;
    
    // экранирование \ символа который не считывается 
    console.log(str.match(/(\d)(\*|(\/))(\d)/g));
}
//*Четыре буквы после которых идет восклицательный знак
btn4.onclick = () => {
    let str = inp.value;
    p4.innerHTML = str.match(/([A-za-s]){4}\!/g);
    console.log(str.match(/([A-za-s]){4}\!/g));
    
}



