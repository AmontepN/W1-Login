const inboxBtn = document.getElementById("inbox-btn");         // แถบปุ่มกด Inbox
const inboxPopup = document.getElementById("inbox-popup");     // กล่องข้อความ Pop-up ที่ซ่อนอยู่
const inboxArrow = document.getElementById("inbox-arrow");     // ไอคอนลูกศร
const inboxMessage = document.getElementById("inbox-message"); // พื้นที่สำหรับแสดงเนื้อหาข้อความ

// ตัวแปรจำลองข้อมูลข้อความ (ตั้งเป็นค่าว่าง "" เพื่อทดสอบกรณีที่ไม่มีข้อความ)
let myMessage = "";

/* =========================================
    ฟังก์ชันควบคุมการทำงานของ Inbox
   ========================================= */

// กำหนดการทำงานเมื่อผู้ใช้คลิกที่แถบ Inbox
inboxBtn.addEventListener("click", function() {
    
    // 3.1 ตรวจสอบและจัดการเนื้อหาข้อความ
    if (myMessage === "") {
        // กรณีไม่มีข้อความ: แสดงข้อความแจ้งสถานะ และปรับสีตัวอักษรเป็นสีเทา
        inboxMessage.innerText = "ไม่มีข้อความ 💬";
        inboxMessage.style.color = "#999"; 
    } else {
        // กรณีมีข้อความ: แสดงเนื้อหาข้อความที่ได้รับ และปรับสีตัวอักษรเป็นสีชมพู
        inboxMessage.innerText = myMessage;
        inboxMessage.style.color = "#ff4b82"; 
    }

    // 3.2 ควบคุมการแสดงผลของกล่องข้อความ Pop-up
    // ใช้คำสั่ง toggle เพื่อสลับการเพิ่ม/ลบ คลาส "show" (เปิด/ปิด กล่องข้อความ)
    inboxPopup.classList.toggle("show");
    
    // 3.3 ควบคุมแอนิเมชันของไอคอนลูกศร
    // ใช้คำสั่ง toggle เพื่อสลับการเพิ่ม/ลบ คลาส "rotate" (หมุนลูกศรขึ้น/ลง)
    inboxArrow.classList.toggle("rotate");
});