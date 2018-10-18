const ioHook = require('../../index');
const robot = require('robotjs');

describe('Keyboard events', () => {
  afterEach(() => {
    ioHook.removeAllListeners('keyup');
    ioHook.removeAllListeners('keydown');
    ioHook.stop();
  });

  // afterAll(() => {
  //   ioHook.unload();
  // });

  it('receives the text "hello world" on keyup event', done => {
    expect.assertions(22);

    const chars = [
      { keycode: 35, value: 'h', rawcode: 104 },
      { keycode: 18, value: 'e', rawcode: 101 },
      { keycode: 38, value: 'l', rawcode: 108 },
      { keycode: 38, value: 'l', rawcode: 108 },
      { keycode: 24, value: 'o', rawcode: 111 },
      { keycode: 57, value: ' ', rawcode: 32 },
      { keycode: 17, value: 'w', rawcode: 119 },
      { keycode: 24, value: 'o', rawcode: 111 },
      { keycode: 19, value: 'r', rawcode: 114 },
      { keycode: 38, value: 'l', rawcode: 108 },
      { keycode: 32, value: 'd', rawcode: 100 }
    ];
    let i = 0;

    ioHook.on('keydown', event => {
      expect(event).toEqual({
        keycode: chars[i].keycode,
        rawcode: chars[i].rawcode,
        type: 'keydown',
        shiftKey: false,
        altKey: false,
        ctrlKey: false,
        metaKey: false
      });
    });
    ioHook.on('keyup', event => {
      expect(event).toEqual({
        keycode: chars[i].keycode,
        rawcode: chars[i].rawcode,
        type: 'keyup',
        shiftKey: false,
        altKey: false,
        ctrlKey: false,
        metaKey: false
      });

      if (i === chars.length - 1) {
        done();
      }

      i += 1;
    });
    ioHook.start();

    setTimeout(() => {
      // Make sure ioHook starts before anything gets typed
      for (const char of chars) {
        robot.keyTap(char.value);
      }
    }, 50);
  });

  it('recognizes shift key being pressed', done => {
    expect.assertions(8);
    const eventsCount = 2;
    let i = 0;

    ioHook.on('keydown', event => {
      expect(event).toHaveProperty('type', 'keydown');
      expect(event).toHaveProperty('shiftKey', true);
    });
    ioHook.on('keyup', event => {
      expect(event).toHaveProperty('type', 'keyup');
      expect(event).toHaveProperty('shiftKey', true);
      if (i === eventsCount - 1) {
        done();
      }
      i += 1;
    });
    ioHook.start();

    setTimeout(() => {
      // Make sure ioHook starts before anything gets typed
      robot.keyToggle('shift', 'down');
      robot.keyTap('1');
      robot.keyToggle('shift', 'up');
    }, 50);
  });

  it('recognizes alt key being pressed', done => {
    expect.assertions(8);
    const eventsCount = 2;
    let i = 0;

    ioHook.on('keydown', event => {
      expect(event).toHaveProperty('type', 'keydown');
      expect(event).toHaveProperty('altKey', true);
    });
    ioHook.on('keyup', event => {
      expect(event).toHaveProperty('type', 'keyup');
      expect(event).toHaveProperty('altKey', true);
      if (i === eventsCount - 1) {
        done();
      }
      i += 1;
    });
    ioHook.start();

    setTimeout(() => {
      // Make sure ioHook starts before anything gets typed
      robot.keyToggle('alt', 'down');
      robot.keyTap('1');
      robot.keyToggle('alt', 'up');
    }, 50);
  });

  it('recognizes ctrl key being pressed', done => {
    expect.assertions(8);
    const eventsCount = 2;
    let i = 0;

    ioHook.on('keydown', event => {
      expect(event).toHaveProperty('type', 'keydown');
      expect(event).toHaveProperty('ctrlKey', true);
    });
    ioHook.on('keyup', event => {
      expect(event).toHaveProperty('type', 'keyup');
      expect(event).toHaveProperty('ctrlKey', true);
      if (i === eventsCount - 1) {
        done();
      }
      i += 1;
    });
    ioHook.start();

    setTimeout(() => {
      // Make sure ioHook starts before anything gets typed
      robot.keyToggle('control', 'down');
      robot.keyTap('1');
      robot.keyToggle('control', 'up');
    }, 50);
  });

  it('recognizes meta key being pressed', done => {
    expect.assertions(8);
    const eventsCount = 2;
    let i = 0;

    ioHook.on('keydown', event => {
      expect(event).toHaveProperty('type', 'keydown');
      expect(event).toHaveProperty('metaKey', true);
    });
    ioHook.on('keyup', event => {
      expect(event).toHaveProperty('type', 'keyup');
      expect(event).toHaveProperty('metaKey', true);
      if (i === eventsCount - 1) {
        done();
      }
      i += 1;
    });
    ioHook.start();

    setTimeout(() => {
      // Make sure ioHook starts before anything gets typed
      robot.keyToggle('command', 'down');
      robot.keyTap('1');
      robot.keyToggle('command', 'up');
    }, 50);
  });
});
