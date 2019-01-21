(function() {

  const onFeedback = (e) => {
    const feedbackContainer = e.target.closest('.feedback');
    const thanks = feedbackContainer.parentNode.querySelector('.feedback-thankyou');

    feedbackContainer.setAttribute('hidden','');
    if (thanks) {
      thanks.removeAttribute('hidden');
    }

    const value = e.target.value;
    const name = feedbackContainer.dataset.explainerName;

    if (value && name && (value === 'like' || value === 'dislike')) {
      const data = {
        componentEvent: {
          component: {
            componentType: 'GUIDE_ATOM',
            id: name,
            products: [],
            labels: []
          },
          action: value.toUpperCase()
        }
      };

      if (window.guardian.ophan && window.guardian.ophan.record) {
        window.guardian.ophan.record(data);
      }
    }

    e.currentTarget.removeEventListener('click', onFeedback);
  }

  let buttons = [...document.querySelectorAll('.feedback-button')];

  buttons.forEach(button => {
    button.addEventListener('click', onFeedback);
  })
})();
