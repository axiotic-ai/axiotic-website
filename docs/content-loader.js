// content-loader.js

async function loadContent() {
  try {
    const response = await fetch('content.yaml');
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);

    // Helper: Safely set text content to avoid HTML injection
    const setText = (element, text) => {
      if (element) element.textContent = text;
    };
    
    // Helper: Safely set HTML content (only for trusted sources or simple formatting)
    // Note: In a production app, use a sanitizer. Here we assume content.yaml is trusted.
    const setHTML = (element, html) => {
      if (element) element.innerHTML = html;
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
    if (researchGrid && content.research.pillars) {
      researchGrid.innerHTML = content.research.pillars.map((pillar, index) => {
        // Use icon directly from content.yaml (should be Font Awesome class like "fa-bullseye")
        const iconClass = pillar.icon.startsWith('fa-') ? pillar.icon : `fa-${pillar.icon}`;
        return `
        <article 
          class="rounded-xl bg-slate-800 border border-slate-700 p-6 hover:border-amber-400 transition-all relative"
          data-aos="fade-up"
          data-aos-delay="${index * 50}"
        >
          <div class="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-slate-900 flex items-center justify-center">
            <i class="fas ${iconClass} text-xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 pr-12">${pillar.title}</h3>
          <p class="text-sm text-slate-300 leading-relaxed text-left">
            ${pillar.description}
          </p>
        </article>
      `;
      }).join('');
    }

    // 2.5. Flywheel Steps are now hardcoded in index.html for specific layout (Design 16).
    // The text content is populated by the generic data-key handler above.

    // 3. Render Consulting Pillars (2-3 Layout: First 2 cards, then 3 cards)
    const consultingGrid = document.getElementById('consulting-pillars-grid');
    if (consultingGrid && content.consulting.pillars) {
        const pillars = content.consulting.pillars;
        const firstRow = pillars.slice(0, 2);
        const secondRow = pillars.slice(2, 5);
        
        // Map emoji icons to Font Awesome icons
        const emojiToFaIcon = {
            '🧭': 'fa-compass',
            '🧠': 'fa-cogs',
            '⚖️': 'fa-balance-scale',
            '🎓': 'fa-graduation-cap',
            '🧩': 'fa-users'
        };
        
        const getIconHtml = (icon) => {
            if (icon.startsWith('fa-')) {
                return `<i class="fas ${icon} text-xl text-amber-600"></i>`;
            } else if (emojiToFaIcon[icon]) {
                return `<i class="fas ${emojiToFaIcon[icon]} text-xl text-amber-600"></i>`;
            } else {
                return `<span class="text-xl">${icon}</span>`;
            }
        };
        
        let html = '';
        
        // First row: 2 cards (AI Strategy, Models)
        if (firstRow.length > 0) {
            html += `<!-- Row 1: 2 Cards --><div class="grid md:grid-cols-2 gap-6 mb-6" data-aos="fade-up">`;
            firstRow.forEach((pillar, index) => {
                const isFirst = index === 0;
                html += `
                <div class="service-card rounded-xl bg-gradient-to-br ${isFirst ? 'from-white via-white to-amber-50/80 border-2 border-amber-400/30' : 'from-white via-white to-slate-50/80 border-2 border-slate-300'} p-8 hover:border-amber-500/50 shadow-xl transition-all">
                  <div class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                    ${getIconHtml(pillar.icon)}
                  </div>
                  <h3 class="text-xl font-bold mb-4 text-slate-900">${pillar.title}</h3>
                  <p class="text-slate-700 text-sm leading-relaxed">${pillar.description}</p>
                </div>
                `;
            });
            html += `</div>`;
        }
        
        // Second row: 3 cards (Governance, Education, Hiring)
        if (secondRow.length > 0) {
            html += `<!-- Row 2: 3 Cards --><div class="grid md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">`;
            secondRow.forEach((pillar) => {
                html += `
                <div class="service-card rounded-xl bg-gradient-to-br from-white to-slate-50/80 border-2 border-slate-300 p-8 hover:border-amber-500/40 shadow-xl transition-all">
                  <div class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                    ${getIconHtml(pillar.icon)}
                  </div>
                  <h3 class="text-xl font-bold mb-4 text-slate-900">${pillar.title}</h3>
                  <p class="text-slate-700 text-sm leading-relaxed">${pillar.description}</p>
                </div>
                `;
            });
            html += `</div>`;
        }
        
        consultingGrid.innerHTML = html;
    }

    // 4. Render Team Members (Circular Layout)
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && content.team.members) {
      // Shuffle array for random order on each page load
      const shuffledMembers = [...content.team.members].sort(() => Math.random() - 0.5);
      
      teamGrid.innerHTML = shuffledMembers.map((member, index) => {
        const photoUrl = member.photo || 'images/default-avatar.png';
        
        const linkedinIcon = member.linkedin ? `
          <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-amber-400 transition-colors" title="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
        ` : '';
        
        const scholarIcon = member.scholar ? `
          <a href="${member.scholar}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-amber-400 transition-colors" title="Google Scholar">
            <i class="fas fa-graduation-cap"></i>
          </a>
        ` : '';
        
        const socialIcons = (linkedinIcon || scholarIcon) ? `
          <div class="flex items-center justify-center gap-3 mt-3">
            ${linkedinIcon}
            ${scholarIcon}
          </div>
        ` : '';
        
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
                    alt="${member.name}" 
                    class="w-full h-full object-cover"
                    style="aspect-ratio: 1 / 1;"
                  >
                </div>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">${member.name}</h3>
          <p class="text-amber-500 text-sm font-bold uppercase tracking-wider mb-3">${member.role}</p>
          <p class="text-slate-400 text-sm leading-relaxed">
            ${member.description}
          </p>
          ${socialIcons}
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

  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', loadContent);
