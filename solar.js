document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const menu=document.querySelector(".menu-btn");
  if(menu){menu.addEventListener("click",()=>{
    const open=header.classList.toggle("open");
    menu.setAttribute("aria-expanded",String(open));
  })}
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>header.classList.remove("open")));

  const form=document.getElementById("systemForm");
  const rec=document.getElementById("recommendation");
  if(form&&rec){
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d=new FormData(form);
      const load=Number(d.get("load"));
      const backup=Number(d.get("backup"));
      const night=Number(d.get("night"));
      const grid=d.get("grid");

      let system=5;
      if(load>5) system=10;
      if(load>10) system=15;
      if(grid==="no" && system<10) system=10;

      let battery=Math.ceil(night*backup*1.25);
      if(battery<=5) battery=5;
      else if(battery<=10) battery=10;
      else if(battery<=15) battery=15;
      else battery=20;

      const note=grid==="yes"
        ?"При наличии сети можно начать с меньшего аккумулятора и расширить систему позже."
        :grid==="unstable"
        ?"Для частых отключений имеет смысл отдельно выделить резервную группу критичных нагрузок."
        :"Для автономного объекта требуется отдельная проверка зимней генерации и запаса энергии.";

      rec.innerHTML='<span class="rec-label">Предварительная рекомендация</span>'+
        '<strong>'+system+' кВт солнечной станции · аккумулятор ориентировочно '+battery+' кВт·ч</strong>'+
        '<small>'+note+' Финальный подбор зависит от фактического профиля потребления, региона, ориентации и затенения панелей.</small>';
    });
  }

  const power=document.getElementById("pvPower");
  const sun=document.getElementById("sunHours");
  const powerOut=document.getElementById("pvPowerOut");
  const sunOut=document.getElementById("sunHoursOut");
  const genOut=document.getElementById("generationOut");
  const updateCalc=()=>{
    const p=Number(power.value),h=Number(sun.value);
    powerOut.textContent=p+" кВт";
    sunOut.textContent=h.toLocaleString("ru-RU")+" ч";
    const generation=p*h*.85;
    genOut.textContent="≈ "+generation.toLocaleString("ru-RU",{maximumFractionDigits:1})+" кВт·ч / день";
  };
  if(power&&sun){power.addEventListener("input",updateCalc);sun.addEventListener("input",updateCalc);updateCalc();}
});