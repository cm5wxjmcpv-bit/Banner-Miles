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
    #startFromContracts{
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
    #playStartFlightPatch{
      flex:1;
      border:3px solid #173d59;
      border-radius:11px;
      background:#ffe078;
      color:#173d59;
      font-weight:800;
      font-size:14px;
      box-shadow:0 3px 0 #173d5930;
    }
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
      #playStartFlightPatch{font-size:12px;}
    }
  `;
  document.head.appendChild(style);

  const scene=document.getElementById('scene');
  const endButton=document.getElementById('endFlightButton');
  const contractValue=document.getElementById('contractValue');
  const actionRow=document.querySelector('.action-row');
  const builtInStart=document.getElementById('startFlightButton');

  function isFlying(){
    return !!endButton && !endButton.hidden;
  }

  function hasContract(){
    if(contractValue){
      const text=(contractValue.textContent||'').trim();
      return text && text.toLowerCase()!=='none';
    }
    return !!document.getElementById('startFromContracts');
  }

  function ensurePlayStartButton(){
    if(!actionRow)return;

    if(builtInStart){
      builtInStart.hidden=!(hasContract()&&!isFlying());
      if(hasContract()&&!isFlying()) builtInStart.style.display='block';
      else builtInStart.style.display='none';
      return;
    }

    let button=document.getElementById('playStartFlightPatch');
    if(!button){
      button=document.createElement('button');
      button.id='playStartFlightPatch';
      button.type='button';
      button.textContent='Start Flight';
      const openContracts=document.getElementById('openContractsButton');
      if(openContracts) actionRow.insertBefore(button,openContracts);
      else actionRow.appendChild(button);
      button.addEventListener('click',()=>{
        const internal=document.getElementById('startFromContracts');
        const original=document.getElementById('startFlightButton');
        if(original && original!==button){
          original.click();
          return;
        }
        if(internal) internal.click();
      });
    }
    button.hidden=!(hasContract()&&!isFlying());
  }

  function syncFlightMotion(){
    if(scene)scene.classList.toggle('flying',isFlying());
    ensurePlayStartButton();
  }

  const observer=new MutationObserver(syncFlightMotion);
  if(endButton)observer.observe(endButton,{attributes:true,attributeFilter:['hidden']});
  if(contractValue)observer.observe(contractValue,{childList:true,subtree:true,characterData:true});
  if(actionRow)observer.observe(actionRow,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  const contractCard=document.getElementById('activeContractCard');
  if(contractCard)observer.observe(contractCard,{childList:true,subtree:true});

  syncFlightMotion();
  setTimeout(syncFlightMotion,100);
  setTimeout(syncFlightMotion,500);
})();
