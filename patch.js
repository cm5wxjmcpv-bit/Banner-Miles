(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    .rig{
      --rig-scale:1;
      animation:none !important;
      transform:scale(var(--rig-scale)) !important;
      transform-origin:left center !important;
    }
    .scene.flying .rig{
      animation:bannerMilesFlightBob 1.8s ease-in-out infinite !important;
    }
    #startFromContracts,
    #startFlightButton,
    #endFlightButton{
      position:absolute !important;
      width:1px !important;
      height:1px !important;
      opacity:0 !important;
      pointer-events:none !important;
      overflow:hidden !important;
      margin:0 !important;
      padding:0 !important;
      border:0 !important;
    }
    #flightControlPatch{
      position:absolute;
      left:50%;
      bottom:12px;
      transform:translateX(-50%);
      min-width:190px;
      padding:10px 18px;
      z-index:100;
      border:3px solid #173d59;
      border-radius:11px;
      background:#ffe078;
      color:#173d59;
      font-weight:800;
      font-size:14px;
      box-shadow:0 3px 0 #173d5930;
    }
    #flightControlPatch.end-flight{background:#ffb1a5;}
    @keyframes bannerMilesFlightBob{
      0%,100%{transform:translateY(0) scale(var(--rig-scale));}
      50%{transform:translateY(-4px) scale(var(--rig-scale));}
    }
    @media(max-width:760px){
      .rig{
        --rig-scale:.78;
        left:4% !important;
        top:34% !important;
      }
      #flightControlPatch{
        bottom:8px;
        min-width:150px;
        padding:8px 14px;
        font-size:12px;
      }
    }
  `;
  document.head.appendChild(style);

  const scene=document.getElementById('scene');
  if(!scene)return;

  const contractValue=document.getElementById('contractValue');
  const fuelText=document.getElementById('fuelText');
  const distanceValue=document.getElementById('distanceValue');

  function builtInStart(){return document.getElementById('startFlightButton');}
  function internalStart(){return document.getElementById('startFromContracts');}
  function builtInEnd(){return document.getElementById('endFlightButton');}

  function hasContract(){
    if(contractValue){
      const text=(contractValue.textContent||'').trim();
      if(text && text.toLowerCase()!=='none')return true;
    }
    return !!internalStart();
  }

  function isFlying(){
    const end=builtInEnd();
    if(end && !end.hidden)return true;
    const fuel=parseFloat((fuelText?.textContent||'100').replace('%',''));
    const distance=parseFloat(distanceValue?.textContent||'0');
    return Number.isFinite(fuel) && Number.isFinite(distance) && fuel<99.9 && distance>0;
  }

  let control=document.getElementById('flightControlPatch');
  if(!control){
    control=document.createElement('button');
    control.id='flightControlPatch';
    control.type='button';
    scene.appendChild(control);
    control.addEventListener('click',()=>{
      if(isFlying()){
        const end=builtInEnd();
        if(end)end.click();
        return;
      }
      const start=builtInStart();
      if(start){
        start.click();
        return;
      }
      const internal=internalStart();
      if(internal)internal.click();
    });
  }

  function sync(){
    const flying=isFlying();
    scene.classList.toggle('flying',flying);
    if(flying){
      control.hidden=false;
      control.textContent='End Flight';
      control.classList.add('end-flight');
    }else if(hasContract()){
      control.hidden=false;
      control.textContent='Start Flight';
      control.classList.remove('end-flight');
    }else{
      control.hidden=true;
      control.classList.remove('end-flight');
    }
  }

  const observer=new MutationObserver(sync);
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true});
  sync();
  setInterval(sync,250);
})();
