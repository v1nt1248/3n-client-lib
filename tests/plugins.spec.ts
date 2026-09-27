import { createApp, inject, nextTick, type App } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { vueBus } from '../src/plugins/vue-bus/vue-bus';
import { notifications } from '../src/plugins/notifications/notifications';
import dialogs from '../src/plugins/dialogs/dialogs';
import { theme } from '../src/plugins/theme/theme';
import { storeVueBus } from '../src/plugins/vue-bus/store-vue-bus';
import { storeNotifications } from '../src/plugins/notifications/store-notifications';
import { storeDialogs } from '../src/plugins/dialogs/store-dialog';
import { storeTheme } from '../src/plugins/theme/store-theme';
import { storeTooltips } from '../src/plugins/tooltips/store-tooltips';
import { NOTIFICATIONS_KEY, VUEBUS_KEY } from '../src/constants';

const apps: App[] = [];

function makeApp(): App {
  const app = createApp({ render: () => null });
  apps.push(app);
  return app;
}

afterEach(() => {
  for (const app of apps) {
    app.unmount();
  }
  apps.length = 0;
  document.body.innerHTML = '';
  localStorage.clear();
});

describe('vueBus plugin', () => {
  function install() {
    const app = makeApp();
    app.use(vueBus);
    const emitter = app.config.globalProperties.$emitter;
    emitter.clear();
    return { app, emitter };
  }

  it('delivers events to subscribed listeners', () => {
    const { emitter } = install();
    const handler = vi.fn();

    emitter.on('event', handler);
    emitter.emit('event', 42);

    expect(handler).toHaveBeenCalledWith(42);
  });

  it('stops delivering after off', () => {
    const { emitter } = install();
    const handler = vi.fn();

    emitter.on('event', handler);
    emitter.off('event', handler);
    emitter.emit('event');

    expect(handler).not.toHaveBeenCalled();
  });

  it('fires a once listener exactly one time', () => {
    const { emitter } = install();
    const handler = vi.fn();

    emitter.once('event', handler);
    emitter.emit('event');
    emitter.emit('event');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('drops every listener on clear', () => {
    const { emitter } = install();
    const handler = vi.fn();

    emitter.on('event', handler);
    emitter.clear();
    emitter.emit('event');

    expect(handler).not.toHaveBeenCalled();
  });

  it('exposes the emitter through provide', () => {
    const { app } = install();

    expect(app.runWithContext(() => inject(VUEBUS_KEY))).toEqual({
      $emitter: app.config.globalProperties.$emitter,
    });
  });
});

describe('notifications plugin', () => {
  it('registers $createNotice on global properties', () => {
    const app = makeApp();
    app.use(notifications);

    expect(typeof app.config.globalProperties.$createNotice).toBe('function');
  });

  it('renders a notice and generates an id when none is given', async () => {
    const app = makeApp();
    app.use(notifications);

    app.config.globalProperties.$createNotice({ content: 'hello' });
    await nextTick();

    const notice = document.querySelector('[data-ui3n="notification"]');
    expect(notice).not.toBeNull();
    expect(notice!.id).toMatch(/^[A-Za-z0-9]{6}$/);
  });

  it('keeps an explicitly provided id', async () => {
    const app = makeApp();
    app.use(notifications);

    app.config.globalProperties.$createNotice({ id: 'notice-1', content: 'hello' });
    await nextTick();

    expect(document.querySelector('[data-ui3n="notification"]')!.id).toBe('notice-1');
  });

  it('exposes $createNotice through provide', () => {
    const app = makeApp();
    app.use(notifications);

    expect(app.runWithContext(() => inject(NOTIFICATIONS_KEY))).toEqual({
      $createNotice: app.config.globalProperties.$createNotice,
    });
  });
});

describe('dialogs plugin', () => {
  function install() {
    const app = makeApp();
    app.use(dialogs);
    return app.config.globalProperties.$dialog;
  }

  it('pushes a dialog onto the stack when opened', () => {
    const $dialog = install();

    void $dialog.$openDialog({}, {});

    expect($dialog.dialogStack.value).toHaveLength(1);
    expect(typeof $dialog.dialogStack.value[0].id).toBe('string');
  });

  it('resolves an open dialog and removes it from the stack', async () => {
    const $dialog = install();
    const promise = $dialog.$openDialog({}, {});
    const id = $dialog.dialogStack.value[0].id;
    const result = { event: 'done' };

    $dialog.$closeDialog(id, result);

    await expect(promise).resolves.toEqual(result);
    expect($dialog.dialogStack.value).toHaveLength(0);
  });

  it('closes all dialogs at once', () => {
    const $dialog = install();
    void $dialog.$openDialog({}, {});
    void $dialog.$openDialog({}, {});

    $dialog.$closeDialogs();

    expect($dialog.dialogStack.value).toHaveLength(0);
  });
});

describe('theme plugin', () => {
  it('applies the requested theme to the target', () => {
    const target = document.createElement('div');
    const app = makeApp();

    app.use(theme, { theme: 'dark', target });

    expect(app.config.globalProperties.$theme.theme.value).toBe('dark');
    expect(target.classList.contains('colors')).toBe(true);
    expect(target.classList.contains('dark-theme')).toBe(true);
  });

  it('switches themes and drops the previous class', () => {
    const target = document.createElement('div');
    const app = makeApp();
    app.use(theme, { theme: 'light', target });
    const $theme = app.config.globalProperties.$theme;

    $theme.setTheme('midnight');

    expect($theme.theme.value).toBe('midnight');
    expect(target.classList.contains('midnight-theme')).toBe(true);
    expect(target.classList.contains('light-theme')).toBe(false);
  });

  it('ignores an unknown theme id', () => {
    const target = document.createElement('div');
    const app = makeApp();
    app.use(theme, { theme: 'dark', target });
    const $theme = app.config.globalProperties.$theme;

    $theme.setTheme('neon' as never);

    expect($theme.theme.value).toBe('dark');
  });

  it('defaults to the light theme', () => {
    const app = makeApp();

    app.use(theme, { target: document.createElement('div') });

    expect(app.config.globalProperties.$theme.theme.value).toBe('light');
  });

  it('restores and persists the theme when persistence is on', () => {
    const target = document.createElement('div');
    localStorage.setItem('ui3n-theme', 'midnight');
    const app = makeApp();

    app.use(theme, { persist: true, target });

    expect(app.config.globalProperties.$theme.theme.value).toBe('midnight');

    app.config.globalProperties.$theme.setTheme('light');
    expect(localStorage.getItem('ui3n-theme')).toBe('light');
  });
});

describe('store helpers', () => {
  it('reads the event bus off the app context', () => {
    const $emitter = { emit: vi.fn() };

    expect(storeVueBus({ app: { config: { globalProperties: { $emitter } } } })).toEqual({ $emitter });
  });

  it('reads the notice creator off the app context', () => {
    const $createNotice = vi.fn();

    expect(storeNotifications({ app: { config: { globalProperties: { $createNotice } } } })).toEqual({
      $createNotice,
    });
  });

  it('reads the dialogs off the app context', () => {
    const $dialog = {
      $openDialog: vi.fn(),
      $closeDialog: vi.fn(),
      $closeDialogs: vi.fn(),
      dialogStack: { value: [] },
    };

    expect(storeDialogs({ app: { config: { globalProperties: { $dialog } } } })).toEqual({
      $dialogs: {
        open: $dialog.$openDialog,
        close: $dialog.$closeDialog,
        closeAll: $dialog.$closeDialogs,
        dialogStack: $dialog.dialogStack,
      },
    });
  });

  it('reads the theme off the app context', () => {
    const $theme = { theme: { value: 'light' }, setTheme: vi.fn() };

    expect(storeTheme({ app: { config: { globalProperties: { $theme } } } })).toEqual({ $theme });
  });

  it('reads the tooltip api off the app context', () => {
    const $tooltip = { show: vi.fn() };

    expect(storeTooltips({ app: { config: { globalProperties: { $tooltip } } } })).toEqual({ $tooltip });
  });

  it('does not throw on an empty context', () => {
    expect(storeVueBus({})).toEqual({ $emitter: undefined });
    expect(storeNotifications({})).toEqual({ $createNotice: undefined });
    expect(storeTheme({})).toEqual({ $theme: undefined });
    expect(storeTooltips({})).toEqual({ $tooltip: undefined });
  });
});
