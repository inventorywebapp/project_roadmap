(function() {
    "use strict";

    // ============================================================
    // PROJECT DATA (Single Source of Truth - INFINITELY SCALABLE)
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
        features: [
            "SKU scanning",
            "QR/barcode search",
            "Smart search",
            "Warehouse selection",
            "Count input",
            "Expected vs actual",
            "Discrepancy detection",
            "Recount workflow",
            "Audit trail",
            "User tracking"
        ],
        workflow: [
            "Physical Inventory",
            "Scan SKU",
            "Enter Count",
            "Compare Expected vs Actual",
            "Detect Discrepancy",
            "Recount",
            "Audit Trail"
        ],
        impact: [
            "Faster physical verification",
            "Reduced manual work",
            "Better accuracy",
            "Auditability",
            "Inventory history"
        ],
        video: "videos/inventory-counting.mp4",
        thumbnail: "assets/images/inventory-thumb.jpg",
        icon: "fa-boxes",
        iconBg: "#e3f0f7"
    }, {
        id: 2,
        number: "02",
        title: "Factory Quality Issue Evidence Consolidator",
        category: "Quality Assurance",
        status: "Planned",
        statusClass: "status-planned",
        description: "Automated consolidation of factory quality issues with photo, video and document evidence.",
        problem: "Quality issues are reported across emails and spreadsheets, making review and tracking fragmented.",
        solution: "Centralized system to capture SKU, issue category, evidence (photos/videos/docs) and supplier references, with search and reporting.",
        features: [
            "Issue categorization",
            "Photo/video evidence",
            "Document upload",
            "Supplier reference",
            "Search & filter",
            "History",
            "Reporting"
        ],
        workflow: [
            "Quality issue detected",
            "Enter SKU",
            "Categorise",
            "Attach evidence",
            "Review",
            "Track resolution"
        ],
        impact: [
            "Easier review",
            "Centralised documentation",
            "Better supplier visibility",
            "Historical records"
        ],
        video: "videos/factory-quality.mp4",
        thumbnail: "assets/images/factory-thumb.jpg",
        icon: "fa-shield-halved",
        iconBg: "#f0f3f7"
    }, {
        id: 3,
        number: "03",
        title: "Automated Container Management System",
        category: "Supply Chain",
        status: "In Progress",
        statusClass: "status-progress",
        description: "End‑to‑end container tracking, ETA monitoring, and product allocation for imported inventory.",
        problem: "Container status and product arrival are tracked manually, causing delays and allocation errors.",
        solution: "Dashboard with container status, ETA, packing‑list details, expected vs received quantities, and discrepancy alerts.",
        features: [
            "Container tracking",
            "Status & ETA",
            "Product/SKU allocation",
            "Packing-list info",
            "Expected vs received",
            "Discrepancy flag",
            "FCL tracking",
            "History"
        ],
        workflow: [
            "Container arrives",
            "Register packing list",
            "Monitor ETA",
            "Check received qty",
            "Flag discrepancies",
            "Update inventory"
        ],
        impact: [
            "Improved visibility",
            "Reduced manual tracking",
            "Better inventory planning",
            "Discrepancy alerts"
        ],
        video: "videos/container-management.mp4",
        thumbnail: "assets/images/container-thumb.jpg",
        icon: "fa-ship",
        iconBg: "#e3f0f7"
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
        features: [
            "Pending order monitoring",
            "Platform identification",
            "SKU availability",
            "Order prioritisation",
            "Aging",
            "Resolution status",
            "Reporting"
        ],
        workflow: [
            "Order placed",
            "Pending detection",
            "Check SKU availability",
            "Prioritise",
            "Resolve exception",
            "Update status"
        ],
        impact: [
            "Centralised pending view",
            "Faster resolution",
            "Better inventory alignment",
            "Exception handling"
        ],
        video: "videos/order-pending.mp4",
        thumbnail: "assets/images/order-thumb.jpg",
        icon: "fa-clipboard-list",
        iconBg: "#f0f3f7"
    }];

    // ============================================================
    // DOM REFS
    // ============================================================
    const roadmapTimeline = document.getElementById('roadmapTimeline');
    const projectsGrid = document.getElementById('projectsGrid');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const projectCount = document.getElementById('projectCount');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // ============================================================
    // UPDATE PROJECT COUNT
    // ============================================================
    if (projectCount) {
        projectCount.textContent = projects.length;
    }

    // ============================================================
    // RENDER ROADMAP (Animated Timeline)
    // ============================================================
    function renderRoadmap() {
        roadmapTimeline.innerHTML = '';

        projects.forEach((project, index) => {
            const node = document.createElement('div');
            node.className = 'roadmap-node';
            node.dataset.id = project.id;

            node.innerHTML = `
                <div class="node-content">
                    <div class="node-number">${project.number}</div>
                    <div class="node-title">${project.title}</div>
                    <span class="node-status">${project.status}</span>
                    <div class="node-description">${project.description}</div>
                </div>
                <div class="node-dot"></div>
            `;

            node.addEventListener('click', function() {
                // Highlight the node
                document.querySelectorAll('.roadmap-node').forEach(n => n.classList.remove('active'));
                this.classList.add('active');

                // Scroll to the project card
                const card = document.querySelector(`.project-card[data-id="${project.id}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.transition = 'all 0.3s';
                    card.style.boxShadow = 'var(--shadow-lg)';
                    card.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        card.style.boxShadow = '';
                        card.style.borderColor = '';
                    }, 1500);
                }

                // Open modal after a brief delay
                setTimeout(() => {
                    openModal(project.id);
                }, 300);
            });

            roadmapTimeline.appendChild(node);

            // Add arrow between nodes (except last)
            if (index < projects.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'roadmap-arrow';
                arrow.innerHTML = '<i class="fas fa-arrow-down"></i>';
                arrow.style.cssText = `
                    text-align: center;
                    color: var(--text-light);
                    font-size: 1.2rem;
                    padding: 4px 0;
                    opacity: 0.4;
                `;
                // Insert arrow after the node
                roadmapTimeline.appendChild(arrow);
            }
        });
    }

    // ============================================================
    // RENDER PROJECT CARDS
    // ============================================================
    function renderCards() {
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = project.id;

            card.innerHTML = `
                <div class="card-header">
                    <span class="card-number">${project.number}</span>
                    <span class="card-status ${project.statusClass}">${project.status}</span>
                </div>
                <div class="card-icon-wrapper" style="background:${project.iconBg || '#e3f0f7'}">
                    <i class="fas ${project.icon || 'fa-cube'}"></i>
                </div>
                <div class="card-title">${project.title}</div>
                <div class="card-category">
                    <i class="fas fa-tag"></i> ${project.category}
                </div>
                <div class="card-description">${project.description}</div>
                <div class="card-footer">
                    <button class="btn-view" data-id="${project.id}">
                        Explore Project <i class="fas fa-arrow-right"></i>
                    </button>
                    <span class="card-tag">${project.status}</span>
                </div>
            `;

            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-view')) return;
                const id = parseInt(this.dataset.id);
                openModal(id);
            });

            const btn = card.querySelector('.btn-view');
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                openModal(id);
            });

            projectsGrid.appendChild(card);
        });
    }

    // ============================================================
    // OPEN MODAL (Full-Screen Drawer with Tabs)
    // ============================================================
    let currentProjectId = null;
    let activeTab = 'overview';

    function openModal(id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        currentProjectId = id;
        activeTab = 'overview';

        // Build modal content
        modalContent.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge">${project.status}</span>
                <h2>${project.number} — ${project.title}</h2>
                <div class="modal-meta">
                    <span><strong>Category:</strong> ${project.category}</span>
                    <span><strong>Status:</strong> ${project.status}</span>
                </div>
            </div>

            <div class="modal-tabs" role="tablist">
                <button class="modal-tab active" data-tab="overview" role="tab" aria-selected="true">
                    <i class="fas fa-info-circle"></i> Overview
                </button>
                <button class="modal-tab" data-tab="features" role="tab" aria-selected="false">
                    <i class="fas fa-list-check"></i> Features
                </button>
                <button class="modal-tab" data-tab="workflow" role="tab" aria-selected="false">
                    <i class="fas fa-diagram-project"></i> Workflow
                </button>
                <button class="modal-tab" data-tab="demo" role="tab" aria-selected="false">
                    <i class="fas fa-video"></i> Demo
                </button>
            </div>

            <div class="modal-tab-content active" id="tab-overview" role="tabpanel">
                <h3>Overview</h3>
                <p>${project.description}</p>
                <br />
                <h3>Problem</h3>
                <p>${project.problem}</p>
                <br />
                <h3>Solution</h3>
                <p>${project.solution}</p>
                <br />
                <h3>Expected Impact</h3>
                <ul class="impact-list">
                    ${project.impact.map(item => `<li><i class="fas fa-circle-check"></i> ${item}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-tab-content" id="tab-features" role="tabpanel">
                <h3>Key Features</h3>
                <div class="feature-grid">
                    ${project.features.map(f => `<span class="feat"><i class="fas fa-check-circle" style="color:var(--accent);"></i> ${f}</span>`).join('')}
                </div>
            </div>

            <div class="modal-tab-content" id="tab-workflow" role="tabpanel">
                <h3>Process Workflow</h3>
                <div class="workflow-steps">
                    ${project.workflow.map((step, i) => {
                        if (i === project.workflow.length - 1) {
                            return `<span class="step">${step}</span>`;
                        }
                        return `<span class="step">${step}</span><span class="arrow"><i class="fas fa-arrow-right"></i></span>`;
                    }).join('')}
                </div>
            </div>

            <div class="modal-tab-content" id="tab-demo" role="tabpanel">
                <h3>Explainer Video</h3>
                <div class="modal-video-wrapper">
                    <video controls preload="metadata" poster="${project.thumbnail || ''}">
                        <source src="${project.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-top:8px;">
                    <i class="fas fa-info-circle"></i> Watch the video to see the system in action.
                </p>
            </div>
        `;

        // Open modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Setup tab switching
        setupTabs();

        // Focus close button
        setTimeout(() => modalClose.focus(), 100);
    }

    // ============================================================
    // SETUP TABS
    // ============================================================
    function setupTabs() {
        const tabs = modalContent.querySelectorAll('.modal-tab');
        const contents = modalContent.querySelectorAll('.modal-tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;

                // Update tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // Update content
                contents.forEach(c => c.classList.remove('active'));
                const target = document.getElementById(`tab-${tabId}`);
                if (target) target.classList.add('active');
            });
        });
    }

    // ============================================================
    // CLOSE MODAL
    // ============================================================
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Pause all videos
        const videos = modalContent.querySelectorAll('video');
        videos.forEach(v => v.pause());

        // Reset active state on roadmap nodes
        document.querySelectorAll('.roadmap-node').forEach(n => n.classList.remove('active'));
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================

    // Modal close
    modalClose.addEventListener('click', closeModal);

    // Click overlay to close
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Nav hamburger
    navToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
        this.setAttribute('aria-expanded', expanded);
        navLinks.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================================
    // KEYBOARD NAVIGATION FOR ROADMAP NODES
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target.closest('.roadmap-node');
            if (target) {
                e.preventDefault();
                target.click();
            }
        }
    });

    // ============================================================
    // INITIALIZATION
    // ============================================================
    renderRoadmap();
    renderCards();

    // Log scalability info
    console.log(`✅ Digital Transformation Roadmap loaded with ${projects.length} projects.`);
    console.log('📌 To add a new project, add an object to the "projects" array in js/app.js');

})();
