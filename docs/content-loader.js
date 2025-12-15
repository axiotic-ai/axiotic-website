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
      '🧬📉': 'fa-leaf'
    };
    
    // Special handling for Distillation (9th card) - use a different icon
    const getIconForPillar = (pillar) => {
      if (pillar.title.includes('Distillation')) {
        return 'fa-compress';
      }
      return iconMap[pillar.icon] || 'fa-circle';
    };
    
    const simplifiedDescriptions = {
      '1. Improved Tasks': 'We move beyond the next token prediction. By training models to predict masked past, present, and future states, we force them to learn causal structure, long-horizon planning, and robust memory.',
      '2. Multimodal Learning': 'Inspired by the brain\'s multimodal neurons, we design \'synesthetic\' architectures that process text, images, and audio in a shared latent space, leveraging correlations across senses for richer world modeling.',
      '3. Memory & Conditional Recursion': 'Equipping transformers with explicit memory and latent reasoning loops could turn them into differentiable computers that separate processing from storage. This offers a path to infinite-context learning and efficient, internal recursion without expensive chain-of-thought tokens.',
      '4. Hierarchical/Fractal Attention': 'We develop fractal attention patterns that operate at multiple resolutions simultaneously—seeing the forest and the trees without the brute-force cost of standard scaling.',
      '5. Architectures': 'New connectivity patterns, different activation mechanisms, and dense routing schemes where deep layers attend directly to shallow features.',
      '6. AI Flywheels': 'Data quality is the new frontier. We engineer closed-loop data engines where models generate, filter, and curriculum-sort their own training data for self-reinforcing improvement.',
      '7. Embodiment': 'Intelligence requires grounding. We use simulation (Isaac/Cosmos) as a primary data source, training agents on interaction physics before sim-to-real transfer.',
      '8. Evolution & Information': 'SGD is greedy; evolution generalizes but is slow. We research how to synergize them for robust, efficient learning.',
      '9. Distillation': 'We investigate distillation through an information-theoretic lens, aiming to crack the physics of compression and train small models to their maximum potential without a teacher.'
    };
    
    const researchGrid = document.getElementById('research-pillars-grid');
    if (researchGrid && content.research.pillars) {
      researchGrid.innerHTML = content.research.pillars.map((pillar, index) => {
        const iconClass = getIconForPillar(pillar);
        const simplifiedDesc = simplifiedDescriptions[pillar.title] || pillar.description;
        // Remove numbers from title (e.g., "1. Improved Tasks" -> "Improved Tasks")
        const cleanTitle = pillar.title.replace(/^\d+\.\s*/, '');
        return `
        <article 
          class="research-card rounded-xl bg-slate-900/10 border border-slate-800/50 p-6 hover:border-amber-500/30 hover:bg-slate-900/20 transition-all backdrop-blur-sm"
          data-aos="fade-up"
          data-aos-delay="${index * 50}"
        >
          <div class="w-16 h-16 border-2 border-amber-400 rounded-lg flex items-center justify-center mb-4">
            <i class="fas ${iconClass} text-2xl text-amber-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-3 text-slate-100">${cleanTitle}</h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            ${simplifiedDesc}
          </p>
        </article>
      `;
      }).join('');
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
