const inboxBtn = document.getElementById("inbox-btn");         // แถบปุ่มกด Inbox
const inboxPopup = document.getElementById("inbox-popup");     // กล่องข้อความ Pop-up ที่ซ่อนอยู่
const inboxArrow = document.getElementById("inbox-arrow");     // ไอคอนลูกศร
const inboxMessage = document.getElementById("inbox-message"); // พื้นที่สำหรับแสดงเนื้อหาข้อความ

const menuContainer = document.getElementById("menu-container");

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


// 2. ฟังก์ชันดึงข้อมูล (Fetch) และสร้างเมนู
// ใช้ async/await เพื่อสั่งให้ระบบ "รอ" ดึงข้อมูลให้เสร็จก่อนค่อยทำขั้นต่อไป
async function fetchAndRenderMenu() {
    try {
        // วิ่งไปขอข้อมูลจากไฟล์ menu.json
        const response = await fetch('menu.json');
        
        // แปลงไฟล์ที่ได้มาให้กลายเป็นก้อนข้อมูล JSON (Array) ที่ JavaScript อ่านออก
        const menuData = await response.json();

        // เตรียมตัวแปรเก็บโครงสร้าง HTML
        let htmlString = ""; 

        // วนลูปอ่านข้อมูล
        menuData.forEach(function(item) {
            htmlString += `
                <div class="menu-item">
                    <a href="${item.link}" target="_blank" class="menu-item" style="text-decoration: none; color: inherit;">
                        <div class="icon-ring">
                            <img src="${item.imgSrc}" alt="${item.altText}">
                        </div>
                        <p>${item.title}</p>
                    </a>
                </div>
            `;
        });

        // นำโค้ด HTML ไปแสดงผลบนหน้าเว็บ
        menuContainer.innerHTML = htmlString;

    } catch (error) {
        // ดักจับ Error ในกรณีที่หาไฟล์ JSON ไม่เจอ หรือโหลดล้มเหลว
        console.error("เกิดข้อผิดพลาดในการโหลดเมนู:", error);
        menuContainer.innerHTML = `<p style="text-align:center; width:100%; color:red;">ไม่สามารถโหลดเมนูได้ในขณะนี้</p>`;
    }
}

// 3. สั่งให้ฟังก์ชันดึงข้อมูลทำงาน
fetchAndRenderMenu();