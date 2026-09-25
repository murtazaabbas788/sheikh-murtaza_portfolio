/* ==========================================================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-pop');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in-active');
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  /* Active nav link highlighting while scrolling */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: "-70px 0px -50% 0px" });

  sections.forEach(sec => sectionObserver.observe(sec));
});

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
});

/* ==========================================================================
   MOBILE NAV TOGGLE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }
});

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);

  const btn = document.getElementById('themeToggleBtn');
  btn.innerHTML = next === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}

/* ==========================================================================
   LIVE CURSOR GIS COORDINATE TRACKER
   ========================================================================== */
document.addEventListener('mousemove', (e) => {
  const lat = (33.6000 + (e.clientY / window.innerHeight) * 0.15).toFixed(4);
  const lon = (73.1000 + (e.clientX / window.innerWidth) * 0.15).toFixed(4);

  const latDisplay = document.getElementById('latDisplay');
  const lonDisplay = document.getElementById('lonDisplay');

  if (latDisplay && lonDisplay) {
    latDisplay.innerText = `${lat}° N`;
    lonDisplay.innerText = `${lon}° E`;
  }
});

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('userName').value;
  alert(`Thank you ${name}! Your message has been received successfully.`);
  document.getElementById('contactForm').reset();
}

/* ==========================================================================
   SKILLS & PROJECTS FILTERING
   ========================================================================== */
function filterSkills(cat, event) {
  const cards = document.querySelectorAll('.skill-card');
  const btns = event.target.parentElement.querySelectorAll('.filter-btn');

  btns.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    card.style.display = (cat === 'all' || card.getAttribute('data-cat') === cat) ? 'block' : 'none';
  });
}

function filterProjects(cat, event) {
  const cards = document.querySelectorAll('.project-card');
  const btns = event.target.parentElement.querySelectorAll('.filter-btn');

  btns.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    card.style.display = (cat === 'all' || card.getAttribute('data-pcat') === cat) ? 'flex' : 'none';
  });
}

/* ==========================================================================
   PROJECT MODALS
   ========================================================================== */
const modalData = {
  gee: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-satellite" style="color: var(--accent-clay);"></i> Sentinel-2 NDVI Annual Statistics (2020–2024)</h3>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Supervised by Dr. Imran Shahzad | Islamabad-Rawalpindi Region</p>
    <table class="modal-table">
      <thead><tr><th>Year</th><th>NDVI Mean</th><th>NDVI Max</th><th>NDVI Min</th><th>Std Dev</th></tr></thead>
      <tbody>
        <tr><td>2020</td><td>0.3586</td><td>0.8824</td><td>-0.5802</td><td>0.1862</td></tr>
        <tr><td>2021</td><td>0.3017</td><td>0.8990</td><td>-0.6014</td><td>0.1665</td></tr>
        <tr><td>2022</td><td>0.2565</td><td>0.9047</td><td>-1.0000</td><td>0.1478</td></tr>
        <tr><td>2023</td><td>0.3735</td><td>0.9105</td><td>-0.7390</td><td>0.1907</td></tr>
        <tr><td>2024</td><td>0.2807</td><td>0.9159</td><td>-0.6231</td><td>0.1703</td></tr>
      </tbody>
    </table>
    <div class="code-snippet">
// Google Earth Engine (GEE) Sentinel-2 Pipeline
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(studyArea)
  .filterDate(year + '-06-01', year + '-08-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(function(img) {
    var ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return img.addBands(ndvi);
  });

var medianComposite = s2.select('NDVI').median().clip(studyArea);
    </div>
  `,
  photogrammetry: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-camera-retro" style="color: var(--accent-clay);"></i> Digital Photogrammetry GCP Evaluation Results</h3>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Course: Digital Photogrammetry | Islamabad Aerial Scene</p>
    <table class="modal-table">
      <thead><tr><th>GCP ID</th><th>Pixel Location</th><th>Contrast</th><th>Uniqueness</th><th>Sharpness (Laplacian)</th><th>Quality Score</th></tr></thead>
      <tbody>
        <tr><td>GCP1</td><td>(210, 20)</td><td>0.209</td><td>0.000</td><td>34.81</td><td>0.409</td></tr>
        <tr style="background: var(--bg-subtle);"><td><strong>GCP2 (Best)</strong></td><td>(2216, 0)</td><td>0.233</td><td>0.389</td><td>42.30</td><td><strong>0.545</strong></td></tr>
        <tr><td>GCP3</td><td>(409, 0)</td><td>0.214</td><td>0.360</td><td>24.82</td><td>0.529</td></tr>
        <tr><td>GCP4</td><td>(1312, 0)</td><td>0.247</td><td>0.340</td><td>47.41</td><td>0.534</td></tr>
      </tbody>
    </table>
    <div class="code-snippet">
# OpenCV Template Matching & Sharpness Evaluation
import cv2

res = cv2.matchTemplate(image, template_patch, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

laplacian_var = cv2.Laplacian(template_patch, cv2.CV_64F).var()
suitability = (contrast_norm + visibility_norm + uniqueness_norm) / 3.0
    </div>
  `,
  webgis: `
    <h3 style="color: var(--text-ink); margin-bottom: 12px;"><i class="fa-solid fa-layer-group" style="color: var(--accent-clay);"></i> WebGIS Architecture (Assignment #4)</h3>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">3-Tier Architecture: Leaflet.js Frontend &rarr; Express REST API &rarr; PostGIS Spatial DB</p>
    <div class="code-snippet">
-- PostGIS GeoJSON Export Query
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
) FROM Islamabad_Roads t;
    </div>
  `,
  ai: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-brain" style="color: var(--accent-clay);"></i> AI / ML Classification Report</h3>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Programming for AI | Logistic Regression Sleep Quality Model</p>
    <table class="modal-table">
      <thead><tr><th>Class</th><th>Precision</th><th>Recall</th><th>F1-Score</th><th>Support</th></tr></thead>
      <tbody>
        <tr><td>Poor Sleep (0)</td><td>1.00</td><td>1.00</td><td>1.00</td><td>29</td></tr>
        <tr><td>Good Sleep (1)</td><td>1.00</td><td>1.00</td><td>1.00</td><td>46</td></tr>
        <tr style="background: var(--bg-subtle);"><td><strong>Overall Accuracy</strong></td><td colspan="3"><strong>100%</strong></td><td><strong>75</strong></td></tr>
      </tbody>
    </table>
    <div class="code-snippet">
# Scikit-learn Machine Learning Model
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
    </div>
  `,
  hydrology: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-water" style="color: var(--accent-clay);"></i> Hydrological Basin Modeling & Stream Orders</h3>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Soan River Basin & Khushab Catchment DEM Processing</p>
    <table class="modal-table">
      <thead><tr><th>Layer</th><th>Geoprocessing Step</th><th>Output Parameters</th></tr></thead>
      <tbody>
        <tr><td>Stream Order</td><td>Strahler Classification</td><td>Orders 1 through 6</td></tr>
        <tr><td>Flow Accumulation</td><td>Thresholding (&gt;486k cells)</td><td>Stream network raster</td></tr>
        <tr><td>Catchment Basins</td><td>Pour Point Delineation</td><td>Basins 1 to 5</td></tr>
      </tbody>
    </table>
  `,
  datascience: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-calculator" style="color: var(--accent-clay);"></i> Landsat 8 Raster Summary Statistics</h3>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Data Science Fundamentals | Supervised by Dr. Faisal Najeeb</p>
    <table class="modal-table">
      <thead><tr><th>Statistic</th><th>NDVI Value</th></tr></thead>
      <tbody>
        <tr><td>Minimum NDVI</td><td>-0.12</td></tr>
        <tr><td>Maximum NDVI</td><td>0.81</td></tr>
        <tr><td>Mean NDVI</td><td>0.47</td></tr>
        <tr><td>Median NDVI</td><td>0.50</td></tr>
      </tbody>
    </table>
  `,
  postgis: `
    <h3 style="color: var(--text-ink); margin-bottom: 12px;"><i class="fa-solid fa-database" style="color: var(--accent-clay);"></i> PostGIS & GeoPackage Binary Struct</h3>
    <div class="code-snippet">
-- PostGIS Distance Query
SELECT c.name, ST_Distance(c.geom::geography, p.geom::geography)/1000 AS km
FROM cities c, cities p
WHERE p.name = 'Islamabad' AND ST_DWithin(c.geom::geography, p.geom::geography, 500000);
    </div>
  `,
  flood: `
    <h3 style="color: var(--text-ink); margin-bottom: 12px;"><i class="fa-solid fa-shield-halved" style="color: var(--accent-clay);"></i> Flood Risk Multi-Criteria SDSS</h3>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">Weighted Overlay: 40% DEM + 30% Slope + 30% River Distance</p>
  `,
  cpp: `
    <h3 style="color: var(--text-ink); margin-bottom: 8px;"><i class="fa-solid fa-code" style="color: var(--accent-clay);"></i> C++ Object Oriented Programming</h3>
    <div class="code-snippet">
class RecipeSystem : public RecipeManager {
public:
    void displayRecipes() const {
        for (const Recipe& recipe : recipes) {
            recipe.display();
        }
    }
};
    </div>
  `
};

function openModal(key) {
  const modalBody = document.getElementById('modalBody');
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalBody && modalOverlay && modalData[key]) {
    modalBody.innerHTML = modalData[key];
    modalOverlay.style.display = 'flex';
  }
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'modalOverlay') {
    closeModal();
  }
}