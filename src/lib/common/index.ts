import log4js from 'log4js';

import findUp from '@dozerg/find-up';

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

/**
 * Load a module from user workspace. If not found, return the default module provided.
 */
export function requireModule(moduleName: string, fromPath: string, defaultModule?: any) {
  const log = logger('format-imports.requireModule');
  const userModule = requireUserModule(moduleName, fromPath);
  if (userModule !== undefined) return userModule;
  log.warn('Cannot find', moduleName, 'from path:', fromPath, 'thus use pre-packed');
  return defaultModule;
}

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;
const req = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

function requireUserModule(moduleName: string, fromPath: string) {
  const log = logger('format-imports.requireUserModule');
  const [modulePath] = findUp.sync(`node_modules/${moduleName}`, {
    cwd: fromPath,
    stopAtLimit: 1,
    type: 'directory',
  });
  if (!modulePath) return undefined;
  log.debug('Found', moduleName, 'in', modulePath);
  return req(modulePath);
}
