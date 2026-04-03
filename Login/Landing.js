const inboxBtn = document.getElementById("inbox-btn");
const inboxPopup = document.getElementById("inbox-popup");
const inboxArrow = document.getElementById("inbox-arrow");
const inboxMessage = document.getElementById("inbox-message");

const menuContainer = document.getElementById("menu-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageDots = document.getElementById("page-dots");
const paginationBox = document.querySelector(".pagination-controls");

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
    
    // ตรวจสอบและจัดการเนื้อหาข้อความ
    if (myMessage === "") {
        inboxMessage.innerText = "ไม่มีข้อความ 💬";
        inboxMessage.style.color = "#999"; 
    } else {
        inboxMessage.innerText = myMessage;
        inboxMessage.style.color = "#ff4b82"; 
    }

    // ควบคุมการแสดงผลของกล่องข้อความ Pop-up
    inboxPopup.classList.toggle("show");
    
    // ควบคุมแอนิเมชันของไอคอนลูกศร
    inboxArrow.classList.toggle("rotate");
});

/* =========================================
    เปลี่ยนหน้าเมนู (Pagination) & Responsive
   ========================================= */

// ตั้งค่าระบบแบ่งหน้า
let currentPage = 1;         // เริ่มต้นที่หน้า 1
const itemsPerPage = 8;      // ตั้งค่าให้แสดงหน้าละ 8 เมนู
const totalPages = Math.ceil(menuData.length / itemsPerPage); // คำนวณจำนวนหน้าทั้งหมด

// ฟังก์ชันสำหรับสร้างปุ่มเมนู (Render Menu Items)
function renderMenuItems() {
    // 💡 ให้ JS เช็กความกว้างหน้าจอ (ถ้ากว้างกว่า 1024px ถือว่าเป็นโหมดคอมพิวเตอร์)
    const isDesktop = window.innerWidth > 1024; 
    
    let currentItems = [];
    let htmlString = ""; 

    if (isDesktop) {
        // โหมดคอมพิวเตอร์: ดึงข้อมูลมาแสดงทั้งหมดรวดเดียว
        currentItems = menuData;
        if (paginationBox) paginationBox.style.display = "none"; // ซ่อนชุดปุ่มกดเลื่อนหน้า
    } else {
        // โหมดไอแพด/แท็บเล็ต: ตัดข้อมูลมาแสดงทีละ 8 อัน
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        currentItems = menuData.slice(startIndex, endIndex);
        if (paginationBox) paginationBox.style.display = "flex"; // โชว์ชุดปุ่มกดเลื่อนหน้า
    }

    // 1. วนลูปวาดปุ่มเมนูของจริง
    currentItems.forEach(function(item) {
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

    // ทำเฉพาะในโหมดไอแพดที่มีการแบ่งหน้า
    if (!isDesktop) {
        const emptySlots = itemsPerPage - currentItems.length;
        
        // ถ้าขาดช่องให้เติมปุ่มเปล่าๆ เข้าไปเพื่อให้โครงสร้างตารางไม่ยุบตัว
        for (let i = 0; i < emptySlots; i++) {
            htmlString += `
                <div class="menu-item" style="visibility: hidden; pointer-events: none;">
                    <a class="menu-item">
                        <div class="icon-ring"></div>
                        <p>ช่องว่าง</p>
                    </a>
                </div>
            `;
        }
    }

    // 3. นำโค้ด HTML ไปแสดงผลบนหน้าเว็บ
    menuContainer.innerHTML = htmlString;

    // อัปเดตสถานะปุ่มกดและจุดไข่ปลา (ทำเฉพาะในโหมดไอแพด)
    if (!isDesktop && prevBtn && nextBtn && pageDots) {
        updatePagination();
    }
}

// ฟังก์ชันอัปเดตปุ่มถอยหลัง/เดินหน้า และจุดไข่ปลา
function updatePagination() {
    // ล็อกปุ่มหากอยู่หน้าแรก หรือหน้าสุดท้าย
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // วาดจุดไข่ปลาบอกหน้า
    let dotsHtml = "";
    for(let i = 1; i <= totalPages; i++) {
        if(i === currentPage) {
            dotsHtml += `<div class="dot active"></div>`;
        } else {
            dotsHtml += `<div class="dot"></div>`;
        }
    }
    pageDots.innerHTML = dotsHtml;
}

// ดักจับการคลิกปุ่ม "ถอยหลัง" ❮
if (prevBtn) {
    prevBtn.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderMenuItems();
        }
    });
}

// ดักจับการคลิกปุ่ม "เดินหน้า" ❯
if (nextBtn) {
    nextBtn.addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderMenuItems();
        }
    });
}

// สั่งให้รีเฟรชหน้าเมนูใหม่เสมอ เมื่อมีการย่อ/ขยายหน้าต่างเบราว์เซอร์
window.addEventListener("resize", function() {
    currentPage = 1; // ดึงกลับมาที่หน้า 1 เสมอเพื่อป้องกันบั๊ก
    renderMenuItems();
});

// สั่งให้ฟังก์ชันทำงานวาดเมนูทันทีเมื่อโหลดไฟล์เสร็จ
renderMenuItems();