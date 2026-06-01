/ MM Travel Movement – main.js
(function(){
    'use strict';

   // Navbar scroll effect
   var navbar=document.getElementById('navbar');
    if(navbar){
          window.addEventListener('scroll',function(){
                  if(window.scrollY>50){navbar.classList.add('scrolled');}else{navbar.classList.remove('scrolled');}
          });
    }

   // Hamburger menu
   var hamburger=document.getElementById('hamburger');
    var navMenu=document.getElementById('nav-menu');
    if(hamburger&&navMenu){
          hamburger.addEventListener('click',function(){
                  navMenu.classList.toggle('open');
                  hamburger.setAttribute('aria-expanded',navMenu.classList.contains('open'));
          });
          // Close on link click
      navMenu.querySelectorAll('a').forEach(function(link){
              link.addEventListener('click',function(){navMenu.classList.remove('open');});
      });
    }

   // Back to top
   var btn=document.getElementById('backToTop');
    if(btn){
          window.addEventListener('scroll',function(){
                  if(window.scrollY>400){btn.classList.add('visible');}else{btn.classList.remove('visible');}
          });
          btn.addEventListener('click',function(e){
                  e.preventDefault();
                  window.scrollTo({top:0,behavior:'smooth'});
          });
    }

   // Hide hero placeholder if real photo loads
   document.querySelectorAll('.hero-photo').forEach(function(img){
         if(img.complete&&img.naturalWidth>0){
                 var ph=img.parentElement.querySelector('.hero-photo-placeholder');
                 if(ph)ph.style.display='none';
         }
         img.addEventListener('load',function(){
                 var ph=img.parentElement.querySelector('.hero-photo-placeholder');
                 if(ph)ph.style.display='none';
         });
   });

   document.querySelectorAll('.meet-photo').forEach(function(img){
         if(img.complete&&img.naturalWidth>0){
                 var ph=img.parentElement.querySelector('.meet-photo-placeholder');
                 if(ph)ph.style.display='none';
         }
         img.addEventListener('load',function(){
                 var ph=img.parentElement.querySelector('.meet-photo-placeholder');
                 if(ph)ph.style.display='none';
         });
   });

})();
