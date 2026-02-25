// Mock Data based on API Spec
const MOCK_DATA = [
    { pblibNm: "서울시립도서관", rdrmNm: "제1열람실(성인)", useAbleSeatCnt: 45, totSeatCnt: 100, seatUseRate: 55.0, lclgvNm: "서울특별시 동대문구" },
    { pblibNm: "강남구립도서관", rdrmNm: "종합자료실", useAbleSeatCnt: 12, totSeatCnt: 80, seatUseRate: 85.0, lclgvNm: "서울특별시 강남구" },
    { pblibNm: "판교도서관", rdrmNm: "자유열람실", useAbleSeatCnt: 88, totSeatCnt: 120, seatUseRate: 26.6, lclgvNm: "경기도 성남시" },
    { pblibNm: "익산시립도서관", rdrmNm: "제2열람실", useAbleSeatCnt: 4, totSeatCnt: 60, seatUseRate: 93.3, lclgvNm: "전북특별자치도 익산시" },
    { pblibNm: "부산광역시립중앙도서관", rdrmNm: "제1열람실", useAbleSeatCnt: 120, totSeatCnt: 150, seatUseRate: 20.0, lclgvNm: "부산광역시 중구" },
    { pblibNm: "세종시립도서관", rdrmNm: "열람실 A", useAbleSeatCnt: 0, totSeatCnt: 40, seatUseRate: 100.0, lclgvNm: "세종특별자치시" }
];

const grid = document.getElementById('library-grid');
const searchInput = document.getElementById('search-input');

function getLevelClass(rate) {
    if (rate >= 90) return 'fill-danger';
    if (rate >= 70) return 'fill-warning';
    return 'fill-success';
}

function renderLibraries(libraries) {
    grid.innerHTML = '';
    
    if (libraries.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">검색 결과가 없습니다.</div>`;
        return;
    }

    libraries.forEach(lib => {
        const rate = parseFloat(lib.seatUseRate);
        const levelClass = getLevelClass(rate);
        const isFull = rate >= 100;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <div class="library-name">${lib.pblibNm}</div>
                <div class="status-badge ${isFull ? 'status-full' : 'status-live'}">
                    ${isFull ? 'FULL' : 'LIVE'}
                </div>
            </div>
            <div class="room-name">${lib.rdrmNm}</div>
            
            <div class="utilization-container">
                <div class="util-label">
                    <span>이용률</span>
                    <span>${rate}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${levelClass}" style="width: ${rate}%"></div>
                </div>
            </div>
            
            <div class="details">
                <div class="detail-item">
                    <span>잔여 ${lib.useAbleSeatCnt} / 전체 ${lib.totSeatCnt}</span>
                </div>
            </div>
            <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted);">
                ${lib.lclgvNm}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initial Render with delay to simulate loading
setTimeout(() => {
    renderLibraries(MOCK_DATA);
}, 1000);

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = MOCK_DATA.filter(lib => 
        lib.pblibNm.toLowerCase().includes(term) || 
        lib.lclgvNm.toLowerCase().includes(term)
    );
    renderLibraries(filtered);
});
