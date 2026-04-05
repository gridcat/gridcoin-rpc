type Constructor = abstract new (...args: any[]) => object;

export function applyMixins(derivedCtor: Constructor, constructors: Constructor[]): void {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== 'constructor') {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
            || Object.create(null),
        );
      }
    });
  });
}
