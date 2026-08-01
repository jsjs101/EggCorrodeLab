document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Job Filtering & Search Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const jobCards = document.querySelectorAll('.job-card');

  let currentFilter = 'all';
  let currentQuery = '';

  const filterJobs = () => {
    jobCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const title = card.getAttribute('data-title').toLowerCase();

      const matchesCategory = currentFilter === 'all' || category === currentFilter;
      const matchesSearch = title.includes(currentQuery.toLowerCase());

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      filterJobs();
    });
  });

  searchInput.addEventListener('input', (e) => {
    currentQuery = e.target.value.trim();
    filterJobs();
  });

  // 3. Modal Interaction
  const modal = document.getElementById('job-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDept = document.getElementById('modal-dept');

  const openModal = (card) => {
    const title = card.getAttribute('data-title');
    const dept = card.getAttribute('data-dept');

    modalTitle.textContent = title;
    modalDept.textContent = dept;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  jobCards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  closeModalBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);

  // Close modal when clicking on backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});