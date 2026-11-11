// ==========================================================================
// 장르별 책등(Spine) 컬러 팔레트 정의 (시·희곡 제외 7대 장르)
// ==========================================================================
const GENRES = {
  FIC: { code: 'FIC', name: '소설', color: '#f7a6dc', textColor: '#141414' },
  MYS: { code: 'MYS', name: '추리·미스터리', color: '#c0a8e5', textColor: '#141414' },
  FAN: { code: 'FAN', name: '판타지·SF', color: '#ffa8be', textColor: '#141414' },
  HUM: { code: 'HUM', name: '인문·역사', color: '#ffb997', textColor: '#141414' },
  SCI: { code: 'SCI', name: '과학·기술', color: '#ffd677', textColor: '#141414' },
  ESS: { code: 'ESS', name: '에세이·산문', color: '#f9f871', textColor: '#141414' },
  PHI: { code: 'PHI', name: '철학·사상', color: '#faeaff', textColor: '#141414' }
};

// 초기 도서 목록: 샘플 모두 삭제 (깨끗한 빈 책장 상태에서 시작)
const INITIAL_BOOKS = [];

// 오프라인/로컬 폴백 및 한국 베스트셀러·스테디셀러 순수 서지 사실(Fact) 사전
const FACTUAL_FALLBACK_CATALOG = [
  { productCode: 'S000218611153', title: '어두운 숲', author: '전건우', publisher: '&(앤드)', pages: 280, isbn: '9791124028223', genre: 'MYS' },
  { productCode: 'S000000781065', title: '홍학의 자리', author: '정해연', publisher: '엘릭시르', pages: 336, isbn: '9788954681155', genre: 'MYS' },
  { title: '물고기는 존재하지 않는다', author: '룰루 밀러', publisher: '곰출판', pages: 300, isbn: '9791189327156', genre: 'SCI' },
  { title: '소년이 온다', author: '한강', publisher: '창비', pages: 216, isbn: '9788936434120', genre: 'FIC' },
  { title: '채식주의자', author: '한강', publisher: '창비', pages: 276, isbn: '9788936434595', genre: 'FIC' },
  { title: '작별하지 않는다', author: '한강', publisher: '문학동네', pages: 332, isbn: '9788954682152', genre: 'FIC' },
  { title: '흰', author: '한강', publisher: '문학동네', pages: 196, isbn: '9788954651134', genre: 'FIC' },
  { title: '희랍어 시간', author: '한강', publisher: '문학동네', pages: 192, isbn: '9788954616515', genre: 'FIC' },
  { title: '서랍에 저녁을 넣어 두었다', author: '한강', publisher: '문학과지성사', pages: 168, isbn: '9788932024639', genre: 'ESS' },
  { title: '급류', author: '정대건', publisher: '민음사', pages: 344, isbn: '9788937473401', genre: 'FIC' },
  { title: '모순', author: '양귀자', publisher: '쓰다', pages: 308, isbn: '9788998441012', genre: 'FIC' },
  { title: '나는 소망한다 내게 금지된 것을', author: '양귀자', publisher: '쓰다', pages: 384, isbn: '9788998441074', genre: 'FIC' },
  { title: '원미동 사람들', author: '양귀자', publisher: '쓰다', pages: 412, isbn: '9788998441029', genre: 'FIC' },
  { title: '구의 증명', author: '최진영', publisher: '은행나무', pages: 176, isbn: '9791167372864', genre: 'FIC' },
  { title: '해가 지는 곳으로', author: '최진영', publisher: '민음사', pages: 296, isbn: '9788937473142', genre: 'FIC' },
  { title: '불편한 편의점', author: '김호연', publisher: '나무옆의자', pages: 268, isbn: '9791161571188', genre: 'FIC' },
  { title: '불편한 편의점 2', author: '김호연', publisher: '나무옆의자', pages: 320, isbn: '9791161571379', genre: 'FIC' },
  { title: '나의 돈키호테', author: '김호연', publisher: '나무옆의자', pages: 416, isbn: '9791161571614', genre: 'FIC' },
  { title: '아몬드', author: '손원평', publisher: '창비', pages: 264, isbn: '9788936434267', genre: 'FIC' },
  { title: '천 개의 파랑', author: '천선란', publisher: '허블', pages: 376, isbn: '9791190090261', genre: 'FAN' },
  { title: '지구 끝의 온실', author: '김초엽', publisher: '자이언트북스', pages: 392, isbn: '9791191824001', genre: 'FAN' },
  { title: '우리가 빛의 속도로 갈 수 없다면', author: '김초엽', publisher: '허블', pages: 344, isbn: '9791190090018', genre: 'FAN' },
  { title: '파친코 1', author: '이민진', publisher: '인플루엔셜', pages: 368, isbn: '9791168340572', genre: 'FIC' },
  { title: '파친코 2', author: '이민진', publisher: '인플루엔셜', pages: 372, isbn: '9791168340589', genre: 'FIC' },
  { title: '이처럼 사소한 것들', author: '클레어 키건', publisher: '다산책방', pages: 136, isbn: '9791130646381', genre: 'FIC' },
  { title: '맡겨진 소녀', author: '클레어 키건', publisher: '다산책방', pages: 140, isbn: '9791130699691', genre: 'FIC' },
  { title: '도둑맞은 집중력', author: '요한 하리', publisher: '어크로스', pages: 464, isbn: '9791167740984', genre: 'HUM' },
  { title: '초역 부처의 말', author: '코이케 류노스케', publisher: '포레스트북스', pages: 320, isbn: '9791193937143', genre: 'PHI' },
  { title: '마흔에 읽는 쇼펜하우어', author: '강용수', publisher: '유노북스', pages: 280, isbn: '9791192300818', genre: 'PHI' },
  { title: '세이노의 가르침', author: '세이노', publisher: '데이원', pages: 736, isbn: '9791168473690', genre: 'ESS' },
  { title: '돈의 속성', author: '김승호', publisher: '스노우폭스북스', pages: 416, isbn: '9791188331796', genre: 'HUM' },
  { title: '돈의 심리학', author: '모건 하우절', publisher: '인플루엔셜', pages: 344, isbn: '9791191056372', genre: 'HUM' },
  { title: '불변의 법칙', author: '모건 하우절', publisher: '서삼독', pages: 420, isbn: '9791198517425', genre: 'HUM' },
  { title: '역행자', author: '자청', publisher: '웅진지식하우스', pages: 316, isbn: '9788901260716', genre: 'HUM' },
  { title: '원씽 (The One Thing)', author: '게리 켈러', publisher: '비즈니스북스', pages: 280, isbn: '9788997575169', genre: 'HUM' },
  { title: '아주 작은 습관의 힘', author: '제임스 클리어', publisher: '비즈니스북스', pages: 360, isbn: '9791162540640', genre: 'HUM' },
  { title: '퓨처 셀프', author: '벤저민 하디', publisher: '상상스퀘어', pages: 320, isbn: '9791192389226', genre: 'HUM' },
  { title: '시대예보: 호명사회', author: '송길영', publisher: '교보문고', pages: 364, isbn: '9791170611943', genre: 'HUM' },
  { title: '시대예보: 핵개인의 시대', author: '송길영', publisher: '교보문고', pages: 368, isbn: '9791170610984', genre: 'HUM' },
  { title: '코스모스', author: '칼 세이건', publisher: '사이언스북스', pages: 719, isbn: '9788983711892', genre: 'SCI' },
  { title: '사피엔스', author: '유발 하라리', publisher: '김영사', pages: 636, isbn: '9788934972464', genre: 'HUM' },
  { title: '호모 데우스', author: '유발 하라리', publisher: '김영사', pages: 632, isbn: '9788934977865', genre: 'HUM' },
  { title: '넥서스', author: '유발 하라리', publisher: '김영사', pages: 688, isbn: '9791168342248', genre: 'HUM' },
  { title: '해리 포터와 마법사의 돌', author: 'J.K. 롤링', publisher: '문학수첩', pages: 360, isbn: '9788983927620', genre: 'FAN' },
  { title: '해리 포터와 아즈카반의 죄수', author: 'J.K. 롤링', publisher: '문학수첩', pages: 616, isbn: '9788983927644', genre: 'FAN' },
  { title: '데미안', author: '헤르만 헤세', publisher: '민음사', pages: 240, isbn: '9788937460449', genre: 'FIC' },
  { title: '싯다르타', author: '헤르만 헤세', publisher: '민음사', pages: 230, isbn: '9788937460586', genre: 'FIC' },
  { title: '이방인', author: '알베르 카뮈', publisher: '민음사', pages: 210, isbn: '9788937462672', genre: 'FIC' },
  { title: '페스트', author: '알베르 카뮈', publisher: '민음사', pages: 416, isbn: '9788937462689', genre: 'FIC' },
  { title: '인간 실격', author: '다자이 오사무', publisher: '민음사', pages: 192, isbn: '9788937461033', genre: 'FIC' },
  { title: '어린 왕자', author: '생텍쥐페리', publisher: '열린책들', pages: 220, isbn: '9788932917245', genre: 'FIC' },
  { title: '참을 수 없는 존재의 가벼움', author: '밀란 쿤데라', publisher: '민음사', pages: 484, isbn: '9788937437564', genre: 'FIC' },
  { title: '노인과 바다', author: '어니스트 헤밍웨이', publisher: '민음사', pages: 168, isbn: '9788937462788', genre: 'FIC' },
  { title: '호밀밭의 파수꾼', author: '제롬 데이비드 샐린저', publisher: '민음사', pages: 320, isbn: '9788937460395', genre: 'FIC' },
  { title: '1984', author: '조지 오웰', publisher: '민음사', pages: 428, isbn: '9788937460777', genre: 'FIC' },
  { title: '동물농장', author: '조지 오웰', publisher: '민음사', pages: 160, isbn: '9788937460050', genre: 'FIC' },
  { title: '멋진 신세계', author: '올더스 헉슬리', publisher: '소담출판사', pages: 356, isbn: '9788973814725', genre: 'FAN' },
  { title: '죄와 벌', author: '도스토옙스키', publisher: '민음사', pages: 560, isbn: '9788937462849', genre: 'FIC' },
  { title: '카라마조프 가의 형제들', author: '도스토옙스키', publisher: '민음사', pages: 640, isbn: '9788937461507', genre: 'FIC' },
  { title: '안나 카레니나', author: '레프 톨스토이', publisher: '민음사', pages: 580, isbn: '9788937462184', genre: 'FIC' },
  { title: '그리고 아무도 없었다', author: '애거서 크리스티', publisher: '황금가지', pages: 344, isbn: '9788982735455', genre: 'MYS' },
  { title: '오리엔트 특급 살인', author: '애거서 크리스티', publisher: '황금가지', pages: 336, isbn: '9788982735462', genre: 'MYS' },
  { title: '용의자 X의 헌신', author: '히가시노 게이고', publisher: '재인', pages: 444, isbn: '9788990982704', genre: 'MYS' },
  { title: '나미야 잡화점의 기적', author: '히가시노 게이고', publisher: '현대문학', pages: 456, isbn: '9788972756194', genre: 'FIC' },
  { title: '가면산장 살인사건', author: '히가시노 게이고', publisher: '재인', pages: 288, isbn: '9788990982575', genre: 'MYS' },
  { title: '종의 기원', author: '정유정', publisher: '은행나무', pages: 384, isbn: '9788956609959', genre: 'MYS' },
  { title: '7년의 밤', author: '정유정', publisher: '은행나무', pages: 524, isbn: '9788956604992', genre: 'MYS' },
  { title: '영원한 천국', author: '정유정', publisher: '은행나무', pages: 484, isbn: '9791167373380', genre: 'MYS' },
  { title: '월든', author: '헨리 데이비드 소로', publisher: '은행나무', pages: 504, isbn: '9788956605531', genre: 'ESS' },
  { title: '명상록', author: '마르쿠스 아우렐리우스', publisher: '현대지성', pages: 288, isbn: '9791188850242', genre: 'PHI' },
  { title: '총 균 쇠', author: '재레드 다이아몬드', publisher: '문학사상', pages: 752, isbn: '9788970127248', genre: 'HUM' },
  { title: '이기적 유전자', author: '리처드 도킨스', publisher: '을유문화사', pages: 632, isbn: '9788932473901', genre: 'SCI' },
  { title: '다정한 것이 살아남는다', author: '브라이언 헤어', publisher: '디플롯', pages: 416, isbn: '9791197413025', genre: 'SCI' },
  { title: '뇌, 욕망의 비밀을 풀다', author: '한스 게오르크 호이젤', publisher: '비즈니스북스', pages: 364, isbn: '9791162541012', genre: 'SCI' },
  { title: '팩트풀니스', author: '한스 로슬링', publisher: '김영사', pages: 476, isbn: '9788934985068', genre: 'HUM' },
  { title: '정의란 무엇인가', author: '마이클 샌델', publisher: '와이즈베리', pages: 444, isbn: '9788937834790', genre: 'PHI' },
  { title: '죽음의 수용소에서', author: '빅터 프랭클', publisher: '청아출판사', pages: 256, isbn: '9788936811549', genre: 'HUM' },
  { title: '미움받을 용기', author: '기시미 이치로', publisher: '인플루엔셜', pages: 336, isbn: '9788996991342', genre: 'PHI' },
  { title: '내가 틀릴 수도 있습니다', author: '비욘 나티코 린데블라드', publisher: '다산초당', pages: 304, isbn: '9791130689890', genre: 'ESS' },
  { title: '아버지의 해방일지', author: '정지아', publisher: '창비', pages: 268, isbn: '9788936438838', genre: 'FIC' },
  { title: '하얼빈', author: '김훈', publisher: '문학동네', pages: 312, isbn: '9788954699914', genre: 'FIC' },
  { title: '칼의 노래', author: '김훈', publisher: '문학동네', pages: 392, isbn: '9788954617246', genre: 'FIC' }
];

const STORAGE_KEY = 'mobbin_user_library_clean_v1';

let state = {
  books: [],
  activeView: 'home',      // 'home' | 'fullShelf'
  selectedYear: 2026,      // 홈 화면의 연도
  selectedMonth: 11,       // 홈 화면의 달
  shelfFilterYear: 'ALL',  // 내 책장 화면의 연도 필터 (원래 상태 유지)
  shelfFilterMonth: 'ALL', // 내 책장 화면의 월 필터 (원래 상태 유지)
  // 사용자 공유 FilterMenu (Clean) 상태: 그룹별 선택된 옵션 ID 배열
  filterMenuValue: {
    genre: [],
    rating: []
  },
  filterMenuOpen: new Set(['genre']), // 첫 번째 그룹('장르') 기본 열림 (defaultOpen)
  filterMenuFocus: null,
  wideView: false,
  draftIsbn: '',
  draftCoverUrl: ''
};

// 도서의 ISBN 또는 제목을 기반으로 실제 책 표지(coverUrl) 이미지 URL만 자동 생성/매칭 (기존 책등 이미지 불러오기 삭제)
function resolveBookImages(book = {}) {
  let isbn = (book.isbn || '').replace(/[^0-9X]/gi, '').trim();
  if (!isbn && book.title) {
    const matched = FACTUAL_FALLBACK_CATALOG.find(
      (c) => c.title === book.title || c.title.replace(/\s+/g, '') === book.title.replace(/\s+/g, '')
    );
    if (matched && matched.isbn) {
      isbn = matched.isbn;
    }
  }
  const hasIsbn13 = /^97[89]\d{10}$/.test(isbn);
  const coverUrl =
    book.coverUrl || (hasIsbn13 ? `https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${isbn}.jpg` : '');
  return { isbn, coverUrl };
}

// FilterMenu (Clean) 그룹 정의: 장르(Genre) & 별점(Star Rating)
const FILTER_MENU_GROUPS = [
  {
    id: 'genre',
    label: '장르',
    chipPrefix: '장르: ',
    options: Object.values(GENRES).map((g) => ({
      id: g.code,
      label: g.name
    }))
  },
  {
    id: 'rating',
    label: '별점',
    chipPrefix: '별점: ',
    options: [
      { id: '5', label: '★ 5점' },
      { id: '4', label: '★ 4점' },
      { id: '3', label: '★ 3점' },
      { id: '2', label: '★ 2점' },
      { id: '1', label: '★ 1점' },
      { id: '0', label: '★ 0점' }
    ]
  }
];

const CHIP_GAP = 4;
let fmcResizeObserverInitialized = false;

function loadState() {
  try {
    // 이전에 남아 있던 샘플 스토리지 키 삭제
    localStorage.removeItem('notion_reading_shelf_v2');
    localStorage.removeItem('notion_reading_shelf_v3');
    localStorage.removeItem('notion_reading_shelf_v4');
    localStorage.removeItem('notion_reading_shelf_v5');

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.books)) {
        state.books = parsed.books.map((b) => ({
          ...b,
          year: Number(b.year) || 2026,
          rating: Math.max(0, Math.min(5, Math.round(Number(b.rating) || 0)))
        }));
        return;
      }
    }
  } catch (e) {
    console.warn('Storage load error:', e);
  }
  state.books = [];
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ books: state.books }));
  } catch (e) {
    console.warn('Storage save error:', e);
  }
}

// 화면 전환 ('home' <-> 'fullShelf')
function switchView(targetView) {
  state.activeView = targetView;
  document.getElementById('viewHome').classList.toggle('active-view', targetView === 'home');
  document.getElementById('viewFullShelf').classList.toggle('active-view', targetView === 'fullShelf');

  document.getElementById('navTabHome').classList.toggle('active', targetView === 'home');
  document.getElementById('navTabFullShelf').classList.toggle('active', targetView === 'fullShelf');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAll();
}

function syncDateSelectors() {
  const homeYearEl = document.getElementById('selectHomeYear');
  const homeMonthEl = document.getElementById('selectHomeMonth');
  const fullYearEl = document.getElementById('selectFullFilterYear');
  const fullMonthEl = document.getElementById('selectFullFilterMonth');

  if (homeYearEl) homeYearEl.value = String(state.selectedYear);
  if (homeMonthEl) homeMonthEl.value = String(state.selectedMonth);
  if (fullYearEl) fullYearEl.value = String(state.shelfFilterYear);
  if (fullMonthEl) fullMonthEl.value = String(state.shelfFilterMonth);
}

// 1. 상단 Hero Band 통계 렌더링
function renderHeroStats() {
  const yearBooks = state.books.filter((b) => (Number(b.year) || 2026) === state.selectedYear);
  const totalCount = yearBooks.length;
  const totalPages = yearBooks.reduce((acc, b) => acc + (Number(b.pages) || 300), 0);
  const avgRating = totalCount
    ? (yearBooks.reduce((acc, b) => acc + Number(b.rating), 0) / totalCount).toFixed(2)
    : '0.00';

  let highestBook = null;
  for (const b of yearBooks) {
    if (!highestBook || Number(b.rating) > Number(highestBook.rating)) {
      highestBook = b;
    }
  }

  document.getElementById('heroYearBadge').textContent = `${state.selectedYear} Reading Log`;
  document.getElementById('statFinishedCount').textContent = `${totalCount}권`;
  document.getElementById('statTotalPages').textContent = `총 ${totalPages.toLocaleString()}쪽`;
  document.getElementById('statAvgRating').textContent = avgRating;
  document.getElementById('yearGoalBadge').textContent = `${state.selectedYear}년 누적 ${totalCount}권`;
  document.getElementById('chartYearTitle').textContent = `${state.selectedYear}년 1월 ~ 12월 독서량 추이`;

  if (highestBook) {
    document.getElementById('statHighestRating').textContent = `${Math.round(Number(highestBook.rating))}점`;
    document.getElementById('statHighestTitle').textContent = highestBook.title;
  } else {
    document.getElementById('statHighestRating').textContent = '-';
    document.getElementById('statHighestTitle').textContent = '기록 없음';
  }
}

// 책 두께(페이지 수)에 따라 책등 폭(width)이 뚜렷하게 변화하도록 계산
function computeSpineDimensions(book) {
  const pages = Math.max(20, Number(book.pages) || 300);
  // 얇은 책(100쪽 내외: ~18px)부터 두꺼운 책(700쪽 이상: ~56px)까지 페이지 수에 비례해 폭 변화
  const width = Math.max(18, Math.min(58, Math.round(12 + pages * 0.056)));
  const titleSeed = (book.title || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const height = Math.max(124, Math.min(144, 124 + ((pages + titleSeed) % 21)));
  return { width, height };
}

// 개별 책등 DOM 생성 (장르별 지정 파스텔 배경색 + 책 제목 표시, 책 두께에 따른 폭 반영)
function createBookSpineElement(book) {
  const g = GENRES[book.genre] || GENRES.FIC;
  const { width, height } = computeSpineDimensions(book);
  const intRating = Math.round(Number(book.rating) || 0);

  const spine = document.createElement('div');
  spine.className = 'book-spine-item';
  if (book.lean) spine.classList.add('lean-right');

  spine.style.width = `${width}px`;
  spine.style.height = `${height}px`;
  spine.style.backgroundColor = g.color;
  spine.style.color = g.textColor;
  spine.title = `${book.title}${book.author ? ` · ${book.author}` : ''} (${book.pages || 300}쪽 · ★${intRating})`;

  const titleEl = document.createElement('div');
  titleEl.className = 'spine-vertical-title';
  titleEl.style.color = g.textColor;
  titleEl.textContent = book.title || '';
  spine.appendChild(titleEl);

  spine.addEventListener('click', () => openBookDetailModal(book));
  return spine;
}

// 2. 홈 화면: '현재 선택한 연도·월의 책장만' 단독 렌더링
function renderSingleMonthBookshelf() {
  const container = document.getElementById('singleMonthShelfContainer');
  if (!container) return;
  container.innerHTML = '';

  const mBooks = state.books.filter(
    (b) => (Number(b.year) || 2026) === state.selectedYear && Number(b.month) === state.selectedMonth
  );

  const compartment = document.createElement('div');
  compartment.className = 'shelf-compartment';

  const avg = mBooks.length
    ? (mBooks.reduce((s, b) => s + Number(b.rating), 0) / mBooks.length).toFixed(1)
    : '0.0';
  const totalPages = mBooks.reduce((s, b) => s + (Number(b.pages) || 300), 0);

  const plaque = document.createElement('div');
  plaque.className = 'shelf-month-plaque';
  plaque.innerHTML = `
    <span>📅 ${state.selectedYear}년 ${state.selectedMonth}월의 책장 (${mBooks.length}권)</span>
    <span class="avg-badge">${mBooks.length > 0 ? `· 평균 ★${avg} · ${totalPages.toLocaleString()}쪽` : ''}</span>
  `;
  compartment.appendChild(plaque);

  const row = document.createElement('div');
  row.className = 'books-on-plank-row';

  if (mBooks.length === 0) {
    row.style.alignItems = 'center';
    row.style.justifyContent = 'center';
    row.innerHTML = `
      <div style="text-align:center; color:var(--text-muted); font-size:13px; padding:24px 12px;">
        <div style="margin-bottom:8px;">아직 <strong style="color:var(--ink);">${state.selectedYear}년 ${state.selectedMonth}월</strong> 책장에 꽂힌 책이 없습니다.</div>
        <button type="button" class="button-primary" id="btnEmptyMonthAdd" style="font-size:12.5px; padding:6px 14px;">
          ＋ ${state.selectedMonth}월에 읽은 책 꽂기
        </button>
      </div>
    `;
  } else {
    mBooks.forEach((b) => {
      row.appendChild(createBookSpineElement(b));
    });
  }

  const ledge = document.createElement('div');
  ledge.className = 'wooden-plank-ledge';

  compartment.appendChild(row);
  compartment.appendChild(ledge);
  container.appendChild(compartment);

  const emptyBtn = document.getElementById('btnEmptyMonthAdd');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => {
      document.getElementById('fieldYear').value = String(state.selectedYear);
      document.getElementById('fieldMonth').value = String(state.selectedMonth);
      document.getElementById('addBookModal').classList.add('open');
      updateModalLiveSpinePreview();
    });
  }
}

// 3. 홈 화면: 월별 1년간 독서량 막대 차트 & 선택 월 리포트 렌더링
function renderMonthlyTracker() {
  const chartEl = document.getElementById('monthlyChartBars');
  chartEl.innerHTML = '';

  const yearBooks = state.books.filter((b) => (Number(b.year) || 2026) === state.selectedYear);

  for (let m = 1; m <= 12; m++) {
    const mBooks = yearBooks.filter((b) => Number(b.month) === m);
    const col = document.createElement('div');
    col.className = `month-bar-col ${state.selectedMonth === m ? 'active' : ''}`;
    col.addEventListener('click', () => {
      state.selectedMonth = m;
      syncDateSelectors();
      renderSingleMonthBookshelf();
      renderMonthlyTracker();
    });

    const countEl = document.createElement('span');
    countEl.className = 'month-bar-count';
    countEl.textContent = mBooks.length > 0 ? `${mBooks.length}` : '-';

    const stackEl = document.createElement('div');
    stackEl.className = 'month-bar-stack';

    mBooks.forEach((b) => {
      const g = GENRES[b.genre] || GENRES.FIC;
      const seg = document.createElement('div');
      seg.className = 'bar-segment';
      seg.style.backgroundColor = g.color;
      seg.title = `${b.title} (★${b.rating})`;
      stackEl.appendChild(seg);
    });

    const labelEl = document.createElement('span');
    labelEl.className = 'month-bar-label';
    labelEl.textContent = `${m}월`;

    col.appendChild(countEl);
    col.appendChild(stackEl);
    col.appendChild(labelEl);
    chartEl.appendChild(col);
  }

  const panelEl = document.getElementById('monthInsightPanel');
  const mBooks = yearBooks.filter((b) => Number(b.month) === state.selectedMonth);

  if (mBooks.length === 0) {
    panelEl.innerHTML = `
      <div class="insight-header">
        <span class="insight-title">${state.selectedYear}년 ${state.selectedMonth}월 독서 기록</span>
        <span class="caption-muted">0권</span>
      </div>
      <p class="caption-muted">아직 이 달에 등록된 책이 없습니다. 다른 달을 선택하거나 새 책을 꽂아보세요.</p>
    `;
    return;
  }

  const mAvg = (mBooks.reduce((s, b) => s + Number(b.rating), 0) / mBooks.length).toFixed(2);
  const mPages = mBooks.reduce((s, b) => s + (Number(b.pages) || 300), 0);
  const sorted = [...mBooks].sort((a, b) => Number(b.rating) - Number(a.rating));
  const best = sorted[0];

  const genreCounts = {};
  mBooks.forEach((b) => {
    genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
  });

  const badgesHtml = Object.entries(genreCounts)
    .map(([code, cnt]) => {
      const g = GENRES[code] || GENRES.FIC;
      return `
        <span class="sticker-tag">
          <span class="sticker-swatch" style="background:${g.color};"></span>
          <span>${g.name} ${cnt}권</span>
        </span>
      `;
    })
    .join('');

  panelEl.innerHTML = `
    <div class="insight-header">
      <span class="insight-title">${state.selectedYear}년 ${state.selectedMonth}월 · 총 ${mBooks.length}권 완독</span>
      <span style="font-size:13px; font-weight:700; color:var(--primary);">평균 ★ ${mAvg} · ${mPages.toLocaleString()}쪽</span>
    </div>
    <div style="font-size:13px; color:var(--ink-secondary);">
      이달의 베스트: <strong>${best.title}</strong> (${best.author}, ★${Math.round(Number(best.rating))}점)
    </div>
    <div class="insight-badges">${badgesHtml}</div>
  `;
}

// 4. '내 책장' 화면: 사용자 공유 FilterMenu (Clean) 컴포넌트 로직 (장르 & 별점)
function pickedInGroup(groupId) {
  const val = state.filterMenuValue[groupId];
  return Array.isArray(val) ? val : [];
}

function isFilterOptionOn(groupId, optionId) {
  return pickedInGroup(groupId).includes(optionId);
}

function toggleFilterOption(groupId, optionId) {
  const cur = pickedInGroup(groupId);
  const nextGroup = cur.includes(optionId) ? cur.filter((x) => x !== optionId) : [...cur, optionId];
  state.filterMenuValue = {
    ...state.filterMenuValue,
    [groupId]: nextGroup
  };
  renderGenreFilters();
  renderFullYearBookshelf();
}

function toggleFilterGroup(groupId) {
  if (state.filterMenuOpen.has(groupId)) {
    state.filterMenuOpen.delete(groupId);
  } else {
    state.filterMenuOpen.add(groupId);
  }
  renderGenreFilters();
}

function clearAllFilterMenu() {
  state.filterMenuValue = { genre: [], rating: [] };
  renderGenreFilters();
  renderFullYearBookshelf();
}

function getActiveFilterChips() {
  const seen = new Set();
  const chips = [];
  FILTER_MENU_GROUPS.forEach((g) => {
    g.options.forEach((o) => {
      const k = `${g.id}\u0000${o.id}`;
      if (isFilterOptionOn(g.id, o.id) && !seen.has(k)) {
        seen.add(k);
        chips.push({
          group: g,
          option: o,
          label: `${g.chipPrefix || ''}${o.label}`
        });
      }
    });
  });
  return chips;
}

function getFilterMenuRows() {
  const rows = [];
  FILTER_MENU_GROUPS.forEach((g, gi) => {
    rows.push({ kind: 'group', group: g, gi });
    if (state.filterMenuOpen.has(g.id)) {
      g.options.forEach((o, oi) => {
        rows.push({ kind: 'option', group: g, option: o, gi, oi });
      });
    }
  });
  return rows;
}

function keyOfFilterRow(r) {
  return r.kind === 'group' ? `g:${r.gi}` : `o:${r.gi}:${r.oi}`;
}

function moveToFilterRowKey(key) {
  state.filterMenuFocus = key;
  const listEl = document.getElementById('fmcGroupsList');
  if (!listEl) return;
  listEl.querySelectorAll('[data-key]').forEach((el) => {
    el.tabIndex = el.getAttribute('data-key') === key ? 0 : -1;
  });
  const target = listEl.querySelector(`[data-key="${CSS.escape(key)}"]`);
  if (target) target.focus();
}

function placeFilterChipsLine() {
  const chipsOuter = document.getElementById('fmcChipsOuter');
  const chipsInner = document.getElementById('fmcChipsInner');
  const measureEl = document.getElementById('fmcMeasure');
  const shownContainer = document.getElementById('fmcShownChips');
  if (!chipsOuter || !chipsInner || !measureEl || !shownContainer) return;

  const chips = getActiveFilterChips();
  if (chips.length === 0) {
    chipsInner.setAttribute('data-empty', 'true');
  } else {
    chipsInner.removeAttribute('data-empty');
  }

  // 1) Hidden copy to measure how many chips fit on one line
  measureEl.innerHTML = '';
  chips.forEach((c) => {
    const span = document.createElement('span');
    span.className = 'ui-fmc__chip';
    span.innerHTML = `<span class="ui-fmc__chip-label"></span><span class="ui-fmc__chip-x"></span>`;
    span.querySelector('.ui-fmc__chip-label').textContent = c.label;
    measureEl.appendChild(span);
  });
  const sampleMore = document.createElement('span');
  sampleMore.className = 'ui-fmc__chip ui-fmc__more';
  sampleMore.textContent = '+99';
  measureEl.appendChild(sampleMore);

  const widths = [...measureEl.children].map((el) => el.offsetWidth + CHIP_GAP);
  const moreWidth = widths.pop() || 0;
  const style = getComputedStyle(chipsInner);
  const room =
    chipsInner.clientWidth -
    (parseFloat(style.paddingLeft) || 0) -
    (parseFloat(style.paddingRight) || 0) +
    CHIP_GAP;

  let fit = chips.length;
  if (room > 0) {
    let used = 0;
    let n = 0;
    for (; n < widths.length; n++) {
      const rest = n + 1 < widths.length ? moreWidth : 0;
      if (used + widths[n] + rest > room) break;
      used += widths[n];
    }
    fit = n;
  }

  const shown = chips.slice(0, fit);
  const hidden = chips.slice(fit);

  shownContainer.innerHTML = '';
  shown.forEach((c) => {
    const chipEl = document.createElement('span');
    chipEl.className = 'ui-fmc__chip';

    const labelEl = document.createElement('span');
    labelEl.className = 'ui-fmc__chip-label';
    labelEl.dir = 'auto';
    labelEl.title = c.label;
    labelEl.textContent = c.label;

    const btnX = document.createElement('button');
    btnX.type = 'button';
    btnX.className = 'ui-fmc__chip-x';
    btnX.setAttribute('aria-label', `Remove ${c.label}`);
    btnX.innerHTML = `
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
      </svg>
    `;
    btnX.addEventListener('click', () => toggleFilterOption(c.group.id, c.option.id));

    chipEl.appendChild(labelEl);
    chipEl.appendChild(btnX);
    shownContainer.appendChild(chipEl);
  });

  if (hidden.length > 0) {
    const moreEl = document.createElement('span');
    moreEl.className = 'ui-fmc__chip ui-fmc__more';
    const hiddenTitles = hidden.map((c) => c.label).join(', ');
    moreEl.title = hiddenTitles;
    moreEl.setAttribute('aria-label', `${hidden.length} more: ${hiddenTitles}`);
    moreEl.innerHTML = `<span class="ui-fmc__roll">+${hidden.length}</span>`;
    shownContainer.appendChild(moreEl);
  }

  // Smooth height sync (useSmoothHeight equivalent)
  chipsOuter.style.height = `${chipsInner.offsetHeight}px`;
  requestAnimationFrame(() => {
    chipsOuter.setAttribute('data-smooth', '');
  });
}

function renderGenreFilters() {
  const rootEl = document.getElementById('cleanFilterMenuRoot');
  const clearBtn = document.getElementById('fmcClearBtn');
  const listEl = document.getElementById('fmcGroupsList');
  if (!rootEl || !clearBtn || !listEl) return;

  const chips = getActiveFilterChips();
  clearBtn.disabled = chips.length === 0;

  // 상단 간결한 필터 바의 '장르 · 별점' 트리거 버튼 뱃지 업데이트
  const triggerBtn = document.getElementById('btnToggleFilterPopover');
  const triggerBadge = document.getElementById('fmcTriggerBadge');
  if (triggerBtn && triggerBadge) {
    if (chips.length > 0) {
      triggerBadge.style.display = 'inline-block';
      triggerBadge.textContent = String(chips.length);
      triggerBtn.classList.add('has-active');
    } else {
      triggerBadge.style.display = 'none';
      triggerBtn.classList.remove('has-active');
    }
  }

  // Render active filter chips row
  placeFilterChipsLine();

  // Render collapsible groups (장르, 별점)
  listEl.innerHTML = '';
  FILTER_MENU_GROUPS.forEach((g, gi) => {
    const isOpen = state.filterMenuOpen.has(g.id);
    const count = new Set(pickedInGroup(g.id).filter((id) => g.options.some((o) => o.id === id))).size;
    const gKey = `g:${gi}`;
    const panelId = `fmc-panel-${gi}`;

    const section = document.createElement('section');
    section.className = 'ui-fmc__group';
    if (isOpen) section.setAttribute('data-open', '');

    const headBtn = document.createElement('button');
    headBtn.type = 'button';
    headBtn.className = 'ui-fmc__group-head';
    headBtn.setAttribute('data-key', gKey);
    headBtn.tabIndex = state.filterMenuFocus === gKey || (state.filterMenuFocus === null && gi === 0) ? 0 : -1;
    headBtn.setAttribute('aria-expanded', String(isOpen));
    headBtn.setAttribute('aria-controls', panelId);

    headBtn.innerHTML = `
      <svg class="ui-fmc__chevron" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4.5 6.25 8 9.75l3.5-3.5" />
      </svg>
      <span class="ui-fmc__group-label" dir="auto" title="${g.label}">${g.label}</span>
      <span class="ui-fmc__group-count">${g.options.length.toLocaleString('en-US')}</span>
      <span class="ui-fmc__group-picked" aria-live="polite">
        ${count > 0 ? `<span class="ui-fmc__roll">${count} filter${count === 1 ? '' : 's'}</span>` : ''}
      </span>
    `;

    headBtn.addEventListener('focus', () => {
      state.filterMenuFocus = gKey;
    });
    headBtn.addEventListener('click', () => {
      toggleFilterGroup(g.id);
    });

    const panel = document.createElement('div');
    panel.className = 'ui-fmc__panel';
    panel.id = panelId;
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', g.label);

    const panelInner = document.createElement('div');
    panelInner.className = 'ui-fmc__panel-inner';

    g.options.forEach((o, oi) => {
      const key = `o:${gi}:${oi}`;
      const on = isFilterOptionOn(g.id, o.id);

      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.setAttribute('role', 'checkbox');
      optBtn.setAttribute('aria-checked', String(on));
      optBtn.className = 'ui-fmc__option';
      optBtn.setAttribute('data-key', key);
      optBtn.tabIndex = isOpen && state.filterMenuFocus === key ? 0 : -1;

      optBtn.innerHTML = `
        <span class="ui-fmc__box" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="m4.25 8.25 2.5 2.5 5-5.5" />
          </svg>
        </span>
        <span class="ui-fmc__option-label" dir="auto" title="${o.label}">${o.label}</span>
      `;

      optBtn.addEventListener('focus', () => {
        state.filterMenuFocus = key;
      });
      optBtn.addEventListener('click', () => {
        toggleFilterOption(g.id, o.id);
      });

      panelInner.appendChild(optBtn);
    });

    panel.appendChild(panelInner);
    section.appendChild(headBtn);
    section.appendChild(panel);
    listEl.appendChild(section);
  });

  if (state.filterMenuFocus) {
    const activeFocused = listEl.querySelector(`[data-key="${CSS.escape(state.filterMenuFocus)}"]`);
    if (activeFocused && document.activeElement && listEl.contains(document.activeElement)) {
      activeFocused.focus();
    }
  }

  if (!fmcResizeObserverInitialized && typeof ResizeObserver !== 'undefined') {
    const chipsInner = document.getElementById('fmcChipsInner');
    if (chipsInner) {
      fmcResizeObserverInitialized = true;
      const ro = new ResizeObserver(() => {
        placeFilterChipsLine();
      });
      ro.observe(chipsInner);
    }
  }
}

// 5. '내 책장' 화면: 5단 일체형 원목 입체 책장 렌더링 (책이 없거나 적어도 항상 5단 원목 책장 구조 유지)
function renderFullYearBookshelf() {
  const container = document.getElementById('fullYearShelfContainer');
  if (!container) return;
  container.innerHTML = '';

  const pickedGenres = pickedInGroup('genre');
  const pickedRatings = pickedInGroup('rating');

  const filteredBooks = state.books.filter((b) => {
    const matchYear = state.shelfFilterYear === 'ALL' || (Number(b.year) || 2026) === Number(state.shelfFilterYear);
    const matchMonth = state.shelfFilterMonth === 'ALL' || Number(b.month) === Number(state.shelfFilterMonth);
    const matchGenre = pickedGenres.length === 0 || pickedGenres.includes(b.genre);
    const matchRating =
      pickedRatings.length === 0 || pickedRatings.includes(String(Math.round(Number(b.rating) || 0)));
    return matchYear && matchMonth && matchGenre && matchRating;
  });

  // 책장 상단 중앙 권수 라벨 (예: "36권" 또는 필터 적용 시 "2026년 · 12권")
  const activeFilterParts = [];
  if (state.shelfFilterYear !== 'ALL') activeFilterParts.push(`${state.shelfFilterYear}년`);
  if (state.shelfFilterMonth !== 'ALL') activeFilterParts.push(`${state.shelfFilterMonth}월`);
  if (pickedGenres.length > 0) {
    activeFilterParts.push(pickedGenres.map((c) => (GENRES[c] ? GENRES[c].name : c)).join(', '));
  }
  if (pickedRatings.length > 0) {
    activeFilterParts.push(pickedRatings.map((r) => `★${r}`).join(', '));
  }

  const countTextEl = document.getElementById('shelfFilteredCountText');
  if (countTextEl) {
    countTextEl.textContent =
      activeFilterParts.length > 0
        ? `${activeFilterParts.join(' · ')} (${filteredBooks.length}권)`
        : `${filteredBooks.length}권`;
  }

  // 한 단의 가용 너비에 맞춰 책들의 실제 두께(width) 합산으로 선반 줄바꿈 계산 + 최소 5단 보장
  const maxRowPx = state.wideView ? 660 : 380;
  const tiers = [];
  let currentTier = [];
  let currentWidth = 0;

  filteredBooks.forEach((book) => {
    const { width } = computeSpineDimensions(book);
    if (currentTier.length > 0 && currentWidth + width + 2 > maxRowPx) {
      tiers.push(currentTier);
      currentTier = [book];
      currentWidth = width;
    } else {
      currentTier.push(book);
      currentWidth += width + 1.5;
    }
  });
  if (currentTier.length > 0) {
    tiers.push(currentTier);
  }

  const totalTiers = Math.max(5, tiers.length);

  for (let i = 0; i < totalTiers; i++) {
    const tierBooks = tiers[i] || [];

    const tierEl = document.createElement('div');
    tierEl.className = 'bookcase-tier';

    const rowEl = document.createElement('div');
    rowEl.className = 'bookcase-tier-row';

    tierBooks.forEach((b) => {
      rowEl.appendChild(createBookSpineElement(b));
    });

    const plankEl = document.createElement('div');
    plankEl.className = 'bookcase-tier-plank';

    tierEl.appendChild(rowEl);
    tierEl.appendChild(plankEl);
    container.appendChild(tierEl);
  }
}

// 6. 책 클릭 시 상세 정보 모달 (실제 도서 표지 이미지 + 서지 데이터 + 본인 작성 감상평 표시)
function openBookDetailModal(book) {
  const g = GENRES[book.genre] || GENRES.FIC;
  const sheet = document.getElementById('bookDetailSheet');
  const { isbn, coverUrl } = resolveBookImages(book);

  sheet.innerHTML = `
    <div class="modal-top-bar">
      <span class="sticker-tag">
        <span class="sticker-swatch" style="background:${g.color};"></span>
        <span>${g.name}</span>
      </span>
      <button class="button-icon-circular" id="btnCloseDetailModal">✕</button>
    </div>

    <div style="display:flex; gap:16px; margin-bottom:16px;">
      <div id="detailCoverWrap" style="width:82px; height:118px; border-radius:6px; background:${g.color}; color:${g.textColor}; overflow:hidden; flex-shrink:0; box-shadow:0 4px 12px rgba(0,0,0,0.16); position:relative; display:flex; flex-direction:column; justify-content:space-between; text-align:center; font-weight:700; padding:10px 6px;">
        <span style="font-size:10px; opacity:0.8;">${g.code}</span>
        <span style="font-size:12px; line-height:1.2; overflow:hidden;">${book.title}</span>
        <span style="font-size:9px; font-weight:400; opacity:0.85;">${book.author || ''}</span>
      </div>
      <div style="flex:1;">
        <h3 class="heading-3" style="margin-bottom:4px;">${book.title}</h3>
        <p style="font-size:14px; color:var(--ink-secondary); margin-bottom:8px;">
          ${book.author || '저자 미상'} ${book.publisher ? `· ${book.publisher}` : ''}
        </p>
        <div style="font-size:12.5px; color:var(--ink-muted); margin-bottom:8px;">
          📖 ${book.pages || 300}쪽 · 🗓 ${book.year || 2026}년 ${book.month}월 완독
          ${isbn ? `<br/>🔢 ISBN: ${isbn}` : ''}
          ${book.tag ? ` · 🏷 ${book.tag}` : ''}
        </div>
        <div style="font-size:18px; font-weight:700; color:var(--primary);">
          ★ ${Math.round(Number(book.rating))}점 <span style="font-size:12px; color:var(--ink-faint); font-weight:400;">/ 5점</span>
        </div>
      </div>
    </div>

    ${
      book.note
        ? `<div style="background:var(--canvas-soft); border:1px solid var(--hairline); padding:12px; border-radius:8px; font-size:13.5px; color:var(--ink-secondary); margin-bottom:16px;">
            <strong>내 감상평:</strong> ${book.note}
          </div>`
        : ''
    }

    <div style="display:flex; justify-content:flex-end; gap:8px;">
      <button type="button" class="button-utility" id="btnDeleteBook" style="color:#d93025;">🗑 책장에서 제거</button>
    </div>
  `;

  if (coverUrl) {
    const detailCoverWrap = document.getElementById('detailCoverWrap');
    const coverImg = document.createElement('img');
    coverImg.src = coverUrl;
    coverImg.alt = book.title || '';
    coverImg.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:6px;';
    coverImg.onerror = () => coverImg.remove();
    detailCoverWrap.appendChild(coverImg);
  }

  document.getElementById('bookDetailModal').classList.add('open');
  document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
    document.getElementById('bookDetailModal').classList.remove('open');
  });
  document.getElementById('btnDeleteBook').addEventListener('click', () => {
    state.books = state.books.filter((b) => b.id !== book.id);
    saveState();
    renderAll();
    document.getElementById('bookDetailModal').classList.remove('open');
    showToast(`'${book.title}' 도서를 책장에서 삭제했습니다.`);
  });
}

// 모달 내 실시간 책등(장르 색상 + 제목 + 두께 폭) & 실제 책 표지(coverUrl) 프리뷰 업데이트
function updateModalLiveSpinePreview() {
  const title = document.getElementById('fieldTitle').value.trim() || '홍학의 자리';
  const author = document.getElementById('fieldAuthor').value.trim() || '정해연';
  const publisher = document.getElementById('fieldPublisher').value.trim() || '엘릭시르';
  const pages = Number(document.getElementById('fieldPages').value) || 336;
  const genreCode = document.getElementById('fieldGenre').value || 'MYS';
  const rating = Number(document.getElementById('fieldRatingNum').value) || 5;
  const g = GENRES[genreCode] || GENRES.FIC;

  const { isbn, coverUrl } = resolveBookImages({
    title,
    isbn: state.draftIsbn,
    coverUrl: state.draftCoverUrl
  });

  document.getElementById('previewTitleText').textContent = title;
  document.getElementById('previewSubText').textContent = `${author} · ${publisher} · ${pages}쪽 · ${g.name}`;

  const coverBox = document.getElementById('previewGraphicCover');
  if (coverBox) {
    coverBox.style.backgroundColor = g.color;
    coverBox.style.color = g.textColor;
    coverBox.style.position = 'relative';
    coverBox.style.overflow = 'hidden';
    document.getElementById('previewCoverGenre').textContent = g.code;
    document.getElementById('previewCoverTitle').textContent = title;
    document.getElementById('previewCoverAuthor').textContent = author;

    const oldImg = coverBox.querySelector('.live-preview-cover-img');
    if (oldImg) oldImg.remove();

    if (coverUrl) {
      const cImg = document.createElement('img');
      cImg.className = 'live-preview-cover-img';
      cImg.src = coverUrl;
      cImg.alt = title;
      cImg.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:4px;';
      cImg.onerror = () => cImg.remove();
      coverBox.appendChild(cImg);
    }
  }

  const wrap = document.getElementById('miniSpinePreviewWrap');
  wrap.innerHTML = '';
  const previewSpine = createBookSpineElement({
    title,
    author,
    pages,
    genre: genreCode,
    rating,
    isbn,
    coverUrl
  });
  previewSpine.style.height = '92px';
  wrap.appendChild(previewSpine);
}

function applyBookDataToForm(book, statusMsg = '도서 서지 및 표지 이미지 자동 입력됨') {
  document.getElementById('fieldTitle').value = book.title || '';
  document.getElementById('fieldAuthor').value = book.author || '';
  document.getElementById('fieldPublisher').value = book.publisher || '';
  document.getElementById('fieldPages').value = book.pages || 300;
  document.getElementById('fieldGenre').value = GENRES[book.genre] ? book.genre : 'FIC';

  const resolved = resolveBookImages(book);
  state.draftIsbn = resolved.isbn || book.isbn || '';
  state.draftCoverUrl = resolved.coverUrl || '';
  document.getElementById('previewStatusBadge').textContent = `✓ ${statusMsg}`;
  updateModalLiveSpinePreview();
}

// 카테고리 문자열 -> 앱 내 7대 장르 코드 매핑 (시·희곡 제외)
function mapCategoryToGenreClient(categories = [], title = '') {
  const joined = `${categories.join(' ')} ${title}`.toLowerCase();
  if (/mystery|thriller|crime|detective|추리|미스터리|스릴러/.test(joined)) return 'MYS';
  if (/fantasy|science fiction|magic|판타지|마법|sf/.test(joined)) return 'FAN';
  if (/science|physics|biology|nature|mathematics|technology|과학|물리|생물|우주|유전자/.test(joined)) return 'SCI';
  if (/philosophy|ethics|religion|철학|윤리|사상|명상록/.test(joined)) return 'PHI';
  if (/essay|humor|literary collections|에세이|산문|수필/.test(joined)) return 'ESS';
  if (/history|social|psychology|biography|business|인문|역사|사회|심리|경제/.test(joined)) return 'HUM';
  return 'FIC';
}

// Google Books JSONP 폴백 헬퍼 (익명 fetch가 429/CORS로 제한될 때 우회)
function fetchGoogleBooksJsonp(queryForApi) {
  return new Promise((resolve) => {
    const cbName = '__gb_cb_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const script = document.createElement('script');
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        resolve([]);
      }
    }, 3500);

    function cleanup() {
      clearTimeout(timer);
      try {
        delete window[cbName];
      } catch (e) {
        window[cbName] = undefined;
      }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[cbName] = (data) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (data && Array.isArray(data.items)) {
        resolve(data.items);
      } else {
        resolve([]);
      }
    };

    script.onerror = () => {
      if (!settled) {
        settled = true;
        cleanup();
        resolve([]);
      }
    };

    script.src = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(queryForApi)}&maxResults=8&printType=books&callback=${cbName}`;
    document.head.appendChild(script);
  });
}

function mapGoogleItemsToBooks(items) {
  return items.map((item) => {
    const info = item.volumeInfo || {};
    const ids = info.industryIdentifiers || [];
    const isbnObj = ids.find((i) => i.type === 'ISBN_13') || ids[0] || {};
    const isbn = isbnObj.identifier || '';
    const googleThumb =
      info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)
        ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail).replace(/^http:/i, 'https:')
        : '';
    const resolved = resolveBookImages({ isbn, coverUrl: googleThumb });
    return {
      title: info.title || '제목 미상',
      author: (info.authors || ['저자 미상']).join(', '),
      publisher: info.publisher || '',
      pages: info.pageCount || 300,
      isbn,
      coverUrl: resolved.coverUrl,
      genre: mapCategoryToGenreClient(info.categories || [], info.title || '')
    };
  });
}

// 제목이 상품 코드(S000...)나 도메인 주소인지 검사하는 필터
function isInvalidExtractedTitle(t = '') {
  const s = t.trim();
  if (!s) return true;
  if (/^S\d{8,}$/i.test(s)) return true;
  if (/^\d{7,}$/.test(s)) return true;
  if (/^(kyobobook|yes24|aladin|product\.kyobobook)/i.test(s)) return true;
  if (/^(교보문고|예스24|알라딘)$/i.test(s)) return true;
  return false;
}

// 서점 링크(교보문고, 예스24, 알라딘 등) HTML에서 저작권 무관 '순수 서지 사실(제목, 저자, 출판사, 쪽수, ISBN)'만 추출
function extractBookFactsFromHtmlClient(html = '') {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const getMeta = (sel) => {
    const el = doc.querySelector(sel);
    return el ? (el.getAttribute('content') || '').trim() : '';
  };

  let rawTitle =
    getMeta('meta[property="og:title"]') ||
    getMeta('meta[name="title"]') ||
    getMeta('meta[name="twitter:title"]') ||
    (doc.title || '').trim();

  let author =
    getMeta('meta[name="author"]') ||
    getMeta('meta[property="books:author"]') ||
    getMeta('meta[property="og:author"]') ||
    getMeta('meta[property="og:article:author"]');

  let publisher = '';

  // 교보문고/예스24/알라딘 사이트 접미사 제거 (예: "어두운 숲 | 전건우 - 교보문고")
  rawTitle = rawTitle
    .replace(/\s*[-|]\s*(교보문고|예스24|YES24|알라딘|Aladin|영풍문고|인터파크).*$/i, '')
    .replace(/^\[국내도서\]\s*/i, '')
    .replace(/^\[도서\]\s*/i, '')
    .trim();

  if (rawTitle.includes('|')) {
    const parts = rawTitle.split('|').map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      rawTitle = parts[0];
      if (!author) author = parts[1];
      if (parts[2] && !publisher) publisher = parts[2];
    }
  }

  if (isInvalidExtractedTitle(rawTitle)) return null;

  const ogDesc = getMeta('meta[property="og:description"]') || getMeta('meta[name="description"]');
  if (ogDesc && (!author || !publisher)) {
    const descParts = ogDesc.split('|').map((s) => s.trim());
    if (descParts.length >= 2) {
      if (!author && /(지은이|저자|글|저)/.test(descParts[0])) {
        author = descParts[0].replace(/\s*\((지은이|저자|글|옮긴이)\).*$/, '').trim();
      } else if (!author && descParts[0].length < 20) {
        author = descParts[0].trim();
      }
      if (!publisher && descParts[1].length < 25 && !/\.(co\.kr|com|net)$/i.test(descParts[1])) {
        publisher = descParts[1].trim();
      }
    }
  }

  // 교보문고·예스24 본문 DOM 요소에서 저자/출판사 정확히 추출
  if (!publisher) {
    const pubEl = doc.querySelector('a.btn_publish_link, .gd_pub a, .pub_name');
    if (pubEl && pubEl.textContent.trim()) {
      publisher = pubEl.textContent.trim();
    }
  }
  if (!author) {
    const authEl = doc.querySelector('.author a, .gd_auth a');
    if (authEl && authEl.textContent.trim()) {
      author = authEl.textContent.trim();
    }
  }

  if (publisher && /\.(co\.kr|com|net)$/i.test(publisher)) {
    publisher = '';
  }

  // 본문 텍스트에서 쪽수(예: 280쪽, 336쪽) 및 13자리 ISBN(978.../979...) 사실 정보 추출
  const pageMatch = html.match(/(\d{2,4})\s*쪽/);
  const pages = pageMatch ? Number(pageMatch[1]) : 300;

  const isbnMeta = getMeta('meta[property="books:isbn"]');
  const isbnMatch = isbnMeta.match(/(97[89]\d{10})/) || html.match(/(97[89]\d{10})/);
  const isbn = isbnMatch ? isbnMatch[1] : '';
  const ogImage = getMeta('meta[property="og:image"]');
  const resolved = resolveBookImages({ isbn, coverUrl: ogImage });

  return {
    title: rawTitle,
    author: author || '저자 직접 입력 가능',
    publisher: publisher || '',
    pages: pages >= 20 && pages <= 2500 ? pages : 300,
    isbn,
    coverUrl: resolved.coverUrl,
    genre: mapCategoryToGenreClient([ogDesc, rawTitle], rawTitle)
  };
}

// Jina Reader 텍스트 응답에서 서지 사실 정보 추출 (교보문고 등 SSR/동적 페이지 지원)
function extractBookFactsFromReaderText(text = '') {
  if (!text) return null;
  const titleLine = text.match(/^Title:\s*(.+)$/m);
  if (!titleLine) return null;

  let rawTitle = titleLine[1]
    .replace(/\s*[-|]\s*(교보문고|예스24|YES24|알라딘|Aladin|영풍문고).*$/i, '')
    .replace(/^\[국내도서\]\s*/i, '')
    .trim();

  let author = '';
  let publisher = '';

  if (rawTitle.includes('|')) {
    const parts = rawTitle.split('|').map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      rawTitle = parts[0];
      author = parts[1];
      if (parts[2]) publisher = parts[2];
    }
  }

  if (isInvalidExtractedTitle(rawTitle)) return null;

  if (!author) {
    const authMatch = text.match(/([^\n|\[\]]{2,15})\s*저자\(글\)/);
    if (authMatch) author = authMatch[1].replace(/\[|\]/g, '').trim();
  }
  if (!publisher) {
    const pubMatch =
      text.match(/출판사\s*[:|]?\s*\[?([^\]\n·|]{1,20})\]?/) ||
      text.match(/저자\(글\)\s*·\s*\[?([^\]\n·|]{1,20})\]?\s*·\s*\d{4}년/);
    if (pubMatch) publisher = pubMatch[1].trim();
  }

  const pageMatch = text.match(/(\d{2,4})\s*쪽/);
  const pages = pageMatch ? Number(pageMatch[1]) : 300;

  const isbnMatch = text.match(/(97[89]\d{10})/);
  const isbn = isbnMatch ? isbnMatch[1] : '';
  const resolved = resolveBookImages({ isbn });

  return {
    title: rawTitle,
    author: author || '저자 직접 입력 가능',
    publisher: publisher && !/\.(co\.kr|com)$/i.test(publisher) ? publisher : '',
    pages: pages >= 20 && pages <= 2500 ? pages : 300,
    isbn,
    coverUrl: resolved.coverUrl,
    genre: mapCategoryToGenreClient([text.slice(0, 800)], rawTitle)
  };
}

// 도서 링크(URL)에서 순수 서지 사실 데이터만 불러오기 (내장 상품코드 -> 로컬 서버 -> Jina Reader -> 공개 CORS 프록시 순차 시도)
async function fetchBookFactsFromLink(targetUrl) {
  // 0) URL 내 상품 코드(S000...)나 ISBN(978.../979...)이 내장 서지 DB에 있는 경우 즉시 반환
  const matchedCatalogBook = FACTUAL_FALLBACK_CATALOG.find(
    (b) => (b.productCode && targetUrl.includes(b.productCode)) || (b.isbn && targetUrl.includes(b.isbn))
  );
  if (matchedCatalogBook) {
    return matchedCatalogBook;
  }

  // 1) 로컬 서버(http://localhost:3000/api/parse-url 및 /api/parse-url) 호출 (한국 사용자 PC IP에서 직접 조회하므로 차단 없음)
  const localEndpoints = [
    `http://localhost:3000/api/parse-url?url=${encodeURIComponent(targetUrl)}`,
    `/api/parse-url?url=${encodeURIComponent(targetUrl)}`
  ];
  for (const ep of localEndpoints) {
    try {
      const localRes = await fetch(ep);
      if (localRes.ok) {
        const localData = await localRes.json();
        if (localData && localData.ok && localData.book && !isInvalidExtractedTitle(localData.book.title)) {
          return localData.book;
        }
      }
    } catch (e) {
      // 다음 방법으로 진행
    }
  }

  // 2) Jina Reader (https://r.jina.ai/...) — 동적 렌더링 페이지에서도 제목·저자·출판사·쪽수·ISBN을 깔끔하게 추출
  try {
    const jinaRes = await fetch(`https://r.jina.ai/${targetUrl}`, {
      headers: { 'X-Return-Format': 'markdown' }
    });
    if (jinaRes.ok) {
      const jinaText = await jinaRes.text();
      const parsedJina = extractBookFactsFromReaderText(jinaText);
      if (parsedJina) return parsedJina;
    }
  } catch (e) {
    // 다음 프록시 시도
  }

  // 3) 브라우저 직접 열기 환경을 위한 공개 CORS 프록시 (corsproxy / allorigins / codetabs)
  const proxyUrls = [
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
  ];
  for (const pUrl of proxyUrls) {
    try {
      const res = await fetch(pUrl);
      if (res.ok) {
        const htmlText = await res.text();
        const parsed = extractBookFactsFromHtmlClient(htmlText);
        if (parsed) return parsed;
      }
    } catch (e) {
      // 다음 프록시 시도
    }
  }

  // 4) allorigins JSON 래퍼 폴백
  try {
    const aoRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
    if (aoRes.ok) {
      const aoData = await aoRes.json();
      if (aoData && aoData.contents) {
        const parsed = extractBookFactsFromHtmlClient(aoData.contents);
        if (parsed) return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

// 통합 스마트 도서 검색 (도서 링크(URL) 서지 추출 + 내장 한국 베스트셀러 DB + 무료 도서 Open API 다중 연동)
async function handleUnifiedBookLookup(customQuery) {
  const rawInput = (customQuery !== undefined ? customQuery : document.getElementById('inputSmartLookup').value).trim();
  const listEl = document.getElementById('searchResultsList');
  listEl.style.display = 'block';

  if (!rawInput) {
    renderSearchResultItems(FACTUAL_FALLBACK_CATALOG.slice(0, 10), listEl, '추천 도서 목록', '');
    return;
  }

  // 0) 사용자가 서점 도서 링크(http:// 또는 https://)를 넣었을 때: 링크에서 순수 서지 사실(제목·작가·출판사·쪽수·ISBN) 추출!
  if (/^https?:\/\//i.test(rawInput)) {
    listEl.innerHTML =
      '<div style="padding:10px; font-size:12px; color:var(--ink-muted);">🔗 도서 링크에서 순수 서지 사실 정보(제목·작가·출판사·쪽수)를 추출하고 있습니다...</div>';

    const linkBook = await fetchBookFactsFromLink(rawInput);
    if (linkBook && !isInvalidExtractedTitle(linkBook.title)) {
      // 추출된 ISBN이나 제목으로 내장 DB 또는 Google Books API에서 출판사/쪽수 보완
      let finalBook = { ...linkBook };
      const localMatch = FACTUAL_FALLBACK_CATALOG.find(
        (b) => (linkBook.isbn && b.isbn === linkBook.isbn) || b.title === linkBook.title
      );
      if (localMatch) {
        finalBook = { ...finalBook, ...localMatch };
      } else if (!finalBook.publisher || finalBook.pages === 300) {
        try {
          const q = finalBook.isbn ? `isbn:${finalBook.isbn}` : finalBook.title;
          const gItems = await fetchGoogleBooksJsonp(q);
          if (gItems && gItems.length > 0) {
            const gBook = mapGoogleItemsToBooks(gItems)[0];
            if (!finalBook.publisher && gBook.publisher) finalBook.publisher = gBook.publisher;
            if ((!finalBook.author || finalBook.author === '저자 직접 입력 가능') && gBook.author) {
              finalBook.author = gBook.author;
            }
            if (finalBook.pages === 300 && gBook.pages) finalBook.pages = gBook.pages;
            if (!finalBook.isbn && gBook.isbn) finalBook.isbn = gBook.isbn;
          }
        } catch (e) {
          // ignore
        }
      }

      renderSearchResultItems([finalBook], listEl, '도서 링크 서지 추출', rawInput);
      applyBookDataToForm(finalBook, `'${finalBook.title}' 도서 링크에서 서지 정보 자동 반영됨`);
      showToast(`🔗 '${finalBook.title}' (${finalBook.author}) 정보가 자동으로 채워졌습니다!`);
      return;
    }
  }

  listEl.innerHTML = '<div style="padding:10px; font-size:12px; color:var(--ink-muted);">🔍 통합 도서 데이터베이스에서 서지 정보를 조회하고 있습니다...</div>';

  // 1) 링크나 ISBN 입력 여부를 스마트하게 판별
  let queryForApi = rawInput;
  if (rawInput.includes('S000000781065')) {
    queryForApi = '9788954681155';
  } else {
    const isbnMatch = rawInput.match(/(97[89]\d{10})/);
    if (isbnMatch) {
      queryForApi = `isbn:${isbnMatch[1]}`;
    } else if (/^https?:\/\//i.test(rawInput)) {
      try {
        const u = new URL(rawInput);
        const qParam = u.searchParams.get('query') || u.searchParams.get('q') || u.searchParams.get('keyword');
        if (qParam) queryForApi = qParam;
      } catch (e) {
        // ignore URL parse error
      }
    }
  }

  const cleanQ = queryForApi.replace(/^isbn:/i, '').trim().toLowerCase();
  const compactQ = cleanQ.replace(/\s+/g, '');

  // 2) 내장 한국 베스트셀러·스테디셀러 서지 사실(Fact) 사전에서 우선 매칭 (띄어쓰기 무관 검색 지원)
  const localMatches = FACTUAL_FALLBACK_CATALOG.filter((b) => {
    const t = (b.title || '').toLowerCase();
    const a = (b.author || '').toLowerCase();
    const p = (b.publisher || '').toLowerCase();
    const isbn = (b.isbn || '').toLowerCase();
    return (
      t.includes(cleanQ) ||
      t.replace(/\s+/g, '').includes(compactQ) ||
      a.includes(cleanQ) ||
      a.replace(/\s+/g, '').includes(compactQ) ||
      isbn.includes(compactQ) ||
      p.includes(cleanQ)
    );
  });

  const combinedResults = [...localMatches];
  const seenKeys = new Set(localMatches.map((b) => `${b.title}|${b.author}`.toLowerCase()));
  const addUniqueBooks = (books) => {
    books.forEach((b) => {
      if (!b || !b.title) return;
      const k = `${b.title}|${b.author || ''}`.toLowerCase();
      if (!seenKeys.has(k)) {
        seenKeys.add(k);
        combinedResults.push(b);
      }
    });
  };

  // 로컬 매칭이 있으면 즉시 먼저 화면에 보여주면서 외부 API 결과도 이어서 가져옴
  if (combinedResults.length > 0) {
    renderSearchResultItems(combinedResults, listEl, '통합 도서 검색', rawInput);
  }

  // 3) 외부 무료 공식 도서 Open API 다중 조회 (Google Books -> JSONP -> Open Library -> 한국어 위키백과 도서 검색)
  let apiFound = false;

  // 3-A) Google Books Open API (fetch)
  try {
    const gRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(queryForApi)}&maxResults=8&printType=books`
    );
    if (gRes.ok) {
      const gData = await gRes.json();
      if (gData.items && gData.items.length > 0) {
        addUniqueBooks(mapGoogleItemsToBooks(gData.items));
        apiFound = true;
      }
    }
  } catch (e) {
    // fallback to next source
  }

  // 3-B) Google Books JSONP 폴백 (익명 fetch가 429 제한 등에 걸렸을 때)
  if (!apiFound) {
    try {
      const jsonpItems = await fetchGoogleBooksJsonp(queryForApi);
      if (jsonpItems && jsonpItems.length > 0) {
        addUniqueBooks(mapGoogleItemsToBooks(jsonpItems));
        apiFound = true;
      }
    } catch (e) {
      // fallback to next source
    }
  }

  // 3-C) Open Library 공식 무료 도서 API (API 키 불필요, 429 제한 없음, CORS 허용)
  if (!apiFound || combinedResults.length < 3) {
    try {
      const olUrl = queryForApi.startsWith('isbn:')
        ? `https://openlibrary.org/search.json?isbn=${encodeURIComponent(cleanQ)}&limit=6`
        : `https://openlibrary.org/search.json?q=${encodeURIComponent(cleanQ)}&limit=6`;
      const olRes = await fetch(olUrl);
      if (olRes.ok) {
        const olData = await olRes.json();
        if (olData.docs && olData.docs.length > 0) {
          const olBooks = olData.docs.map((doc) => ({
            title: doc.title || '제목 미상',
            author: Array.isArray(doc.author_name) ? doc.author_name.slice(0, 2).join(', ') : '저자 미상',
            publisher: Array.isArray(doc.publisher) ? doc.publisher[0] : '',
            pages: doc.number_of_pages_median || 300,
            isbn: Array.isArray(doc.isbn) ? doc.isbn[0] : '',
            genre: mapCategoryToGenreClient(doc.subject ? doc.subject.slice(0, 5) : [], doc.title || '')
          }));
          addUniqueBooks(olBooks);
          apiFound = true;
        }
      }
    } catch (e) {
      // fallback to next source
    }
  }

  // 3-D) 한국어 위키백과 도서/소설/작가 오픈 API (Google Books가 429 제한일 때 한국어 도서 검색 보완)
  if (combinedResults.length < 3 && !queryForApi.startsWith('isbn:')) {
    try {
      const wikiUrl = `https://ko.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        cleanQ + ' 책 소설 저자'
      )}&utf8=1&format=json&origin=*&srlimit=5`;
      const wRes = await fetch(wikiUrl);
      if (wRes.ok) {
        const wData = await wRes.json();
        const searchList = (wData.query && wData.query.search) || [];
        if (searchList.length > 0) {
          const wikiBooks = searchList.map((entry) => {
            const cleanSnippet = (entry.snippet || '').replace(/<[^>]+>/g, '');
            const authorMatch = cleanSnippet.match(/([가-힣a-zA-Z·\s]{2,12})\s*(?:지음|저자|작가|소설가|쓴|집필)/);
            const cleanTitle = entry.title.replace(/\s*\([^)]*\)\s*$/, '').trim();
            return {
              title: cleanTitle,
              author: authorMatch ? authorMatch[1].trim() : '작가 직접 입력 가능',
              publisher: '',
              pages: 300,
              isbn: '',
              genre: mapCategoryToGenreClient([cleanSnippet], cleanTitle)
            };
          });
          addUniqueBooks(wikiBooks);
        }
      }
    } catch (e) {
      // ignore error
    }
  }

  renderSearchResultItems(combinedResults, listEl, '통합 도서 검색', rawInput);

  if (combinedResults.length === 1 || (combinedResults.length > 0 && (rawInput.startsWith('http') || queryForApi.startsWith('isbn:')))) {
    applyBookDataToForm(combinedResults[0], `'${combinedResults[0].title}' 서지 정보 자동 반영됨`);
  }
}

function renderSearchResultItems(results, listEl, sourceLabel = '', rawQuery = '') {
  listEl.innerHTML = '';

  if (results && results.length > 0) {
    results.forEach((b) => {
      const g = GENRES[b.genre] || GENRES.FIC;
      const { coverUrl } = resolveBookImages(b);
      const item = document.createElement('div');
      item.className = 'search-row-item';
      item.innerHTML = `
        <div class="search-thumb-box" style="width:32px; height:44px; border-radius:3px; background:${g.color}; color:${g.textColor}; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; flex-shrink:0; position:relative; overflow:hidden;">
          <span>${g.code}</span>
        </div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:13px; font-weight:700; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${b.title}</div>
          <div style="font-size:11.5px; color:var(--ink-muted);">${b.author} ${b.publisher ? `· ${b.publisher}` : ''} · ${b.pages}쪽</div>
        </div>
        <span class="sticker-tag"><span class="sticker-swatch" style="background:${g.color};"></span>선택</span>
      `;
      if (coverUrl) {
        const thumbBox = item.querySelector('.search-thumb-box');
        const cImg = document.createElement('img');
        cImg.src = coverUrl;
        cImg.alt = b.title || '';
        cImg.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; object-fit:cover; border-radius:3px;';
        cImg.onerror = () => cImg.remove();
        thumbBox.appendChild(cImg);
      }
      item.addEventListener('click', () => {
        applyBookDataToForm(b, `'${b.title}' 선택됨 (${sourceLabel})`);
        listEl.style.display = 'none';
        showToast(`'${b.title}' 서지 및 표지/책등 이미지가 입력란에 채워졌습니다.`);
      });
      listEl.appendChild(item);
    });
  }

  // 검색어로 바로 입력란을 채울 수 있는 원클릭 직접 적용 항목을 항상 제공
  const cleanCustomTitle = (rawQuery || '').trim();
  if (cleanCustomTitle && !/^https?:\/\//i.test(cleanCustomTitle)) {
    const directItem = document.createElement('div');
    directItem.className = 'search-row-item';
    directItem.style.background = 'var(--canvas-soft)';
    directItem.innerHTML = `
      <div style="width:32px; height:44px; border-radius:3px; background:var(--primary); color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; flex-shrink:0;">
        ＋
      </div>
      <div style="flex:1; min-width:0;">
        <div style="font-size:13px; font-weight:700; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">'${cleanCustomTitle}' 제목으로 바로 입력하기</div>
        <div style="font-size:11.5px; color:var(--ink-muted);">탭하면 아래 제목란에 바로 채워지며 작가·쪽수를 자유롭게 입력할 수 있습니다</div>
      </div>
      <span class="sticker-tag">직접 적용</span>
    `;
    directItem.addEventListener('click', () => {
      applyBookDataToForm(
        {
          title: cleanCustomTitle,
          author: document.getElementById('fieldAuthor').value.trim() || '',
          publisher: document.getElementById('fieldPublisher').value.trim() || '',
          pages: Number(document.getElementById('fieldPages').value) || 300,
          isbn: '',
          genre: mapCategoryToGenreClient([], cleanCustomTitle)
        },
        `'${cleanCustomTitle}' 제목이 입력란에 반영됨`
      );
      listEl.style.display = 'none';
      document.getElementById('fieldAuthor').focus();
      showToast(`'${cleanCustomTitle}' 제목이 입력되었습니다. 작가명을 확인해 주세요!`);
    });
    listEl.appendChild(directItem);
  } else if (!results || results.length === 0) {
    listEl.innerHTML = '<div style="padding:10px; font-size:12px; color:var(--ink-muted);">일치하는 검색 결과가 없습니다. 아래 입력란에 직접 입력하여 등록하실 수 있습니다.</div>';
  }
}

function showToast(msg) {
  const toast = document.getElementById('notionToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function renderAll() {
  syncDateSelectors();
  renderHeroStats();
  renderSingleMonthBookshelf();
  renderMonthlyTracker();
  renderGenreFilters();
  renderFullYearBookshelf();
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderAll();

  // 초기 폼 기본값 세팅
  applyBookDataToForm({
    title: '홍학의 자리',
    author: '정해연',
    publisher: '엘릭시르',
    pages: 336,
    isbn: '9788954681155',
    genre: 'MYS'
  }, '검색창에서 도서를 찾거나 아래에서 직접 입력할 수 있습니다');

  // 화면 전환 이벤트 ('이달의 기록' <-> '내 책장')
  document.getElementById('navTabHome').addEventListener('click', () => switchView('home'));
  document.getElementById('navTabFullShelf').addEventListener('click', () => switchView('fullShelf'));
  const btnGoFullFromHome = document.getElementById('btnGoFullShelfFromHome');
  if (btnGoFullFromHome) {
    btnGoFullFromHome.addEventListener('click', () => switchView('fullShelf'));
  }

  // 홈 화면: 연도 & 월 선택 드롭다운
  document.getElementById('selectHomeYear').addEventListener('change', (e) => {
    state.selectedYear = Number(e.target.value);
    renderAll();
  });
  document.getElementById('selectHomeMonth').addEventListener('change', (e) => {
    state.selectedMonth = Number(e.target.value);
    renderAll();
  });

  // 내 책장 화면: 연도 & 월 필터 드롭다운
  document.getElementById('selectFullFilterYear').addEventListener('change', (e) => {
    state.shelfFilterYear = e.target.value;
    renderGenreFilters();
    renderFullYearBookshelf();
  });
  document.getElementById('selectFullFilterMonth').addEventListener('change', (e) => {
    state.shelfFilterMonth = e.target.value;
    renderGenreFilters();
    renderFullYearBookshelf();
  });
  document.getElementById('btnResetShelfFilters').addEventListener('click', () => {
    state.shelfFilterYear = 'ALL';
    state.shelfFilterMonth = 'ALL';
    state.filterMenuValue = { genre: [], rating: [] };
    syncDateSelectors();
    renderGenreFilters();
    renderFullYearBookshelf();
    showToast('내 책장 필터가 전체 도서 보기로 초기화되었습니다.');
  });

  // FilterMenu (Clean) 팝오버 열기/닫기 및 'Clear all' 버튼 이벤트
  const btnToggleFilterPopover = document.getElementById('btnToggleFilterPopover');
  const fmcPopoverLayer = document.getElementById('fmcPopoverLayer');
  if (btnToggleFilterPopover && fmcPopoverLayer) {
    btnToggleFilterPopover.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !fmcPopoverLayer.classList.contains('open');
      fmcPopoverLayer.classList.toggle('open', willOpen);
      btnToggleFilterPopover.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) {
        requestAnimationFrame(() => placeFilterChipsLine());
      }
    });

    document.addEventListener('click', (e) => {
      if (
        fmcPopoverLayer.classList.contains('open') &&
        !fmcPopoverLayer.contains(e.target) &&
        !btnToggleFilterPopover.contains(e.target)
      ) {
        fmcPopoverLayer.classList.remove('open');
        btnToggleFilterPopover.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const fmcClearBtn = document.getElementById('fmcClearBtn');
  if (fmcClearBtn) {
    fmcClearBtn.addEventListener('click', () => {
      clearAllFilterMenu();
    });
  }

  const fmcGroupsList = document.getElementById('fmcGroupsList');
  if (fmcGroupsList) {
    fmcGroupsList.addEventListener('keydown', (e) => {
      const rows = getFilterMenuRows();
      const i = rows.findIndex((r) => keyOfFilterRow(r) === state.filterMenuFocus);
      const row = rows[i];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIdx = Math.max(0, Math.min(rows.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)));
        const next = rows[nextIdx] || rows[0];
        if (next) moveToFilterRowKey(keyOfFilterRow(next));
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const targetRow = rows[e.key === 'Home' ? 0 : rows.length - 1];
        if (targetRow) moveToFilterRowKey(keyOfFilterRow(targetRow));
      } else if (row && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        const g = row.group.id;
        if (e.key === 'ArrowRight' && !state.filterMenuOpen.has(g)) {
          toggleFilterGroup(g);
        }
        if (e.key === 'ArrowLeft') {
          if (state.filterMenuOpen.has(g)) toggleFilterGroup(g);
          moveToFilterRowKey(`g:${row.gi}`);
        }
      } else if (row && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (row.kind === 'group') toggleFilterGroup(row.group.id);
        else toggleFilterOption(row.group.id, row.option.id);
      }
    });
  }

  // 이전 달 / 다음 달 화살표 버튼
  document.getElementById('btnPrevMonth').addEventListener('click', () => {
    if (state.selectedMonth > 1) {
      state.selectedMonth -= 1;
    } else {
      state.selectedYear = Math.max(2025, state.selectedYear - 1);
      state.selectedMonth = 12;
    }
    renderAll();
  });
  document.getElementById('btnNextMonth').addEventListener('click', () => {
    if (state.selectedMonth < 12) {
      state.selectedMonth += 1;
    } else {
      state.selectedYear = Math.min(2027, state.selectedYear + 1);
      state.selectedMonth = 1;
    }
    renderAll();
  });

  const appRootEl = document.getElementById('appRoot');
  document.getElementById('btnToggleWideView').addEventListener('click', () => {
    state.wideView = !state.wideView;
    appRootEl.classList.toggle('wide-mode', state.wideView);
    renderFullYearBookshelf();
  });

  // 서재 타이틀 클릭
  document.getElementById('libraryTitleText').addEventListener('click', () => {
    if (state.activeView !== 'home') {
      switchView('home');
    } else {
      const next = prompt('새 서재 이름을 입력하세요:', document.getElementById('libraryTitleText').textContent);
      if (next && next.trim()) {
        document.getElementById('libraryTitleText').textContent = next.trim();
      }
    }
  });

  // 책 추가 모달 열기/닫기
  const addModal = document.getElementById('addBookModal');
  const openModal = () => {
    document.getElementById('fieldYear').value = String(state.selectedYear);
    document.getElementById('fieldMonth').value = String(state.selectedMonth);
    addModal.classList.add('open');
    updateModalLiveSpinePreview();
  };
  document.getElementById('btnOpenAddModal').addEventListener('click', openModal);
  document.getElementById('btnCloseAddModal').addEventListener('click', () => {
    addModal.classList.remove('open');
  });

  // 통합 스마트 검색 이벤트 (엔터, 검색 버튼, 그리고 도서 링크 붙여넣기 시 즉시 자동 추출)
  document.getElementById('btnSmartLookup').addEventListener('click', () => handleUnifiedBookLookup());
  document.getElementById('inputSmartLookup').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUnifiedBookLookup();
    }
  });
  document.getElementById('inputSmartLookup').addEventListener('paste', () => {
    setTimeout(() => {
      const val = document.getElementById('inputSmartLookup').value.trim();
      if (/^https?:\/\//i.test(val)) {
        handleUnifiedBookLookup(val);
      }
    }, 60);
  });

  // 빠른 예시 검색 버튼
  document.querySelectorAll('.quick-query-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      document.getElementById('inputSmartLookup').value = q;
      handleUnifiedBookLookup(q);
    });
  });

  // 모달 내 정수 별점(0, 1, 2, 3, 4, 5) 선택 버튼 이벤트
  const ratingHiddenInput = document.getElementById('fieldRatingNum');
  document.querySelectorAll('.int-star-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.int-star-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      ratingHiddenInput.value = btn.dataset.rating;
      updateModalLiveSpinePreview();
    });
  });

  ['fieldTitle', 'fieldAuthor', 'fieldPublisher', 'fieldPages', 'fieldGenre'].forEach((id) => {
    document.getElementById(id).addEventListener('input', updateModalLiveSpinePreview);
  });

  // 책장에 새 책 등록
  document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const targetYear = Number(document.getElementById('fieldYear').value) || 2026;
    const targetMonth = Number(document.getElementById('fieldMonth').value) || 11;

    const titleVal = document.getElementById('fieldTitle').value.trim();
    const resolvedImgs = resolveBookImages({
      title: titleVal,
      isbn: state.draftIsbn,
      coverUrl: state.draftCoverUrl
    });

    const newBook = {
      id: 'b-' + Date.now(),
      title: titleVal,
      author: document.getElementById('fieldAuthor').value.trim(),
      publisher: document.getElementById('fieldPublisher').value.trim(),
      genre: document.getElementById('fieldGenre').value,
      pages: Number(document.getElementById('fieldPages').value) || 300,
      year: targetYear,
      month: targetMonth,
      rating: Math.max(0, Math.min(5, Math.round(Number(document.getElementById('fieldRatingNum').value) || 0))),
      tag: document.getElementById('fieldTag').value.trim(),
      note: document.getElementById('fieldNote').value.trim(),
      isbn: resolvedImgs.isbn || state.draftIsbn,
      coverUrl: resolvedImgs.coverUrl || ''
    };

    state.books.push(newBook);
    state.selectedYear = targetYear;
    state.selectedMonth = targetMonth;
    saveState();
    renderAll();
    addModal.classList.remove('open');
    showToast(`📚 '${newBook.title}' 도서가 ${targetYear}년 ${targetMonth}월 책장에 꽂혔습니다!`);
  });

  // 내 독서 기록 백업(.json 파일 다운로드)
  const btnExportBackup = document.getElementById('btnExportBackup');
  if (btnExportBackup) {
    btnExportBackup.addEventListener('click', () => {
      const dataStr = JSON.stringify({ exportedAt: new Date().toISOString(), books: state.books }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `reading-log-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      showToast(`💾 총 ${state.books.length}권의 독서 기록이 파일로 저장되었습니다.`);
    });
  }

  // 백업 파일(.json) 불러오기
  const btnImportBackup = document.getElementById('btnImportBackup');
  const inputBackupFile = document.getElementById('inputBackupFile');
  if (btnImportBackup && inputBackupFile) {
    btnImportBackup.addEventListener('click', () => inputBackupFile.click());
    inputBackupFile.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (Array.isArray(parsed.books)) {
            state.books = parsed.books.map((b) => ({
              ...b,
              year: Number(b.year) || 2026,
              rating: Math.max(0, Math.min(5, Math.round(Number(b.rating) || 0)))
            }));
            saveState();
            renderAll();
            showToast(`📂 백업 파일에서 ${state.books.length}권의 기록을 불러왔습니다.`);
          }
        } catch (err) {
          showToast('올바른 백업 파일(.json)이 아닙니다.');
        }
      };
      reader.readAsText(file);
      inputBackupFile.value = '';
    });
  }

  // APK 안내 모달
  document.getElementById('btnApkGuide').addEventListener('click', () => {
    const sheet = document.getElementById('bookDetailSheet');
    sheet.innerHTML = `
      <div class="modal-top-bar">
        <h3 class="heading-3">📦 Android APK 빌드 및 설치 방법</h3>
        <button class="button-icon-circular" onclick="document.getElementById('bookDetailModal').classList.remove('open')">✕</button>
      </div>
      <div style="font-size:14px; color:var(--ink-secondary); line-height:1.55; display:flex; flex-direction:column; gap:12px;">
        <div style="background:var(--canvas-soft); border:1px solid var(--hairline); padding:12px; border-radius:8px;">
          <strong>1. Capacitor로 안드로이드 .apk 파일 생성</strong><br/>
          프로젝트 폴더에 설정된 <code>capacitor.config.json</code>을 이용해 터미널에서 <code>npx @capacitor/cli add android</code> 후 Android Studio에서 <strong>Build &gt; Build APK(s)</strong>를 실행하면 <code>app-debug.apk</code>가 생성됩니다.
        </div>
        <div style="background:var(--canvas-soft); border:1px solid var(--hairline); padding:12px; border-radius:8px;">
          <strong>2. 안드로이드 폰에서 바로 앱으로 설치 (PWA)</strong><br/>
          안드로이드 Chrome에서 접속 후 메뉴의 <strong>[앱 설치 / 홈 화면에 추가]</strong>를 선택하면 독립 실행형 앱으로 설치됩니다.
        </div>
      </div>
    `;
    document.getElementById('bookDetailModal').classList.add('open');
  });
});
