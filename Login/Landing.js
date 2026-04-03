const inboxBtn = document.getElementById("inbox-btn");         // แถบปุ่มกด Inbox
const inboxPopup = document.getElementById("inbox-popup");     // กล่องข้อความ Pop-up ที่ซ่อนอยู่
const inboxArrow = document.getElementById("inbox-arrow");     // ไอคอนลูกศร
const inboxMessage = document.getElementById("inbox-message"); // พื้นที่สำหรับแสดงเนื้อหาข้อความ

const menuContainer = document.getElementById("menu-container");

// ตัวแปรจำลองข้อมูลข้อความ (ตั้งเป็นค่าว่าง "" เพื่อทดสอบกรณีที่ไม่มีข้อความ)
let myMessage = "";

const menuData = [
    {
        title: "Customer Portal",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/customer.png",
        altText: "Customer Portal Icon"
    },
    {
        title: "Sale",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/sale.png",
        altText: "Sale Icon"
    },
    {
        title: "e-Waste (Point)",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/e-waste.png",
        altText: "e-Waste Icon"
    },
    {
        title: "iKM",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/ikm.png",
        altText: "iKM Icon"
    },
    {
        title: "My AIS<br>(download)",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/myais.png",
        altText: "My AIS Download Icon"
    },
    {
        title: "e-Leaflet",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/e-leaflet.png",
        altText: "e-Leaflet Icon"
    },
    {
        title: "สมัครแทนบัตร",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/myais.png",
        altText: "สมัครแทนบัตร Icon"
    },
    {
        title: "แสดงตัวตน(NDID)",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/ndid.png",
        altText: "NDID Icon"
    },
    {
        title: "เครื่อง",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/device.png",
        altText: "Device Icon"
    },
    {
        title: "ซิม",
        link: "https://www.ais.th/consumers",
        imgSrc: "../Login/Image/sim.png",
        altText: "SIM Icon"
    }
];

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


// ฟังก์ชันสำหรับสร้างปุ่มเมนู (Render Menu Items)
function renderMenuItems() {
    let htmlString = ""; // สร้างตัวแปรมารอเก็บโค้ด HTML

    // วนลูปอ่านข้อมูลจาก JSON ทีละรายการ
    menuData.forEach(function(item) {
        
        // นำข้อมูลมาประกอบกับโครงสร้าง HTML
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

    // นำโค้ด HTML ทั้งหมดที่ประกอบเสร็จแล้ว ไปแสดงผลบนหน้าเว็บ
    menuContainer.innerHTML = htmlString;
}

// 4. สั่งให้ฟังก์ชันทำงานทันทีเมื่อโหลดไฟล์เสร็จ
renderMenuItems();