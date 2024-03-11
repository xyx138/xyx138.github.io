window.onload = function(){
    
    //记录点击的缩略图的下标
    var bigImgIndex = 0;

    // 获取路径导航的dom元素， 获取所需数据, 数据动态产生
    function navPathDataBind(){
        var navPath = document.querySelector("#wrapper #content .contentMain #navPath");

        var path = goodData.path;

        for(var i = 0; i < path.length; i++){
            if(i == path.length - 1){
                var aNode = document.createElement('a')
                aNode.innerHTML = path[i].title;
                navPath.append(aNode);
            }

            else{
                var aNode = document.createElement('a')
                aNode.href =path[i].url;    
                aNode.innerHTML = path[i].title;

                var iNode = document.createElement('i')
                iNode.innerHTML = '/'

                navPath.append(aNode);
                navPath.append(iNode);
            }
        }
    }

    navPathDataBind();
    
    // 放大镜的移入和移出
    function bigClassBind(){
        var smallPic = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic");

        var leftTop = document.querySelector("#wrapper #content .contentMain #center #left #leftTop")

        smallPic.onmouseenter = function(){
            var maskDiv = document.createElement('div')
            maskDiv.className = "mask"

            var BigPic = document.createElement('div')
            BigPic.id = "bigPic"

            var BigImg = document.createElement('img')
            
            var imagessrc = goodData.imagessrc;

            BigImg.src = imagessrc[bigImgIndex].b

            BigPic.appendChild(BigImg)


            smallPic.append(maskDiv)

            leftTop.append(BigPic)


            smallPic.onmousemove = function(event){
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;

                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                if(left < 0){
                    left = 0;
                }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if(top < 0){
                    top = 0;
                }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }

                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'

                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)  //计算蒙版和大图的移动比例

                console.log(scale)

                BigImg.style.left = - left / scale + 'px'
                BigImg.style.top = - top / scale + 'px'

            }



            smallPic.onmouseleave = function(){
                this.removeChild(maskDiv)

                leftTop.removeChild(BigPic)

            }



        }

        

    }
    bigClassBind();

    // 动态渲染缩略图

    function thumbnailData(){
        var ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul")


        var imagessrc = goodData.imagessrc;

        for(var i = 0; i < imagessrc.length; i++){
            var newLi = document.createElement('li')

            var newImg = document.createElement('img')

            newImg.src = imagessrc[i].s;

            newLi.appendChild(newImg)

            ul.appendChild(newLi)
        }   





    }
    thumbnailData();

    //点击缩略图切换
    function thumbnailClick(){
        var liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li")

        var smallPic_img = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic img")

        var imagessrc = goodData.imagessrc

        smallPic_img.src = imagessrc[0].s

        for(var i = 0; i < liNodes.length; i++){
            liNodes[i].index = i;
            liNodes[i].onclick = function(){
                var idx = this.index;
                bigImgIndex = idx;

                // 
                smallPic_img.src = goodData.imagessrc[idx].s
            }
        }

    }
    thumbnailClick();


    // 轮播图效果
    function thumbnailLeftRightClick(){
        var prev = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom .prev")
        var next = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom .next")

        var piclist = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist")

        var ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul")

        var liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li")

        var start = 0;
        var step = (liNodes[0].offsetWidth + 20) * 2;

        var endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

        prev.onclick = function(){
            start -= step;
            if(start < 0) start = 0;

            ul.style.left = -start + 'px';
        }

        next.onclick = function(){
            start += step;
            if(start > endPosition) start = endPosition;

            ul.style.left = -start + 'px';

        }


    }
    thumbnailLeftRightClick();

    //商品详情数据的动态渲染 
    function rightTopData(){
        var rightTop = document.querySelector("#wrapper #content .contentMain #center .right .rightTop")
        // console.log(rightTop)

        var goodsDetail = goodData.goodsDetail;
        console.log(goodsDetail)

        var s = `<h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceWrap">
            <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
                <p>
                    <span>累计评价</span>
                    <span>67000</span>
                </p>
            </div>
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>
                        ${goodsDetail.promoteSales.content}</span>                                            
                </p>

            </div>
        </div>
        <div class="support">
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
            <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
            <span>配&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;送</span>
            <p>${goodsDetail.address}</p>
        </div>`

        rightTop.innerHTML = s;

    }
    rightTopData();


    // 商品参数数据的动态渲染
    function rightBottomData(){
        var chooseWrap = document.querySelector("#wrapper #content .contentMain #center .right .rightBottom .chooseWrap")

        // console.log(chooseWrap)

        var crumbData = goodData.goodsDetail.crumbData;

        // console.log(crumbData)
        
        for(var i = 0; i < crumbData.length; i++){
            var dlNode = document.createElement("dl")

            var dtNode = document.createElement("dt")

            dtNode.innerHTML = crumbData[i].title

            dlNode.append(dtNode)
            for(var j = 0; j < crumbData[i].data.length; j++){
                var dd = document.createElement("dd")
                dd.innerHTML = crumbData[i].data[j].type;
                dd.setAttribute("price", crumbData[i].data[j].changePrice)
                // if(j == 0) dd.style.color = "red"
                dlNode.append(dd);
            }
            
            chooseWrap.append(dlNode);
        }


    }
    rightBottomData();   

    //点击商品颜色后的排他效果
    function clickddBind(){
        var dlArr = document.querySelectorAll("#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl")

        var arr = new Array(dlArr.length)

        var choose = document.querySelector("#wrapper #content .contentMain #center .right .rightBottom .choose")

        arr.fill(0)

        // console.log(arr)

        for(var i = 0; i < dlArr.length; i++){
            // 利用闭包保存i
            (function(x){ 
                var ddArr = dlArr[x].querySelectorAll("dd")
                for(var j = 0; j  < ddArr.length; j++){

                    ddArr[j].onclick = function(){
                        // console.log(x)
                     

                        

                        for(var t = 0; t < ddArr.length; t++){
                            ddArr[t].style.color = "#666"
                        }

                        this.style.color = "red"
                        
                        arr[x] = this;

                        changePriceBind(arr);


                           // 清空choose
                        choose.innerHTML = ""

                        arr.forEach(function(value, index){
                            if(value){
                                var markDiv = document.createElement("div")

                                markDiv.innerHTML = value.innerHTML

                                markDiv.className = "mark"
                                
                                var aNode = document.createElement("a")

                                aNode.setAttribute('index', index) //为a标签绑定一个下标，方便后续删除操纵

                                aNode.innerText = "X"

                                markDiv.appendChild(aNode)

                                choose.appendChild(markDiv)
                            }
                        })
                        
                        // 要在创建完a标签后，才能获取到a元素
                        var aNodes = document.querySelectorAll("#wrapper #content .contentMain #center .right .rightBottom .choose .mark a")

                        // console.log(aNodes);
        
                        for(var t = 0; t < aNodes.length; t++){
                            aNodes[t].onclick = function(){
                            
                                var idx = this.getAttribute('index')
        
                                arr[idx] = 0
                                // console.log(arr)
                                var ddlist = dlArr[idx].querySelectorAll("dd")
        
                                for(var k = 0; k < ddlist.length; k++){
                                    
                                    ddlist[k].style.color = "#666";
        
                                }
                                
                                ddlist[0].style.color = "red"

                                choose.removeChild(this.parentNode)
                                


                                changePriceBind(arr);
                            }
        
        
                        }


                    }
                }




            })(i)
        }
    }
    clickddBind();

    //封装价格变动函数
    function changePriceBind(arr){
        var oldPrice = document.querySelector("#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price > p")

        var price = goodData.goodsDetail.price

        for(var i = 0; i < arr.length; i++){
            if(arr[i]){
                var changePrice = Number(arr[i].getAttribute('price'))
                console.log(changePrice)

                price += changePrice;
            }
        }

        oldPrice.innerHTML = price

        var ips = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle input")

        var base_price = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p")

        // console.log(ips)

        var new_price = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i")

        base_price.innerHTML = "￥" + price

        var addprice = 0;

        for(var j = 0; j < ips.length; j++){
            if(ips[j].checked) addprice += Number(ips[j].value);
        }

        new_price.innerHTML = "￥" + (price + addprice)

    }

    //搭配价格变动
    function choosePrice(){
        var ips = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle input")

        var base_price = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p")

        // console.log(ips)

        var new_price = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i")

        var oldprice = base_price.innerHTML.slice(1)
        
        new_price.innerHTML = '￥' + Number(oldprice)

        // console.log(oldprice)

        for(var i = 0; i < ips.length; i++){

            
            ips[i].onclick = function(){

                var addprice = 0;
                for(var j = 0; j < ips.length; j++){
                    if(ips[j].checked) addprice += Number(ips[j].value);

                    // if(ips[j].checked) console.log("被点击")

                    new_price.innerHTML = "￥" + (Number(oldprice) + addprice)


                }
                
                
            }

        }

    }
    choosePrice();

    //点击选项卡切换
    function Tab(Btns, Conts){
        for(var i = 0; i < Btns.length; i++){
            Btns[i].index = i;
            Btns[i].onclick = function(){

                for(var j = 0; j < Btns.length; j++){
                    Btns[j].className = ""
                    Conts[Btns[j].index].className = ""
                }

                this.className = "active"
                Conts[this.index].className = "active"
            }
        }
    }

    //侧边栏切换

    function leftAsideTap(){
        var h4s = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4")

        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent > div")

        Tab(h4s, divs)

    }   

    leftAsideTap()


    // 

    function rightTap(){
        var lis = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li")

        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div")

        Tab(lis, divs)


    }

    rightTap()

    //侧边栏点击效果

    function asideClick(){
        var btns = document.querySelector("#wrapper .rightAside .btns")

        var content = document.querySelector("#wrapper .rightAside")

        var flag = true;

        btns.onclick = function(){
            
            if(flag){
                btns.className = "btns btnsOpen"
                content.className = "rightAside asideOpen"
            }
            else{
                btns.className = "btns btnsClose"
                content.className = "rightAside asideClose"
            }

            flag = !flag

        }
    }
    asideClick()

}