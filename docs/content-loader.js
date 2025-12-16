document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('content.yaml?v=' + new Date().getTime());
    const yamlText = await response.text();
    const content = jsyaml.load(yamlText);

    // 1. Update simple text/html elements by data-key
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-key');
      const value = getNestedValue(content, key);
      if (value) {
        if (el.tagName === 'TITLE') {
          // Special handling for title tag
          el.textContent = value;
          document.title = value;
        } else if (el.tagName === 'A' && key.endsWith('.text')) {
             // For links, we might have separate href keys, but here we just update text
             el.textContent = value;
        } else if (el.tagName === 'BUTTON') {
             // For buttons, use textContent
             el.textContent = value;
        } else if (el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') {
             // For text elements, use textContent to avoid HTML injection
             el.textContent = value;
        } else {
             el.innerHTML = value; // Using innerHTML to allow <br> tags
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

    // 2.5. Render Flywheel Steps
    const flywheelGrid = document.getElementById('flywheel-grid');
    if (flywheelGrid && content.flywheel && content.flywheel.steps) {
      flywheelGrid.innerHTML = content.flywheel.steps.map((step, index) => {
        // Use icon directly from content.yaml (should be Font Awesome class like "fa-coins")
        const iconClass = step.icon.startsWith('fa-') ? step.icon : `fa-${step.icon}`;
        return `
        <article 
          class="rounded-xl bg-slate-900/40 border border-slate-800 p-5 hover:border-amber-500/40 transition duration-300 flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="text-6xl mb-3">
            <i class="fas ${iconClass} text-amber-400"></i>
          </div>
          <h3 class="text-lg font-bold text-amber-100 mb-2">${step.title}</h3>
          <p class="text-base text-slate-400 leading-relaxed">
            ${step.description}
          </p>
        </article>
      `;
      }).join('');
    }

    // 3. Render Consulting Flagship Lists
    const col1List = document.getElementById('consulting-flagship-col1');
    if (col1List && content.consulting.flagship.col1_items) {
      col1List.innerHTML = content.consulting.flagship.col1_items.map(item => `<li class="text-slate-700 text-base">${item}</li>`).join('');
    }

    const col2List = document.getElementById('consulting-flagship-col2');
    if (col2List && content.consulting.flagship.col2_items) {
      col2List.innerHTML = content.consulting.flagship.col2_items.map(item => `<li class="text-slate-700 text-base">${item}</li>`).join('');
    }

    // 4. Render Consulting Pillars (Design 18: Asymmetric Offset Icon)
    const consultingGrid = document.getElementById('consulting-pillars-grid');
    if (consultingGrid && content.consulting.pillars) {
      consultingGrid.innerHTML = content.consulting.pillars.map((pillar, index) => {
        // Use icon directly from content.yaml (should be Font Awesome class like "fa-brain")
        const iconClass = pillar.icon.startsWith('fa-') ? pillar.icon : `fa-${pillar.icon}`;
        return `
        <article 
          class="rounded-xl bg-white border-2 border-slate-200 p-6 hover:border-amber-400 transition-all relative"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-white flex items-center justify-center">
            <i class="fas ${iconClass} text-xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold mb-3 text-slate-900 pr-12">${pillar.title}</h3>
          <p class="text-slate-700 text-base leading-relaxed">
            ${pillar.description}
          </p>
        </article>
      `;
      }).join('');
    }

    // 5. Render Team Members (Shuffled)
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && content.team.members) {
      const members = [...content.team.members];
      shuffleArray(members);
      
      teamGrid.innerHTML = members.map((member, index) => `
        <article class="p-4 flex flex-col items-start" data-aos="fade-up" data-aos-delay="${index * 50}">
          <div class="mb-4 w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 shadow-sm">
            <img 
              src="${member.photo}" 
              alt="${member.name}" 
              class="w-full h-full object-cover"
              onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random'"
            >
          </div>
          <h3 class="text-lg font-bold text-amber-100">${member.name}</h3>
          <p class="text-base text-amber-400 mb-2">${member.role}</p>
          <p class="text-base text-slate-400 leading-relaxed">
            ${member.description}
          </p>
        </article>
      `).join('');
    }

    // Refresh AOS to account for new DOM elements
    setTimeout(() => {
        AOS.refresh();
    }, 100);

  } catch (e) {
    console.error('Error loading content:', e);
  }
});

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
