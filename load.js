let update;
let timerId;
let timerIdStart;
let autol=document.getElementById("autoload");

let dataName="dataMinus";



let massCalc=[];
let countRow=0;
let dtu=document.getElementById("point");
let timeAutoload=document.getElementById("only_num").value;
autol.innerText= timeAutoload;
clearInterval(timerId);

let flagStartServer=false;

fetch(url+"stateServer").then(response => response.json())
.then(res=>{
  if(res==false)
  {debugger
   fetch(url+"continue");
   timerIdStart=setInterval(()=>{
    fetch(url+"stateServer").then(response => response.json())
    .then(res=>{
      if(res==true)
      {
        debugger
        clearInterval(timerIdStart);
        start();
      }
    
    });

   },1000)
  }
  if(res==true)
  {
    start();
  }
});



let start=()=>
{
  fetch(url+dataName).then(response => response.json())
  .then(res=>{debugger
  
    bodyFeatch(res);
    let click=document.getElementsByClassName('sorted')[0];
    click.click();
    click.click();
  });
    
  
  
  timerId=setInterval(() => {
  
     if(autol.innerText==0)
     {
      fetch(url+dataName).then(response => response.json())
      .then(res=>{
        bodyFeatch(res);
      });
     }
     else
     {
      autol.innerText-=1;
     }
  
  }, 1000);
}




let bodyFeatch=(res)=>
{
        
  massCalc=[]
  dtu.innerHTML=0;
  
  let timeAutoload=document.getElementById("only_num").value;
  autol.innerText=timeAutoload;
  res.forEach(element => calc(element));
  
  massCalc.sort((a,b)=>{ return a.calcul[0] - b.calcul[0]});
  resort();
  updateTable();

  let e = $.Event('keyup');
  e.which = 17; 
  $('#search').trigger(e);

  let click=document.getElementsByClassName('sorted')[0];
  click.click();
  fetch(url+"datetime").then(response => response.json())
  .then(res=>
    {
      //debugger
      let dtu=document.getElementById("timeUpdate");
      dtu.innerHTML="Время обновления:"+res;

    });

}

let resort=()=>
{
  for(let i=0;i<massCalc.length;i++)
  {
    massCalc[i].Rate=massCalc[i].Rate.sort((a,b)=>{ return a - b});
  }
}

let calc=(elem)=>
{
  
  let rate=elem.Rate.sort().reverse();

  let mass=[
    calcRates(rate[0],rate[1]),
    calcRates(rate[0],rate[2]),
    calcRates(rate[0],rate[3]),
    calcRates(rate[0],rate[4])
  ];
  let r={
    name:elem.Name,
    Rate:rate,
    link:elem.url,
    calcul:mass
  }
  massCalc.push(r);
  
}

let calcRates=(r1,r2)=>
{
  if(r2==undefined)
    return 0;

  let m=(r1-r2)/r1*100;


  return m.toFixed(3);
}

let NanToZero=(element)=>
{
  if(element==undefined)
  return 0
  
  return parseFloat(element).toFixed(3)
}

let renderTable=(name,mass,calcrate,link)=>
{
  let massrev=mass;
  
  dtu.innerHTML++;
  let tableBody=document.getElementById("table");
  
  let newRow=document.createElement("tr");
  let newCellName=document.createElement("td");
        newCellName.innerText=name;
        newRow.appendChild(newCellName);

  let newCellC1=document.createElement("td");
        newCellC1.innerText=NanToZero(massrev[0]);
        newRow.appendChild(newCellC1);

  let newCellC2=document.createElement("td");
        newCellC2.innerText=NanToZero(massrev[1]);
        newRow.appendChild(newCellC2);

  let newCellC3=document.createElement("td");
        newCellC3.innerText=NanToZero(massrev[2]);
        newRow.appendChild(newCellC3);

let newCellC4=document.createElement("td");
        newCellC4.innerText=NanToZero(massrev[3]);
        newRow.appendChild(newCellC4);

let newCellC5=document.createElement("td");
        newCellC5.innerText=NanToZero(massrev[4]);
        newRow.appendChild(newCellC5);

        let newCellC6=document.createElement("td");
        newCellC6.innerText=calcRates(mass[0],mass[1]);
        newRow.appendChild(newCellC6);

        let newCellC7=document.createElement("td");
        newCellC7.innerText=calcRates(mass[0],mass[2]);
        newRow.appendChild(newCellC7);

        let newCellC8=document.createElement("td");
        newCellC8.innerText=calcRates(mass[0],mass[3]);
        newRow.appendChild(newCellC8);

        let newCellC9=document.createElement("td");
        newCellC9.innerText=calcRates(mass[0],mass[4]);
        newRow.appendChild(newCellC9);

        let newCellC10=document.createElement("td");
        let inner = document.createElement('a');
        inner.setAttribute('href', link);         // set attribute
                      // assign some text
        inner.textContent = 'bestchange';
        newCellC10.appendChild(inner);
        //newCellC10.innerText="<a href='"+link+"'>aa</a>";
        newRow.appendChild(newCellC10);

        if(!(newCellC6.innerText==0 || newCellC6.innerText==NaN  
          && newCellC7.innerText==0 || newCellC7.innerText==NaN 
          && newCellC8.innerText==0 || newCellC8.innerText==NaN 
          && newCellC9.innerText==0 || newCellC9.innerText==NaN ))
           {

            if(newCellC6.innerText<-1.25 || newCellC6.innerText==NaN &&
              newCellC7.innerText<-1.25 || newCellC7.innerText==NaN &&
              newCellC8.innerText<-1.25 || newCellC8.innerText==NaN &&
              newCellC9.innerText<-1.25 || newCellC9.innerText==NaN)
              {
                tableBody.appendChild(newRow);
              }

            
           }
  
  //debugger
  
}


let updateTable=()=>
{
let Parent = document.getElementById("table");
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}


massCalc.forEach(e=>{ renderTable(e.name,e.Rate,e.calcul,e.link)})
resortTable();
}

let resortTable=()=>
{
  let colResort=document.getElementsByClassName('sorted')[0]
                
  colResort.click();

  //debugger
}