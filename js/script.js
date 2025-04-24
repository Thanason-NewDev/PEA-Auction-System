const inputs = document.querySelectorAll('.otp-input');
    const nextBtn = document.getElementById('nextLink');
    const icon = document.getElementById('statusIcon');
    const timerDisplay = document.getElementById('timer');
  
    let countdown; // ต้องย้ายตัวแปรออกมาเพื่อให้สามารถ clear ได้จาก function อื่น
  
    function checkOTP() {
      const allFilled = [...inputs].every(input => input.value.trim() !== '');
      nextBtn.classList.toggle('active', allFilled);
      icon.src = allFilled ? '../img/iconcorrect.png' : '../img/iconwarning.png';
  
      // ถ้าใส่ครบแล้ว ให้หยุดตัวจับเวลา
      if (allFilled) {
        clearInterval(countdown);
      }
    }
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.length === 1) {
          const next = input.nextElementSibling;
          if (next && next.classList.contains('otp-input')) {
            next.focus();
          }
        }
        checkOTP();
      });
    });
  
    // เริ่มจับเวลา 5 นาที
    let timeLeft = 5 * 60;
    countdown = setInterval(() => {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const seconds = String(timeLeft % 60).padStart(2, '0');
      timerDisplay.textContent = `${minutes}:${seconds}`;
      timeLeft--;
  
      if (timeLeft < 0) {
        clearInterval(countdown);
        const allFilled = [...inputs].every(input => input.value.trim() !== '');
        if (!allFilled) {
          alert('หมดเวลา กรุณาขอ OTP ใหม่');
          window.location.href = "../html/login.html";
        }
      }
    }, 1000);