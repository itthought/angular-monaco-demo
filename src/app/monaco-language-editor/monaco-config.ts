import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import {Uri} from "vscode";

export const MonacoConfig: NgxMonacoEditorConfig = {
    baseUrl: 'assets', // configure base path for monaco editor
    defaultOptions: { scrollBeyondLastLine: false,
      minimap: { enabled: false }
    }, // pass default options to be used
    onMonacoLoad: monacoOnLoad
};

export function monacoOnLoad() {
    // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
    console.log((<any>window).monaco);

    // register Monaco languages
   /* monaco.languages.register({
        id: 'json',
        extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
        aliases: ['JSON', 'json'],
        mimetypes: ['application/json'],
    });*/

    // register Monaco languages
    monaco.languages.register({
        id: 'java',
        extensions: ['.java', '.class'],
        aliases: ['java', 'JDK', 'Java'],
        mimetypes: ['text/x-typescript'],
    });
   /* const uri = Uri.parse('a://b/foo.json');
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });*/


}
