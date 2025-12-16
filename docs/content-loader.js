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
        } else {
             el.innerHTML = value; // Using innerHTML to allow <br> tags
        }
      }
    });

    // 2. Render Research Pillars (Option 4: Minimal with Border Icon - Dark)
    const iconMap = {
      '🔮🎯': 'fa-bullseye',
      '👁️👂🗣️🖐️': 'fa-brain',
      '🧠🔄': 'fa-memory',
      '🔍🌲': 'fa-sitemap',
      '🏗️🕸️': 'fa-cube',
      '⚙️🚀': 'fa-cogs',
      '🤖🌍': 'fa-globe',
      '🧬📉': 'fa-leaf',
      '🔗': 'fa-project-diagram',
      '🌊': 'fa-wave-square'
    };
    
    // Special handling for specific pillars
    const getIconForPillar = (pillar) => {
      if (pillar.title.includes('Distillation')) {
        return 'fa-compress';
      }
      return iconMap[pillar.icon] || 'fa-circle';
    };
    
    const simplifiedDescriptions = {
      '1. Improved Tasks': 'Training models to predict past, present, and future states for better causal understanding and planning.',
      '2. Multimodal Learning': 'Architectures that process text, images, and audio together for richer world understanding.',
      '3. Memory & Conditional Recursion': 'Adding explicit memory to transformers for infinite-context learning without expensive tokens.',
      '4. Hierarchical/Fractal Attention': 'Attention patterns that see both detail and big picture efficiently.',
      '5. Architectures': 'New connectivity patterns and activation mechanisms for more efficient processing.',
      '6. AI Flywheels': 'Closed-loop systems where models generate and improve their own training data.',
      '7. Embodiment': 'Simulation-based learning for grounded intelligence before real-world deployment.',
      '8. Evolution & Information': 'Combining evolutionary methods with gradient descent for robust learning.',
      '9. Distillation': 'Compressing large models into smaller ones without losing performance.',
      '10. Local Learning Rules': 'Learning rules that work locally, inspired by how nature achieves efficiency.',
      '11. Asynchronous Neural Dynamics': 'Neural rhythms across multiple time scales for efficient learning and inference.'
    };
    
    const researchGrid = document.getElementById('research-pillars-grid');
    if (researchGrid && content.research.pillars) {
      // Create first row with 2 larger cards
      const firstRow = document.createElement('div');
      firstRow.className = 'grid gap-4 grid-cols-1 md:grid-cols-2 mb-4';
      
      // Create second section with 3-column grid for remaining 9 cards
      const remainingGrid = document.createElement('div');
      remainingGrid.className = 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      
      content.research.pillars.forEach((pillar, index) => {
        const iconClass = getIconForPillar(pillar);
        const simplifiedDesc = simplifiedDescriptions[pillar.title] || pillar.description;
        const cleanTitle = pillar.title.replace(/^\d+\.\s*/, '');
        
        const isLargeCard = index < 2;
        const cardPadding = isLargeCard ? 'p-6' : 'p-5';
        const iconSize = isLargeCard ? 'w-12 h-12' : 'w-10 h-10';
        const iconTextSize = isLargeCard ? 'text-lg' : '';
        const titleSize = isLargeCard ? 'text-base' : 'text-sm';
        const textSize = isLargeCard ? 'text-sm' : 'text-xs';
        
        const cardHTML = `
          <article 
            class="research-card rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 ${cardPadding} hover:bg-slate-800 hover:border-amber-400 transition-all"
            data-aos="fade-up"
            data-aos-delay="${index * 50}"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="${iconSize} rounded-lg bg-amber-400/20 flex items-center justify-center">
                <i class="fas ${iconClass} text-amber-400 ${iconTextSize}"></i>
              </div>
              <h3 class="${titleSize} font-bold text-white">${cleanTitle}</h3>
            </div>
            <p class="${textSize} text-slate-300 leading-relaxed">
              ${simplifiedDesc}
            </p>
          </article>
        `;
        
        if (isLargeCard) {
          firstRow.insertAdjacentHTML('beforeend', cardHTML);
        } else {
          remainingGrid.insertAdjacentHTML('beforeend', cardHTML);
        }
      });
      
      // Clear and rebuild grid structure
      researchGrid.innerHTML = '';
      researchGrid.appendChild(firstRow);
      researchGrid.appendChild(remainingGrid);
    }

    // 2.5. Render Flywheel Steps (with icons, no emojis, no client purchase claims)
    const flywheelIconMap = {
      '💰': 'fa-coins',
      '🔬': 'fa-flask',
      '⭐': 'fa-star',
      '🧲': 'fa-magnet'
    };
    
    const flywheelDescriptions = {
      'Consulting Creates Real-World Value': 'We build systems and empower teams that solve actual industry problems. This work generates value for the world and capital to fund our own compute and talent.',
      'Revenue Funds Research': 'We reinvest profits into blue sky exploration—new architectures, evolution, and embodied AI—without needing immediate ROI.',
      'Research Builds Reputation': 'We publish SOTA open-source work. This builds technical authority and trust in our capabilities.',
      'Reputation Attracts Clients': 'Our open work demonstrates our expertise. Companies engage with us to leverage our research and systems, restarting the cycle.'
    };
    
    const flywheelGrid = document.getElementById('flywheel-grid');
    if (flywheelGrid && content.flywheel && content.flywheel.steps) {
      flywheelGrid.innerHTML = content.flywheel.steps.map((step, index) => {
        const iconClass = flywheelIconMap[step.icon] || 'fa-circle';
        const description = flywheelDescriptions[step.title] || step.description;
        return `
        <article 
          class="rounded-xl bg-slate-900/40 border border-slate-800 p-5 hover:border-amber-500/40 transition duration-300 flex flex-col items-center text-center"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="w-12 h-12 rounded-lg bg-amber-400/20 flex items-center justify-center mb-3">
            <i class="fas ${iconClass} text-2xl text-amber-400"></i>
          </div>
          <h3 class="text-sm font-bold text-amber-100 mb-2">${step.title}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${description}
          </p>
        </article>
      `;
      }).join('');
    }

    // 3. Render Consulting Flagship Lists
    const col1List = document.getElementById('consulting-flagship-col1');
    if (col1List && content.consulting.flagship.col1_items) {
      col1List.innerHTML = content.consulting.flagship.col1_items.map(item => `<li>${item}</li>`).join('');
    }

    const col2List = document.getElementById('consulting-flagship-col2');
    if (col2List && content.consulting.flagship.col2_items) {
      col2List.innerHTML = content.consulting.flagship.col2_items.map(item => `<li>${item}</li>`).join('');
    }

    // 4. Render Consulting Pillars
    const consultingGrid = document.getElementById('consulting-pillars-grid');
    if (consultingGrid && content.consulting.pillars) {
      consultingGrid.innerHTML = content.consulting.pillars.map((pillar, index) => `
        <article 
          class="rounded-xl bg-slate-900/80 border border-slate-700 p-6 shadow-lg transition duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10"
          data-aos="fade-up"
          data-aos-delay="${index * 100}"
        >
          <div class="text-3xl mb-4">${pillar.icon}</div>
          <h3 class="text-base font-bold text-slate-100 mb-2">${pillar.title}</h3>
          <p class="text-sm text-slate-300">
            ${pillar.description}
          </p>
        </article>
      `).join('');
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
          <h3 class="text-sm font-bold text-amber-100">${member.name}</h3>
          <p class="text-xs text-amber-400 mb-2">${member.role}</p>
          <p class="text-xs text-slate-400 leading-relaxed">
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
