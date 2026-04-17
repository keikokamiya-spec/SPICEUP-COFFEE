/* ================================================================
   SPICEUP COFFEE — main.js
================================================================ */

'use strict';

/* ----------------------------------------------------------------
   AOS（スクロールアニメーション）初期化
---------------------------------------------------------------- */
AOS.init({
  duration: 750,
  once: true,
  offset: 60,
  easing: 'ease-out-quart',
});

/* ----------------------------------------------------------------
   Header: スクロールで背景変更
---------------------------------------------------------------- */
const header = document.getElementById('site-header');

function handleHeaderScroll() {
  if (window.scrollY > 80) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // 初回実行

/* ----------------------------------------------------------------
   ハンバーガーメニュー / Drawer
---------------------------------------------------------------- */
const hamburger      = document.getElementById('hamburger');
const drawer         = document.getElementById('drawer');
const drawerOverlay  = document.getElementById('drawerOverlay');
const drawerClose    = document.getElementById('drawerClose');
const drawerLinks    = document.querySelectorAll('.drawer-link');

function openDrawer() {
  drawer.classList.add('is-active');
  drawerOverlay.classList.add('is-active');
  hamburger.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('is-active');
  drawerOverlay.classList.remove('is-active');
  hamburger.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

drawerLinks.forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ESCキーでドロワーを閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

/* ----------------------------------------------------------------
   Swiper: HERO スライダー
---------------------------------------------------------------- */
const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 1100,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: '前のスライド',
    nextSlideMessage: '次のスライド',
  },
});

/* ----------------------------------------------------------------
   スムーススクロール（ヘッダー高さ分オフセット）
---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  });
});

/* ----------------------------------------------------------------
   お問い合わせフォーム バリデーション & 送信処理
---------------------------------------------------------------- */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // --- 名前 ---
    const nameField = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!nameField.value.trim()) {
      nameField.classList.add('is-invalid');
      nameError.classList.add('is-visible');
      isValid = false;
    } else {
      nameField.classList.remove('is-invalid');
      nameError.classList.remove('is-visible');
    }

    // --- メール ---
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
      emailField.classList.add('is-invalid');
      emailError.classList.add('is-visible');
      isValid = false;
    } else {
      emailField.classList.remove('is-invalid');
      emailError.classList.remove('is-visible');
    }

    // --- 内容 ---
    const messageField = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (!messageField.value.trim()) {
      messageField.classList.add('is-invalid');
      messageError.classList.add('is-visible');
      isValid = false;
    } else {
      messageField.classList.remove('is-invalid');
      messageError.classList.remove('is-visible');
    }

    // --- 送信成功 ---
    if (isValid) {
      contactForm.style.display = 'none';
      formSuccess.hidden = false;

      // 成功メッセージへスクロール
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // リアルタイムバリデーションクリア
  contactForm.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', function () {
      this.classList.remove('is-invalid');
      const errorId = this.id + 'Error';
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.classList.remove('is-visible');
    });
  });

}
