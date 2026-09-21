document.addEventListener("DOMContentLoaded",()=>{
 const key="solaris-inquiry-v1"; let cart=[]; try{cart=JSON.parse(localStorage.getItem(key)||"[]")}catch{}
 const q=new URLSearchParams(location.search).get("item");
 const presets={"kit-5":"Solaris Home 5","kit-10":"Solaris Home 10","longi-lr7":"LONGi LR7-72HVH","deye-sg05-5":"Deye SUN-5K-SG05LP1-EU-AM2-P"};
 if(q&&presets[q]&&!cart.some(i=>i.id===q)){cart.push({id:q,name:presets[q]});localStorage.setItem(key,JSON.stringify(cart))}
 const list=document.getElementById("requestItems");
 const draw=()=>{list.innerHTML=cart.length?cart.map(i=>"<div class='spec-row'><span>"+i.name+"</span><strong>в заявке</strong></div>").join(""):"<p>Оборудование пока не выбрано. Можно описать задачу в комментарии.</p>"};
 draw();
 const form=document.getElementById("requestForm"),preview=document.getElementById("requestPreview"),pre=preview.querySelector("pre");
 form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const text=["Заявка SOLARIS","Имя: "+d.get("name"),"Контакт: "+d.get("phone"),"Объект: "+d.get("object"),"Оборудование: "+(cart.map(i=>i.name).join(", ")||"подобрать"),"Комментарий: "+(d.get("comment")||"—")].join("\n");pre.textContent=text;preview.hidden=false;});
 document.getElementById("copyRequest").addEventListener("click",async()=>{await navigator.clipboard.writeText(pre.textContent);document.getElementById("copyRequest").textContent="Скопировано ✓"});
});