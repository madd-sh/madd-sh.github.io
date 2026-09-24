/* Documentation search: native links and dialog; no command execution. */
const dialog = document.querySelector('#command-dialog');
const input = document.querySelector('#command-input');
const results = [...document.querySelectorAll('#command-results li')];
const resultCount = document.querySelector('#result-count');
let opener = null;

function filterCommands() {
  const query = input.value.trim().toLocaleLowerCase();
  for (const item of results) {
    const link = item.querySelector('a');
    item.hidden = !(link.textContent + ' ' + link.dataset.search).toLocaleLowerCase().includes(query);
  }
  const count = results.filter(item => !item.hidden).length;
  resultCount.textContent = count ? `${count} ${resultCount.dataset.count}` : resultCount.dataset.empty;
}

function openCommands(trigger) {
  if (dialog.open) return;
  opener = trigger;
  input.value = '';
  filterCommands();
  dialog.showModal();
  input.focus();
}

if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-open-commands]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => openCommands(button));
  });
  document.querySelector('#close-commands').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus(); });
  input.addEventListener('input', filterCommands);
  document.querySelector('#command-form').addEventListener('submit', event => {
    event.preventDefault();
    results.find(item => !item.hidden)?.querySelector('a').click();
  });
  dialog.addEventListener('click', event => {
    if (event.target.closest('#command-results a')) dialog.close();
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('keydown', event => {
    if (event.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button, input, a[href]')].filter(el => !el.closest('[hidden]'));
      const boundary = event.shiftKey ? controls[0] : controls.at(-1);
      if (document.activeElement === boundary) {
        event.preventDefault();
        (event.shiftKey ? controls.at(-1) : controls[0]).focus();
      }
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const links = results.filter(item => !item.hidden).map(item => item.querySelector('a'));
    if (!links.length) return;
    event.preventDefault();
    const index = links.indexOf(document.activeElement);
    if (event.key === 'ArrowUp' && index <= 0) input.focus();
    else links[(index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length].focus();
  });
  document.addEventListener('keydown', event => {
    if (event.isComposing || event.altKey || event.shiftKey || event.target.closest('input, textarea, select, [contenteditable]')) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommands(document.activeElement);
    }
  });
}


// Existing theme implementation preserves saved preferences across the relaunch.
document.querySelector('#theme-toggle').hidden = false;
