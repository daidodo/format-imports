import log4js from 'log4js';

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) throw Error(message ?? `Assert failed, condition = ${condition}`);
}

export function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error(message ?? `Assert Non-Null failed, value = ${value}`);
  }
}

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
