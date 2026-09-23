// Image loading utility. Eases the process of loading image files so
// that they can be used within the game, with a simple caching layer
// so the same image is never fetched twice.
class ResourceLoader {
  constructor() {
    this.cache = new Map();
    this.readyCallbacks = [];
  }

  // Accepts a single URL or an array of URLs.
  load(urlOrArr) {
    const urls = Array.isArray(urlOrArr) ? urlOrArr : [urlOrArr];
    urls.forEach((url) => this._load(url));
  }

  _load(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const img = new Image();
    this.cache.set(url, false);

    img.onload = () => {
      this.cache.set(url, img);
      if (this.isReady()) {
        this.readyCallbacks.forEach((fn) => fn());
      }
    };

    // Without this, a 404'd or otherwise failed image leaves its cache
    // entry stuck at `false` forever, so isReady() never returns true
    // and the game silently never starts. Surface the failure instead.
    img.onerror = () => {
      console.error(
        `Resources: failed to load image "${url}". The game cannot start until this is fixed.`
      );
    };

    img.src = url;
    return undefined;
  }

  // Grabs a reference to a previously loaded image.
  get(url) {
    return this.cache.get(url);
  }

  isReady() {
    return [...this.cache.values()].every(Boolean);
  }

  // Registers a callback to run once every requested image has loaded.
  onReady(fn) {
    this.readyCallbacks.push(fn);
  }
}

export const Resources = new ResourceLoader();
