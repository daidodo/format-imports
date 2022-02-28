import log4js from 'log4js';

export function logger(category?: string) {
  return log4js.getLogger(category);
}

/**
 * Infer the function type of a class constructor.
 *
 * @example
 * ```
 *     class A {
 *       constructor(a: numbber, b?: string) {}
 *     }
 *
 *     type F = CtorToFun<typeof A>; // expect (a: numbber, b?: string) => A. Please note 'new' is removed.
 * ```
 */
type CtorToFun<T extends { new (...args: any[]): unknown }> = T extends {
  new (...args: infer A): infer B;
}
  ? (...args: A) => B
  : unknown;

/**
 * Return a function to construct a class object without 'new'.
 *
 * @example
 * ```
 *     class A {
 *       constructor(a: numbber, b: string) {}
 *     }
 *
 *     const AA = noNew(A);
 *     const a = AA(1, 'abc'); // same as new A(1, 'abc');
 * ```
 */
export function noNew<T extends { new (...args: any[]): unknown }>(c: T) {
  return new Proxy(c, {
    apply(target, args, argumentsList) {
      return new target(...argumentsList);
    },
  }) as CtorToFun<T>;
}
