const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

btn.addEventListener("click", function () {
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide");
    video.pause();
  } else {
    btn.classList.remove("slide");
    video.play();
  }
});

// preloader
const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});





const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  
  links.classList.toggle("show-links");
});


(function(){
  let aP = [...document.querySelectorAll("#wrap p")],
      aFirstSpan = [...document.querySelectorAll("#wrap p span.first")],
      aSecondSpan = [...document.querySelectorAll("#wrap p span.second")],
      lastTimeArr = [];

  function getTimeArr(){
      let nowD = new Date();
      let HH = nowD.getHours(),
          MM = nowD.getMinutes(),
          SS = nowD.getSeconds();
      HH = HH<10?"0"+HH:HH+"";
      MM = MM<10?"0"+MM:MM+"";
      SS = SS<10?"0"+SS:SS+"";
    
      console.log( [...HH,...MM,...SS]);
      return [...HH,...MM,...SS];
  }

  function showTime(){
      let d = getTimeArr();
      lastTimeArr = d;
      aFirstSpan.forEach((ele,index)=>{
          ele.innerHTML = d[index];
      });
      return () => {
          let d = getTimeArr();
          d.forEach((value,index)=>{
          
              if( value === lastTimeArr[index] )return;
           
              aSecondSpan[index].innerHTML = d[index];
            
              aP[index].classList.add("tran");
           
              setTimeout(()=>{
                  aFirstSpan[index].innerHTML = d[index];
                  aP[index].classList.remove("tran");
              },500);
          });
          lastTimeArr = d;
      };
  }
  setInterval(showTime(),1000);
})();




var audio = document.getElementById("myAudio");
        var volumeIcon = document.getElementById("volumeIcon");
        
        function toggleMute() {
          if (audio.muted) {
            audio.muted = false;
            volumeIcon.className = 'fas fa-volume-up';
            audio.play().catch(error => {
              console.error('播放音频时出错：', error);
            });
          } else {
            audio.muted = true;
            volumeIcon.className = 'fas fa-volume-mute';
          }
        }
  
        function setVolume(value) {
          audio.volume = value;
     
          if (value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
          } else if (value < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
          } else {
            volumeIcon.className = 'fas fa-volume-up';
          }
        }
    











const contactLink = document.querySelector('.links-contact');

  // Define the click event handler
function handleClick(event) {
  let p = poputMove({
    title: "修改jjy",
    body: `
    <textarea id="uploadItemData" value=""></textarea>
    `,
   
  });
}
  
  
contactLink.addEventListener('click', handleClick);