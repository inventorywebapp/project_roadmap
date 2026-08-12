(function() {
    "use strict";

    // ============================================================
    // PROJECT DATA - Add as many as you want
    // ============================================================
    const projects = [{
        id: 1,
        number: "01",
        title: "Inventory Counting System",
        category: "Warehouse",
        status: "In Progress",
        statusClass: "status-progress",
        description: "Digital scanning, discrepancy detection, and audit trails for faster, more accurate inventory counting.",
        problem: "Manual counting is slow, error‑prone and lacks traceability.",
        solution: "Mobile scanning with QR/barcode search, expected vs actual comparison, and automatic discrepancy flagging.",
        features: ["SKU scanning", "QR/barcode search", "Smart search", "Warehouse selection", "Count input", "Discrepancy detection", "Recount workflow", "Audit trail"],
        workflow: ["Physical Inventory", "Scan SKU", "Enter Count", "Compare vs Expected", "Detect Discrepancy", "Recount", "Audit Trail"],
        impact: ["Faster verification", "Reduced manual work", "Better accuracy", "Auditability"],
        video: "videos/inventory-counting.mp4",
        thumbnail: "assets/images/inventory-thumb.jpg",
        icon: "fa-boxes"
    }, {
        id: 2,
        number: "02",
        title: "Factory Quality Evidence System",
        category: "Quality",
        status: "Planned",
        statusClass: "status-planned",
        description: "Automated consolidation of factory quality issues with photo, video and document evidence.",
        problem: "Quality issues are reported across emails and spreadsheets, making review and tracking fragmented.",
        solution: "Centralized system for SKU, issue categorization, evidence, and supplier references with search and reporting.",
        features: ["Issue categorization", "Photo/video evidence", "Document upload", "Supplier reference", "Search & filter", "History", "Reporting"],
        workflow: ["Issue detected", "Enter SKU", "Categorise", "Attach evidence", "Review", "Track resolution"],
        impact: ["Easier review", "Centralised docs", "Supplier visibility", "Historical records"],
        video: "videos/factory-quality.mp4",
        thumbnail: "assets/images/factory-thumb.jpg",
        icon: "fa-shield-halved"
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
        features: ["Container tracking", "Status & ETA", "Product allocation", "Packing-list info", "Expected vs received", "Discrepancy flag", "History"],
        workflow: ["Container arrives", "Register packing list", "Monitor ETA", "Check received qty", "Flag discrepancies", "Update inventory"],
        impact: ["Improved visibility", "Reduced manual tracking", "Better planning", "Discrepancy alerts"],
        video: "videos/container-management.mp4",
        thumbnail: "assets/images/container-thumb.jpg",
        icon: "fa-ship"
    }, {
        id: 4,
        number: "04",
        title: "Order Pending Management System",
        category: "Operations",
        status: "Planned",
        statusClass: "status-planned",
        description: "Centralized monitoring and resolution of pending orders across Shopee, Lazada and TikTok Shop.",
        problem: "Pending orders are scattered across platforms with no clear visibility of root causes.",
        solution: "Unified dashboard to prioritise, age, and resolve pending orders by platform and SKU availability.",
        features: ["Pending monitoring", "Platform identification", "SKU availability", "Order prioritisation", "Aging", "Resolution status", "Reporting"],
        workflow: ["Order placed", "Pending detection", "Check SKU availability", "Prioritise", "Resolve exception", "Update status"],
        impact: ["Centralised view", "Faster resolution", "Better alignment", "Exception handling"],
        video: "videos/order-pending.mp4",
        thumbnail: "assets/images/order-thumb.jpg",
        icon: "fa-clipboard-list"
    }];

    // ============================================================
    // DOM REFS
    // ============================================================
    const timeline = document.getElementById('timeline');
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
    // RENDER TIMELINE
    // ============================================================
    function renderTimeline() {
        timeline.innerHTML = '';
        projects.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="content" data-id="${p.id}">
                    <div class="number">${p.number}</div>
                    <div class="title">${p.title}</div>
                    <span class="status ${p.statusClass}">${p.status}</span>
                    <p style="color:var(--text-muted);font-size:0.9rem;margin-top:4px;">${p.description}</p>
                </div>
                <div class="dot"></div>
            `;

            const content = item.querySelector('.content');
            content.addEventListener('click', () => openModal(p.id));

            // Intersection Observer for scroll animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        item.classList.add('visible');
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(item);
            timeline.appendChild(item);
        });
    }

    // ============================================================
    // RENDER PROJECT CARDS
    // ============================================================
    function renderCards() {
        projectsGrid.innerHTML = '';
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.id = p.id;
            card.innerHTML = `
                <div class="icon-wrap">
                    <i class="fas ${p.icon || 'fa-cube'}"></i>
                </div>
                <div class="number">${p.number}</div>
                <div class="title">${p.title}</div>
                <div class="category">${p.category}</div>
                <div class="description">${p.description}</div>
                <div class="footer">
                    <button class="explore" data-id="${p.id}">
                        Explore <i class="fas fa-arrow-right"></i>
                    </button>
                    <span class="status-tag ${p.statusClass}">${p.status}</span>
                </div>
            `;

            card.addEventListener('click', function(e) {
                if (e.target.closest('.explore')) return;
                const id = parseInt(this.dataset.id);
                openModal(id);
            });

            const btn = card.querySelector('.explore');
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id);
                openModal(id);
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
            <span class="modal-status ${project.statusClass}">${project.status}</span>
            <h2>${project.number} — ${project.title}</h2>
            <div class="modal-meta">${project.category}</div>

            <div class="modal-body">
                <h3>Overview</h3>
                <p>${project.description}</p>

                <h3>Problem</h3>
                <p>${project.problem}</p>

                <h3>Solution</h3>
                <p>${project.solution}</p>

                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                </ul>

                <h3>Expected Impact</h3>
                <ul>
                    ${project.impact.map(i => `<li><i class="fas fa-circle-check"></i> ${i}</li>`).join('')}
                </ul>

                <h3>Workflow</h3>
                <p style="font-size:0.92rem;">
                    ${project.workflow.join(' → ')}
                </p>

                <h3>Demo Video</h3>
                <div class="video-wrapper">
                    <video controls preload="metadata" poster="${project.thumbnail || ''}">
                        <source src="${project.video}" type="video/mp
