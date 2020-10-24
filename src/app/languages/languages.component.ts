import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  Languages = [
    {
      id: 'c',
      name: 'C programming',
      description: 'C Programming.'
    },
    {
      id: 'cpp',
      name: 'CPP programming',
      description: 'CPP Programming.'
    },
    {
      id: 'java',
      name: 'Java Programming',
      description: 'Java Programming.'
    },
    {
      id: 'python',
      name: 'Python2 programming',
      description: 'Python Programming.'
    },
    {
      id: 'python3',
      name: 'Python3 programming',
      description: 'Python3.'
    }
    ,
    {
      id: 'typescript',
      name: 'typescript programming',
      description: 'TypeScript.'
    },
    {
      id: 'go',
      name: 'GoLang programming',
      description: 'goLang.'
    },
    {
      id: 'php',
      name: 'PHP programming',
      description: 'PHP.'
    },
    {
      id: 'lua',
      name: 'Lua programming',
      description: 'Lua.'
    },
    {
      id: 'ruby',
      name: 'Ruby programming',
      description: 'Ruby.'
    }/*,
    {
      id: 'rust',
      name: 'Rust programming',
      description: 'Rust.'
    }*/
  ];

  constructor() { }

  ngOnInit() {
  }

}
