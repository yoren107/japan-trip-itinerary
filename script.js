// script.js (最終修正：確保背景圖在注意事項頁面和行程頁面正確顯示)

// ====== 1. 溫度與地點設定 (不變) ======
const updatedTemperatures = {
    day1: "東京 (1/22)：4°C ~ 11°C",
    day2: "長野 (1/23)：-3°C ~ 4°C",
    day3: "長野 (1/24)：-6°C ~ 1°C",
    day4: "東京 (1/25)：5°C ~ 12°C",
    day5: "東京 (1/26)：6°C ~ 13°C",
    day6: "東京 (1/27)：7°C ~ 14°C",
    day7: "東京 (1/28)：5°C ~ 12°C",
};

// 設定每一天對應的背景主題
const dayLocations = {
    day1: 'tokyo',
    day2: 'nagano',
    day3: 'nagano',
    day4: 'tokyo',
    day5: 'tokyo',
    day6: 'tokyo',
    day7: 'tokyo',
    notes: 'tokyo' 
};

// ====== 2. 行程資料庫 (內容不變) ======
const itineraryData = {
    day1: { 
        date: "1/22 (一)", 
        tempKey: "day1", 
        schedule: [
            { time: "10:30", event: "桃園機場 第二航廈 集合" },
            { time: "12:35", event: "出發 (華航 CI 104)" },
            { time: "16:35", event: "抵達成田機場 第二航廈" },
            { time: "17:30", event: "包車前往住宿" },
            { time: "18:40", event: "抵達住宿：Super Hotel Tokyo Kameido" },
            { time: "19:30", event: "晚餐：鳥貴族" },
            { time: "備註", event: "西友(SEIYU)超市24小時營業。\n**重點：買零食要帶到長野慢慢吃**" }
        ]
    },
    day2: { 
        date: "1/23 (二)", 
        tempKey: "day2", 
        schedule: [
            { time: "09:00", event: "出發 (起點：Super Hotel)" },
            { time: "12:30", event: "午餐：湯田中／渋溫泉街散步＋用餐" },
            { time: "14:30", event: "地獄谷野猿公苑 (門票：800日圓)\n預計停留 1.5 小時" },
            { time: "16:00", event: "前往飯店 (山路約 25–30 分鐘)" },
            { time: "16:30", event: "抵達：志賀陽光酒店" },
            { time: "18:00", event: "飯店晚餐" },
            { time: "20:00", event: "UNO 大會 (要玩的統一集合)" }
        ]
    },
    day3: { 
        date: "1/24 (三)", 
        tempKey: "day3", 
        schedule: [
            { time: "ALL DAY", event: "❄️ 滑雪行程 (盡情享受長野粉雪)" },
            { time: "晚上", event: "自由活動 / 溫泉休息" }
        ]
    },
    day4: { 
        date: "1/25 (四)", 
        tempKey: "day4", 
        schedule: [
            { time: "早餐", event: "於飯店用餐" },
            { time: "10:00", event: "退房" },
            { time: "13:00", event: "集合搭車回東京" },
            { time: "17:00", event: "抵達住宿：TOKYO GR HOUSE" },
            { time: "18:00", event: "晴空塔觀光 (建議天望甲板 350m)\n快速逛逛：寶可夢中心、橡果子" },
            { time: "19:30", event: "晚餐：焼肉きんぐ (燒肉王)" }
        ]
    },
    day5: { 
        date: "1/26 (五)",
        tempKey: "day5", 
        schedule: [
            { time: "07:30", event: "出門" },
            { time: "08:00", event: "吃早餐 tomtom吾妻橋 (8點開)" },
            { time: "09:30", event: "抵達淺草寺" },
            { time: "10:00", event: "淺草商店街" },
            { time: "12:00", event: "午餐時間" },
            { time: "下午", event: "新宿 + 採買伴手禮、藥妝店、3COINS\n(如有時間可回民宿放東西、小休息一下)" },
            { time: "18:30", event: "晚餐" }
        ]
    },
    day6: { 
        date: "1/27 (六)", 
        tempKey: "day6", 
        schedule: [
            { time: "10:00", event: "秋葉原 (JUMP SHOP、安麗美特、Radio Kaikan)" },
            { time: "13:00", event: "秋葉原：女僕餐廳體驗" },
            { time: "14:00", event: "扭蛋會館 & 自由逛街" },
            { time: "16:00", event: "上野 Harbs (建議預約)" },
            { time: "晚餐", event: "阿美橫町 (採購/用餐)" }
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
    notes: {
        date: "行前注意事項",
        tempKey: "notes",
        isUtility: true,
        contentHTML: `
            <li><strong>🥶 衣物：</strong>長野山區非常冷，請務必準備帽子、手套、圍巾。</li>
            <li><strong>🔌 電源：</strong>日本電壓 100V (扁平兩腳插頭)。</li>
            <li><strong>📱 網路：</strong>確認 SIM 卡或 WiFi 機是否已準備好。</li>
            <li><strong>🛂 文件：</strong>護照、VJW (Visit Japan Web) 截圖。</li>
            <li><strong>💊 藥品：</strong>常備藥、腸胃藥、暈車藥。</li>
        `
    }
};

// ====== 3. 邏輯控制 ======

// 🎯 主題切換功能 (17:01 - 06:59 為夜間模式)
function setTimeBasedTheme() {
    const now = new Date();
    const hour = now.getHours();
    const isNight = (hour >= 17 && hour <= 23) || (hour >= 0 && hour < 7);

    if (isNight) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function showDisplayBlock(targetId) {
    const displayBlocks = ['itinerary-display', 'notes-display'];
    displayBlocks.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('active-display');
            if (id === targetId) {
                setTimeout(() => {
                    element.classList.add('active-display');
                }, 10);
            }
        }
    });
}

function setBackground(locationKey) {
    document.body.classList.remove('tokyo-bg', 'nagano-bg');
    
    if (locationKey === 'tokyo') {
        document.body.classList.add('tokyo-bg');
    } else if (locationKey === 'nagano') {
        document.body.classList.add('nagano-bg');
    }
}

// 渲染行程列表
function renderItinerary(data, dayKey) {
    // 🌟 在切換顯示區塊前，先設定背景 🌟
    setBackground(dayLocations[dayKey]);
    showDisplayBlock('itinerary-display');

    const titleElement = document.getElementById('itinerary-title');
    const listElement = document.getElementById('schedule-list');
    
    const currentTemp = updatedTemperatures[data.tempKey] || "";
    titleElement.innerHTML = `
        ${data.date}
        ${currentTemp ? `<span class="temperature">${currentTemp}</span>` : ''}
    `;

    let scheduleHTML = '';
    data.schedule.forEach((item, index) => {
        const eventDetails = item.event.replace(/\n/g, '<br>');
        scheduleHTML += `
            <li class="anim-item" style="animation-delay: ${index * 0.08}s">
                <span class="time-slot">${item.time}</span>
                <span class="event-details">${eventDetails}</span>
            </li>
        `;
    });
    listElement.innerHTML = scheduleHTML;
}

// 🎯 修正後的 renderUtility 函式
function renderUtility(data, key) {
    // 🌟 確保背景被設定為東京 (notes對應tokyo) 🌟
    setBackground('tokyo'); 
    showDisplayBlock('notes-display');
    
    const notesTitle = document.getElementById('notes-title');
    const notesContent = document.getElementById('notes-content');
    
    notesTitle.innerHTML = `⚠️ ${data.date}`;
    
    // 渲染並加上動畫延遲
    let notesHTML = '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.contentHTML;
    const listItems = tempDiv.querySelectorAll('li');
    
    listItems.forEach((li, index) => {
         notesHTML += `<li class="anim-item" style="animation-delay: ${index * 0.08}s">${li.innerHTML}</li>`;
    });
    
    if(listItems.length === 0) {
        notesHTML = data.contentHTML;
    }
    
    notesContent.innerHTML = notesHTML;
}

// 按鈕點擊處理
function handleButtonClick(dayKey, buttonElement) {
    const content = itineraryData[dayKey];
    if (!content) return;

    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    if (dayKey === 'notes') {
        renderUtility(content, dayKey);
    } else {
        renderItinerary(content, dayKey);
    }

    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.classList.remove('sidebar-open');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const dateNav = document.getElementById('date-navigation');
    const utilNav = document.getElementById('utility-navigation');
    const menuToggle = document.getElementById('menu-toggle');
    const container = document.querySelector('.container');
    const overlay = document.getElementById('overlay');

    // 🎯 1. 執行時間主題切換
    setTimeBasedTheme();
    // 初始載入時，將 body 設為預設東京背景
    setBackground('tokyo');

    // 生成按鈕
    Object.keys(itineraryData).forEach(key => {
        const data = itineraryData[key];
        const button = document.createElement('button');
        button.classList.add('nav-button');
        button.setAttribute('data-key', key);
        
        if (key.startsWith('day')) {
            button.classList.add('date-button');
            button.textContent = data.date.split(' ')[0]; // 只顯示日期
            dateNav.appendChild(button);
        } else if (key === 'notes') {
            button.classList.add('util-button');
            button.textContent = '⚠️ 注意事項';
            utilNav.appendChild(button);
        }

        button.addEventListener('click', function() {
            handleButtonClick(key, this);
        });
    });

    // 側邊欄切換邏輯
    function toggleSidebar() {
        container.classList.toggle('sidebar-open');
    }

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar); 

    // 預設載入 Day 1
    const defaultButton = document.querySelector('.date-button[data-key="day1"]');
    if (defaultButton) {
        handleButtonClick('day1', defaultButton);
    }
});