function getStyle(box, mystyle){
    return getComputedStyle(box, null)[mystyle];
}





function moveDiv(box, speed, maxDistance, dir, callback){
    clearInterval(box.timer1)
    console.log("move函数被调用")
    var current = parseInt(getStyle(box, dir));
    if(current > maxDistance) speed = -speed
    
    
    box.timer1 = setInterval(function(){
        var newDistance = parseInt(getStyle(box, dir)) + speed

        if(speed < 0 && newDistance <= maxDistance || speed > 0 && newDistance >= maxDistance){
            box.style[dir] = maxDistance + 'px'
            clearInterval(box.timer1)
            callback && callback()
        }
        else box.style[dir] = newDistance + 'px'

    }, 30)
     
}



function toggleClass(obj, cls){
    var reg = new RegExp('\\b' + cls + '\\b')
    if(reg.test(obj.className)) obj.className = obj.className.replace(reg, '');
    else obj.className = obj.className + ' ' + cls;

}


function slowFold(obj, className){
    var begin = obj.offsetHeight;
    toggleClass(obj, className);
    var end = obj.offsetHeight;
   
    obj.style.height = begin + 'px';

    moveDiv(obj, 10, end, "height", function(){
        obj.style.height = "";
    })
}