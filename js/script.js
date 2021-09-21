window.addEventListener('DOMContentLoaded', () => {
  class Timer {
    constructor(minutes, seconds) {
      this.myDate = new Date().setMinutes(minutes, seconds);
      this.currentMin = Math.floor((this.myDate / (1000 * 60)) % 60);
      this.currentSec = Math.floor((this.myDate / 1000) % 60);
    };

    updateTime(handler) {
      const timeInterval = setInterval(() => {
        this.changeTime();
        handler();
      }, 1000);
    };

    changeTime() {
      if (this.currentSec === 0) {
        this.currentMin -= 1;
        this.currentSec = 60;
      }
      this.currentSec -= 1;
    };
  }

  const pageTimer = new Timer(30, 0);
  pageTimer.updateTime(updateUI);

  function getDate() {
    const userTimerBlock = document.querySelector('.update__timer');
    const data = userTimerBlock.dataset.time;
    if (data) {
      [newMinutes, newSeconds] = data.split(':');
      pageTimer.currentMin = +newMinutes;
      pageTimer.currentSec = +newSeconds;
    }
  }
  getDate();

  function updateUI() {
    const userMinutes = document.querySelector('.timer__minutes');
    const userSeconds = document.querySelector('.timer__seconds');

    userMinutes.innerText = getZero(pageTimer.currentMin);
    userSeconds.innerText = getZero(pageTimer.currentSec);

    if (pageTimer.currentMin === 0 && pageTimer.currentSec === 0) {
      reloadPage();
    }

    const reloadButton = document.querySelector('.update__button');
    reloadButton.addEventListener('click', () => reloadPage());
  }

  function reloadPage() {
    window.location.reload();
  }

  function getZero (number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    }
    return number;
  }
  
});