import { VNode } from 'vue';
import 'intersection-observer';

class VisibilityObserver {
  observer: IntersectionObserver | null;
  threshold: number;
  frozen: boolean;
  oldResult: unknown;
  constructor(
    el: HTMLElement,
    arg: string,
    vnode: VNode,
    callback: (result: boolean, entry: IntersectionObserverEntry) => void
  ) {
    this.observer = null;
    this.threshold = 0;
    this.frozen = arg === 'once';
    this.create(el, vnode, callback);
  }

  create(el: HTMLElement, vnode: VNode, callback: (result: boolean, entry: IntersectionObserverEntry) => void): void {
    if (this.observer) {
      this.destroy();
    }

    this.oldResult = undefined;

    this.observer = new IntersectionObserver(
      entries => {
        let entry = entries[0];
        if (entries.length > 1) {
          const intersectingEntry = entries.find(e => e.isIntersecting);
          intersectingEntry && (entry = intersectingEntry);
        }
        if (callback) {
          const result = entry.isIntersecting && entry.intersectionRatio > this.threshold;
          if (result === this.oldResult) {
            return;
          }
          this.oldResult = result;
          callback(result, entry);
          if (result && this.frozen) {
            this.destroy();
          }
        }
      },
      {
        threshold: this.threshold
      }
    );

    vnode.context &&
      vnode.context.$nextTick(() => {
        if (this.observer) {
          (this.observer as any).observe(el) // eslint-disable-line
        }
      });
  }

  destroy(): void {
    if (this.observer) {
      (this.observer as any).disconnect(); // eslint-disable-line
      this.observer = null;
    }
  }
}

export default VisibilityObserver;
