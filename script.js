document.querySelectorAll('#favorites .grid, #ai .grid, #coding .grid, #cloud .grid, #design .grid, #entertainment .grid, #gaming .grid, #learning .grid, #social .grid, #tools .grid, #shopping .grid, #itibe .grid').forEach(g => g.innerHTML = '');

const searchInput = document.getElementById('searchInput');
let sections = [];
let recentsContainer = null;
let recentsSection = null;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function applySearchFilter() {
    const filter = searchInput.value.trim().toLowerCase();

    sections.forEach(section => {
        let cardsInSection = section.querySelectorAll('.card');
        let visibleCardsCount = 0;
        let visibleIndex = 0;

        cardsInSection.forEach(card => {
            let text = card.innerText.toLowerCase();
            if (text.includes(filter)) {
                const wasHidden = card.style.display === 'none' || card.classList.contains('card-exit');
                card.classList.remove('card-exit');
                card.style.display = '';
                if (wasHidden) {
                    card.classList.remove('card-enter');
                    void card.offsetWidth; // restart the entrance animation
                    card.classList.add('card-enter');
                    card.style.animationDelay = `${Math.min(visibleIndex * 0.05, 0.4)}s`;
                }
                visibleCardsCount++;
                visibleIndex++;
            } else if (card.style.display !== 'none' && !card.classList.contains('card-exit')) {
                card.classList.add('card-exit');
                const el = card;
                setTimeout(() => {
                    if (el.classList.contains('card-exit')) {
                        el.style.display = 'none';
                    }
                }, 230);
            }
        });

        // Always show the section if the filter is empty.
        // If searching, only hide the section if NO cards match.
        if (filter === "") {
            section.style.display = 'block';
        } else {
            section.style.display = (visibleCardsCount > 0) ? 'block' : 'none';
        }
    });

    updateActiveNav();
}

searchInput.addEventListener('input', applySearchFilter);

/* ===== Categories ===== */
const DEFAULT_CATEGORIES = [
    { id: 'favorites', label: 'Favorites', emoji: '⭐', group: 'Core' },
    { id: 'ai', label: 'AI Workspace', emoji: '🤖', group: 'Development' },
    { id: 'coding', label: 'Coding Tools', emoji: '💻', group: 'Development' },
    { id: 'cloud', label: 'Cloud Engines', emoji: '☁', group: 'Development' },
    { id: 'design', label: 'Design Vault', emoji: '🎨', group: 'Creative & Media' },
    { id: 'entertainment', label: 'Entertainment', emoji: '📺', group: 'Creative & Media' },
    { id: 'gaming', label: 'Gaming Hub', emoji: '🎮', group: 'Creative & Media' },
    { id: 'learning', label: 'Learning', emoji: '📚', group: 'Social & Utility' },
    { id: 'social', label: 'Social Media', emoji: '🌐', group: 'Social & Utility' },
    { id: 'tools', label: 'Utility Tools', emoji: '🛠', group: 'Social & Utility' },
    { id: 'shopping', label: 'Shopping', emoji: '🛒', group: 'Shopping' },
    { id: 'itibe', label: 'Networking', emoji: '🌐', group: 'Networking' }
];

/* ===== Cards ===== */
function C(category, title, url, desc, extra) { return Object.assign({ category, title, url, desc }, extra || {}); }

const DEFAULT_CARDS = [
    C('favorites', 'Aternos', 'https://aternos.org/server/', 'Free, customizable, permanent Minecraft server hosting for you and your friends.'),

    C('ai', 'ChatGPT', 'https://chatgpt.com', 'Advanced LLM assistant for text generation, analysis, and problem-solving.', { pinned: true }),
    C('ai', 'Claude', 'https://claude.ai', "Anthropic's AI model focused on safe, precise deep writing and coding complex tasks."),
    C('ai', 'Gemini', 'https://gemini.google.com', "Google's highly integrated multimodal AI model for smart searching and assistance."),
    C('ai', 'Perplexity', 'https://www.perplexity.ai', 'An AI-powered conversational search engine that cites sources in real-time.'),
    C('ai', 'DeepSeek', 'https://deepseek.com', 'High-efficiency, powerful open-source reasoning model alternative for developers.'),
    C('ai', 'v0 by Vercel', 'https://v0.dev', 'Generative UI system that builds clean, modern, production-ready frontend code from text prompts.'),
    C('ai', 'Hugging Face', 'https://huggingface.co', 'The hub and repository for open-source AI models, datasets, and ML apps.'),
    C('ai', 'Runway', 'https://runwayml.com', 'Next-generation AI video generation and creative multi-media tools.'),

    C('coding', 'GitHub', 'https://github.com', 'Collaborate on code, manage repositories, and track project issues.', { pinned: true }),
    C('coding', 'Stack Overflow', 'https://stackoverflow.com', 'Community forum for developer Q&As, debugging, and programming solutions.'),
    C('coding', 'MDN Docs', 'https://developer.mozilla.org', 'The definitive web documentation resource for HTML, CSS, and JavaScript.'),
    C('coding', 'CodePen', 'https://codepen.io', 'An online development environment to write, test, and showcase interactive frontend designs.'),
    C('coding', 'Replit', 'https://replit.com', 'An online IDE that lets you build, test, and host projects directly in the browser.'),
    C('coding', 'LeetCode', 'https://leetcode.com', 'Technical coding platform packed with problems to practice for interviews.'),
    C('coding', 'CSS-Tricks', 'https://css-tricks.com', 'Articles, structural guides, and blueprint configurations dedicated to mastering modern layouts.'),

    C('cloud', 'AWS', 'https://aws.amazon.com', "Amazon's comprehensive cloud infrastructure suite offering scalable servers and storage."),
    C('cloud', 'Google Cloud', 'https://cloud.google.com', 'Google computing environment built around hosting reliable apps and data pipelines.'),
    C('cloud', 'Azure', 'https://azure.microsoft.com', 'Microsoft cloud platform designed for building, testing, and managing systems.'),
    C('cloud', 'Cloudflare', 'https://cloudflare.com', 'Global network infrastructure providing speed enhancements, DNS, and DDoS firewalls.'),
    C('cloud', 'Vercel', 'https://vercel.com', 'Frontend deployment platform optimized for speed, frameworks, and global CDN delivery.'),
    C('cloud', 'Supabase', 'https://supabase.com', 'An open-source cloud alternative to Firebase providing database architecture instantly.'),

    C('design', 'Figma', 'https://figma.com', 'Prototyping software focused on UI/UX product generation and vector design.'),
    C('design', 'Behance', 'https://behance.net', "Adobe's portfolio network platform to discover work by top creative artists."),
    C('design', 'Dribbble', 'https://dribbble.com', 'A discovery hub for self-promotional digital snippets, graphics, and icon artists.'),
    C('design', 'Coolors', 'https://coolors.co', 'An ultra-fast color palette generator configured to make color schemes instantly.'),
    C('design', 'Pinterest', 'https://pinterest.com', 'Visual discovery engine for finding digital board mockups, fashion, and home ideas.'),

    C('entertainment', 'YouTube', 'https://youtube.com', 'Stream endless videos, search music tracks, and subscribe to content creators.', { pinned: true }),
    C('entertainment', 'Netflix', 'https://netflix.com', 'Subscription video-on-demand streaming service offering movies and television series.'),
    C('entertainment', 'Spotify', 'https://spotify.com', 'Digital music player providing access to millions of songs and podcasts.'),
    C('entertainment', 'Twitch', 'https://twitch.tv', 'Interactive platform specializing in live video streams focusing on gaming talent.'),
    C('entertainment', 'Instagram (Reels)', 'https://instagram.com', 'Visual scrolling app used casually for creative media clips and short-form entertainment.'),

    C('gaming', 'Steam', 'https://store.steampowered.com', 'Digital distribution platform for playing, discussing, and purchasing thousands of PC video games.'),
    C('gaming', 'Epic Games', 'https://www.epicgames.com', 'Game store featuring exclusive titles, Unreal Engine tracking, and weekly free game giveaways.'),
    C('gaming', 'Minecraft Official', 'https://minecraft.net', 'The official hub for the sandbox building game, news, and marketplace purchases.'),
    C('gaming', 'Modrinth', 'https://modrinth.com', 'An open-source platform to find and download modern Minecraft mods, shaders, and packs.'),
    C('gaming', 'CurseForge', 'https://curseforge.com', 'Massive classic repository for community-created modpacks, worlds, and custom add-ons.'),
    C('gaming', 'Nexus Mods', 'https://www.nexusmods.com', 'The largest community gaming platform hosting custom file modifications for single-player games.'),
    C('gaming', 'Chunkbase', 'https://chunkbase.com', 'Seed maps and locator tools to easily find structures, biomes, and slimes.'),

    C('learning', 'Khan Academy', 'https://khanacademy.org', 'Free online courses, lessons, and practice tracking covering various STEM subjects.'),
    C('learning', 'Coursera', 'https://coursera.org', 'Professional online degrees and certifications hosted by global colleges.'),
    C('learning', 'edX', 'https://edx.org', 'Access university-level online coursework from high-tier global institutions.'),
    C('learning', 'Brilliant', 'https://brilliant.org', 'Interactive, visual lessons for mastering math, logic, and computer science concepts.'),
    C('learning', 'TED', 'https://www.ted.com', 'Short, powerful thought-provoking talks recorded from global innovators.'),

    C('social', 'Facebook', 'https://facebook.com', 'Global social networking community to connect with family, friends, and local groups.'),
    C('social', 'X', 'https://x.com', 'Social microblogging space for real-time news updates and trend updates.'),
    C('social', 'Reddit', 'https://reddit.com', 'A vast network of community sub-forums chatting about every hobby imaginable.'),
    C('social', 'Discord', 'https://discord.com', 'Voice, video, and text channel application ideal for gaming communities.'),
    C('social', 'WhatsApp', 'https://web.whatsapp.com/', 'Instant messaging and voice-over-IP service to stay connected with friends and family.', { pinned: true }),
    C('social', 'Instagram', 'https://instagram.com', 'Photo and video-sharing platform focused on visual networking and content creator reels.'),
    C('social', 'LinkedIn', 'https://linkedin.com', 'Professional business network platform for resume portfolios and jobs.'),

    C('tools', 'Notion', 'https://notion.so', 'All-in-one workspaces to plan tasks, organize wikis, and take nested markdown notes.'),
    C('tools', 'Canva', 'https://canva.com', 'Drag-and-drop template designer for creating graphics, decks, and presentations easily.'),
    C('tools', 'Figma', 'https://figma.com', 'Collaborative vector interface tool used for layout mockups and wireframes.'),
    C('tools', 'Photopea', 'https://photopea.com', 'A free web alternative to Photoshop running locally inside any standard browser.'),
    C('tools', 'TinyPNG', 'https://tinypng.com', 'Smart, lossy file optimization tool to compress WebP, PNG, and JPEG images.'),

    C('shopping', 'Amazon', 'https://amazon.com', 'Global online marketplace offering electronics, apparel, cloud services, and everyday items.'),
    C('shopping', 'Flipkart', 'https://flipkart.com', "India's leading e-commerce destination for electronics, fashion, home appliances, and books."),
    C('shopping', 'eBay', 'https://ebay.com', 'Worldwide online auction and shopping website for buying and selling diverse goods and collectibles.'),
    C('shopping', 'Walmart', 'https://walmart.com', 'Massive retail marketplace offering multi-department value items, groceries, and digital delivery services.'),

    C('itibe', 'ITIBE', 'http://10.72.4.135:3000/nic/itibe', 'Internal network dashboard and interface.')
];

const FALLBACK_ICON = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Ccircle%20cx='12'%20cy='12'%20r='9'%20fill='none'%20stroke='%2394a3b8'%20stroke-width='2'/%3E%3Cellipse%20cx='12'%20cy='12'%20rx='4'%20ry='9'%20fill='none'%20stroke='%2394a3b8'%20stroke-width='2'/%3E%3Cline%20x1='3'%20y1='12'%20x2='21'%20y2='12'%20stroke='%2394a3b8'%20stroke-width='2'/%3E%3C/svg%3E";

const STORAGE_CATEGORIES = 'dashboardCategories';
const STORAGE_CARDS = 'dashboardCards';

/* ===== Data versioning & migration ===== */
const DATA_VERSION = 3;

/* v2 -> v3: favorites duplicates become a "pinned" flag on the single card. */
function migrateFavoritesDuplicates(list) {
    const favId = 'favorites';
    const norm = u => String(u || '').replace(/\/+$/, '').toLowerCase();
    const others = list.filter(c => c.category !== favId);
    const kept = [];
    list.filter(c => c.category === favId).forEach(fav => {
        const twin = others.find(c => norm(c.url) === norm(fav.url));
        if (twin) {
            twin.pinned = true;
        } else {
            kept.push(fav); // no twin elsewhere: stays a real favorites card
        }
    });
    return others.concat(kept);
}

function normalizeCategory(c, index) {
    const base = (c && typeof c === 'object') ? c : {};
    const fallbackId = slugify(base.label) || ('cat-' + (index + 1));
    return {
        id: (base.id && /^[a-z0-9-]+$/i.test(base.id)) ? base.id : fallbackId,
        label: String(base.label || '').trim() || ('Category ' + (index + 1)),
        emoji: base.emoji || '🔗',
        group: base.group || 'Core'
    };
}

function normalizeCard(c) {
    const base = (c && typeof c === 'object') ? c : {};
    return {
        id: base.id ? String(base.id) : makeId(),
        title: String(base.title || '').trim() || 'Untitled',
        url: String(base.url || '').trim(),
        desc: base.desc || '',
        category: base.category || '',
        color: base.color || undefined,
        pinned: !!base.pinned
    };
}

function migrateImported(state) {
    const cats = Array.isArray(state && state.categories)
        ? state.categories.map((c, i) => normalizeCategory(c, i))
        : [];
    const seen = new Set();
    const categories = [];
    cats.forEach(c => {
        const key = c.id.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        categories.push(c);
    });
    const idSet = new Set(categories.map(c => c.id.toLowerCase()));
    const fallbackCat = categories[0] ? categories[0].id : '';
    const cards = Array.isArray(state && state.cards)
        ? state.cards.map(c => {
            const card = normalizeCard(c);
            if (!idSet.has(String(card.category).toLowerCase())) card.category = fallbackCat;
            return card;
        })
        : [];
    return { categories, cards };
}

let categories = [];
let cards = [];

const STORAGE_SORTS = 'dashboardSorts';
const STORAGE_COLLAPSED = 'dashboardCollapsed';
const STORAGE_THEME = 'dashboardTheme';
let sectionSorts = {};
let collapsedSections = {};

function loadPrefs() {
    try { sectionSorts = JSON.parse(localStorage.getItem(STORAGE_SORTS)) || {}; } catch (e) { sectionSorts = {}; }
    try { collapsedSections = JSON.parse(localStorage.getItem(STORAGE_COLLAPSED)) || {}; } catch (e) { collapsedSections = {}; }
}

function makeId() {
    return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function slugify(str) {
    return String(str).toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || ('cat-' + Date.now().toString(36));
}

function saveCategories(list) {
    localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(list));
}

function loadCategories() {
    const raw = localStorage.getItem(STORAGE_CATEGORIES);
    if (raw !== null) {
        try {
            const stored = JSON.parse(raw);
            if (Array.isArray(stored)) return stored.map((c, i) => normalizeCategory(c, i));
        } catch (e) {}
    }
    const seeded = DEFAULT_CATEGORIES.map(c => ({ ...c }));
    saveCategories(seeded);
    return seeded;
}

function saveCards(list) {
    localStorage.setItem(STORAGE_CARDS, JSON.stringify(list));
}

function loadCards() {
    const raw = localStorage.getItem(STORAGE_CARDS);
    if (raw !== null) {
        try {
            const stored = JSON.parse(raw);
            if (Array.isArray(stored)) return stored.map(normalizeCard);
        } catch (e) {}
    }
    const seeded = DEFAULT_CARDS.map(c => ({ ...c, id: makeId(), createdAt: Date.now() }));
    saveCards(seeded);
    return seeded;
}

/* ===== Rendering ===== */
function cardIconFor(url) {
    const domain = String(url)
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .split(/[/?#]/)[0];
    if (domain.includes(':') || /^\d{1,3}(\.\d{1,3}){3}$/.test(domain)) {
        return FALLBACK_ICON;
    }
    return `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(domain)}`;
}

/* Favicon fallback: swap to a colored first-letter avatar when loading fails. */
function avatarHtml(title) {
    const letter = escapeHtml(((title || '').trim().charAt(0) || '?').toUpperCase());
    return `<span class="card-icon card-avatar" aria-hidden="true">${letter}</span>`;
}

function iconHtml(url, title) {
    return `<img class="card-icon" src="${cardIconFor(url)}" data-title="${escapeHtml(title || '')}" alt="" loading="lazy" onerror="this.onerror=null;this.outerHTML=avatarHtml(this.dataset.title||'?')">`;
}

function cardHtml(card) {
    const accentAttr = card.color ? ' data-accent="true"' : '';
    const accentStyle = card.color ? ` style="--card-accent:${escapeHtml(card.color)}"` : '';
    return `
        <div class="card" data-id="${escapeHtml(card.id)}" draggable="true"${accentAttr}${accentStyle}>
            <a href="${escapeHtml(card.url)}" target="_blank" rel="noopener">
                ${card.pinned ? '<span class="card-pin" title="Pinned to Favorites">📌</span>' : ''}
                <span class="card-title">
                    ${iconHtml(card.url, card.title)}
                    ${escapeHtml(card.title)}
                </span>
                <p>${escapeHtml(card.desc)}</p>
            </a>
            <button class="card-edit" data-action="edit" title="Edit card">✏️</button>
            <button class="card-delete" data-action="delete" title="Delete card">🗑️</button>
        </div>`;
}

const CATEGORY_COLORS = ['#fb923c', '#f472b6', '#a78bfa', '#fb7185'];
const catColor = (id) => {
    const i = categories.findIndex(c => c.id === id);
    return CATEGORY_COLORS[((i % CATEGORY_COLORS.length) + CATEGORY_COLORS.length) % CATEGORY_COLORS.length];
};

function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    const recentsCount = (JSON.parse(localStorage.getItem("recentLinks")) || []).length;
    const catCount = id => cardsForCategory(id).length;

    let html = '<div class="sidebar-category">Core</div><ul class="nav-links">' +
        `<li><a href="#recents"><span class="icon">🕒</span>Recents<span class="nav-count">${recentsCount}</span></a></li>`;

    categories.filter(c => c.group === 'Core').forEach(c => {
        const tint = ` style="--cat-accent:${catColor(c.id)}"`;
        html += `<li><a href="#${c.id}"${tint}><span class="icon">${c.emoji || '🔗'}</span>${escapeHtml(c.label)}<span class="nav-count">${catCount(c.id)}</span></a></li>`;
    });
    html += '</ul>';

    const seen = new Set();
    categories.forEach(c => {
        if (c.group === 'Core' || seen.has(c.group)) return;
        seen.add(c.group);
        html += `<div class="sidebar-category">${escapeHtml(c.group)}</div><ul class="nav-links">`;
        categories.filter(x => x.group === c.group).forEach(x => {
            const tint = ` style="--cat-accent:${catColor(x.id)}"`;
            html += `<li><a href="#${x.id}"${tint}><span class="icon">${x.emoji || '🔗'}</span>${escapeHtml(x.label)}<span class="nav-count">${catCount(x.id)}</span></a></li>`;
        });
        html += '</ul>';
    });

    nav.innerHTML = html;
}

function renderSections() {
    const container = document.getElementById('sectionsContainer');
    let html = '<section id="recents" class="section"><h2>🕒 Recents<span class="collapse-icon">▾</span></h2><div id="recents-container" class="grid"></div></section>';

    categories.forEach(c => {
        const sort = sectionSorts[c.id] || 'default';
        const collapsed = collapsedSections[c.id] ? ' collapsed' : '';
        const tint = ` style="--cat-accent:${catColor(c.id)}"`;
        html += `<section id="${c.id}" class="section${collapsed}" data-accent${tint}>
            <h2><span class="cat-chip">${c.emoji || '🔗'}</span> ${escapeHtml(c.label)}<span class="collapse-icon">▾</span>
                <select class="section-sort" data-cat="${c.id}" title="Sort this section">
                    <option value="default" ${sort === 'default' ? 'selected' : ''}>Default</option>
                    <option value="az" ${sort === 'az' ? 'selected' : ''}>A–Z</option>
                    <option value="new" ${sort === 'new' ? 'selected' : ''}>Newest</option>
                </select>
            </h2>
            <div class="grid"></div>
        </section>`;
    });

    container.innerHTML = html;
    sections = Array.from(container.querySelectorAll('.section'));
    recentsContainer = document.getElementById('recents-container');
    recentsSection = document.getElementById('recents');

    renderCards();
    displayRecents();
}

function cardsForCategory(catId) {
    if (catId === 'favorites') {
        return cards.filter(c => c.pinned || c.category === 'favorites');
    }
    return cards.filter(c => c.category === catId);
}

function renderCards() {
    categories.forEach(cat => {
        const sectionEl = document.getElementById(cat.id);
        const grid = sectionEl ? sectionEl.querySelector('.grid') : null;
        if (!grid) return;
        let catCards = cardsForCategory(cat.id);
        const sort = sectionSorts[cat.id] || 'default';
        if (sort === 'az') {
            catCards = catCards.slice().sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'new') {
            catCards = catCards.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        }
        grid.innerHTML = catCards.map(cardHtml).join('');
    });
    applySearchFilter();
}

function renderAll() {
    renderSidebar();
    renderSections();
    updateActiveNav();
}

/* ===== Recents ===== */
function displayRecents() {
    const container = recentsContainer || document.getElementById('recents-container');
    const section = recentsSection || document.getElementById('recents');
    if (!container || !section) return;

    const recents = JSON.parse(localStorage.getItem("recentLinks")) || [];
    container.innerHTML = "";
    section.style.display = "block";

    if (recents.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 14px; font-style: italic; padding: 10px 5px;">
                No recent websites visited yet.
            </div>
        `;
        return;
    }

    recents.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
                    <span class="card-title">
                        ${iconHtml(item.url, item.title)}
                        ${escapeHtml(item.title)}
                    </span>
                    <p>${escapeHtml(item.desc)}</p>
                </a>
            </div>
        `;
    });
}

function updateActiveNav() {
    if (!sections.length) return;
    const visibleSections = sections.filter(s => s.style.display !== 'none');
    if (visibleSections.length === 0) return;

    const topbar = document.querySelector('.topbar');
    const topbarH = topbar ? topbar.offsetHeight : 0;
    const h = window.innerHeight;
    const isAtTop = window.scrollY <= 1;
    const isAtBottom = (h + window.scrollY) >= document.documentElement.scrollHeight - 10;
    const rectTop = s => s.getBoundingClientRect().top;

    let activeSection;

    if (isAtTop) {
        activeSection = visibleSections[0];
    } else if (isAtBottom) {
        activeSection = visibleSections[0];
        visibleSections.forEach(s => {
            if (rectTop(s) <= h * 0.6) activeSection = s;
        });
    } else {
        const line = topbarH + 15;
        activeSection = visibleSections[0];
        let best = Infinity;
        visibleSections.forEach(s => {
            const d = Math.abs(rectTop(s) - line);
            if (d < best) { best = d; activeSection = s; }
        });

        const last = visibleSections[visibleSections.length - 1];
        if (rectTop(last) <= h * 0.75) {
            const center = h / 2;
            let found = null;
            visibleSections.forEach(s => {
                const r = s.getBoundingClientRect();
                if (r.top <= center && center < r.bottom) found = s;
            });
            if (found) {
                activeSection = found;
            } else {
                activeSection = visibleSections[0];
                let best2 = Infinity;
                visibleSections.forEach(s => {
                    const r = s.getBoundingClientRect();
                    const sectionCenter = (r.top + r.bottom) / 2;
                    const d = Math.abs(sectionCenter - center);
                    if (d < best2) { best2 = d; activeSection = s; }
                });
            }
        }
    }

    const id = activeSection.getAttribute('id');
    document.querySelectorAll('#sidebarNav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);

document.getElementById('sidebarNav').addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    const target = document.getElementById(targetId.slice(1));
    if (!target) return;
    e.preventDefault();
    setSidebar(false);
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    setTimeout(updateActiveNav, 150);
});

/* ===== Mobile sidebar drawer ===== */
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function setSidebar(open) {
    document.body.classList.toggle('sidebar-open', open);
}
sidebarToggle.addEventListener('click', () => setSidebar(!document.body.classList.contains('sidebar-open')));
sidebarClose.addEventListener('click', () => setSidebar(false));
sidebarOverlay.addEventListener('click', () => setSidebar(false));
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setSidebar(false);
});

document.body.addEventListener("click", (e) => {
    const cardLink = e.target.closest(".card a");
    if (!cardLink || cardLink.closest("#recents")) return;

    const title = cardLink.querySelector(".card-title").childNodes[cardLink.querySelector(".card-title").childNodes.length - 1].textContent.trim();
    const desc = cardLink.querySelector("p").innerText;
    const url = cardLink.getAttribute("href");

    let recents = JSON.parse(localStorage.getItem("recentLinks")) || [];

    recents = recents.filter(item => item.url !== url);
    recents.unshift({ title, desc, url });

    if (recents.length > 4) recents.pop();

    localStorage.setItem("recentLinks", JSON.stringify(recents));
    displayRecents();
    applySearchFilter();
});

/* ===== Card modal ===== */
const addCardBtn = document.getElementById('addCardBtn');
const cardModal = document.getElementById('cardModal');
const cardForm = document.getElementById('cardForm');
const modalTitleEl = document.getElementById('modalTitle');
const cardTitleInput = document.getElementById('cardTitle');
const cardUrlInput = document.getElementById('cardUrl');
const cardDescInput = document.getElementById('cardDesc');
const cardCategorySelect = document.getElementById('cardCategory');
const cardColorInput = document.getElementById('cardColor');
const cardPinnedInput = document.getElementById('cardPinned');
const clearColorBtn = document.getElementById('clearColorBtn');
const formError = document.getElementById('formError');
const cancelCardBtn = document.getElementById('cancelCardBtn');

let editingId = null;
let colorActive = false;

function populateCategorySelect() {
    cardCategorySelect.innerHTML = categories.map(c =>
        `<option value="${c.id}">${c.emoji || ''} ${escapeHtml(c.label)}</option>`).join('');
}

function showFormError(msg) {
    formError.textContent = msg;
    formError.hidden = false;
}

function openModal(card) {
    editingId = card ? card.id : null;
    modalTitleEl.textContent = card ? 'Edit Card' : 'Add Card';
    cardTitleInput.value = card ? card.title : '';
    cardUrlInput.value = card ? card.url : '';
    cardDescInput.value = card ? (card.desc || '') : '';
    cardCategorySelect.value = (card && card.category) || (categories.length ? categories[0].id : '');
    cardPinnedInput.checked = !!(card && card.pinned);
    colorActive = !!(card && card.color);
    cardColorInput.value = (card && card.color) || '#f97316';
    formError.hidden = true;
    cardModal.hidden = false;
    cardTitleInput.focus();
}

function closeModal() {
    cardModal.hidden = true;
    cardForm.reset();
    editingId = null;
    colorActive = false;
}

addCardBtn.addEventListener('click', () => openModal(null));
cancelCardBtn.addEventListener('click', closeModal);
cardModal.addEventListener('click', (e) => { if (e.target === cardModal) closeModal(); });

cardColorInput.addEventListener('input', () => { colorActive = true; });
clearColorBtn.addEventListener('click', () => {
    colorActive = false;
    cardColorInput.value = '#f97316';
});

function normalizeUrl(input) {
    let u = String(input).trim();
    if (!u) return { ok: false, reason: 'URL is required.' };
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(u)) u = 'https://' + u;
    try {
        const parsed = new URL(u);
        if (!parsed.hostname || !parsed.hostname.includes('.')) throw new Error('bad host');
        return { ok: true, url: u };
    } catch (e) {
        return { ok: false, reason: 'That URL looks invalid. Try something like example.com.' };
    }
}

cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formError.hidden = true;

    const title = cardTitleInput.value.trim();
    if (!title) { showFormError('Name is required.'); return; }

    const norm = normalizeUrl(cardUrlInput.value);
    if (!norm.ok) { showFormError(norm.reason); return; }

    const desc = cardDescInput.value.trim();
    const category = cardCategorySelect.value || (categories.length ? categories[0].id : '');
    const color = colorActive ? cardColorInput.value : undefined;
    const pinned = cardPinnedInput.checked;

    if (editingId) {
        const card = cards.find(c => c.id === editingId);
        if (card) Object.assign(card, { title, url: norm.url, desc, category, color, pinned });
    } else {
        const newCard = { id: makeId(), title, url: norm.url, desc, category, createdAt: Date.now(), pinned };
        if (color) newCard.color = color;
        cards.unshift(newCard);
    }
    saveCards(cards);
    renderCards();
    closeModal();
});

/* ===== Card edit / delete ===== */
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.card-edit, .card-delete');
    if (!btn) return;
    const cardEl = btn.closest('.card');
    if (!cardEl) return;
    const card = cards.find(c => c.id === cardEl.getAttribute('data-id'));
    if (!card) return;
    if (btn.classList.contains('card-edit')) {
        openModal(card);
    } else {
        const ok = await askConfirm(`Delete "${card.title}"?`);
        if (ok) {
            cards = cards.filter(c => c.id !== card.id);
            saveCards(cards);
            renderCards();
            toast(`Deleted "${card.title}"`, 'success');
        }
    }
});

/* ===== Drag & drop reorder ===== */
let dragCard = null;

document.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    dragCard = card;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', card.getAttribute('data-id')); } catch (err) {}
});

document.addEventListener('dragover', (e) => {
    if (!dragCard) return;
    const card = e.target.closest('.card');
    if (card && card.parentElement === dragCard.parentElement) {
        e.preventDefault();
        const rect = card.getBoundingClientRect();
        const after = (e.clientY - rect.top) > rect.height / 2;
        if (after) card.after(dragCard); else card.before(dragCard);
        e.dataTransfer.dropEffect = 'move';
    }
});

document.addEventListener('drop', (e) => {
    if (!dragCard) return;
    e.preventDefault();
    const grid = dragCard.parentElement;
    dragCard.classList.remove('dragging');
    if (grid) {
        const ids = Array.from(grid.querySelectorAll('.card')).map(el => el.getAttribute('data-id'));
        const byId = new Map(cards.map(c => [c.id, c]));
        const idSet = new Set(ids);
        const rest = cards.filter(c => !idSet.has(c.id));
        cards = ids.map(id => byId.get(id)).filter(Boolean).concat(rest);
        saveCards(cards);
    }
    dragCard = null;
});

document.addEventListener('dragend', () => {
    document.querySelectorAll('.card.dragging').forEach(el => el.classList.remove('dragging'));
    dragCard = null;
});

/* ===== Manage modal ===== */
const manageBtn = document.getElementById('manageBtn');
const manageModal = document.getElementById('manageModal');
const manageCloseBtn = document.getElementById('manageCloseBtn');
const manageSaveBtn = document.getElementById('manageSaveBtn');
const categoryList = document.getElementById('categoryList');
const newCategoryLabel = document.getElementById('newCategoryLabel');
const newCategoryEmoji = document.getElementById('newCategoryEmoji');
const newCategoryGroup = document.getElementById('newCategoryGroup');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const resetBtn = document.getElementById('resetBtn');

function renderCategoryRows() {
    categoryList.innerHTML = categories.map(c => `
        <div class="category-row" data-id="${escapeHtml(c.id)}">
            <input class="cat-emoji" value="${escapeHtml(c.emoji || '')}" placeholder="😀" maxlength="4">
            <input class="cat-label" value="${escapeHtml(c.label)}" placeholder="Category name" maxlength="40">
            <span class="cat-group-label">${escapeHtml(c.group || 'Core')}</span>
            <button type="button" class="cat-delete btn-danger" title="Delete category">🗑️</button>
        </div>`).join('');
}

function renderGroupSelect() {
    const groups = Array.from(new Set(categories.map(c => c.group || 'Core')));
    newCategoryGroup.innerHTML = groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
}

function openManageModal() {
    renderCategoryRows();
    renderGroupSelect();
    manageModal.hidden = false;
}

manageBtn.addEventListener('click', openManageModal);
manageCloseBtn.addEventListener('click', () => { manageModal.hidden = true; });

categoryList.addEventListener('click', async (e) => {
    const btn = e.target.closest('.cat-delete');
    if (!btn) return;
    const row = btn.closest('.category-row');
    const id = row.getAttribute('data-id');
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    if (id === 'favorites') {
        toast('The Favorites section is built-in — unpin cards instead of deleting it.', 'info');
        return;
    }
    const count = cardsForCategory(id).length;
    const msg = count
        ? `Delete category "${cat.label}"? Its ${count} card(s) will also be removed.`
        : `Delete category "${cat.label}"?`;
    if (!await askConfirm(msg)) return;
    categories = categories.filter(c => c.id !== id);
    cards = cards.filter(c => c.category !== id);
    saveCategories(categories);
    saveCards(cards);
    renderAll();
    renderCategoryRows();
    renderGroupSelect();
    populateCategorySelect();
    toast(`Deleted category "${cat.label}"`, 'success');
});

addCategoryBtn.addEventListener('click', () => {
    const label = newCategoryLabel.value.trim();
    if (!label) return;
    let id = slugify(label);
    if (id === 'recents' || categories.some(c => c.id === id)) id += '-' + Date.now().toString(36);
    categories.push({
        id,
        label,
        emoji: newCategoryEmoji.value.trim() || '🔗',
        group: newCategoryGroup.value || 'Core'
    });
    newCategoryLabel.value = '';
    newCategoryEmoji.value = '';
    saveCategories(categories);
    renderAll();
    renderCategoryRows();
    renderGroupSelect();
    populateCategorySelect();
});

manageSaveBtn.addEventListener('click', () => {
    const rows = Array.from(categoryList.querySelectorAll('.category-row'));
    const seenLabels = new Set();
    let valid = true;
    const next = rows.map(row => {
        const id = row.getAttribute('data-id');
        const label = row.querySelector('.cat-label').value.trim();
        const emoji = row.querySelector('.cat-emoji').value.trim();
        const existing = categories.find(c => c.id === id) || {};
        if (!label) return null;
        const lower = label.toLowerCase();
        if (seenLabels.has(lower)) { valid = false; return null; }
        seenLabels.add(lower);
        return { id, label, emoji: emoji || existing.emoji || '🔗', group: existing.group || 'Core' };
    });
    if (!valid) { toast('Category names must be non-empty and unique.', 'error'); return; }
    categories = next;
    saveCategories(categories);
    renderAll();
    renderCategoryRows();
    renderGroupSelect();
    populateCategorySelect();
    manageModal.hidden = true;
    toast('Categories saved', 'success');
});

/* ===== Data: export / import / reset ===== */
exportBtn.addEventListener('click', () => {
    const data = JSON.stringify({ version: DATA_VERSION, categories, cards }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'websites-dashboard-backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
});

let importMode = 'replace';

importBtn.addEventListener('click', () => {
    importMode = 'replace';
    importFile.click();
});

const mergeImportBtn = document.getElementById('mergeImportBtn');
mergeImportBtn.addEventListener('click', () => {
    importMode = 'merge';
    importFile.click();
});

function mergeImportedState(imported) {
    const ourCats = categories.slice();
    const catById = new Map(ourCats.map(c => [c.id.toLowerCase(), c]));
    imported.categories.forEach(imp => {
        if (catById.has(imp.id.toLowerCase())) return; // keep existing (don't clobber user edits)
        ourCats.push(imp);
        catById.set(imp.id.toLowerCase(), imp);
    });
    const firstCat = ourCats[0] ? ourCats[0].id : '';
    const mergedCards = cards.slice();
    const cardById = new Map(mergedCards.map(c => [c.id, c]));
    imported.cards.forEach(imp => {
        if (cardById.has(imp.id)) return; // same card id already present
        const match = ourCats.find(c => c.id.toLowerCase() === String(imp.category).toLowerCase());
        const merged = { ...imp, category: match ? match.id : firstCat };
        mergedCards.push(merged);
        cardById.set(merged.id, merged);
    });
    return { categories: ourCats, cards: mergedCards };
}

importFile.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
        let imported;
        try {
            const data = JSON.parse(reader.result);
            if (!Array.isArray(data.categories) || !Array.isArray(data.cards)) throw new Error('bad format');
            imported = migrateImported(data);
        } catch (err) {
            toast('Import failed: that file is not a valid dashboard backup.', 'error');
            return;
        }

        if (importMode === 'replace') {
            if (imported.cards.length === 0 && categories.length === 0) {
                toast('Import cancelled: no data to replace.', 'info');
                return;
            }
            const msg = imported.cards.length
                ? `Replace your current dashboard with this backup (${imported.categories.length} categories, ${imported.cards.length} cards)? Your current cards, categories, and recents will be overwritten.`
                : 'This backup contains no cards. Import it anyway?';
            const ok = await askConfirm(msg);
            if (!ok) return;
            categories = imported.categories;
            cards = imported.cards;
        } else {
            if (imported.categories.length === 0 && imported.cards.length === 0) {
                toast('Import failed: the file has no data to merge.', 'error');
                return;
            }
            const merged = mergeImportedState(imported);
            categories = merged.categories;
            cards = merged.cards;
            toast(`Merged: ${imported.categories.length} categories, ${imported.cards.length} cards`, 'success');
        }

        // v2 -> v3: collapse favorites duplicates into pinned flags on either side
        cards = migrateFavoritesDuplicates(cards);

        saveCategories(categories);
        saveCards(cards);
        renderAll();
        populateCategorySelect();
    };
    reader.readAsText(file);
    e.target.value = '';
});

resetBtn.addEventListener('click', async () => {
    const ok = await askConfirm('Reset to defaults? Your cards, categories, and recents will be replaced with the original content.');
    if (!ok) return;
    localStorage.removeItem(STORAGE_CARDS);
    localStorage.removeItem(STORAGE_CATEGORIES);
    cards = loadCards();
    categories = loadCategories();
    renderAll();
    populateCategorySelect();
    toast('Dashboard reset to defaults', 'success');
});

/* ===== Keyboard shortcuts ===== */
document.addEventListener('keydown', (e) => {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

    if (e.key === 'Escape') {
        closePalette();
        if (!cardModal.hidden) cardModal.hidden = true;
        if (!manageModal.hidden) manageModal.hidden = true;
        if (!confirmModal.hidden) { confirmModal.hidden = true; }
        contextMenu.hidden = true;
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
        return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === '/') {
        if (!typing) { e.preventDefault(); searchInput.focus(); }
    } else if (e.key.toLowerCase() === 'n') {
        if (!typing) { e.preventDefault(); openModal(null); }
    }
});

/* ===== Theme toggle ===== */
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem(STORAGE_THEME, theme);
}

function initTheme() {
    const saved = localStorage.getItem(STORAGE_THEME) || 'dark';
    applyTheme(saved);
}

themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(current);
});

/* ===== Toasts ===== */
function toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
        el.classList.add('toast-out');
        setTimeout(() => el.remove(), 260);
    }, 2600);
}

/* ===== Confirm modal ===== */
const confirmModal = document.getElementById('confirmModal');
const confirmMsg = document.getElementById('confirmMsg');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

function askConfirm(message) {
    return new Promise((resolve) => {
        let settled = false;
        const done = (val) => {
            if (settled) return;
            settled = true;
            confirmModal.hidden = true;
            resolve(val);
        };
        confirmMsg.textContent = message;
        confirmModal.hidden = false;
        confirmYes.onclick = () => done(true);
        confirmNo.onclick = () => done(false);
        const onOverlay = (e) => { if (e.target === confirmModal) done(false); };
        confirmModal.addEventListener('click', onOverlay, { once: true });
    });
}

/* ===== Command palette ===== */
const paletteOverlay = document.getElementById('paletteOverlay');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');
let paletteItems = [];
let paletteIndex = -1;

function openPalette() {
    paletteOverlay.hidden = false;
    paletteInput.value = '';
    renderPalette('');
    paletteInput.focus();
}

function closePalette() {
    paletteOverlay.hidden = true;
    paletteIndex = -1;
}

function togglePalette() {
    if (paletteOverlay.hidden) openPalette(); else closePalette();
}

function renderPalette(query) {
    const q = query.trim().toLowerCase();
    paletteList.innerHTML = '';
    paletteItems = [];
    paletteIndex = -1;

    categories.forEach(c => {
        if (q && !c.label.toLowerCase().includes(q)) return;
        paletteItems.push({ type: 'category', id: c.id, label: c.label, emoji: c.emoji });
    });
    cards.forEach(card => {
        if (q && !(card.title.toLowerCase().includes(q) || (card.desc || '').toLowerCase().includes(q))) return;
        const cat = categories.find(x => x.id === card.category);
        paletteItems.push({ type: 'card', id: card.id, label: card.title, url: card.url, cat: cat ? cat.label : '' });
    });

    if (!paletteItems.length) {
        paletteList.innerHTML = '<div class="palette-empty">No matches</div>';
        return;
    }

    paletteItems.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'palette-item';
        el.setAttribute('data-index', i);
        if (item.type === 'category') {
            el.innerHTML = `<span>${item.emoji || '🔗'}</span><span class="pi-title">${escapeHtml(item.label)}</span><span class="pi-cat">Category</span>`;
        } else {
            el.innerHTML = `${iconHtml(item.url, item.label)}<span class="pi-title">${escapeHtml(item.label)}</span><span class="pi-cat">${escapeHtml(item.cat)}</span>`;
        }
        el.addEventListener('click', () => activatePaletteItem(i));
        paletteList.appendChild(el);
    });
}

function activatePaletteItem(i) {
    const item = paletteItems[i];
    if (!item) return;
    if (item.type === 'category') {
        closePalette();
        const target = document.getElementById(item.id);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        }
    } else {
        window.open(item.url, '_blank', 'noopener');
        closePalette();
    }
}

paletteInput.addEventListener('input', () => renderPalette(paletteInput.value));

paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        paletteIndex = (paletteIndex + 1) % paletteItems.length;
        highlightPalette();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        paletteIndex = (paletteIndex - 1 + paletteItems.length) % paletteItems.length;
        highlightPalette();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        activatePaletteItem(paletteIndex);
    }
});

function highlightPalette() {
    Array.from(paletteList.children).forEach((el, i) => {
        el.classList.toggle('selected', i === paletteIndex);
    });
    const sel = paletteList.querySelector('.palette-item.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
}

paletteOverlay.addEventListener('click', (e) => {
    if (e.target === paletteOverlay) closePalette();
});

/* ===== Context menu ===== */
const contextMenu = document.getElementById('contextMenu');
let contextCard = null;
let contextView = 'main';

function hideContextMenu() {
    contextMenu.hidden = true;
    contextCard = null;
    contextView = 'main';
}

function openCardContextMenu(e, card) {
    e.preventDefault();
    contextCard = card;
    contextView = 'main';
    contextMenu.innerHTML = `
        <button data-cm="open">↗ Open</button>
        <button data-cm="edit">✏️ Edit</button>
        <button data-cm="copy">🔗 Copy link</button>
        <button data-cm="pin">${card.pinned ? '📍 Unpin from Favorites' : '📌 Pin to Favorites'}</button>
        <button data-cm="move">📂 Move to…</button>
        <hr>
        <button data-cm="delete" class="cm-danger">🗑️ Delete</button>
    `;
    contextMenu.style.left = Math.min(e.clientX, window.innerWidth - 210) + 'px';
    contextMenu.style.top = Math.min(e.clientY, window.innerHeight - 220) + 'px';
    contextMenu.hidden = false;
}

function showMoveSubmenu() {
    contextView = 'move';
    const cats = categories.map(c =>
        `<button class="cm-move" data-cat="${c.id}">${c.emoji || '🔗'} ${escapeHtml(c.label)}</button>`).join('');
    contextMenu.innerHTML = cats + '<hr><button class="cm-back">← Back</button>';
}

document.addEventListener('contextmenu', (e) => {
    const cardEl = e.target.closest('.card');
    if (!cardEl) return;
    const card = cards.find(c => c.id === cardEl.getAttribute('data-id'));
    if (card) openCardContextMenu(e, card);
});

contextMenu.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.classList.contains('cm-back')) {
        openCardContextMenu(e, contextCard);
        return;
    }
    if (btn.classList.contains('cm-move')) {
        const catId = btn.getAttribute('data-cat');
        if (contextCard) {
            contextCard.category = catId;
            saveCards(cards);
            renderCards();
            toast(`Moved "${contextCard.title}"`, 'success');
        }
        hideContextMenu();
        return;
    }
    const action = btn.getAttribute('data-cm');
    switch (action) {
        case 'open':
            window.open(contextCard.url, '_blank', 'noopener');
            break;
        case 'edit':
            openModal(contextCard);
            break;
        case 'copy':
            if (navigator.clipboard) {
                navigator.clipboard.writeText(contextCard.url).then(() => toast('Link copied', 'success'));
            } else {
                toast('Copy not supported here', 'error');
            }
            break;
        case 'pin':
            contextCard.pinned = !contextCard.pinned;
            saveCards(cards);
            renderCards();
            toast(contextCard.pinned ? `Pinned "${contextCard.title}" to Favorites` : `Unpinned "${contextCard.title}"`, 'success');
            break;
        case 'move':
            showMoveSubmenu();
            return;
        case 'delete':
            if (await askConfirm(`Delete "${contextCard.title}"?`)) {
                cards = cards.filter(c => c.id !== contextCard.id);
                saveCards(cards);
                renderCards();
                toast(`Deleted "${contextCard.title}"`, 'success');
            }
            break;
    }
    hideContextMenu();
});

document.addEventListener('click', (e) => {
    if (!contextMenu.hidden && !contextMenu.contains(e.target)) hideContextMenu();
});

/* ===== Collapse & sort ===== */
document.getElementById('sectionsContainer').addEventListener('click', (e) => {
    const h2 = e.target.closest('h2');
    if (!h2 || e.target.closest('select')) return;
    const section = h2.closest('.section');
    if (!section) return;
    const id = section.getAttribute('id');
    section.classList.toggle('collapsed');
    collapsedSections[id] = section.classList.contains('collapsed');
    localStorage.setItem(STORAGE_COLLAPSED, JSON.stringify(collapsedSections));
});

document.getElementById('sectionsContainer').addEventListener('change', (e) => {
    const sel = e.target.closest('.section-sort');
    if (!sel) return;
    const id = sel.getAttribute('data-cat');
    sectionSorts[id] = sel.value;
    localStorage.setItem(STORAGE_SORTS, JSON.stringify(sectionSorts));
    renderCards();
});

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadPrefs();
    categories = loadCategories();
    cards = migrateFavoritesDuplicates(loadCards().map(normalizeCard));
    saveCards(cards);
    populateCategorySelect();
    renderAll();
});

