// script.js

// ====== 1. 匯率常量 ======
const JPY_TO_TWD_RATE = 0.21; 

// ====== 2. 背景圖片網址 ======
// 東京夜景 (預設)
const BG_TOKYO = "url('https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2072&auto=format&fit=crop')";
// 長野雪景
const BG_NAGANO = "url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop')";


// ====== 3. 溫度資料 ======
const updatedTemperatures = {
    day1: "東京 (1/22)：4°C ~ 11°C", 
    day2: "長野 (1/23)：-3°C ~ 4°C",
    day3: "長野 (1/24)：-6°C ~ 1°C",
    day4: "東京 (1/25)：5°C ~ 12°C",
    day5: "東京 (1/26)：6°C ~ 13°C",
    day6: "東京 (1/27)：7°C ~ 14°C",
    day7: "東京 (1/28)：5°C ~ 12°C",
};

// ====== 4. 行程資料庫 ======
const itineraryData = {
    day1: {
        date: "1/22 (一)",
        tempKey: "day1", 
        schedule: [
            { time: "10:30", event: "桃園機場集合" },
            { time: "12:35", event: "華航出發" },
            { time: "16:35", event: "抵達成田機場" },
            { time: "17:30", event: "包車前往 Super Hotel Tokyo Kameido" },
            { time: "18:40", event: "抵達住宿地點" },
            { time: "19:30", event: "晚餐：鳥貴族" },
            { time: "備註", event: "西反超市24小時營業。**重點：買零食要帶到長野慢慢吃**" }
        ]
    },
    day2: {
        date: "1/23 (二)",
        tempKey: "day2",
        schedule: [
            { time: "09:00", event: "出發 (起點：Super Hotel Kameido) | 交通：包車" },
            { time: "12:30–14:00", event: "午餐：湯田中／渋溫泉街散步＋用餐" },
            { time: "14:30–16:00", event: "地獄谷野猿公苑 (門票：800日圓) | 預計停留 1.5小時" },
            { time: "16:00–16:30", event: "地獄谷 → 志賀陽光酒店 (山路約 25–30 分鐘)" },
            { time: "16:30", event: "抵達 志賀陽光酒店" },
            { time: "18:00", event: "晚餐" },
            { time: "20:00", event: "玩 UNO，要玩的人統一集合" }
        ]
    },
    day3: {
        date: "1/24 (三)",
        tempKey: "day3",
        schedule: [
            { time: "ALL DAY", event: "❄️ 盡情享受滑雪行程！" }
        ]
    },
    day4: {
        date: "1/25 (四)",
        tempKey: "day4",
        schedule: [
            { time: "早餐", event: "於飯店用餐" },
            { time: "10:00", event: "退房" },
            { time: "13:00", event: "集合搭車回東京住宿" },
            { time: "17:00", event: "抵達 TOKYO GR HOUSE" },
            { time: "18:30", event: "一起吃晚餐" }
        ]
    },
    day5: {
        date: "1/26 (五)",
        tempKey: "day5",
        schedule: [
            { time: "05:30", event: "出門" },
            { time: "06:00", event: "抵達沒人的淺草寺" },
            { time: "08:00", event: "吃早餐 tomtom吾妻橋 (8點開)" },
            { time: "09:00-11:30", event: "淺草商店街" },
            { time: "午餐", event: "暫定壽喜燒（今半別館）" },
            { time: "下午", event: "新宿+採買伴手禮、藥妝店、3COINS (如有時間可回民宿休息)" },
            { time: "17:00", event: "晴空塔（快速逛逛：寶可夢中心、橡果子）" },
            { time: "18:30", event: "晚餐" }
        ]
    },
    day6: {
        date: "1/27 (六)",
        tempKey: "day6",
        schedule: [
            { time: "10:00", event: "秋葉原 (JUMP SHOP、安麗美特、Radio Kaikan 與 Mandarake)" },
            { time: "13:00", event: "秋葉原 女僕餐廳" },
            { time: "14:00", event: "扭蛋會館與其他想逛的部分" },
            { time: "16:00", event: "上野 Harbs" },
            { time: "晚餐/採購", event: "阿美橫町" }
        ]
    },
    day7: {
        date: "1/28 (日)",
        tempKey: "day7",
        schedule: [
            { time: "10:00", event: "完成退房" },
            { time: "上午", event: "搭車前往成田機場" },
            { time: "13:25", event: "跟欣柔說掰掰" },
            { time: "14:35", event: "跟日本說掰掰 (華航 CI105)" },
            { time: "17:45", event: "抵達桃園國際機場" },
            { time: "備註", event: "各自回家，隔天開心上班！" }
        ]
    },
    rate: {
        date: "換算匯率小幫手",
        tempKey: "rate",
        schedule: [{
            time: "固定匯率",
            event: `
                <div class="rate-converter">
                    <p>本行使用固定匯率：1 JPY = ${JPY_TO_TWD_RATE} TWD</p>
                    <div class="rate-input-group">
                        <label for="jpy-input">輸入日幣金額 (JPY)：</label>
                        <input type="number" id="jpy-input" placeholder="0" oninput="calculateTWD()">
                    </div>
                    <div id="twd-result">
                        台幣金額 (TWD)：0
                    </div>
                </div>
            `
        }]
    },
    notes: {
        date: "行前注意事項",
        tempKey: "notes",
        schedule: [
            { time: "行李", event: "請準備防寒保暖衣物，尤其長野山區會非常冷" },
            { time: "電源", event: "日本電壓 100V (扁平兩腳插頭)" },
            { time: "網路", event: "確認個人 WiFi 或 SIM 卡是否設定完成" },
            { time: "其他", event: "記得帶護照和電子機票！" }
        ]
    }
};

// ====== 5. 功能函式 ======
function calculateTWD() {
    const jpyAmount = parseFloat(document.getElementById('jpy-input').value);
    const resultElement = document.getElementById('twd-result');
    if (isNaN(jpyAmount) || jpyAmount <= 0) {
        resultElement.innerHTML = `台幣金額 (TWD)：0`;
        return;
    }
    const twdAmount = jpyAmount * JPY_TO_TWD_RATE;
    resultElement.innerHTML = `台幣金額 (TWD)：${twdAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function applyThemeBasedOnTime() {
    const now = new Date();
    const hour = now.getHours(); 
    const body = document.body;
    if (hour >= 18 || hour < 6) { 
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// 新增：切換背景圖函式
function updateBackgroundImage(key) {
    const body = document.body;
    // 如果是 Day 2 或 Day 3，切換為長野雪景
    if (key === 'day2' || key === 'day3') {
        body.style.setProperty('--bg-image', BG_NAGANO);
    } else {
        // 其他日子 (包含匯率、注意事項) 切換回東京夜景
        body.style.setProperty('--bg-image', BG_TOKYO);
    }
}


// ====== 6. 初始化與事件監聽 ======
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const displayBox = document.getElementById('itinerary-display');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const mainContainer = document.getElementById('main-container');
    const overlay = document.getElementById('overlay');

    function toggleSidebar() {
        mainContainer.classList.toggle('sidebar-open');
    }

    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    function renderContent(data, dayKey) { // 接收 dayKey 參數
        // 1. 更新內容
        let currentTemp = "無溫度資訊";
        if (data.tempKey && updatedTemperatures[data.tempKey]) currentTemp = updatedTemperatures[data.tempKey];
        else if (data.tempKey === 'rate') currentTemp = "請在下方輸入日幣金額進行換算";
        else if (data.tempKey === 'notes') currentTemp = "以下是旅行重點提醒";
        
        displayBox.classList.remove('fade-in-active');
        void displayBox.offsetWidth; 
        displayBox.classList.add('fade-in-active');

        let scheduleHTML = `
            <h3 class="anim-item">${data.date}</h3>
            <p class="temperature anim-item" style="animation-delay: 0.1s;">${currentTemp}</p>
            <ul class="schedule-list">
        `;

        data.schedule.forEach((item, index) => {
            const delay = 0.2 + (index * 0.1); 
            const styleDelay = `style="animation-delay: ${delay}s;"`;
            if (item.event.trim().startsWith('<div class="rate-converter')) {
                scheduleHTML += `<li class="full-width-item anim-item" ${styleDelay}><div class="event-details">${item.event}</div></li>`;
            } else {
                scheduleHTML += `<li class="anim-item" ${styleDelay}><span class="time-slot">${item.time}</span><span class="event-details">${item.event}</span></li>`;
            }
        });

        scheduleHTML += `</ul>`;
        displayBox.innerHTML = scheduleHTML;
        
        if (data.tempKey === 'rate') {
             const input = document.getElementById('jpy-input');
             if(input) { input.oninput = calculateTWD; }
        }

        // 2. 更新背景圖
        updateBackgroundImage(dayKey);

        // 3. 手機版自動關閉側邊欄
        if (window.innerWidth < 768) {
            mainContainer.classList.remove('sidebar-open');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 獲取 dayKey (例如 'day1', 'day2', 'rate')
            const dayKey = this.dataset.day; 
            const content = itineraryData[dayKey];
            
            if (content) {
                renderContent(content, dayKey); // 傳入 dayKey
            }
        });
    });

    applyThemeBasedOnTime(); 
    // 初始化
    document.querySelector('.date-button[data-day="day1"]').click(); 
});