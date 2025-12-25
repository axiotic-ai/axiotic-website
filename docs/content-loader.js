// content-loader.js

// Simple HTML sanitizer to prevent XSS attacks
function sanitizeHTML(html) {
  const allowedTags = ['br', 'em', 'strong', 'b', 'i'];
  const tempDiv = document.createElement('div');
  tempDiv.textContent = html; // First escape everything
  
  // Then selectively allow safe tags
  let sanitized = tempDiv.innerHTML;
  allowedTags.forEach(tag => {
    const openRegex = new RegExp(`&lt;${tag}&gt;`, 'gi');
    const closeRegex = new RegExp(`&lt;/${tag}&gt;`, 'gi');
    sanitized = sanitized.replace(openRegex, `<${tag}>`);
    sanitized = sanitized.replace(closeRegex, `</${tag}>`);
  });
  
  return sanitized;
}

// Show loading indicator
function showLoading() {
  // Add a subtle loading class to body
  document.body.classList.add('content-loading');
}

// Hide loading indicator
function hideLoading() {
  document.body.classList.remove('content-loading');
}

// Show error message to user
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md text-center';
  errorDiv.innerHTML = `
    <p class="font-semibold mb-2">Content Loading Error</p>
    <p class="text-sm">${sanitizeHTML(message)}</p>
    <p class="text-xs mt-2">Please refresh the page or contact us at <a href="mailto:contact@axiotic.ai" class="underline">contact@axiotic.ai</a></p>
  `;
  document.body.appendChild(errorDiv);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    errorDiv.style.transition = 'opacity 0.5s';
    errorDiv.style.opacity = '0';
    setTimeout(() => errorDiv.remove(), 500);
  }, 10000);
}

async function loadContent() {
  showLoading();
  
  try {
    const response = await fetch('content.yaml');
    
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
    }
    
    const yamlText = await response.text();
    
    if (!yamlText.trim()) {
      throw new Error('Content file is empty');
    }
    
    const content = jsyaml.load(yamlText);
    
    if (!content) {
      throw new Error('Failed to parse content');
    }

    // Helper: Safely set text content to avoid HTML injection
    const setText = (element, text) => {
      if (element) element.textContent = text;
    };
    
    // Helper: Safely set HTML content with sanitization
    const setHTML = (element, html) => {
      if (element) element.innerHTML = sanitizeHTML(html);
    };

    // 1. Populate Text Elements with data-key attributes
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-key');
      const keys = key.split('.');
      let value = content;
      
      for (const k of keys) {
        if (value && value[k] !== undefined) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      if (value !== null) {
        // Handle specific elements or keys that might contain HTML (like line breaks)
        // or formatting. For now, we trust the YAML content for these specific keys.
        if (['SPAN', 'P', 'H2', 'H3', 'H4', 'BUTTON'].includes(el.tagName)) {
             if (key === 'mission.statement' || key === 'name_origin.text') {
                 el.innerHTML = value; // Allow HTML for mission statement and name origin (e.g. <br>, <em>)
             } else {
                 el.textContent = value;
             }
        } else {
            el.textContent = value;
        }
      }
    });

    // 2. Render Research Pillars (Design 16: Asymmetric Cards with Offset Icon)
    const researchGrid = document.getElementById('research-pillars-grid');
    if (researchGrid && content.research && content.research.pillars) {
      researchGrid.innerHTML = content.research.pillars.map((pillar, index) => {
        // Use icon directly from content.yaml (should be Font Awesome class like "fa-bullseye")
        const iconClass = pillar.icon.startsWith('fa-') ? pillar.icon : `fa-${pillar.icon}`;
        // Sanitize text content
        const title = document.createElement('div');
        title.textContent = pillar.title;
        const description = document.createElement('div');
        description.textContent = pillar.description;
        
        return `
        <article 
          class="rounded-xl bg-slate-800 border border-slate-700 p-6 hover:border-amber-400 transition-all relative"
          data-aos="fade-up"
          data-aos-delay="${index * 50}"
        >
          <div class="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-slate-900 flex items-center justify-center">
            <i class="fas ${iconClass} text-xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 pr-12">${title.innerHTML}</h3>
          <p class="text-sm text-slate-300 leading-relaxed text-left">
            ${description.innerHTML}
          </p>
        </article>
      `;
      }).join('');
    }

    // 2.5. Flywheel Steps are now hardcoded in index.html for specific layout (Design 16).
    // The text content is populated by the generic data-key handler above.

    // 3. Render Consulting Pillars (Design 18: Light Theme Cards)
    const consultingGrid = document.getElementById('consulting-pillars-grid');
    if (consultingGrid && content.consulting && content.consulting.pillars) {
        consultingGrid.innerHTML = content.consulting.pillars.map((pillar, index) => {
            const iconClass = pillar.icon.startsWith('fa-') ? pillar.icon : `fa-${pillar.icon}`;
            // Sanitize text content
            const title = document.createElement('div');
            title.textContent = pillar.title;
            const description = document.createElement('div');
            description.textContent = pillar.description;
            
            return `
            <article 
              class="rounded-xl bg-white border border-slate-200 p-6 hover:shadow-xl hover:border-amber-400 transition-all relative group"
              data-aos="fade-up"
              data-aos-delay="${index * 100}"
            >
               <div class="flex items-start gap-4 mb-3">
                  <div class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-400 transition-colors duration-300">
                    <i class="fas ${iconClass} text-xl text-amber-600 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 pt-2">${title.innerHTML}</h3>
               </div>
              <p class="text-sm text-slate-600 leading-relaxed text-left">
                ${description.innerHTML}
              </p>
            </article>
            `;
        }).join('');
    }

    // 3.5 Render Flagship List Items
    const flagshipCol1 = document.getElementById('consulting-flagship-col1');
    const flagshipCol2 = document.getElementById('consulting-flagship-col2');
    
    if (flagshipCol1 && content.consulting && content.consulting.flagship && content.consulting.flagship.col1_items) {
        flagshipCol1.innerHTML = content.consulting.flagship.col1_items.map(item => {
            const temp = document.createElement('div');
            temp.textContent = item;
            return `<li>${temp.innerHTML}</li>`;
        }).join('');
    }
    
    if (flagshipCol2 && content.consulting && content.consulting.flagship && content.consulting.flagship.col2_items) {
        flagshipCol2.innerHTML = content.consulting.flagship.col2_items.map(item => {
            const temp = document.createElement('div');
            temp.textContent = item;
            return `<li>${temp.innerHTML}</li>`;
        }).join('');
    }


    // 4. Render Team Members (Circular Layout)
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && content.team && content.team.members) {
      // Shuffle array for random order on each page load
      const shuffledMembers = [...content.team.members].sort(() => Math.random() - 0.5);
      
      teamGrid.innerHTML = shuffledMembers.map((member, index) => {
        const photoUrl = member.photo || 'images/default-avatar.png';
        
        // Sanitize text content
        const name = document.createElement('div');
        name.textContent = member.name;
        const role = document.createElement('div');
        role.textContent = member.role;
        const description = document.createElement('div');
        description.textContent = member.description;
        const alt = document.createElement('div');
        alt.textContent = member.name;
        
        return `
        <article 
          class="text-center group p-4"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="relative w-40 h-40 mx-auto mb-6">
            <!-- Glow effect -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10"></div>
            
            <div class="w-full h-full rounded-full p-1 bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-amber-400 group-hover:to-orange-500 transition-colors duration-300">
                <div class="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800">
                  <img 
                    src="${photoUrl}" 
                    alt="${alt.innerHTML}" 
                    class="w-full h-full object-cover"
                    style="aspect-ratio: 1 / 1;"
                    loading="lazy"
                  >
                </div>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">${name.innerHTML}</h3>
          <p class="text-amber-500 text-sm font-bold uppercase tracking-wider mb-3">${role.innerHTML}</p>
          <p class="text-slate-400 text-sm leading-relaxed">
            ${description.innerHTML}
          </p>
        </article>
      `;
      }).join('');
    }

    // Refresh AOS to account for new DOM elements
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 100);
    
    hideLoading();

  } catch (error) {
    console.error('Error loading content:', error);
    hideLoading();
    
    // Show user-friendly error message
    showError('Unable to load website content. This might be a temporary issue with your connection or our server.');
    
    // Keep fallback content visible (if any exists in HTML)
  }
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', loadContent);
