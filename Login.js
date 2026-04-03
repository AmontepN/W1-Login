// กล่องสำหรับสลับโหมดเข้าสู่ระบบ (TOKEN / OTP)
const btnToken = document.getElementById("btn-token");
const btnOtp = document.getElementById("btn-otp");
const tokenBox = document.getElementById("token-box");

// สำหรับฟังก์ชันแสดง/ซ่อนรหัสผ่าน
const passwordInput = document.getElementById("password");
const toggleEyeBtn = document.getElementById("toggle-eye");
const eyeIconImg = document.getElementById("eye-icon-img");

// ปุ่มยืนยันการเข้าสู่ระบบและช่องกรอกข้อมูลทั้งหมด
const loginSubmitBtn = document.getElementById("login-submit-btn");
const usernameInput = document.getElementById("username");
const inputToken = document.getElementById("token");

// กำหนดการทำงานเมื่อผู้ใช้คลิกปุ่ม "TOKEN"
btnToken.addEventListener("click", function() {
    // แสดงกล่องกรอกรหัส Token
    tokenBox.style.display = "block"; 
    
    // อัปเดตสถานะปุ่ม (เพิ่มคลาส active ให้ TOKEN และลบออกจาก OTP)
    btnToken.classList.add("active");
    btnOtp.classList.remove("active");
});

// กำหนดการทำงานเมื่อผู้ใช้คลิกปุ่ม "OTP"
btnOtp.addEventListener("click", function() {
    // ซ่อนกล่องกรอกรหัส Token
    tokenBox.style.display = "none"; 
    
    // อัปเดตสถานะปุ่ม (เพิ่มคลาส active ให้ OTP และลบออกจาก TOKEN)
    btnOtp.classList.add("active");
    btnToken.classList.remove("active");
});

// กำหนดการทำงานเมื่อผู้ใช้คลิกที่ไอคอนรูปดวงตา
toggleEyeBtn.addEventListener("click", function() {
    
    // ตรวจสอบสถานะปัจจุบันของประเภทช่องกรอกข้อมูล
    if (passwordInput.type === "password") {
        // หากถูกซ่อนอยู่ ให้เปลี่ยนประเภทเป็น "text" เพื่อแสดงรหัสผ่าน
        passwordInput.type = "text";
        // เปลี่ยนรูปไอคอนเป็นสถานะ "ปิดตา"
        eyeIconImg.src = "../Image/eye-hide.png"; 
    } else {
        // หากกำลังแสดงผลอยู่ ให้เปลี่ยนประเภทกลับเป็น "password" เพื่อซ่อนรหัสผ่าน
        passwordInput.type = "password";
        // เปลี่ยนรูปไอคอนกลับเป็นสถานะ "เปิดตา"
        eyeIconImg.src = "../Image/eye-view.png";  
    }
});

// กำหนดการทำงานเมื่อผู้ใช้คลิกปุ่ม "Log in"
loginSubmitBtn.addEventListener("click", function(event) {
    
    // ระงับการทำงานเริ่มต้นของฟอร์ม (ป้องกันการรีเฟรชหน้าเว็บอัตโนมัติ)
    event.preventDefault(); 
    
    // ดึงค่าจากช่องกรอกข้อมูลและตัดช่องว่าง (Whitespace) ส่วนเกินออก
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    // ป้องกันข้อผิดพลาด (Error) กรณีที่ไม่พบช่องกรอก Token บนหน้าเว็บ
    const tokenValue = inputToken ? inputToken.value.trim() : ""; 

    // ตรวจสอบว่าผู้ใช้กำลังเข้าสู่ระบบด้วยโหมดใด
    if (btnToken.classList.contains("active")) {
        
        // [โหมด TOKEN]
        if (usernameValue === "" || passwordValue === "" || tokenValue === "") {
            alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน (Username, Password และ Token)");
            return; // หยุดการทำงานของฟังก์ชันทันทีหากข้อมูลไม่ครบ
        }

        // แสดงผลการเข้าสู่ระบบผ่าน Console
        console.log("กำลัง Log in");
        console.log("ระบบที่เลือก: TOKEN");
        console.log("Username: " + usernameValue);
        
    } else if (btnOtp.classList.contains("active")) {
        
        // [โหมด OTP]
        if (usernameValue === "" || passwordValue === "") {
            alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน (Username และ Password)");
            return; // หยุดการทำงานของฟังก์ชันทันที
        }

        // แสดงผลการเข้าสู่ระบบผ่าน Console
        console.log("กำลัง Log in");
        console.log("ระบบที่เลือก: OTP");
        console.log("Username: " + usernameValue);
    }

    // เมื่อข้อมูลถูกตรวจสอบว่าครบถ้วนและถูกต้อง
    console.log("✅ ข้อมูลครบถ้วน เตรียมเปลี่ยนหน้าเว็บ...");
    
    // เปลี่ยนหน้า -> Landing.html
    window.location.href = "Landing.html"; 
});