import { ModuleExportName } from 'typescript';

import type { NameBinding } from '../types';

export function getNameBinding(specifier: {
  propertyName?: ModuleExportName;
  name: ModuleExportName;
  isTypeOnly?: boolean;
}): NameBinding {
  const { propertyName, isTypeOnly } = specifier;
  const { text: name } = specifier.name;
  const prop = propertyName?.text;
  return prop && prop !== name
    ? { aliasName: name, propertyName: prop, isTypeOnly }
    : { propertyName: name, isTypeOnly };
}
