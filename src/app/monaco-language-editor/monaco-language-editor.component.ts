import { Component, OnInit, Input } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import {ActivatedRoute} from '@angular/router';
import { LangConfig, langs } from './langs';
import { listen, MessageConnection } from 'vscode-ws-jsonrpc';
import { v4 as getUUID } from 'uuid';
import {MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices, createConnection} from 'monaco-languageclient';
const path = require('path');
const basePath = '/home/ubuntu/demo';

const ReconnectingWebSocket = require('reconnecting-websocket');
@Component({
  selector: 'app-monaco-language-editor',
  templateUrl: './monaco-language-editor.component.html',
  styleUrls: ['./monaco-language-editor.component.scss']
})


export class MonacoLanguageEditorComponent implements OnInit {
  languageId: string;
  uuid: string;
  userId: string;
  config: LangConfig;
  editorOptions;
  model: NgxEditorModel;

  constructor(private actRoute: ActivatedRoute) {
    this.languageId = this.actRoute.snapshot.params.id;
    console.log('languageId', this.languageId);
    this.uuid = 'lsp-' + getUUID();
    this.config = this.getLangConfig();
    this.editorOptions = {
      theme: 'vs',
      language: this.config.monacoLang,
      glyphMargin: true,
      lightbulb: {
        enabled: true
      },
      formatOnType: true,
      codeLens: true,
      textDocument: {
        publishDiagnostics: {
          relatedInformation: true,
          versionSupport: false,
          tagSupport: { valueSet: [1, 2] },
        }
      }
    };
    this.model = {
      value: this.config.template,
      language: this.config.monacoLang,
      uri: 'file://' + path.join(basePath, this.languageId, this.uuid, this.config.main)
    };
  }

  ngOnInit() {}

  monacoOnInit(editor) {
    // install Monaco language client services
    MonacoServices.install(editor, { rootUri: 'file://' + path.join(basePath, this.languageId , this.uuid)});
    // create the web socket
    const url = this.createUrl();
    const webSocket = this.createWebSocket(url);
    // listen when the web socket is opened
    listen({
      webSocket,
      onConnection: (connection: MessageConnection) => {
        // create and start the language client
        const languageClient = this.createLanguageClient(connection);
        const disposable = languageClient.start();
        connection.onClose(() => disposable.dispose());
      }
    });

  }

  public getLangConfig(): LangConfig {
    return langs[this.languageId];
  }
  public createUrl(): string {
    return 'ws://lsp-elb-dev-93476858.ap-south-1.elb.amazonaws.com/' + this.languageId + '?userId=' + this.userId + '&uuid=' + this.uuid + '&main=' + this.config.main ;
    // return 'ws://localhost:3000/' + this.languageId + '?userId=' + this.userId + '&uuid=' + this.uuid ;
  }

  public createLanguageClient(connection: MessageConnection): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: `${this.config.name.toUpperCase()} Client`,
      clientOptions: {
        // use a language id as a document selector
        documentSelector: [this.config.monacoLang],
        middleware: {
          workspace: {
            configuration: (
              params: any,
              token: any,
              configuration: any
            ) => {

              return Array(
                (configuration(params, token) as {}[]).length
              ).fill(
                this.config.lsp!.config !== undefined ? this.config.lsp!.config : {}
              );
            },

          }
        },
        initializationOptions: this.config.lsp!.init || {},
        synchronize: {
          configurationSection: [],
          fileEvents: null
        },

        // disable the default error handler
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.DoNotRestart
        }
      },
      // create a language client connection from the JSON RPC connection on demand
      connectionProvider: {
        get: (errorHandler, closeHandler) => {
          return Promise.resolve(createConnection( connection as any, errorHandler, closeHandler))
          ;
        }
      },
    });
  }

  public createWebSocket(socketUrl: string): WebSocket {
    const socketOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false
    };
    return new ReconnectingWebSocket.default(socketUrl, [], socketOptions);
  }


}

