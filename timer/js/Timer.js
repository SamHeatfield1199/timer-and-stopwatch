export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part-minutes"),
      seconds: root.querySelector(".timer__part-seconds"),
      stopStart: root.querySelector(".timer__btn-controls"),
      reset: root.querySelector(".timer__btn-reset"),
    };

    console.log(this.el);

    this.interval = null;
    this.remainingSec = 90;
    
    this.el.stopStart.addEventListener("click", () => {
        if(this.interval === null){
            this.start();
            document.getElementsByClassName('outer-circle')[0].style= " background: radial-gradient(43.34% 55.31% at 93.34% 44.69%, #000000 0%, #910a0a 100% )";
        }else{
          document.getElementsByClassName('outer-circle')[0].style= " background: radial-gradient(43.34% 55.31% at 93.34% 44.69%, #000000 0%, #09A65A 100% )";
            this.stop()
        }
      
    });
    this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:")
        if(inputMinutes <60 ){
            this.stop()
            this.remainingSec = inputMinutes*60;
            this.updateInterfaceTime()
        }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSec / 60);
    const seconds = this.remainingSec % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.stopStart.innerHTML = `<span class="timer__btn-control">start</span>`;
   
    } else {
      this.el.stopStart.innerHTML = `<span class="timer__btn-control">stop</span>`;
    }
  }

  start(){
      if(this.remainingSec === 0) return;

      this.interval = setInterval(()=>{
        this.remainingSec--;
        this.updateInterfaceTime();

        if(this.remainingSec === 0){
            this.stop();
        }
      }, 1000)

      this.updateInterfaceControls()
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
        <div class="timer__time">
          <span class="timer__part-minutes"> 00 </span>
          <span class="timer__part">:</span>
          <span class="timer__part-seconds"> 00 </span>
        </div>

        <button type="button" class="timer__btn timer__btn-controls">
          <span class="timer__btn-control">start</span>
        </button>
        <button type="button" class="timer__btn timer__btn-reset">
          <img
            class="timer__btn-reset"
            src="/images/gear.svg"
            alt="reset"
          />
        </button>
        `;
  }
}
