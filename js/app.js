(function() {
    "use strict";

    // ============================================================
    // PROJECT DATA - INFINITELY SCALABLE
    // ============================================================
    const projects = [{
        id: 1,
        number: "01",
        title: "Inventory Counting System",
        category: "Warehouse Automation",
        status: "In Progress",
        statusClass: "status-progress",
        description: "Modernizing warehouse inventory counting through digital scanning, discrepancy detection, and audit trails.",
        problem: "Manual counting is slow, error‑prone and lacks traceability. Discrepancies are hard to track and reconcile.",
        solution: "Mobile‑friendly scanning with QR/barcode search, expected vs actual comparison, and automatic discrepancy flagging with recount workflow.",
        features: ["SKU scanning", "QR/barcode search", "Smart search", "Warehouse selection", "Count input", "Expected vs actual", "Discrepancy detection", "Recount workflow", "Audit trail", "User tracking"],
        workflow: ["Physical Inventory", "Scan SKU", "Enter Count", "Compare Expected vs Actual", "Detect Discrepancy", "Recount", "Audit Trail"],
        impact: ["Faster physical verification", "Reduced manual work", "Better accuracy", "Auditability", "Inventory history"],
        video: "videos/inventory-counting.mp4",
        thumbnail: "assets/images/inventory-thumb.jpg",
        icon: "fa-boxes",
        iconBg: "#e3f0f7",
        color: "#2d7a9b"
    }, {
        id: 2,
        number: "02",
        title: "Factory Quality Evidence System",
        category: "Quality Assurance",
        status: "Planned",
        statusClass: "status-planned",
        description: "Automated consolidation of factory quality issues with photo, video and document evidence.",
        problem: "Quality issues are reported across emails and spreadsheets, making review and tracking fragmented.",
        solution: "Centralized system to capture SKU, issue category, evidence (photos/videos/docs) and supplier references, with search and reporting.",
        features: ["Issue categorization", "Photo/video evidence", "Document upload", "Supplier reference", "Search & filter", "History", "Reporting"],
        workflow: ["Quality issue detected", "Enter SKU", "Categorise", "Attach evidence", "Review", "Track resolution"],
        impact: ["Easier review", "Centralised documentation", "Better supplier visibility", "Historical records"],
        video: "videos/factory-quality.mp4",
        thumbnail: "assets/images/factory-thumb.jpg",
        icon: "fa-shield-halved",
        iconBg: "#f0f3f7",
        color: "#6c757d"
    }, {
        id: 3,
        number: "03",
        title: "Container Management System",
        category: "Supply Chain",
        status: "In Progress",
        statusClass: "status-progress",
        description: "End‑to‑end container tracking, ETA monitoring, and product allocation for imported inventory.",
        problem: "Container status and product arrival are tracked manually, causing delays and allocation errors.",
        solution: "Dashboard with container status, ETA, packing‑list details, expected vs received quantities, and discrepancy alerts.",
        features: ["Container tracking", "Status & ETA", "Product/SKU allocation", "Packing-list info", "Expected vs received", "Discrepancy flag", "FCL tracking", "History"],
        workflow: ["Container arrives", "Register packing list", "Monitor ETA", "Check received qty", "Flag discrepancies", "Update inventory"],
        impact: ["Improved visibility", "Reduced manual tracking", "Better inventory planning", "Discrepancy alerts"],
        video: "videos/container-management.mp4",
        thumbnail: "assets/images/container-thumb.jpg",
        icon: "fa-ship",
        iconBg: "#e3f0f7",
        color: "#2d7a9b"
    }, {
        id: 4,
        number: "04",
        title: "Order Pending Management System",
        category: "Operations",
        status: "Planned",
        statusClass: "status-planned",
        description: "Centralized monitoring and resolution of pending orders across Shopee, Lazada and TikTok Shop.",
        problem: "Pending orders are scattered across platforms, with no clear visibility of root causes (e.g. inventory shortages).",
        solution: "Unified dashboard to prioritise, age, and resolve pending orders by platform, SKU availability, and exception type.",
        features: ["Pending order monitoring", "Platform identification", "SKU availability", "Order prioritisation", "Aging", "Resolution status", "Reporting"],
        workflow: ["Order placed", "Pending detection", "Check SKU availability", "Prioritise", "Resolve exception", "Update status"],
        impact: ["Centralised pending view", "Faster resolution", "Better inventory alignment", "Exception handling"],
        video: "videos/order-pending.mp4",
        thumbnail: "assets/images/order-thumb.jpg",
        icon: "fa-clipboard-list",
        iconBg: "#f0f3f7",
        color: "#6c757d"
    }];

    // ============================================================
    // DOM REFS
    // ============================================================
    const journeyStops = document.getElementById('journeyStops');
    const roadmapTimeline = document.getElementById('roadmapTimeline');
    const projectsGrid = document.getElementById('projectsGrid');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const projectCount = document.getElementById('projectCount');

    // Update project count
    if (projectCount) projectCount.textContent = projects.length;

    // ============================================================
    // RENDER JOURNEY STOPS (Animated Road)
    // ============================================================
    function renderJourneyStops() {
        journeyStops.innerHTML = '';
        projects.forEach((p, idx) => {
            const stop = document.createElement('div');
            stop.className = 'journey-stop';
            stop.dataset.id = p.id;
            stop.innerHTML = `
                <div class="stop-marker">${p.number}</div>
                <div class="stop-label">${p.title}</div>
                <div class="stop-status">${p.status}</div>
            `;
            stop.addEventListener('click', () => openModal(p.id));
            journeyStops.appendChild(stop);
        });
    }

    // ============================================================
    // RENDER ROADMAP TIMELINE
    // ============================================================
    function renderRoadmap() {
        roadmapTimeline.innerHTML = '';
        projects.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'roadmap-item';
            item.dataset.id = p.id;
            item.innerHTML = `
                <div class="item-content">
                    <div class="item-number">${p.number}</div>
                    <div class="item-title">${p.title}</div>
                    <span class="item-status ${p.statusClass}">${p.status}</span>
                    <p style="color:var(--text-muted);font-size:0.9rem;margin-top:6px;">${p.description}</p>
                </div>
                <div class="item-dot"></div>
            `;
            item.addEventListener('click', () => openModal(p.id));

            // Add animation trigger
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        item.classList.add('visible');
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(item);
            roadmapTimeline.appendChild(item);

            // Add arrow
            if (idx < projects.length - 1) {
                const arrow = document.createElement('div');
                arrow.style.cssText = `
                    text-align: center;
                    color: var(--text-light);
                    font-size: 1.4rem;
                    padding: 8px 0;
                    opacity: 0.3;
                `;
                arrow.innerHTML = '<i class="fas fa-arrow-down"></i>';
                roadmapTimeline.appendChild(arrow);
            }
        });
    }

    // ============================================================
    // RENDER PROJECT CARDS (3D)
    // ============================================================
    function renderCards() {
        projectsGrid.innerHTML = '';
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = p.id;
            card.innerHTML = `
                <div class="card-number">${p.number}</div>
                <div class="card-icon-wrap" style="background:${p.iconBg || '#e3f0f7'};color:${p.color || '#2d7a9b'}">
                    <i class="fas ${p.icon || 'fa-cube'}"></i>
                </div>
                <span class="card-status ${p.statusClass}">${p.status}</span>
                <div class="card-title">${p.title}</div>
                <div class="card-category"><i class="fas fa-tag"></i> ${p.category}</div>
                <div class="card-description">${p.description}</div>
                <div class="card-footer">
                    <button class="btn-explore" data-id="${p.id}">
                        Explore <i class="fas fa-arrow-right"></i>
                    </button>
                    <span style="font-size:0.7rem;color:var(--text-light);">Click to learn more</span>
                </div>
            `;

            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-explore')) return;
                const id = parseInt(this.dataset.id);
                openModal(id);
            });

            const btn = card.querySelector('.btn-explore');
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                openModal(id);
            });

            // 3D tilt effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                this.style.transform =
                    `perspective(1000px) rotateX(${y * 6}deg) rotateY(${x * 6}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform =
                    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });

            projectsGrid.appendChild(card);
        });
    }

    // ============================================================
    // OPEN MODAL
    // ============================================================
    function openModal(id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        modalContent.innerHTML = `
            <div style="padding:20px 0 0;">
                <span class="card-status ${project.statusClass}" style="display:inline-block;margin-bottom:8px;">${project.status}</span>
                <h2 style="font-size:2.2rem;font-weight:800;color:var(--primary);">${project.number} — ${project.title}</h2>
                <div style="display:flex;flex-wrap:wrap;gap:16px 28px;color:var(--text-muted);font-size:0.95rem;margin:4px 0 20px;">
                    <span><strong>Category:</strong> ${project.category}</span>
                </div>

                <!-- Tabs -->
                <div style="display:flex;gap:4px;border-bottom:2px solid var(--border-light);margin-bottom:24px;overflow-x:auto;">
                    <button class="modal-tab active" data-tab="overview" style="padding:12px 24px;font-weight:600;font-size:0.95rem;color:var(--text-muted);background:none;border:none;cursor:pointer;transition:var(--transition);position:relative;white-space:nowrap;">
                        <i class="fas fa-info-circle"></i> Overview
                    </button>
                    <button class="modal-tab" data-tab="features" style="padding:12px 24px;font-weight:600;font-size:0.95rem;color:var(--text-muted);background:none;border:none;cursor:pointer;transition:var(--transition);position:relative;white-space:nowrap;">
                        <i class="fas fa-list-check"></i> Features
                    </button>
                    <button class="modal-tab" data-tab="workflow" style="padding:12px 24px;font-weight:600;font-size:0.95rem;color:var(--text-muted);background:none;border:none;cursor:pointer;transition:var(--transition);position:relative;white-space:nowrap;">
                        <i class="fas fa-diagram-project"></i> Workflow
                    </button>
                    <button class="modal-tab" data-tab="demo" style="padding:12px 24px;font-weight:600;font-size:0.95rem;color:var(--text-muted);background:none;border:none;cursor:pointer;transition:var(--transition);position:relative;white-space:nowrap;">
                        <i class="fas fa-video"></i> Demo
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="modal-tab-content active" id="tab-overview">
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:10px;">Overview</h3>
                    <p style="color:var(--text-muted);font-size:0.98rem;line-height:1.7;">${project.description}</p>
                    <br>
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:10px;">Problem</h3>
                    <p style="color:var(--text-muted);font-size:0.98rem;line-height:1.7;">${project.problem}</p>
                    <br>
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:10px;">Solution</h3>
                    <p style="color:var(--text-muted);font-size:0.98rem;line-height:1.7;">${project.solution}</p>
                    <br>
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:10px;">Expected Impact</h3>
                    <ul style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;list-style:none;padding:0;">
                        ${project.impact.map(item => `<li style="display:flex;align-items:center;gap:10px;color:var(--text-muted);font-size:0.95rem;"><i class="fas fa-circle-check" style="color:var(--accent);"></i> ${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-tab-content" id="tab-features" style="display:none;">
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:12px;">Key Features</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;">
                        ${project.features.map(f => `<span style="background:var(--bg-light);padding:10px 16px;border-radius:40px;font-size:0.85rem;font-weight:500;display:flex;align-items:center;gap:8px;border:1px solid var(--border-light);"><i class="fas fa-check-circle" style="color:var(--accent);"></i> ${f}</span>`).join('')}
                    </div>
                </div>

                <div class="modal-tab-content" id="tab-workflow" style="display:none;">
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:12px;">Process Workflow</h3>
                    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;">
                        ${project.workflow.map((step, i) => {
                            if (i === project.workflow.length - 1) {
                                return `<span style="background:var(--bg-white);padding:8px 20px;border-radius:40px;border:1px solid var(--border-light);font-size:0.85rem;font-weight:500;color:var(--primary);">${step}</span>`;
                            }
                            return `<span style="background:var(--bg-white);padding:8px 20px;border-radius:40px;border:1px solid var(--border-light);font-size:0.85rem;font-weight:500;color:var(--primary);">${step}</span><span style="color:var(--text-light);font-size:0.9rem;"><i class="fas fa-arrow-right"></i></span>`;
                        }).join('')}
                    </div>
                </div>

                <div class="modal-tab-content" id="tab-demo" style="display:none;">
                    <h3 style="font-size:1.1rem;font-weight:600;color:var(--primary);margin-bottom:12px;">Explainer Video</h3>
                    <div style="border-radius:var(--radius-md);overflow:hidden;background:#0a1628;box-shadow:var(--shadow-sm);">
                        <video controls preload="metadata" poster="${project.thumbnail || ''}" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#0a1628;">
                            <source src="${project.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-top:8px;">
                        <i class="fas fa-info-circle"></i> Watch the video to see the system in action.
                    </p>
                </div>
            </div>
        `;

        // Setup tab switching
        const tabs = modalContent.querySelectorAll('.modal-tab');
        const contents = modalContent.querySelectorAll('.modal-tab-content');

        tabs.forEach(tab => {
            tab.style.position = 'relative';
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.color = 'var(--text-muted)';
                    t.style.borderBottom = 'none';
                });
                this.classList.add('active');
                this.style.color = 'var(--primary)';
                this.style.borderBottom = '3px solid var(--accent)';

                contents.forEach(c => c.style.display = 'none');
                const target = document.getElementById(`tab-${tabId}`);
                if (target) target.style.display = 'block';
            });
        });

        // Set initial active tab style
        const firstTab = modalContent.querySelector('.modal-tab.active');
        if (firstTab) {
            firstTab.style.color = 'var(--primary)';
            firstTab.style.borderBottom = '3px solid var(--accent)';
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => modalClose.focus(), 100);
    }

    // ============================================================
    // CLOSE MODAL
    // ============================================================
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const videos = modalContent.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });

    navToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
        this.setAttribute('aria-expanded', expanded);
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ============================================================
    // ANIMATED COUNTERS
    // ============================================================
    function animateCounters() {
        const counters = document.querySelectorAll('.metrics-number');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            if (!target) return;
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (target === 100 ? '%' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (target === 100 ? '%' : '');
                }
            }, 20);
        });
    }

    // ============================================================
    // INIT
    // ============================================================
    renderJourneyStops();
    renderRoadmap();
    renderCards();

    // Animate counters on scroll
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(metricsSection);
    }

    console.log(`🚗 AutoTech Roadmap loaded with ${projects.length} projects.`);
    console.log('📌 Add new projects to the "projects" array in js/app.js');
})();
