/**
 * Created by skyler on 14-5-6.
 */

(function(){
    var arrBox=[];
    window.calendar=function (name){
        //var oUl=document.getElementsByClassName('date')[0];
        //var oLeft=document.getElementsByClassName('left')[0];
        //var oRight=document.getElementsByClassName('right')[0];
        //var oYear=document.getElementsByClassName('year')[0];
        var oInput=document.getElementsByName(name)[0];
        var iNow=0;

        //生成大框架 543
        var oBox=document.createElement('div');
        arrBox.push(oBox);
        oBox.className='box';
        document.body.appendChild(oBox);
        function addEvent(obj, sEvent,fn){
            if (obj.addEventListener){
                obj.addEventListener(sEvent,fn,false)
            }
            else{
                obj.attachEvent('on'+sEvent,fn)
            }

        }
        addEvent(document,'click',function(){
            oBox.style.display='none';
        });

        //生成上部月份
        var oDiv=document.createElement('div');
        var oSpanL=document.createElement('span');
        var oSpanM=document.createElement('span');
        var oSpanR=document.createElement('span');
        oSpanL.innerHTML='<';
        oSpanL.className='left';
        oSpanR.innerHTML='>';
        oSpanR.className='right';
        oSpanM.className='year';
        oDiv.appendChild(oSpanL);
        oDiv.appendChild(oSpanM);
        oDiv.appendChild(oSpanR);

        oBox.appendChild(oDiv);

        //生成星期
        var arr=['一','二','三','四','五','六','日'];
        var oUl=document.createElement('ul');
        oUl.className='week';
        for (var i=0; i<7; i++){
            var oLi=document.createElement('li');
            if (i==5 || i==6){
                oLi.className='weekend';
            }
            oLi.innerHTML=arr[i];
            oUl.appendChild(oLi);
        }
        oBox.appendChild(oUl);

        //生成日期

        var oUl1=document.createElement('ul');
        oUl1.className='date';

        function getPos(obj){
            var l=0;
            var t=0;
            while(obj){
                l+=obj.offsetLeft;
                t+=obj.offsetTop;
                obj=obj.offsetParent;
            }
            return {left:l, top:t};
        }

        oBox.style.top=getPos(oInput).top+oInput.offsetHeight+'px';
        oBox.style.left=getPos(oInput).left+'px';

        function monthDays(){
            var oDate=new Date();
            oDate.setMonth(oDate.getMonth()+iNow+1,1);
            oDate.setDate(0);
            return oDate.getDate();
        }

        function week(){
            var oDate= new Date();
            oDate.setMonth(oDate.getMonth()+iNow);
            oDate.setDate(1);
            return oDate.getDay();
        }

        function changeMonth(){
            oUl1.innerHTML='';
            var Days= monthDays();
            var weekDays= week();
            if (i=0){
                weekDays=7;
            }
            for (var i=0; i<weekDays-1; i++){

                var oLi1=document.createElement('li');
                oUl1.appendChild(oLi1);
            }
            for (var i=0; i<Days; i++){
                var oLi=document.createElement('li');
                oLi.innerHTML=i+1;
                oUl1.appendChild(oLi);
            }
            oBox.appendChild(oUl1);

            var aLi=oUl1.getElementsByTagName('li');
            //周末变红
            for (var i=0; i<aLi.length; i++){
                if (i%7==5 || i%7==6){
                    aLi[i].className='weekend';
                }
            }

            //过去变灰
            if (iNow<0){
                for (var i=0; i<aLi.length; i++){
                    aLi[i].className='pass';
                }
            }else if(iNow>0){

            }else{
                var oDate=new Date();
                var today=oDate.getDate();
                for( var i=0; i<aLi.length; i++){
                    if(parseInt(aLi[i].innerHTML)<today){
                        aLi[i].className='pass';
                    } else if (parseInt(aLi[i].innerHTML)==today){
                        aLi[i].className='today';
                    }
                }
            }

            var oDate=new Date();
            oDate.setMonth(oDate.getMonth()+iNow,1);
            var Y=oDate.getFullYear();
            var M=oDate.getMonth();
            oSpanM.innerHTML=Y+'年'+(M+1)+'月';

            var aLi=oUl1.getElementsByTagName('li');
            for (i=0; i<aLi.length; i++){
                aLi[i].onclick=function(){
                    //alert(1);
                    var oDate=new Date();
                    oDate.setMonth(oDate.getMonth()+iNow);
                    oInput.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
                    oBox.style.display='none';
                }
            }
        }

        changeMonth();

        oSpanL.onclick=function(ev){
            var oEvent =ev || event;
            iNow--;
            changeMonth();
            oEvent.stopPropagation();
        };

        oSpanR.onclick=function(ev){
            var oEvent =ev || event;
            iNow++;
            changeMonth();
            oEvent.stopPropagation();
        };

        oInput.onfocus=function(){
            for (var i=0; i<arrBox.length; i++){
                arrBox[i].style.display='none';
            }
            oBox.style.display='block';
        };

        oInput.onclick=function(ev){
            oEvent =ev || event;
            oEvent.cancelBubble=true;
        };

    };
    var oHead=document.getElementsByTagName('head')[0];
    var oLink=document.createElement('link');
    oLink.href='module_calendar/style.css';
    oLink.rel='stylesheet';

    oHead.appendChild(oLink);

})();
