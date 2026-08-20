(()=>{
  'use strict';

  // When this file is loaded by the compressed game loader, intercept the
  // loader's document.write and inject this patch again into the real game.
  if(!document.getElementById('scene')){
    const originalWrite=Document.prototype.write;
    Document.prototype.write=function(...args){
      let html=args.map(String).join('');
      if(html.includes('</body>')&&!html.includes('patch.js?v=20260820-2')){
        html=html.replace('</body>','<script src="./patch.js?v=20260820-2"><\\/script></body>');
      }
      return originalWrite.call(this,html);
    };
    return;
  }

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
    scene.classList.toggle('flying',!endButton.hidden);
  }

  function removeContractStartButton(){
    const button=document.getElementById('startFromContracts');
    if(button)button.remove();
  }

  new MutationObserver(syncFlightMotion).observe(endButton,{
    attributes:true,
    attributeFilter:['hidden']
  });

  new MutationObserver(removeContractStartButton).observe(contractCard,{
    childList:true,
    subtree:true
  });

  syncFlightMotion();
  removeContractStartButton();
})();
