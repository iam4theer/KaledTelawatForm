// دکمه بررسی معلومات و باز کردن شرایط
document.getElementById('openTermsBtn').addEventListener('click', function() {
    // لیست تمام فیلدهای ورودی قبل از بخش شرایط
    const inputs = document.querySelectorAll('#registrationForm input:not([type="checkbox"]), #registrationForm select');
    let allValid = true;

    // بررسی تک تک فیلدها که خالی نباشند
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            allValid = false;
            input.reportValidity(); // نشان دادن خطای مرورگر روی همان فیلد خالی
        }
    });
    
    // اگر تمام فیلدهای معلومات اطفال پر بودند، کادر شرایط باز شود
    if (allValid) {
        document.getElementById('termsSection').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('termsSection').scrollIntoView({ behavior: 'smooth' });
    }
});

// ارسال نهایی اطلاعات فورم به دیتابیس (بدون تغییر)
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    submitBtn.innerText = "در حال ارسال اطلاعات...";
    submitBtn.disabled = true;

    const formData = new FormData(this);
    
    // لینک وب‌اپ گوگل اسکریپت خود را به جای متن زیر بگذارید
    const googleAppScriptURL = 'https://script.google.com/macros/s/AKfycbznUH5WdLT2nxsraXPycahMlSZXNRP14IysOxvsheuYR8KSO5tONxKkFFUyH3NE79ZZ/exec'; 

    fetch(googleAppScriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.result === 'success') {
            statusMessage.className = "status-message success";
            statusMessage.innerText = "🎉 ثبت‌نام شما با موفقیت انجام شد! اطلاعات به سیستم مدیریت صنف ارسال گردید.";
            
            document.getElementById('registrationForm').reset();
            document.getElementById('termsSection').style.display = 'none';
            document.getElementById('openTermsBtn').style.display = 'block';
        } else {
            statusMessage.className = "status-message error";
            statusMessage.innerText = "مشکلی رخ داد: " + data.error;
        }
    })
    .catch(error => {
        statusMessage.className = "status-message error";
        statusMessage.innerText = "خطا در اتصال! لطفاً اینترنت خود را چک کنید.";
    })
    .finally(() => {
        submitBtn.innerText = "ارسال و ثبت‌نام نهایی";
        submitBtn.disabled = false;
    });
});

