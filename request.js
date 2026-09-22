document.addEventListener("DOMContentLoaded",()=>{
 const key="solaris-inquiry-v1";let cart=[];try{cart=JSON.parse(localStorage.getItem(key)||"[]")}catch{}
 const q=new URLSearchParams(location.search).get("item");
 const presets={"kit-5":"Solaris Home 5","kit-10":"Solaris Home 10","kit-15":"Solaris Home 15","longi-lr7":"LONGi LR7-72HVH","deye-sg05-5":"Deye SUN-5K-SG05LP1-EU-AM2-P","deye-se-g5":"Deye SE-G5.1","deye-se-g10":"Deye SE-G10.2","deye-lp3-10":"Deye SUN-10K-SG05LP3-EU-SM2","deye-lp3-15":"Deye SUN-15K-SG05LP3-EU-SM2"};
 if(q&&presets[q]&&!cart.some(i=>i.id===q)){cart.push({id:q,name:presets[q]});localStorage.setItem(key,JSON.stringify(cart))}
 const list=document.getElementById("requestItems");
 const draw=()=>{list.innerHTML=cart.length?cart.map(i=>"<div class='spec-row'><span>"+i.name+"</span><strong>в заявке</strong></div>").join(""):"<p class='summary-empty'>Оборудование пока не выбрано — система будет подобрана по параметрам объекта.</p>"};
 draw();
 const form=document.getElementById("requestForm"),preview=document.getElementById("requestPreview"),pre=preview.querySelector("pre");
 form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);
 const project=Object.fromEntries(d.entries());localStorage.setItem("solaris-project-v1",JSON.stringify(project));const text=["Заявка SOLARIS","",
 "Имя: "+d.get("name"),
 "Контакт: "+d.get("phone"),
 "Регион: "+(d.get("region")||"—"),
 "Объект: "+d.get("object"),
 "Сеть: "+d.get("grid"),
 "Фазы: "+d.get("phase"),
 "Максимальная нагрузка: "+(d.get("peak")||"—"),
 "Ночная нагрузка: "+(d.get("night")||"—"),
 "Желаемый резерв: "+d.get("backup"),
 "Кровля: "+d.get("roof"),
 "Оборудование: "+(cart.map(i=>i.name).join(", ")||"подобрать"),
 "Комментарий: "+(d.get("comment")||"—")].join("\n");
 pre.textContent=text;preview.hidden=false;preview.scrollIntoView({behavior:"smooth",block:"nearest"});});
 document.getElementById("copyRequest").addEventListener("click",async()=>{await navigator.clipboard.writeText(pre.textContent);const b=document.getElementById("copyRequest");b.textContent="Скопировано ✓";setTimeout(()=>b.textContent="Скопировать заявку",1800)});
});