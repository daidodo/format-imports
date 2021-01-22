export function formatSource(fileName: string, sourceText: string) {
  if (fileName === 'abc') return fileName + 's';
  return sourceText;
}
