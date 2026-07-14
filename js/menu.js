/**
 * menu.js – Merged from GOOD_MENU_VERSION, adapted for parent repo's non-module architecture.
 * 
 * Features:
 *   - Search (debounced)
 *   - Dietary filter (Veg / Egg / Non-Veg / All)
 *   - Quick filter chips (Rated 4+, Bestseller, Chef's Special, New)
 *   - Sort (Recommended, Rating, Price Asc, Price Desc)
 *   - Category navigation with scroll-spy
 *   - Detail modal with prev/next navigation
 *   - Diet badges (veg/egg/non-veg indicator)
 */

document.addEventListener('DOMContentLoaded', async function () {
  // === State ===
  let allItems = [];
  let filteredItems = [];
  let categories = [];
  let activeItemIndex = -1;

  const state = {
    search: '',
    diet: 'all',
    sort: 'recommended',
    quickFilters: {
      'rated-4': false,
      'bestseller': false,
      'chefs-special': false,
      'new': false
    }
  };

  // === DOM References ===
  const dom = {
    searchInput: document.getElementById('searchInput'),
    dietBtns: document.querySelectorAll('.segmented-btn'),
    sortSelect: document.getElementById('sortSelect'),
    quickChips: document.querySelectorAll('.quick-filters .chip'),
    grid: document.getElementById('menuGrid'),
    categoryNav: document.getElementById('categoryNavInner'),

    // Modal
    modalOverlay: document.getElementById('itemModal'),
    modalClose: document.getElementById('modalClose'),
    modalMedia: document.getElementById('modalMedia'),
    modalTitle: document.getElementById('modalTitle'),
    modalPrice: document.getElementById('modalPrice'),
    modalDesc: document.getElementById('modalDesc'),
    modalTags: document.getElementById('modalTags'),
    modalMeta: document.getElementById('modalMeta'),
    btnPrev: document.getElementById('modalPrev'),
    btnNext: document.getElementById('modalNext')
  };

  // === Init ===
  try {
    // Try Sanity first, fall back to local MENU_DATA
    if (typeof fetchMenuItems === 'function') {
      allItems = await fetchMenuItems();
    } else {
      allItems = window.MENU_DATA || [];
    }

    // Ensure every item has required fields
    allItems = allItems.map(function (item, idx) {
      return {
        _id: item._id || ('local-' + idx),
        name: item.name || '',
        price: item.price || 0,
        description: item.description || '',
        category: item.category || 'Other',
        categorySlug: item.categorySlug || item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        dietaryType: item.dietaryType || 'veg',
        prepTimeMinutes: item.prepTimeMinutes || null,
        spiceLevel: item.spiceLevel || null,
        tags: item.tags || [],
        rating: item.rating || null,
        imageUrl: item.imageUrl || 'assets/images/gallery2.webp',
        imageAlt: item.imageAlt || item.name,
        videoUrl: item.videoUrl || null,
        featured: item.featured || false
      };
    });

    // Build category groups
    var catMap = new Map();
    allItems.forEach(function (item) {
      if (!catMap.has(item.category)) {
        catMap.set(item.category, { name: item.category, slug: item.categorySlug, items: [] });
      }
      catMap.get(item.category).items.push(item);
    });
    categories = Array.from(catMap.values());

    renderCategoryNav();
    applyFilters();
    setupEventListeners();
    setupScrollSpy();

    // Trigger reveal animations for page header
    setTimeout(function () {
      document.querySelectorAll('.menu-page-header .reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 100);

  } catch (error) {
    console.error('Error initializing menu:', error);
    dom.grid.innerHTML = '<div class="empty-state"><p>Failed to load menu. Please try again later.</p></div>';
  }

  // === Category Nav ===
  function renderCategoryNav() {
    dom.categoryNav.innerHTML = categories.map(function (cat) {
      return '<a href="#cat-' + cat.slug + '" class="cat-link" data-cat="' + cat.slug + '">' + cat.name + '</a>';
    }).join('');
  }

  // === Event Listeners ===
  function setupEventListeners() {
    // Search with debounce
    var debounceTimeout;
    dom.searchInput.addEventListener('input', function (e) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(function () {
        state.search = e.target.value.toLowerCase();
        applyFilters();
      }, 200);
    });

    // Dietary segmented control
    dom.dietBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        dom.dietBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        state.diet = btn.dataset.diet;
        applyFilters();
      });
    });

    // Sort dropdown
    dom.sortSelect.addEventListener('change', function (e) {
      state.sort = e.target.value;
      applyFilters();
    });

    // Quick filter chips
    dom.quickChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.dataset.filter;
        var isActive = chip.getAttribute('aria-pressed') === 'true';
        chip.setAttribute('aria-pressed', !isActive ? 'true' : 'false');
        state.quickFilters[filter] = !isActive;
        applyFilters();
      });
    });

    // Modal close
    dom.modalClose.addEventListener('click', closeModal);
    dom.modalOverlay.addEventListener('click', function (e) {
      if (e.target === dom.modalOverlay) closeModal();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dom.modalOverlay.classList.contains('is-active')) closeModal();
      // Arrow key navigation in modal
      if (dom.modalOverlay.classList.contains('is-active')) {
        if (e.key === 'ArrowLeft') navigateModal(-1);
        if (e.key === 'ArrowRight') navigateModal(1);
      }
    });

    // Modal prev/next
    dom.btnPrev.addEventListener('click', function () { navigateModal(-1); });
    dom.btnNext.addEventListener('click', function () { navigateModal(1); });

    // Clear filters button (delegated from grid)
    dom.grid.addEventListener('click', function (e) {
      if (e.target.id === 'clearFiltersBtn') {
        state.search = '';
        dom.searchInput.value = '';
        state.diet = 'all';
        dom.dietBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b.dataset.diet === 'all' ? 'true' : 'false');
        });
        Object.keys(state.quickFilters).forEach(function (k) { state.quickFilters[k] = false; });
        dom.quickChips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        state.sort = 'recommended';
        dom.sortSelect.value = 'recommended';
        applyFilters();
      }
    });
  }

  // === Apply Filters & Sort ===
  function applyFilters() {
    filteredItems = allItems.filter(function (item) {
      // Diet filter
      if (state.diet !== 'all' && item.dietaryType !== state.diet) return false;

      // Quick filters (AND logic)
      if (state.quickFilters['rated-4']) {
        var avg = item.rating ? parseFloat(item.rating.average) : 0;
        if (avg < 4) return false;
      }
      if (state.quickFilters['bestseller'] && (!item.tags || item.tags.indexOf('bestseller') === -1)) return false;
      if (state.quickFilters['chefs-special'] && (!item.tags || item.tags.indexOf('chefs-special') === -1)) return false;
      if (state.quickFilters['new'] && (!item.tags || item.tags.indexOf('new') === -1)) return false;

      // Search
      if (state.search) {
        var searchStr = (item.name + ' ' + (item.description || '') + ' ' + (item.tags ? item.tags.join(' ') : '')).toLowerCase();
        if (searchStr.indexOf(state.search) === -1) return false;
      }

      return true;
    });

    // Sort
    filteredItems.sort(function (a, b) {
      if (state.sort === 'rating') {
        var aR = a.rating ? parseFloat(a.rating.average) : 0;
        var bR = b.rating ? parseFloat(b.rating.average) : 0;
        return bR - aR;
      } else if (state.sort === 'price-asc') {
        return a.price - b.price;
      } else if (state.sort === 'price-desc') {
        return b.price - a.price;
      }
      // Recommended: keep original order
      return 0;
    });

    renderGrid();
  }

  // === Render Grid ===
  function renderGrid() {
    if (filteredItems.length === 0) {
      dom.grid.innerHTML =
        '<div class="empty-state">' +
          '<h3>No matches found</h3>' +
          '<p>We couldn\'t find anything matching your current filters.</p>' +
          '<button id="clearFiltersBtn" class="button">Clear all filters</button>' +
        '</div>';
      return;
    }

    // If sorting by recommended, group by category
    if (state.sort === 'recommended') {
      var cats = {};
      var catOrder = [];
      filteredItems.forEach(function (item) {
        if (!cats[item.categorySlug]) {
          cats[item.categorySlug] = { name: item.category, items: [] };
          catOrder.push(item.categorySlug);
        }
        cats[item.categorySlug].items.push(item);
      });

      var html = '';
      catOrder.forEach(function (slug) {
        var cat = cats[slug];
        html +=
          '<div class="menu-section" id="cat-' + slug + '">' +
            '<h2 class="menu-section-title">' + cat.name + '</h2>' +
            '<div class="grid-container">' +
              cat.items.map(generateCardHtml).join('') +
            '</div>' +
          '</div>';
      });
      dom.grid.innerHTML = html;
    } else {
      // Flat list for other sorts
      dom.grid.innerHTML =
        '<div class="menu-section">' +
          '<div class="grid-container">' +
            filteredItems.map(generateCardHtml).join('') +
          '</div>' +
        '</div>';
    }

    // Bind click events to cards
    document.querySelectorAll('.menu-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.dataset.id;
        var index = -1;
        for (var i = 0; i < filteredItems.length; i++) {
          if (filteredItems[i]._id === id) { index = i; break; }
        }
        if (index !== -1) openModal(index);
      });
    });
  }

  // === Generate Card HTML ===
  function generateCardHtml(item) {
    var badgeClass = item.dietaryType === 'non-veg' ? 'non-veg' : (item.dietaryType === 'egg' ? 'egg' : 'veg');

    var ratingHtml = '';
    if (item.rating && item.rating.average) {
      ratingHtml =
        '<div class="card-rating">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>' +
          parseFloat(item.rating.average).toFixed(1) + ' (' + (item.rating.count || 0) + ')' +
        '</div>';
    }

    var tagsHtml = '';
    if (item.tags && item.tags.length > 0) {
      tagsHtml =
        '<div class="card-tags">' +
          item.tags.map(function (tag) {
            return '<span class="card-tag">' + tag.replace(/-/g, ' ') + '</span>';
          }).join('') +
        '</div>';
    }

    return (
      '<article class="menu-card" data-id="' + item._id + '">' +
        '<div class="menu-card-image">' +
          '<div class="diet-badge ' + badgeClass + '" title="' + item.dietaryType + '"></div>' +
          tagsHtml +
          '<img src="' + item.imageUrl + '" alt="' + (item.imageAlt || item.name) + '" loading="lazy">' +
        '</div>' +
        '<div class="menu-card-content">' +
          '<div class="card-header">' +
            '<h3>' + item.name + '</h3>' +
            '<span class="card-price">₹' + item.price + '</span>' +
          '</div>' +
          ratingHtml +
          '<p class="card-desc">' + (item.description || '') + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  // === Modal ===
  function openModal(index) {
    activeItemIndex = index;
    updateModalContent();
    dom.modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    dom.modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function navigateModal(direction) {
    var newIndex = activeItemIndex + direction;
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      activeItemIndex = newIndex;
      updateModalContent();
    }
  }

  function updateModalContent() {
    var item = filteredItems[activeItemIndex];
    if (!item) return;

    dom.btnPrev.disabled = activeItemIndex === 0;
    dom.btnNext.disabled = activeItemIndex === filteredItems.length - 1;

    // Media
    if (item.videoUrl) {
      dom.modalMedia.innerHTML = '<video src="' + item.videoUrl + '" autoplay muted loop playsinline poster="' + item.imageUrl + '"></video>';
    } else {
      dom.modalMedia.innerHTML = '<img src="' + item.imageUrl + '" alt="' + item.name + '">';
    }

    dom.modalTitle.textContent = item.name;
    dom.modalPrice.textContent = '₹' + item.price;
    dom.modalDesc.textContent = item.description || 'A delicious choice from our menu.';

    // Meta (diet, time, spice, rating)
    var badgeClass = item.dietaryType === 'non-veg' ? 'non-veg' : (item.dietaryType === 'egg' ? 'egg' : 'veg');
    var typeLabel = item.dietaryType.charAt(0).toUpperCase() + item.dietaryType.slice(1);

    var metaHtml =
      '<div class="meta-item">' +
        '<div class="diet-badge ' + badgeClass + '" style="position:static; margin-right:4px;"></div>' +
        typeLabel +
      '</div>';

    if (item.prepTimeMinutes) {
      metaHtml +=
        '<div class="meta-item">' +
          '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' +
          '~' + item.prepTimeMinutes + ' min' +
        '</div>';
    }

    if (item.spiceLevel && item.spiceLevel !== 'none') {
      metaHtml +=
        '<div class="meta-item">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8 6 6 10 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2-8-6-12z" fill="#c62828"/></svg>' +
          item.spiceLevel +
        '</div>';
    }

    if (item.rating && item.rating.average) {
      metaHtml +=
        '<div class="meta-item card-rating" style="margin:0;">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>' +
          parseFloat(item.rating.average).toFixed(1) + ' (' + (item.rating.count || 0) + ' reviews)' +
        '</div>';
    }

    dom.modalMeta.innerHTML = metaHtml;

    // Tags in modal
    if (item.tags && item.tags.length > 0) {
      dom.modalTags.innerHTML = item.tags.map(function (tag) {
        return '<span class="chip" style="font-size:0.75rem; min-height:auto; padding:4px 10px;">' + tag.replace(/-/g, ' ') + '</span>';
      }).join('');
    } else {
      dom.modalTags.innerHTML = '';
    }
  }

  // === Scroll Spy for Category Nav ===
  function setupScrollSpy() {
    var observer = new IntersectionObserver(function (entries) {
      if (state.sort !== 'recommended') return;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          document.querySelectorAll('.cat-link').forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });

          // Auto-scroll nav to show active category
          var activeLink = document.querySelector('.cat-link[href="#' + id + '"]');
          if (activeLink && dom.categoryNav) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      });
    }, { rootMargin: '-200px 0px -60% 0px' });

    // Observe/re-observe sections when grid changes
    var observeSections = function () {
      observer.disconnect();
      document.querySelectorAll('.menu-section').forEach(function (section) {
        observer.observe(section);
      });
    };

    var mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(dom.grid, { childList: true });
  }
});
