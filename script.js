window.addEventListener('DOMContentLoaded', () => {

  function resetSquare() {
    square.style.transition = 'none';
    square.style.transform = 'translateX(0)';
    square.style.opacity = '1';
    square.style.bottom = '100px';
    void square.offsetWidth;
    square.style.transition = 'bottom 1s ease-in-out, opacity 0.8s ease';
  }

  // 🔊 sounds
  const fireSound = new Audio('firetruck.m4a');
  const garbageSound = new Audio('garbagetruck.m4a');
  const dozerSound = new Audio('bulldozer.m4a');
  [fireSound, garbageSound, dozerSound].forEach(a => a.preload = 'auto');
  fireSound.loop = true;

  // 🔥 elements
  const fire = document.getElementById('fire');
  const smoke = document.getElementById('smoke');
  const square = document.getElementById('square');
  const firetruck = document.getElementById('firetruck');
  const garbageTruck = document.getElementById('garbageTruck');
  const garbageArm = garbageTruck.querySelector('.garbage-arm');
  const bulldozer = document.getElementById('bulldozer');

  /* 🚒 Firetruck */
  firetruck.addEventListener('click', () => {
    resetSquare();
    const active = firetruck.classList.toggle('active');
    if (active) {
      fireSound.currentTime = 0;
      fireSound.play().catch(() => { });
      fire.classList.add('active');
      square.style.background = '#f4c93dff';
      firetruck.style.transform = 'translateX(43vw)';
      setTimeout(() => {
        if (fire.classList.contains('active')) {
          const spray = document.createElement('div');
          spray.classList.add('water-spray');
          firetruck.appendChild(spray);
          setTimeout(() => spray.remove(), 1000);
          fire.classList.remove('active');
          square.style.background = '#196f3d';
          smoke.classList.add('active');
          setTimeout(() => smoke.classList.remove('active'), 2000);
        }
      }, 3500);
      setTimeout(() => {
        firetruck.classList.remove('active');
        firetruck.style.transition = 'transform 2s linear';
        firetruck.style.transform = 'translateX(0)';
        fireSound.pause();
        fireSound.currentTime = 0;
      }, 4500);
    } else {
      fireSound.pause();
      fireSound.currentTime = 0;
      firetruck.style.transform = 'translateX(0)';
      fire.classList.remove('active');
      square.style.background = '#45b39d';
    }
  });

  /* ---------------------------------
     🚛 Garbage Truck Logic — plays full sound clip
  ---------------------------------- */
  garbageTruck.addEventListener('click', () => {

    // Start driving smoothly toward the can
    garbageTruck.style.transition = 'transform 2s linear';
    garbageTruck.style.transform = 'translateX(63vw)';

    // Wait for it to reach the can (2s)
    setTimeout(() => {

      // Pause truck movement by removing transition
      garbageTruck.style.transition = 'none';
      void garbageTruck.offsetWidth;

      // Little pause before lifting
      setTimeout(() => {

        // Play ENTIRE garbage sound clip (no early stop!)
        garbageSound.currentTime = 0;
        garbageSound.play().catch(() => console.log("Garbage sound blocked until user interacts."));

        // Lift animation
        square.style.transition = 'bottom 1s ease-in-out, opacity 0.8s ease';
        square.style.bottom = '160px';
        square.style.opacity = '0.8';
        square.style.background = '#45b39d';
        garbageArm.style.transform = 'rotate(-90deg)';

        // Hold can, then lower
        setTimeout(() => {

          garbageArm.style.transform = 'rotate(0deg)';
          square.style.bottom = '100px';
          square.style.opacity = '1';
          square.style.background = '#babcbbff';

          // Drive home smoothly
          setTimeout(() => {
            garbageTruck.style.transition = 'transform 2s linear';
            garbageTruck.style.transform = 'translateX(0)';
          }, 800);

        }, 1000);

      }, 500);

    }, 2000);
  });


  /* 🚜 Bulldozer */
  bulldozer.addEventListener('click', () => {
    resetSquare();
    dozerSound.currentTime = 0;
    dozerSound.play().catch(() => console.warn('Sound blocked until gesture'));
    bulldozer.classList.add('active');
    bulldozer.style.transition = 'transform 3s linear';
    bulldozer.style.transform = 'translateX(45vw)';
    setTimeout(() => {
      square.style.transition = 'transform 1.5s ease-out, opacity 1.5s ease';
      square.style.transform = 'translateX(20vw)';
      square.style.opacity = '0.5';
    }, 2200);
    setTimeout(() => {
      bulldozer.classList.remove('active');
      bulldozer.style.transform = 'translateX(0)';
      dozerSound.pause();
      dozerSound.currentTime = 0;
    }, 4500);
  });
});
