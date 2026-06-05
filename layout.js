(function () {
  const ROOT = window.SITE_ROOT || './';

  function L(path) {
    return ROOT + path;
  }

  const NAV = [
    {
      title: '사업소개',
      links: [
        { label: '교통요금결제시스템', href: L('pages/business/payment.html') },
        { label: '스마트교통', href: L('pages/business/smart.html') },
        { label: '키오스크', href: L('pages/business/kiosk.html') },
        { label: '시스템 유지보수', href: L('pages/business/maintain.html') },
      ],
    },
    {
      title: '회사소개',
      links: [
        { label: '에이텍모빌리티 소개', href: L('pages/about/index.html') },
        { label: '미션 & 비전', href: L('pages/about/vision.html') },
        { label: '오시는 길', href: L('pages/about/location.html') },
      ],
    },
    {
      title: '투자정보',
      links: [
        { label: '공시정보', href: L('pages/invest/public.html') },
        { label: 'IR 자료', href: L('pages/invest/ir.html') },
      ],
    },
    {
      title: '홍보센터',
      links: [
        { label: '공지사항', href: L('pages/news/notice.html') },
        { label: '보도자료', href: L('pages/news/press.html') },
        { label: '포토갤러리', href: L('pages/news/gallery.html') },
        { label: '미디어갤러리', href: L('pages/news/media.html') },
      ],
    },
    {
      title: '고객서비스 · 인재경영',
      links: [
        { label: 'A/S 안내', href: L('pages/service/as.html') },
        { label: '인재경영', href: L('pages/recruit/index.html') },
        { label: '문의하기', href: L('index.html#contact') },
      ],
    },
  ];

  function buildMenu() {
    return NAV.map(
      (group) => `
        <div class="menu-group">
          <h3>${group.title}</h3>
          <ul>${group.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
        </div>`
    ).join('');
  }

  function buildFooterCols() {
    return `
      <div class="footer-col">
        <h4>사업소개</h4>
        <a href="${L('pages/business/payment.html')}">교통요금결제시스템</a>
        <a href="${L('pages/business/smart.html')}">스마트교통</a>
        <a href="${L('pages/business/kiosk.html')}">키오스크</a>
      </div>
      <div class="footer-col">
        <h4>회사소개</h4>
        <a href="${L('pages/about/index.html')}">회사소개</a>
        <a href="${L('pages/about/vision.html')}">미션 &amp; 비전</a>
        <a href="${L('pages/about/location.html')}">오시는 길</a>
      </div>
      <div class="footer-col">
        <h4>홍보 · 투자</h4>
        <a href="${L('pages/news/notice.html')}">홍보센터</a>
        <a href="${L('pages/invest/public.html')}">투자정보</a>
        <a href="${L('pages/recruit/index.html')}">인재경영</a>
      </div>
      <div class="footer-col">
        <h4>정책</h4>
        <a href="${L('pages/policy/privacy.html')}">개인정보처리방침</a>
        <a href="${L('pages/policy/terms.html')}">이용약관</a>
        <a href="${L('pages/policy/email.html')}">이메일무단수집거부</a>
      </div>`;
  }

  function injectChrome() {
    if (document.getElementById('header')) return;

    const chrome = `
      <ul class="skip-links">
        <li><a href="#main-content">본문 바로가기</a></li>
        <li><a href="#header">메뉴 바로가기</a></li>
        <li><a href="#footer">푸터 바로가기</a></li>
      </ul>
      <div class="page-bg" aria-hidden="true"></div>
      <header class="header" id="header">
        <div class="header-inner container-wide">
          <a href="${L('index.html')}" class="logo">ATEC Mobility</a>
          <div class="header-actions">
            <a href="${L('index.html')}" class="lang-link">KOR</a>
            <button class="menu-btn" aria-label="메뉴 열기" aria-expanded="false">
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div class="menu-overlay" aria-hidden="true">
        <div class="menu-panel">
          <button class="menu-close" aria-label="메뉴 닫기">&times;</button>
          <nav class="menu-nav">${buildMenu()}</nav>
        </div>
      </div>`;

    const footer = `
      <footer class="footer" id="footer">
        <div class="container-wide footer-top">
          <div class="footer-brand">
            <a href="${L('index.html')}" class="logo">ATEC Mobility</a>
            <p>모빌리티 전문기업 · 교통카드솔루션</p>
          </div>
          <div class="footer-nav">${buildFooterCols()}</div>
        </div>
        <div class="container-wide footer-bottom">
          <p>&copy; ATEC Mobility. All rights reserved.</p>
        </div>
      </footer>`;

    document.body.insertAdjacentHTML('afterbegin', chrome);
    document.body.insertAdjacentHTML('beforeend', footer);
  }

  function initMenu() {
    const header = document.getElementById('header');
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.menu-close');
    const menuLinks = document.querySelectorAll('.menu-group a');

    if (!menuBtn || !menuOverlay) return;

    function openMenu() {
      menuOverlay.classList.add('open');
      menuOverlay.setAttribute('aria-hidden', 'false');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menuOverlay.classList.remove('open');
      menuOverlay.setAttribute('aria-hidden', 'true');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
      menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
    });
    menuClose?.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) closeMenu();
    });
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  function initFadeIn() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.content-card, .news-item, .page-hero-inner, .link-card').forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  injectChrome();
  initMenu();
  initFadeIn();

  window.SiteLayout = { L, NAV };
})();
