// 建筑数据定义
const buildings = {
    "信息楼": {
        "type": "办公及实验楼",
        "area": "52,800 m²",
        "electricity": "6,508,741 KWh",
        "water": "14,185 ton",
        "coordinates": { "top": "42.7198%", "left": "9.9311%", "width": "13%", "height": "13%" }
    },
    "荷花公寓R1-R5(5 buildings)及荷花食堂M、N": {
        "type": "荷花公寓R1-R5(5 buildings)及荷花食堂M、N",
        "area": "16,000 m²,1,580 and 5,500 m²",
        "electricity": "9,522,501 KWh",
        "water": "230,471 ton",
        "coordinates": { "top": "9.65511%", "left": "3.48801%", "width": "12%", "height": "12%" }
    },
    "老园区A-Q(11 buildings)办公室及实验室": {
        "type": "办公室及实验室",
        "area": "74,760 m²",
        "electricity": "9,522,501 KWh",
        "water": "230,471 ton",
        "coordinates": { "top": "14.8189%", "left": "13.6677%", "width": "20%", "height": "20%" }
    },
    "海洋楼与能源楼办公及实验室": {
        "type": "办公及实验室",
        "area": "50,296, 15,653 m²",
        "electricity": "12,573,361 KWh",
        "water": "20,609 ton",
        "coordinates": { "top": "22.3793%", "left": "40.6737%", "width": "15%", "height": "15%" }
    },
    "国际一期A1-D1(4 buildings)办公、宿舍": {
        "type": "办公、宿舍",
        "area": "125,515 m²",
        "electricity": "12,676,587 KWh",
        "water": "93,778 ton",
        "coordinates": { "top": "55.7542%", "left": "79.8418%", "width": "15%", "height": "15%" }
    }
};

// DOM元素获取
const hotspotsContainer = document.getElementById('hotspots');
const dataPanel = document.getElementById('dataPanel');
const buildingName = document.getElementById('buildingName');
const buildingType = document.getElementById('buildingType');
const buildingArea = document.getElementById('buildingArea');
const electricity = document.getElementById('electricity');
const water = document.getElementById('water');

// 初始化函数
function init() {
    createHotspots();
}

// 创建建筑热区
function createHotspots() {
    // 清空现有热区
    hotspotsContainer.innerHTML = '';
    
    // 遍历建筑数据，创建热区
    for (const [name, data] of Object.entries(buildings)) {
        const hotspot = document.createElement('div');
        hotspot.className = 'hotspot';
        hotspot.dataset.buildingName = name;
        
        // 确保热区是正圆形，使用最小的尺寸
        const size = Math.min(parseFloat(data.coordinates.width), parseFloat(data.coordinates.height)) + '%';
        hotspot.style.top = data.coordinates.top;
        hotspot.style.left = data.coordinates.left;
        hotspot.style.width = size;
        hotspot.style.height = size;
        
        // 创建小实心圆心
        const centerDot = document.createElement('div');
        centerDot.className = 'hotspot-center';
        centerDot.style.position = 'absolute';
        centerDot.style.top = '50%';
        centerDot.style.left = '50%';
        centerDot.style.transform = 'translate(-50%, -50%)';
        centerDot.style.width = '8px';
        centerDot.style.height = '8px';
        centerDot.style.borderRadius = '50%';
        centerDot.style.backgroundColor = 'rgba(255, 165, 0, 1)';
        centerDot.style.zIndex = '1';
        
        // 创建建筑名称标签
        const nameLabel = document.createElement('div');
        nameLabel.className = 'hotspot-name';
        nameLabel.style.position = 'absolute';
        nameLabel.style.top = '100%';
        nameLabel.style.left = '50%';
        nameLabel.style.transform = 'translateX(-50%)';
        nameLabel.style.marginTop = '5px';
        nameLabel.style.fontSize = '12px';
        nameLabel.style.fontWeight = 'bold';
        nameLabel.style.color = '#333';
        nameLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nameLabel.style.padding = '2px 6px';
        nameLabel.style.borderRadius = '4px';
        nameLabel.style.whiteSpace = 'nowrap';
        nameLabel.style.zIndex = '2';
        nameLabel.textContent = name;
        
        // 添加事件监听器
        hotspot.addEventListener('mouseenter', handleMouseEnter);
        hotspot.addEventListener('mouseleave', handleMouseLeave);
        
        // 添加圆心和名称标签到热区
        hotspot.appendChild(centerDot);
        hotspot.appendChild(nameLabel);
        
        // 添加到容器
        hotspotsContainer.appendChild(hotspot);
    }
}

// 鼠标进入热区事件处理
function handleMouseEnter(event) {
    const buildingNameValue = event.target.dataset.buildingName;
    const buildingData = buildings[buildingNameValue];
    
    if (buildingData) {
        // 更新数据面板内容
        buildingName.textContent = buildingNameValue;
        buildingType.textContent = buildingData.type;
        buildingArea.textContent = buildingData.area;
        electricity.textContent = buildingData.electricity;
        water.textContent = buildingData.water;
        
        // 显示数据面板
        showDataPanel();
    }
}

// 鼠标离开热区事件处理
function handleMouseLeave() {
    // 隐藏数据面板
    hideDataPanel();
}

// 显示数据面板
function showDataPanel() {
    dataPanel.classList.add('visible');
}

// 隐藏数据面板
function hideDataPanel() {
    dataPanel.classList.remove('visible');
}

// 窗口大小变化时重新创建热区（确保响应式）
window.addEventListener('resize', function() {
    // 使用防抖优化，避免频繁重绘
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(createHotspots, 200);
});

// 页面加载完成后初始化

document.addEventListener('DOMContentLoaded', init);
