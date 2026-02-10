document.addEventListener('DOMContentLoaded', function() {
  var content = document.querySelector('.content');
  if (!content) return;

  // ══════════════════════════════════════════════
  // UTILITY: collect sibling nodes until next heading of same/higher level
  // ══════════════════════════════════════════════
  function collectUntilNext(startHeading) {
    var tag = startHeading.tagName;
    var nodes = [];
    var el = startHeading.nextElementSibling;
    while (el) {
      if (el.tagName === tag) break;
      if (el.tagName < tag) break;
      if (el.classList && el.classList.contains('carousel-section')) break;
      nodes.push(el);
      el = el.nextElementSibling;
    }
    return nodes;
  }

  // ══════════════════════════════════════════════
  // BUILD CAROUSEL
  // ══════════════════════════════════════════════
  function buildCarousel(id, icon, iconClass, title, tabs) {
    var section = document.createElement('div');
    section.className = 'carousel-section';
    section.id = 'carousel-' + id;

    var activeClass = iconClass === 'teal' ? 'teal-active' : iconClass === 'rose' ? 'rose-active' : '';

    // Header
    var header = document.createElement('div');
    header.className = 'carousel-header';
    header.innerHTML =
      '<div class="carousel-header-icon ' + iconClass + '">' + icon + '</div>' +
      '<div class="carousel-header-text">' + title + '</div>' +
      '<div class="carousel-header-count">' + tabs.length + ' sections</div>';
    section.appendChild(header);

    // Tab bar
    var tabBar = document.createElement('div');
    tabBar.className = 'carousel-tabs';

    tabs.forEach(function(t, i) {
      var tab = document.createElement('div');
      tab.className = 'carousel-tab' + (i === 0 ? ' active ' + activeClass : '');
      tab.setAttribute('data-index', i);
      tab.setAttribute('data-carousel', id);
      tab.setAttribute('data-active-class', activeClass);
      tab.innerHTML = '<span class="carousel-tab-num">' + t.num + '</span> ' + t.label;
      tabBar.appendChild(tab);
    });
    section.appendChild(tabBar);

    // Panels
    tabs.forEach(function(t, i) {
      var panel = document.createElement('div');
      panel.className = 'carousel-panel' + (i === 0 ? ' active' : '');
      panel.setAttribute('data-index', i);
      panel.setAttribute('data-carousel', id);

      if (t.heading) panel.appendChild(t.heading);
      t.nodes.forEach(function(n) { panel.appendChild(n); });

      // Nav arrows
      var nav = document.createElement('div');
      nav.className = 'carousel-nav';
      nav.innerHTML =
        '<button class="carousel-nav-btn" data-dir="prev" data-carousel="' + id + '"' + (i === 0 ? ' disabled' : '') + '>&#8592; Pr\u00e9c\u00e9dent</button>' +
        '<span class="carousel-progress">' + (i + 1) + ' / ' + tabs.length + '</span>' +
        '<button class="carousel-nav-btn" data-dir="next" data-carousel="' + id + '"' + (i === tabs.length - 1 ? ' disabled' : '') + '>Suivant &#8594;</button>';
      panel.appendChild(nav);

      section.appendChild(panel);
    });

    return section;
  }

  function switchTab(carouselId, index) {
    var panels = document.querySelectorAll('.carousel-panel[data-carousel="' + carouselId + '"]');
    var tabs = document.querySelectorAll('.carousel-tab[data-carousel="' + carouselId + '"]');

    panels.forEach(function(p) { p.classList.remove('active'); });
    tabs.forEach(function(t) {
      t.classList.remove('active');
      var ac = t.getAttribute('data-active-class');
      if (ac) t.classList.remove(ac);
    });

    var targetPanel = document.querySelector('.carousel-panel[data-carousel="' + carouselId + '"][data-index="' + index + '"]');
    var targetTab = document.querySelector('.carousel-tab[data-carousel="' + carouselId + '"][data-index="' + index + '"]');

    if (targetPanel) targetPanel.classList.add('active');
    if (targetTab) {
      targetTab.classList.add('active');
      var ac = targetTab.getAttribute('data-active-class');
      if (ac) targetTab.classList.add(ac);
      targetTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // ══════════════════════════════════════════════
  // 1) SIX STRATEGIES CAROUSEL
  // ══════════════════════════════════════════════
  var stratLabels = [
    { num: '01', match: '1. Agence dev', label: 'Agence dev' },
    { num: '02', match: '2. Templates', label: 'Templates' },
    { num: '03', match: '3. SaaS', label: 'SaaS shotgun' },
    { num: '04', match: '4. Services AI', label: 'Services AI' },
    { num: '05', match: '5. Formation', label: 'Formation' },
    { num: '06', match: '6. Produit AI', label: 'Produit AI' }
  ];

  var allH2 = Array.from(content.querySelectorAll('h2'));
  var stratTabs = [];
  var firstStratHeading = null;

  stratLabels.forEach(function(s) {
    var h2 = allH2.find(function(h) { return h.textContent.includes(s.match); });
    if (!h2) return;
    if (!firstStratHeading) firstStratHeading = h2;
    var nodes = collectUntilNext(h2);
    stratTabs.push({ num: s.num, label: s.label, heading: h2, nodes: nodes });
  });

  if (stratTabs.length === 6 && firstStratHeading) {
    var marker1 = document.createElement('div');
    firstStratHeading.parentNode.insertBefore(marker1, firstStratHeading);
    var carousel1 = buildCarousel('strategies', '&#9733;', 'amber', '6 Strat\u00e9gies de mon\u00e9tisation', stratTabs);
    marker1.parentNode.replaceChild(carousel1, marker1);
  }

  // ══════════════════════════════════════════════
  // 2) EIGHT NICHES PRD CAROUSEL
  // ══════════════════════════════════════════════
  var nicheLabels = [
    { num: 'N1', id: 'prd-niche-1', label: 'Juridique' },
    { num: 'N2', id: 'prd-niche-2', label: 'Codage m\u00e9dical' },
    { num: 'N3', id: 'prd-niche-3', label: 'R\u00e9daction m\u00e9dicale' },
    { num: 'N4', id: 'prd-niche-4', label: 'Comptabilit\u00e9' },
    { num: 'N5', id: 'prd-niche-5', label: 'Notarial' },
    { num: 'N6', id: 'prd-niche-6', label: 'Veille r\u00e9glementaire' },
    { num: 'N7', id: 'prd-niche-7', label: 'Due diligence' },
    { num: 'N8', id: 'prd-niche-8', label: 'RH / Paie' }
  ];

  var nicheTabs = [];
  var firstNicheAnchor = null;

  nicheLabels.forEach(function(n) {
    var anchor = document.getElementById(n.id);
    if (!anchor) return;
    if (!firstNicheAnchor) firstNicheAnchor = anchor;

    var nodes = [];
    var el = anchor.nextElementSibling;
    while (el) {
      if (el.tagName === 'A' && el.id && el.id.startsWith('prd-niche-')) break;
      if (el.tagName === 'H2') break;
      if (el.classList && el.classList.contains('carousel-section')) break;
      nodes.push(el);
      el = el.nextElementSibling;
    }
    nicheTabs.push({ num: n.num, label: n.label, heading: anchor, nodes: nodes });
  });

  if (nicheTabs.length > 0 && firstNicheAnchor) {
    var marker2 = document.createElement('div');
    firstNicheAnchor.parentNode.insertBefore(marker2, firstNicheAnchor);
    var carousel2 = buildCarousel('niches', '&#9670;', 'teal', 'PRD des 8 niches', nicheTabs);
    marker2.parentNode.replaceChild(carousel2, marker2);
  }

  // ══════════════════════════════════════════════
  // 3) WEEKLY GUIDE CAROUSEL
  // ══════════════════════════════════════════════
  var weekLabels = [
    { num: 'S1', match: 'Semaine 1', label: 'Fondations' },
    { num: 'S2', match: 'Semaine 2', label: 'Features' },
    { num: 'S3', match: 'Semaine 3', label: 'Polish & LP' },
    { num: 'S4', match: 'Semaine 4', label: 'Beta' }
  ];

  var weekTabs = [];
  var firstWeekHeading = null;

  weekLabels.forEach(function(w) {
    var h2 = allH2.find(function(h) { return h.textContent.includes(w.match); });
    if (!h2) return;
    if (!firstWeekHeading) firstWeekHeading = h2;
    var nodes = collectUntilNext(h2);
    weekTabs.push({ num: w.num, label: w.label, heading: h2, nodes: nodes });
  });

  if (weekTabs.length === 4 && firstWeekHeading) {
    var marker3 = document.createElement('div');
    firstWeekHeading.parentNode.insertBefore(marker3, firstWeekHeading);
    var carousel3 = buildCarousel('weeks', '&#9654;', 'rose', "Plan d'ex\u00e9cution \u2014 4 semaines", weekTabs);
    marker3.parentNode.replaceChild(carousel3, marker3);
  }

  // ══════════════════════════════════════════════
  // EVENT LISTENERS
  // ══════════════════════════════════════════════
  document.addEventListener('click', function(e) {
    var tab = e.target.closest('.carousel-tab');
    if (tab) {
      switchTab(tab.getAttribute('data-carousel'), parseInt(tab.getAttribute('data-index')));
      return;
    }

    var navBtn = e.target.closest('.carousel-nav-btn');
    if (navBtn && !navBtn.disabled) {
      var cid = navBtn.getAttribute('data-carousel');
      var dir = navBtn.getAttribute('data-dir');
      var activeTab = document.querySelector('.carousel-tab[data-carousel="' + cid + '"].active');
      if (activeTab) {
        var cur = parseInt(activeTab.getAttribute('data-index'));
        var next = dir === 'next' ? cur + 1 : cur - 1;
        switchTab(cid, next);
        var section = document.getElementById('carousel-' + cid);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (e.target.closest('.back-to-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  });

  // ══════════════════════════════════════════════
  // BACK TO TOP BUTTON
  // ══════════════════════════════════════════════
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '&#8593;';
  btn.title = 'Retour en haut';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  // ══════════════════════════════════════════════
  // REMOVE original TOC in content (redundant with cover TOC)
  // ══════════════════════════════════════════════
  var tocH2 = allH2.find(function(h) { return h.textContent.includes('Table des mati'); });
  if (tocH2) {
    var toRemove = [tocH2];
    var el = tocH2.nextElementSibling;
    while (el && el.tagName !== 'H2' && el.tagName !== 'H1') {
      if (el.classList && el.classList.contains('carousel-section')) break;
      toRemove.push(el);
      el = el.nextElementSibling;
    }
    toRemove.forEach(function(n) { n.remove(); });
  }
});
