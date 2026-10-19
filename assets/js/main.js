// Main JavaScript for Dr. Ebtesam Madani Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('svg');
      if (navMenu.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Interactive "ماذا تحتاجين الآن؟" cards
  const needCards = document.querySelectorAll('.need-card');
  const recContainer = document.getElementById('needs-recommendation-box');
  const recTitle = document.getElementById('rec-title');
  const recText = document.getElementById('rec-text');
  const recBtn = document.getElementById('rec-btn');

  const needsData = {
    'content': {
      title: 'مكتبة المقالات والمواد التثقيفية',
      text: 'ستجدين في مدونة د. ابتسام مجموعة مقالات معمقة ومبسطة حول فهم المشاعر والذكاء العاطفي والتواصل الصحي.',
      btnText: 'تصفحي جميع المقالات',
      action: () => {
        const el = document.getElementById('articles-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = 'index.html#articles-section';
      }
    },
    'self': {
      title: 'استشارة فردية لفهم الذات وإدارة المشاعر',
      text: 'رحلة استكشاف مخصصة لكِ للتعرف على محركات سلوكك، تخفيف الضغوط اليومية، وبناء سلام داخلي راسخ.',
      btnText: 'احجزي جلستك الفردية الآن',
      action: () => openBookingModal('استشارة فردية لفهم الذات')
    },
    'marriage': {
      title: 'جلسات الإرشاد الزواجي والأسري',
      text: 'مساحة آمنة ومحايدة تماماً لإعادة مد جسور الحوار بين الزوجين، فهم الفروق وتجاوز الأزمات التراكمية بحكمة.',
      btnText: 'احجزي جلسة إرشاد زوجي',
      action: () => openBookingModal('إرشاد زوجي وعلاقات')
    },
    'hard-phase': {
      title: 'دعم نفسي في المراحل الصعبة والانتقالية',
      text: 'لستِ وحدكِ في هذا العبور. نوفر لكِ مرافقة نفسية متخصصة ومبنية على التعاطف والخطوات العملية الآمنة.',
      btnText: 'تحدثي مع د. ابتسام الآن',
      action: () => openBookingModal('دعم نفسي في مرحلة صعبة')
    },
    'parenting': {
      title: 'استشارات التربية الإيجابية ودعم الأبناء',
      text: 'أدوات تربوية معاصرة لفهم سيكولوجية الطفل والمراهق، وبناء علاقة ثقة خالية من الصدام والصراخ المستمر.',
      btnText: 'احجزي استشارة تربوية',
      action: () => openBookingModal('استشارة تربوية للأبناء')
    },
    'growth': {
      title: 'برامج تطوير الذات وبناء المناعة النفسية',
      text: 'دورات وورش عمل مصممة خصيصاً لتمكينكِ من وضع الحدود الصحية، رفع تقدير الذات وصناعة أهداف حقيقية.',
      btnText: 'استكشفي البرامج التدريبية',
      action: () => {
        window.location.href = 'services.html';
      }
    }
  };

  needCards.forEach(card => {
    card.addEventListener('click', () => {
      needCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const needKey = card.getAttribute('data-need');
      const data = needsData[needKey];

      if (data && recContainer) {
        recTitle.textContent = data.title;
        recText.textContent = data.text;
        recBtn.textContent = data.btnText;
        recBtn.onclick = data.action;
        recContainer.style.display = 'flex';
      }
    });
  });

  // 4. Modal Handlers (Booking & Search & Podcast)
  window.openBookingModal = function(serviceName = '') {
    const modal = document.getElementById('booking-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (serviceName) {
        const select = document.getElementById('session-type');
        if (select) {
          for (let option of select.options) {
            if (option.text.includes(serviceName) || option.value.includes(serviceName)) {
              select.value = option.value;
              break;
            }
          }
        }
      }
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Attach booking modal to buttons
  document.querySelectorAll('.trigger-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  // Search Modal
  const searchBtn = document.querySelector('.btn-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchModal = document.getElementById('search-modal');
      if (searchModal) {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const input = searchModal.querySelector('input');
        if (input) setTimeout(() => input.focus(), 100);
      }
    });
  }

  // Booking Form Submission
  const bookingForm = document.getElementById('appointment-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name').value;
      const phone = document.getElementById('client-phone').value;
      const session = document.getElementById('session-type').value;
      const date = document.getElementById('preferred-date').value;
      const notes = document.getElementById('client-notes').value || 'لا يوجد';

      const waMsg = encodeURIComponent(
        `السلام عليكم د. ابتسام، أرغب بحجز موعد استشارة:\n- الاسم: ${name}\n- الهاتف: ${phone}\n- نوع الجلسة: ${session}\n- التاريخ المفضل: ${date}\n- ملاحظات: ${notes}`
      );

      // WhatsApp Clinic Link (Default safe mockup number, easily editable)
      const clinicPhone = '201000000000'; // Replace with doctor's real phone
      const waUrl = `https://wa.me/${clinicPhone}?text=${waMsg}`;

      alert(`شكراً لكِ أ/ ${name}. تم تسجيل طلب الحجز بنجاح!\nسيتم تحويلكِ الآن إلى واتساب العيادة لتأكيد الموعد فوراً.`);
      window.open(waUrl, '_blank');
      closeModal('booking-modal');
    });
  }

  // Podcast Preview Action
  const podcastBtn = document.querySelector('.btn-podcast-listen');
  if (podcastBtn) {
    podcastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const podModal = document.getElementById('podcast-modal');
      if (podModal) {
        podModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Newsletter Form Submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('.newsletter-input');
      if (emailInput && emailInput.value) {
        alert('شكراً لاشتراككِ في النشرة البريدية لدكتورة ابتسام مدني! ستصلكِ رسائلنا الملهمة أسبوعياً.');
        emailInput.value = '';
      }
    });
  });
});
