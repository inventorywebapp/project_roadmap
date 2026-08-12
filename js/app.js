(function() {
    "use strict";

    // =====================================================
    // PROJECT DATA (Single source of truth)
    // =====================================================
    const projects = [{
        id: 1,
        number: "01",
        title: "Inventory Counting System",
        category: "Warehouse Automation",
        status: "In Progress",
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
        icon: "fa-boxes"
    }, {
        id: 2,
        number: "02",
        title: "Factory Quality Issue Evidence Consolidator",
        category: "Quality Assurance",
        status: "Planned",
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
        icon: "fa-shield-halved"
    }, {
        id: 3,
        number: "03",
        title: "Automated Container Management System",
        category: "Supply Chain",
        status: "In Progress",
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
        icon: "fa-ship"
    }, {
        id: 4,
        number: "04",
        title: "Order Pending Management System",
        category: "Operations",
        status: "Planned",
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
        icon: "fa-clipboard-list"
    }];

    // =====================================================
    // HELPER: Status badge styling
    // =====================================================
    function getStatusBadgeClass(status) {
        const map = {
            "In Progress": "status-progress",
            "Planned": "status-planned",
            "Completed": "status-completed",
            "On Hold": "status-hold",
            "Future": "status-future"
        };
        return map[status] || "status-default";
    }

    // =====================================================
    // RENDER: Roadmap
    // =====================================================
    function renderRoadmap() {
        const container = document.getElementById('roadmapFlow');
        container.innerHTML = '';

        projects.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'roadmap-item';
            item.innerHTML = `
                    <span class="num">${p.number}</span>
                    ${p.title}
                    <span class="status-badge">${p.status}</span>
                `;
            container.appendChild(item);

            if (idx < projects.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'roadmap-arrow';
                arrow.innerHTML = '<i class="fas fa-arrow-down"></i>';
                container.appendChild(arrow);
            }
        });
    }

    // =====================================================
    // RENDER: Project Cards
    // =====================================================
    function renderCards() {
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';

        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = p.id;
            card.innerHTML = `
                    <div class="card-header">
                        <span class="card-number">${p.number}</span>
                        <span class="card-status">${p.status}</span>
                    </div>
                    <div class="card-title">${p.title}</div>
                    <div class="card-category">
                        <i class="fas ${p.icon || 'fa-tag'}"></i> ${p.category}
                    </div>
                    <div class="card-description">${p.description}</div>
                    <div class="card-footer">
                        <button class="btn-view" data-id="${p.id}">
                            Explore Project <i class="fas fa-arrow-right"></i>
                        </button>
                        <span class="card-icon">
                            <i class="fas ${p.icon || 'fa-cube'}"></i>
                        </span>
                    </div>
                `;
            grid.appendChild(card);
        });

        // Attach click events to "Explore Project" buttons
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                openModal(id);
            });
        });

        // Click on card itself (except on buttons/icons)
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-view') || e.target.closest('.card-icon')) return;
                const id = parseInt(this.dataset.id);
                openModal(id);
            });
        });
    }

    // =====================================================
    // MODAL LOGIC
    // =====================================================
    const overlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');

    function openModal(id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        // Build feature grid
        let featuresHtml = project.features.map(f =>
            `<span class="feat"><i class="fas fa-check-circle" style="color:var(--accent);"></i>${f}</span>`
        ).join('');

        // Build workflow steps
        let workflowHtml = project.workflow.map((step, i) => {
            if (i === project.workflow.length - 1) {
                return `<span>${step}</span>`;
            }
            return `<span>${step}</span><span class="arrow"><i class="fas fa-arrow-right"></i></span>`;
        }).join('');

        // Build impact list
        let impactHtml = project.impact.map(item =>
            `<li><i class="fas fa-circle-check"></i> ${item}</li>`
        ).join('');

        modalBody.innerHTML = `
                <h2 id="modalTitle">${project.number} — ${project.title}</h2>
                <div class="modal-meta">
                    <span><strong>Status:</strong> ${project.status}</span>
                    <span><strong>Category:</strong> ${project.category}</span>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-bullseye"></i> Overview</h3>
                    <p>${project.description}</p>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-triangle-exclamation"></i> Problem</h3>
                    <p>${project.problem}</p>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-lightbulb"></i> Solution</h3>
                    <p>${project.solution}</p>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-list-check"></i> Key features</h3>
                    <div class="feature-grid">${featuresHtml}</div>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-diagram-project"></i> Workflow</h3>
                    <div class="workflow-steps">${workflowHtml}</div>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-chart-simple"></i> Expected impact</h3>
                    <ul class="impact-list">${impactHtml}</ul>
                </div>

                <div class="modal-section">
                    <h3><i class="fas fa-video"></i> Explainer video</h3>
                    <div class="video-wrapper">
                        <video controls preload="metadata" poster="${project.thumbnail || ''}">
                            <source src="${project.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-top:6px;">
                        Play the video to see the system in action.
                    </p>
                </div>
            `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn.focus(), 80);
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Pause all videos inside modal
        const videos = modalBody.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }

    // Modal event listeners
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });

    // =====================================================
    // NAV HAMBURGER
    // =====================================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
        this.setAttribute('aria-expanded', expanded);
        navLinks.classList.toggle('open');
    });

    // =====================================================
    // INITIALIZATION
    // =====================================================
    renderRoadmap();
    renderCards();

})();