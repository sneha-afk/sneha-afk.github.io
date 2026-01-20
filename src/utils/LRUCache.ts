export class LRUCache<T> {
  private cache = new Map<string, T>();
  private order: string[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  /**
   * Retrieves a value from the cache and marks it as recently used
   * @param key - The (string) key of the item to retrieve
   */
  get(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.moveToFront(key);
    }
    return value;
  }

  /**
   * Stores a value in the cache, evicting the least recently used item if at capacity
   * @param key - The (string) key of the item to store
   * @param value - The value to store
   */
  set(key: string, value: T): void {
    const exists = this.cache.has(key);
    this.cache.set(key, value);

    if (exists) {
      this.moveToFront(key);
    } else {
      this.order.push(key);
      if (this.cache.size > this.maxSize) {
        const oldest = this.order.shift()!;
        this.cache.delete(oldest);
      }
    }
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
    this.order.length = 0;
  }

  size(): number {
    return this.cache.size;
  }

  private moveToFront(key: string): void {
    const idx = this.order.indexOf(key);
    if (idx > -1) {
      this.order.splice(idx, 1);
    }
    this.order.push(key);
  }
}
