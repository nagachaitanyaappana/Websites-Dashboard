// Smoke tests for the pure data functions in script.js (run with: node tests/smoke-test.js).
// These functions are extracted from the real script.js so the tests track the actual source.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

function extract(name) {
    const re = new RegExp('function ' + name + '\\s*\\([\\s\\S]*?\\n}', 'm');
    const m = src.match(re);
    if (!m) throw new Error('could not extract ' + name);
    return m[0];
}

const code = [
    extract('escapeHtml'),
    extract('makeId'),
    extract('slugify'),
    extract('normalizeCategory'),
    extract('normalizeCard'),
    extract('migrateImported'),
    extract('migrateFavoritesDuplicates'),
    extract('mergeImportedState')
].join('\n\n');

const sandbox = code + `

let categories = [
    { id: 'favorites', label: 'Favorites', emoji: '⭐', group: 'Core' },
    { id: 'ai', label: 'AI Workspace', emoji: '🤖', group: 'Development' }
];
let cards = [
    { id: 'card1', title: 'ChatGPT', url: 'https://chatgpt.com', desc: 'x', category: 'ai' }
];

const results = [];

// 1. Migration: malformed data is normalized, unknown categories fall back to first category
const bad = {
    categories: [{ label: 'Tools' }, { id: 'ai', label: 'AI' }, { label: 'Tools' }, 'junk'],
    cards: [{ title: 'No Cat' }, {}, { id: 'k2', title: 'Unknown cat', url: 'https://x.com', category: 'nope' }]
};
const migrated = migrateImported(bad);
results.push(['migrated category ids unique/valid', migrated.categories.length === 3 && migrated.categories[0].id === 'tools']);
results.push(['unknown card category falls back', migrated.cards[2].category === 'tools']);
results.push(['card without id gets one', typeof migrated.cards[1].id === 'string' && migrated.cards[1].id.length > 0]);
results.push(['card without title gets default', migrated.cards[1].title === 'Untitled']);
results.push(['non-object entries dropped safely', migrated.cards.every(c => typeof c.title === 'string')]);

// 2. Merge: adds new categories, remaps cards into existing categories, skips duplicate ids
const imported = {
    categories: [
        { id: 'favorites', label: 'Favorites (backup)', emoji: '⭐', group: 'Core' },
        { id: 'news', label: 'News', emoji: '📰', group: 'Social & Utility' }
    ],
    cards: [
        { id: 'card1', title: 'ChatGPT (backup)', url: 'https://chatgpt.com', category: 'ai' },
        { id: 'card9', title: 'Hacker News', url: 'https://news.ycombinator.com', category: 'news' }
    ]
};
const merged = mergeImportedState(imported);
results.push(['merge keeps existing category', merged.categories.some(c => c.id === 'favorites' && c.label === 'Favorites')]);
results.push(['merge adds new category', merged.categories.some(c => c.id === 'news')]);
results.push(['merge does not duplicate same-id card', merged.cards.filter(c => c.id === 'card1').length === 1]);
results.push(['merged card remapped to real category', merged.cards.find(c => c.id === 'card9').category === 'news']);
results.push(['original cards preserved', merged.cards.length === 2]);

// 3. v2 -> v3: favorites duplicates collapse into a pinned flag on the twin card
const dupes = [
    { id: 'a1', title: 'ChatGPT', url: 'https://chatgpt.com', category: 'ai' },
    { id: 'a2', title: 'ChatGPT', url: 'https://chatgpt.com/', category: 'favorites' }, // twin (trailing slash ignored)
    { id: 'a3', title: 'Aternos', url: 'https://aternos.org/server/', category: 'favorites' } // no twin -> kept
];
const migratedFavs = migrateFavoritesDuplicates(dupes);
results.push(['favorites duplicates removed', migratedFavs.filter(c => c.category === 'favorites').length === 1]);
results.push(['twin card gets pinned flag', migratedFavs.find(c => c.id === 'a1').pinned === true]);
results.push(['favorites card without twin kept', migratedFavs.some(c => c.id === 'a3')]);
results.push(['idempotent on second run', migrateFavoritesDuplicates(migratedFavs).length === migratedFavs.length]);

// 4. normalizeCard preserves the pinned flag
results.push(['pinned flag normalized', normalizeCard({ id: 'p1', title: 'X', url: 'https://x.com', pinned: true }).pinned === true]);
results.push(['pinned defaults to false', normalizeCard({ id: 'p2', title: 'Y', url: 'https://y.com' }).pinned === false]);

// 5. escapeHtml still safe
results.push(['escapeHtml escapes quotes', escapeHtml('a"b<c>d\\'e') === 'a&quot;b&lt;c&gt;d&#39;e']);

let pass = 0, fail = 0;
results.forEach(([name, ok]) => { if (ok) { pass++; console.log('PASS', name); } else { fail++; console.log('FAIL', name); } });
console.log(fail === 0 ? 'ALL TESTS PASSED' : fail + ' TESTS FAILED');
process.exit(fail === 0 ? 0 : 1);
`;

fs.writeFileSync('/tmp/dash-test.js', sandbox);
require('/tmp/dash-test.js');
