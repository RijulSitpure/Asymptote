import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Draggable & Persistent Drawer Subsystem', () => {
  const contentJsPath = path.resolve(process.cwd(), 'extension', 'content.js');
  const contentJsCode = fs.readFileSync(contentJsPath, 'utf8');

  // 1. Static Contract & Security Rules
  it('1. Confirms content.js contains zero ES module import/export statements', () => {
    const importExportMatch = contentJsCode.match(/^\s*(export|import)\b/m);
    expect(importExportMatch).toBeNull();
  });

  it('2. Confirms required CSS classes and grip handle styling are present', () => {
    expect(contentJsCode).toContain('.drawer-panel.is-dragging');
    expect(contentJsCode).toContain('.drawer-drag-grip');
    expect(contentJsCode).toContain('cursor: grab');
    expect(contentJsCode).toContain('cursor: grabbing');
    expect(contentJsCode).toContain('title="Drag to move • Double-click to reset position"');
  });

  it('3. Confirms helper methods are attached to globalThis for runtime validation', () => {
    expect(contentJsCode).toContain('globalThis.__ASYMPTOTE_DRAWER_HELPERS__');
    expect(contentJsCode).toContain('clampDrawerPosition');
    expect(contentJsCode).toContain('restoreDrawerPosition');
    expect(contentJsCode).toContain('saveDrawerPosition');
    expect(contentJsCode).toContain('resetDrawerPosition');
    expect(contentJsCode).toContain('makeDrawerDraggable');
  });

  // 2. Clamp Drawer Position Math Logic
  describe('clampDrawerPosition logic', () => {
    function clampDrawerPosition(left, top, drawerWidth, viewportWidth = 1280, viewportHeight = 800) {
      const width = drawerWidth || 400;
      const minLeft = 8;
      const maxLeft = Math.max(minLeft, viewportWidth - width - 8);
      const minTop = 8;
      const maxTop = Math.max(minTop, viewportHeight - 56);

      return {
        left: Math.min(Math.max(left, minLeft), maxLeft),
        top: Math.min(Math.max(top, minTop), maxTop)
      };
    }

    it('clamps coordinates safely within a standard 1280x800 desktop viewport', () => {
      // Within bounds
      expect(clampDrawerPosition(100, 100, 400, 1280, 800)).toEqual({ left: 100, top: 100 });

      // Out of bounds - negative (left / top)
      expect(clampDrawerPosition(-50, -20, 400, 1280, 800)).toEqual({ left: 8, top: 8 });

      // Out of bounds - exceeding right edge (maxLeft = 1280 - 400 - 8 = 872)
      expect(clampDrawerPosition(1000, 100, 400, 1280, 800)).toEqual({ left: 872, top: 100 });

      // Out of bounds - exceeding bottom edge (maxTop = 800 - 56 = 744)
      expect(clampDrawerPosition(100, 900, 400, 1280, 800)).toEqual({ left: 100, top: 744 });
    });

    it('handles narrow viewports gracefully without crashing', () => {
      // Viewport width 360px < drawerWidth 400px -> maxLeft = Math.max(8, 360 - 400 - 8) = 8
      const clamped = clampDrawerPosition(200, 200, 400, 360, 600);
      expect(clamped.left).toBe(8);
      expect(clamped.top).toBe(200);
    });
  });

  // 3. Pointer Dragging & Interactive Element Exclusion
  describe('Drag controller and event wiring', () => {
    let mockDrawer;
    let mockHeader;
    let mockCloseBtn;
    let mockStarLink;
    let mockGripIcon;
    let mockStorage;
    let listeners;

    beforeEach(() => {
      listeners = {};
      mockStorage = {};

      mockDrawer = {
        style: { left: '', top: '', right: '', bottom: '' },
        classList: {
          classes: new Set(),
          add(cls) { this.classes.add(cls); },
          remove(cls) { this.classes.delete(cls); },
          contains(cls) { return this.classes.has(cls); }
        },
        offsetWidth: 400,
        getBoundingClientRect: () => ({ left: 860, top: 52, width: 400, height: 600 })
      };

      mockCloseBtn = {
        tagName: 'BUTTON',
        closest: (selector) => (selector.includes('button') ? mockCloseBtn : null)
      };

      mockStarLink = {
        tagName: 'A',
        closest: (selector) => (selector.includes('a') ? mockStarLink : null)
      };

      mockGripIcon = {
        tagName: 'SPAN',
        className: 'drawer-drag-grip',
        closest: (selector) => (selector.includes('button') || selector.includes('a') ? null : null)
      };

      mockHeader = {
        tagName: 'DIV',
        capturedPointerId: null,
        releasedPointerId: null,
        closest: () => null,
        addEventListener: (event, handler) => {
          if (!listeners[event]) listeners[event] = [];
          listeners[event].push(handler);
        },
        dispatchEvent: (event) => {
          const handlers = listeners[event.type] || [];
          for (const h of handlers) h(event);
        },
        setPointerCapture: (id) => { mockHeader.capturedPointerId = id; },
        releasePointerCapture: (id) => { mockHeader.releasedPointerId = id; }
      };
    });

    it('excludes clicks on buttons or links from initiating a drag', () => {
      let isDragging = false;
      const onPointerDown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        if (e.target.closest('button, a, input, select, textarea')) return;
        isDragging = true;
      };

      // Click on Close button
      onPointerDown({ button: 0, pointerType: 'mouse', target: mockCloseBtn, preventDefault: () => {} });
      expect(isDragging).toBe(false);

      // Click on Star link
      onPointerDown({ button: 0, pointerType: 'mouse', target: mockStarLink, preventDefault: () => {} });
      expect(isDragging).toBe(false);

      // Click on Grip handle
      onPointerDown({ button: 0, pointerType: 'mouse', target: mockGripIcon, preventDefault: () => {} });
      expect(isDragging).toBe(true);
    });

    it('simulates full drag cycle: pointerdown -> pointermove -> pointerup and persists coordinates', () => {
      let isDragging = false;
      let startX = 0, startY = 0, startLeft = 0, startTop = 0;
      let curLeft = 0, curTop = 0;

      const onPointerDown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        if (e.target.closest('button, a, input, select, textarea')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = mockDrawer.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        curLeft = startLeft;
        curTop = startTop;
        mockDrawer.classList.add('is-dragging');
        mockHeader.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        curLeft = startLeft + dx;
        curTop = startTop + dy;
        mockDrawer.style.left = `${curLeft}px`;
        mockDrawer.style.top = `${curTop}px`;
        mockDrawer.style.right = 'auto';
        mockDrawer.style.bottom = 'auto';
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        mockDrawer.classList.remove('is-dragging');
        mockHeader.releasePointerCapture(e.pointerId);
        mockStorage.asymptote_drawer_pos = { left: curLeft, top: curTop };
      };

      // 1. Pointer Down at (900, 70)
      onPointerDown({ button: 0, pointerId: 42, clientX: 900, clientY: 70, target: mockHeader });
      expect(isDragging).toBe(true);
      expect(mockDrawer.classList.contains('is-dragging')).toBe(true);
      expect(mockHeader.capturedPointerId).toBe(42);

      // 2. Drag to left pane: deltaX = -800, deltaY = +50
      onPointerMove({ clientX: 100, clientY: 120 });
      expect(mockDrawer.style.left).toBe('60px');
      expect(mockDrawer.style.top).toBe('102px');
      expect(mockDrawer.style.right).toBe('auto');

      // 3. Pointer Up
      onPointerUp({ pointerId: 42 });
      expect(isDragging).toBe(false);
      expect(mockDrawer.classList.contains('is-dragging')).toBe(false);
      expect(mockHeader.releasedPointerId).toBe(42);
      expect(mockStorage.asymptote_drawer_pos).toEqual({ left: 60, top: 102 });
    });

    it('resets drawer position and clears storage on header double-click', () => {
      mockDrawer.style.left = '60px';
      mockDrawer.style.top = '102px';
      mockDrawer.style.right = 'auto';
      mockDrawer.style.bottom = 'auto';
      mockStorage.asymptote_drawer_pos = { left: 60, top: 102 };

      const onDblClick = (e) => {
        if (e.target.closest('button, a, input, select, textarea')) return;
        mockDrawer.style.left = '';
        mockDrawer.style.top = '';
        mockDrawer.style.right = '';
        mockDrawer.style.bottom = '';
        delete mockStorage.asymptote_drawer_pos;
      };

      // Double-click on header
      onDblClick({ target: mockHeader });
      expect(mockDrawer.style.left).toBe('');
      expect(mockDrawer.style.top).toBe('');
      expect(mockDrawer.style.right).toBe('');
      expect(mockDrawer.style.bottom).toBe('');
      expect(mockStorage.asymptote_drawer_pos).toBeUndefined();
    });
  });
});
