// Progressive form handling. Each <form data-form data-endpoint="..."> posts
// JSON to its endpoint. Until an endpoint is configured the form validates,
// then explains that it is a preview and nothing was sent.

let ready = false;

export function initForms() {
  if (ready) return;
  ready = true;

  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    const note = form.querySelector<HTMLElement>('[data-form-note]');
    const say = (text: string, state: 'ok' | 'error' | 'preview') => {
      if (!note) return;
      note.textContent = text;
      note.dataset.state = state;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const firstInvalid = [...form.elements].find(
        (el): el is HTMLInputElement => 'checkValidity' in el && !(el as HTMLInputElement).checkValidity(),
      );
      if (firstInvalid) {
        const label = form.querySelector(`label[for="${firstInvalid.id}"]`)?.textContent?.trim() ?? 'This field';
        const msg =
          firstInvalid.type === 'email' && firstInvalid.value
            ? 'That email address looks incomplete. Check for a missing @ or domain.'
            : `${label} is required.`;
        say(msg, 'error');
        firstInvalid.focus();
        return;
      }

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        say('Preview mode: this form isn’t connected yet, so nothing was sent.', 'preview');
        return;
      }

      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      button?.setAttribute('disabled', '');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!res.ok) throw new Error(String(res.status));
        say(note?.dataset.ok ?? 'Sent. Thank you.', 'ok');
        form.reset();
      } catch {
        say('That didn’t go through. Check your connection and try again.', 'error');
      } finally {
        button?.removeAttribute('disabled');
      }
    });
  });
}
