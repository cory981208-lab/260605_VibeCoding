const fs = require('fs');
const path = require('path');

const root = __dirname;

function page(relPath, title, tag, heading, desc, body) {
  const dir = path.join(root, path.dirname(relPath));
  fs.mkdirSync(dir, { recursive: true });
  const depth = relPath.split('/').length - 1;
  const rootPath = '../'.repeat(depth);
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${desc}">
  <title>${title} | 에이텍모빌리티</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${rootPath}styles.css">
</head>
<body>
  <main id="main-content" class="subpage">
    <section class="page-hero">
      <div class="container-wide page-hero-inner">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${rootPath}index.html">홈</a><span>/</span><span>${heading.replace(/&amp;/g, '&')}</span>
        </nav>
        <p class="section-tag">${tag}</p>
        <h1>${heading}</h1>
        <p class="page-hero-desc">${desc}</p>
      </div>
    </section>
    <section class="page-body">
      <div class="container-wide">${body}</div>
    </section>
  </main>
  <script>window.SITE_ROOT='${rootPath}';</script>
  <script src="${rootPath}layout.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(root, relPath), html, 'utf8');
}

const pages = [
  ['pages/business/payment.html', '교통요금결제시스템', 'Business', '교통요금결제시스템', '버스·철도·택시 교통요금 결제 솔루션을 제공합니다.', `
    <div class="content-card"><h2>사업 개요</h2><p>ATEC Mobility는 최고의 제품을 통해 최상의 가치를 제공합니다. 교통요금결제시스템 분야에서 축적된 기술력으로 국내외 시장을 선도하고 있습니다.</p></div>
    <div class="content-card"><h2>주요 제품</h2><ul><li>버스 승하차 단말기 (B650R)</li><li>광역철도 신형 자동발매기 (배리어프리)</li><li>버스 운전자 단말기 (B650D)</li><li>버스 운전자 표출장치 (B800)</li><li>교통카드 키오스크 (배리어프리)</li></ul></div>`],
  ['pages/business/smart.html', '스마트교통', 'Business', '스마트교통', 'OBE 단말기, BIS, DTG 등 스마트 교통 솔루션', `
    <div class="content-card"><h2>사업 개요</h2><p>스마트교통 분야의 최신 기술을 바탕으로 대중교통 운영 효율화와 승객 편의를 동시에 실현합니다.</p></div>
    <div class="content-card"><h2>주요 제품</h2><ul><li>OBE 통합단말기, OBE 운전자단말기</li><li>버스 승객용 안내모니터 30인치 와이드형</li><li>버스 승객용 안내모니터 24인치 일반형</li><li>BIS 시스템 · DTG 단말기</li><li>통·학원버스 단말기 · 자율주행 관제시스템</li></ul></div>`],
  ['pages/business/kiosk.html', '키오스크', 'Business', '키오스크', '교통카드 및 다양한 키오스크 솔루션', `
    <div class="content-card"><h2>키오스크 솔루션</h2><p>배리어프리 설계와 사용자 친화적 UI로 누구나 편리하게 이용할 수 있는 키오스크를 제공합니다.</p></div>`],
  ['pages/business/maintain.html', '시스템 유지보수', 'Business', '시스템 유지보수', '교통카드 시스템 유지보수 및 기술 지원', `
    <div class="content-card"><h2>유지보수 서비스</h2><p>에이텍모빌리티는 설치된 교통카드 및 단말기 시스템에 대한 전문적인 유지보수 서비스를 제공합니다.</p><ul><li>정기 점검 및 예방 정비</li><li>긴급 장애 대응</li><li>소프트웨어 업데이트</li><li>기술 지원 및 원격 모니터링</li></ul></div>`],
  ['pages/about/index.html', '회사소개', 'About', '에이텍모빌리티', '교통카드솔루션 분야의 선두기업', `
    <div class="content-card"><h2>회사 소개</h2><p>저희 에이텍모빌리티는 교통카드솔루션 분야의 지속적인 기술개발과 끊임없는 신제품 개발로 국내외 시장에서 높은 기술력과 고품질의 제품력을 인정받고 있습니다.</p><p>신기술(NeT)과 소프트웨어 품질인증(GS)을 획득하며 에이텍모빌리티만의 혁신적인 기술력을 인증받으며 힘찬 도약을 하고 있습니다.</p></div>
    <div class="content-card"><h2>사업 분야</h2><ul><li>교통요금결제시스템 (철도·버스·택시)</li><li>스마트교통 (BIS, DTG, OBE)</li><li>키오스크</li><li>시스템 유지보수</li></ul></div>`],
  ['pages/about/vision.html', '미션 & 비전', 'About', '미션 &amp; 비전', '세계 제일의 제품과 서비스', `
    <div class="content-card"><h2>비전</h2><p>에이텍모빌리티는 지속적인 연구개발과 공격적인 국내외 마케팅을 통해 교통카드솔루션 분야의 <strong>선두기업</strong>으로 도약하고자 합니다.</p></div>
    <div class="content-card"><h2>미션</h2><p>혁신적인 사고와 새로운 기술, 고품격의 서비스를 통해 고객감동을 위한 최고의 제품을 선사하여 세계 제일의 제품과 서비스를 제공하는 기업이 되겠습니다.</p></div>`],
  ['pages/about/location.html', '오시는 길', 'About', '오시는 길', '에이텍모빌리티 본사 위치 및 연락처', `
    <div class="content-card"><dl class="info-list">
      <div class="info-row"><dt>회사명</dt><dd>(주)에이텍모빌리티</dd></div>
      <div class="info-row"><dt>주소</dt><dd>경기도 성남시 (상세 주소는 공식 안내 참조)</dd></div>
      <div class="info-row"><dt>대표전화</dt><dd>031-000-0000</dd></div>
      <div class="info-row"><dt>이메일</dt><dd>contact@atecmobility.com</dd></div>
    </dl></div>`],
  ['pages/invest/public.html', '공시정보', 'Invest', '공시정보', '에이텍모빌리티 공시 및 경영 정보', `
    <div class="content-card"><h2>공시정보</h2><p>에이텍모빌리티의 공시 정보 및 경영 관련 자료를 확인하실 수 있습니다.</p></div>`],
  ['pages/invest/ir.html', 'IR 자료', 'Invest', 'IR 자료', '투자자를 위한 IR 자료실', `
    <div class="content-card"><h2>IR 자료실</h2><p>투자자 여러분을 위한 IR 자료 및 재무 정보를 제공합니다.</p></div>`],
  ['pages/news/notice.html', '공지사항', 'News', '공지사항', '에이텍모빌리티 공지사항', `
    <article class="news-item"><time>2026.05.19</time><h3>제61회 발명의 날 기념 대통령 표창 수상</h3><p>연구소 김승기 수석 대통령 표창 — 금융자동화 핵심 기술 국산화 및 포용적 기술 환경 조성에 기여</p></article>
    <article class="news-item"><time>2026.05.12</time><h3>제59회 과학의 날 기념 부총리 표창 수상</h3><p>세종지사 노승욱 이사 부총리 표창 — 공공교통 자율주행 및 관제 핵심기술의 현장 적용·표준화</p></article>
    <article class="news-item"><time>2025.12.11</time><h3>2025년 대한민국 엔지니어상 수상</h3><p>소남호 이사 수상 — 태그리스 게이트 기술 NeT 인증, 대중교통 시스템 혁신에 기여</p></article>`],
  ['pages/news/press.html', '보도자료', 'News', '보도자료', '에이텍모빌리티 보도자료', `
    <article class="news-item"><time>2025.11.10</time><h3>성남시 '2025년 고용우수기업' 선정</h3><p>청년 고용우수기업으로 선정되어 인증서와 현판을 수여받았습니다.</p></article>
    <article class="news-item"><time>2025.11.03</time><h3>도약(Jump-Up) 프로그램 서밋 참가</h3><p>유망 중기업 성장 지원 행사에 참여했습니다.</p></article>
    <article class="news-item"><time>2025.10.29</time><h3>경기도 유망중소기업 인증</h3><p>2025년 경기도 유망중소기업으로 선정되었습니다.</p></article>`],
  ['pages/news/gallery.html', '포토갤러리', 'News', '포토갤러리', '에이텍모빌리티 활동 사진', `
    <div class="content-card"><h2>포토갤러리</h2><p>에이텍모빌리티의 다양한 활동과 수상 기념 사진을 확인하실 수 있습니다.</p></div>`],
  ['pages/news/media.html', '미디어갤러리', 'News', '미디어갤러리', '에이텍모빌리티 영상 자료', `
    <article class="news-item"><time>2023.04</time><h3>ATEC T&amp; Company Introduction (ENG)</h3><p>에이텍모빌리티 영문 회사 소개 영상</p></article>
    <article class="news-item"><time>2023.04</time><h3>대중교통 단말기 기술의 혁신 (ATEC T&amp;)</h3><p>대중교통 단말기 기술 혁신 소개</p></article>
    <article class="news-item"><time>2023.04</time><h3>기업가정신 롤모델 에이텍 - 신승영 대표</h3><p>기업가정신 롤모델 인터뷰</p></article>`],
  ['pages/service/as.html', 'A/S 안내', 'Service', 'A/S 안내', '에이텍모빌리티 A/S 및 기술 지원', `
    <div class="content-card"><h2>A/S 안내</h2><p>에이텍모빌리티 제품 A/S 및 기술 지원 안내입니다.</p><ul><li>제품별 A/S 접수 안내</li><li>기술 지원 요청</li><li>부품 및 소모품 문의</li></ul></div>`],
  ['pages/recruit/index.html', '인재경영', 'Recruit', '인재경영', '함께 성장할 인재를 찾습니다', `
    <div class="content-card"><h2>인재경영</h2><p>에이텍모빌리티와 함께 교통의 미래를 만들어 갈 인재를 기다립니다.</p>
    <div class="link-cards">
      <a href="hr.html" class="link-card"><strong>인사제도</strong><span>인사 제도 및 조직 문화</span></a>
      <a href="welfare.html" class="link-card"><strong>복리후생</strong><span>복리후생 제도 안내</span></a>
      <a href="talent.html" class="link-card"><strong>인재상</strong><span>에이텍모빌리티가 원하는 인재</span></a>
      <a href="process.html" class="link-card"><strong>채용절차</strong><span>채용 프로세스 안내</span></a>
    </div></div>`],
  ['pages/recruit/hr.html', '인사제도', 'Recruit', '인사제도', '에이텍모빌리티 인사제도', `<div class="content-card"><h2>인사제도</h2><p>능력과 성과 중심의 공정한 인사제도를 운영하고 있습니다.</p></div>`],
  ['pages/recruit/welfare.html', '복리후생', 'Recruit', '복리후생', '복리후생 제도 안내', `<div class="content-card"><h2>복리후생</h2><p>임직원의 삶의 질 향상을 위한 다양한 복리후생 제도를 제공합니다.</p></div>`],
  ['pages/recruit/talent.html', '인재상', 'Recruit', '인재상', '에이텍모빌리티 인재상', `<div class="content-card"><h2>인재상</h2><p>혁신적인 사고와 새로운 기술로 고객감동을 실현하는 인재를 기다립니다.</p></div>`],
  ['pages/recruit/process.html', '채용절차', 'Recruit', '채용절차', '채용 프로세스 안내', `<div class="content-card"><h2>채용절차</h2><p>서류전형 → 면접 → 최종합격 순으로 진행됩니다.</p></div>`],
  ['pages/policy/privacy.html', '개인정보처리방침', 'Policy', '개인정보처리방침', '개인정보 처리방침', `<div class="content-card"><h2>개인정보처리방침</h2><p>(주)에이텍모빌리티는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.</p></div>`],
  ['pages/policy/terms.html', '이용약관', 'Policy', '이용약관', '웹사이트 이용약관', `<div class="content-card"><h2>이용약관</h2><p>본 웹사이트 이용과 관련된 약관입니다.</p></div>`],
  ['pages/policy/email.html', '이메일무단수집거부', 'Policy', '이메일무단수집거부', '이메일 무단 수집 거부', `<div class="content-card"><h2>이메일무단수집거부</h2><p>본 웹사이트에 게시된 이메일 주소가 무단으로 수집되는 것을 거부합니다.</p></div>`],
];

pages.forEach(([p, t, tag, h, d, b]) => page(p, t, tag, h, d, b));
console.log('Created', pages.length, 'pages');
