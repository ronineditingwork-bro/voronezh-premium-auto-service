document.addEventListener("DOMContentLoaded",()=>{
 const filters=[...document.querySelectorAll(".filter")], cards=[...document.querySelectorAll(".product-card")];
 filters.forEach(btn=>btn.addEventListener("click",()=>{
   filters.forEach(b=>b.classList.remove("active")); btn.classList.add("active");
   const f=btn.dataset.filter; cards.forEach(c=>c.classList.toggle("hidden",f!=="all"&&c.dataset.category!==f));
 }));
 const key="solaris-inquiry-v1";
 const load=()=>{try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return[]}};
 const save=x=>localStorage.setItem(key,JSON.stringify(x));
 const drawer=document.querySelector(".cart-drawer"),backdrop=document.querySelector(".drawer-backdrop"),items=document.querySelector(".cart-items"),empty=document.querySelector(".cart-empty"),countEls=document.querySelectorAll(".cart-count");
 const render=()=>{
   const cart=load(); countEls.forEach(e=>e.textContent=cart.length);
   if(items) items.innerHTML=cart.map(i=>'<div class="cart-item"><strong>'+i.name+'</strong><button data-remove="'+i.id+'">Удалить</button><span>Цена по запросу</span></div>').join("");
   if(empty) empty.style.display=cart.length?"none":"block";
   document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{save(load().filter(i=>i.id!==b.dataset.remove));render();});
 };
 const open=()=>{drawer?.classList.add("open");backdrop?.classList.add("open");drawer?.setAttribute("aria-hidden","false")};
 const close=()=>{drawer?.classList.remove("open");backdrop?.classList.remove("open");drawer?.setAttribute("aria-hidden","true")};
 document.querySelectorAll(".cart-open").forEach(b=>b.addEventListener("click",open));
 document.querySelector(".cart-close")?.addEventListener("click",close); backdrop?.addEventListener("click",close);
 document.querySelector(".clear-cart")?.addEventListener("click",()=>{save([]);render()});
 document.querySelectorAll(".add-to-cart").forEach(b=>b.addEventListener("click",()=>{
   const cart=load(); if(!cart.some(i=>i.id===b.dataset.id)) cart.push({id:b.dataset.id,name:b.dataset.name}); save(cart);render();open();
 }));
 render();
});