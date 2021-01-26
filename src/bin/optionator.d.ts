declare module 'optionator' {
  type Results = {
    parseArgv: (input: string[]) => any;
    generateHelp: (helpOptions?: any) => string;
  };

  export default function optionator(options: any): Results;
}
