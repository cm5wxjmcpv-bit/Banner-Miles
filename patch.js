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
    #startFromContracts{display:none !important;}
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
    }
  `;
  document.head.appendChild(style);

  const scene=document.getElementById('scene');
  const endButton=document.getElementById('endFlightButton');
  const contractCard=document.getElementById('activeContractCard');

  function syncFlightMotion(){
    if(!scene||!endButton)return;
    scene.classList.toggle('flying',!endButton.hidden);
  }

  function removeContractStartButton(){
    const button=document.getElementById('startFromContracts');
    if(button)button.remove();
  }

  if(endButton){
    new MutationObserver(syncFlightMotion).observe(endButton,{attributes:true,attributeFilter:['hidden']});
  }

  if(contractCard){
    new MutationObserver(removeContractStartButton).observe(contractCard,{childList:true,subtree:true});
  }

  syncFlightMotion();
  removeContractStartButton();
})();
