document.addEventListener("DOMContentLoaded",()=>{
 const projectKey="solaris-project-v1", cartKey="solaris-inquiry-v1";
 let project={},cart=[];try{project=JSON.parse(localStorage.getItem(projectKey)||"{}")}catch{}try{cart=JSON.parse(localStorage.getItem(cartKey)||"[]")}catch{}
 const client=document.getElementById("proposalClient");
 client.innerHTML="<strong>"+(project.name||"Клиент")+"</strong><span>"+[project.region,project.phone].filter(Boolean).join(" · ")+"</span>";
 const data=document.getElementById("proposalData");
 const fields=[["Объект",project.object],["Сеть",project.grid],["Фазы",project.phase],["Максимальная нагрузка",project.peak],["Ночная нагрузка",project.night],["Желаемый резерв",project.backup],["Кровля",project.roof],["Комментарий",project.comment]];
 data.innerHTML=fields.filter(x=>x[1]).map(x=>"<div><span>"+x[0]+"</span><strong>"+x[1]+"</strong></div>").join("");
 const items=document.getElementById("proposalItems"),empty=document.getElementById("proposalEmpty");
 if(cart.length){empty.style.display="none";items.innerHTML=cart.map((i,n)=>"<article><span>"+String(n+1).padStart(2,"0")+"</span><strong>"+i.name+"</strong><em>Цена по запросу</em></article>").join("")}
 document.getElementById("printProposal").addEventListener("click",()=>window.print());
});