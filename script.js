const defaultProfile = {
  name: 'Tarek',
  headline: 'All About Me',
  blurb:
    'I am Tarek, and this is a little snapshot of who I am. I am a student, a hard worker, and someone who is always learning and growing every day.',
  photoBlurb:
    'I am currently a student at Susan E. Wagner High School, and I have an identical twin brother. I am a sophomore graduating in 2029.',
  facts: [
    { label: 'School', value: 'Susan E. Wagner High School' },
    { label: 'Grade', value: 'Sophomore' },
    { label: 'Class of', value: '2029' },
    { label: 'Family', value: 'Identical twin brother' }
  ],
  details: [
    'I am currently a student at Susan E. Wagner High School.',
    'I have an identical twin brother.',
    'I am a sophomore graduating in the class of 2029.',
    'I am always working to improve, learn new things, and grow as a person.'
  ]
};

async function loadProfile() {
  try {
    const response = await fetch('./profile.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load profile data');
    }

    const profile = await response.json();
    renderProfile(profile);
  } catch (error) {
    console.warn('Using fallback content because profile.json could not be loaded.', error);
    renderProfile(defaultProfile);
  }
}

function renderProfile(profile) {
  const title = document.getElementById('page-title');
  const blurb = document.getElementById('blurb');
  const photoBlurb = document.getElementById('photo-blurb');
  const factsGrid = document.getElementById('facts-grid');
  const detailsList = document.getElementById('details-list');
  const photoContainer = document.getElementById('profile-photo');

  const safeName = profile.name || defaultProfile.name;
  const safeHeadline = profile.headline || `All About ${safeName}`;

  if (title) {
    title.textContent = safeHeadline;
  }

  document.title = safeHeadline;

  if (blurb) {
    blurb.textContent = profile.blurb || defaultProfile.blurb;
  }

  if (photoBlurb) {
    photoBlurb.textContent = profile.photoBlurb || defaultProfile.photoBlurb;
  }

  if (photoContainer) {
    if (profile.photo && profile.photo.trim() !== '') {
      photoContainer.innerHTML = `<img src="${profile.photo}" alt="${safeName}'s profile picture" />`;
    } else {
      photoContainer.innerHTML = '<span>Add your photo here</span>';
    }
  }

  if (factsGrid) {
    factsGrid.innerHTML = '';
    const facts = Array.isArray(profile.facts) && profile.facts.length > 0 ? profile.facts : defaultProfile.facts;

    facts.forEach((fact) => {
      const card = document.createElement('div');
      card.className = 'fact-item';
      card.innerHTML = `
        <span class="fact-label">${fact.label || 'Fact'}</span>
        <span class="fact-value">${fact.value || ''}</span>
      `;
      factsGrid.appendChild(card);
    });
  }

  if (detailsList) {
    detailsList.innerHTML = '';
    const details = Array.isArray(profile.details) && profile.details.length > 0 ? profile.details : defaultProfile.details;

    details.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      detailsList.appendChild(li);
    });
  }
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -30px 0px'
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}

loadProfile();
setupRevealAnimations();
