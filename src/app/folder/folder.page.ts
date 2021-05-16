import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { randomId, testFunction } from '../../common/helper';

interface Words {
  _id?: string;
  englishWord: string;
  meaning?: string;
  desc?: string;
  relatedWords?: string;
  examples?: string;
  remembered: boolean;
  editFlg?: boolean;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folder: string;
  wordsList: Words[];
  // words list when edit flag
  private demoWord: Words = {
    _id: '',
    englishWord: 'english word',
    meaning: '',
    desc: '',
    relatedWords: '',
    examples: '',
    remembered: false,
    editFlg: true,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    // subscription
    this.db
      .list('/words')
      .valueChanges()
      .subscribe((res: Words[]) => {
        this.wordsList = res;
        this.setIdForWords();
      });
  }

  private setIdForWords() {
    this.wordsList.forEach((item) => {
      if (!item._id) {
        item._id = randomId();
      }
    });
  }

  updateWordsToFirebase() {
    this.wordsList.forEach((word) => {
      word.editFlg = false;
    });
    this.db
      .list('/')
      .set('words', this.wordsList)
      .then((res) => {
        console.log(res);
      });
  }

  addWord() {
    this.wordsList.push(this.demoWord);
    this.wordsList = Object.assign([], this.wordsList);
    console.log(this.wordsList);
    this.setIdForWords();
  }

  modifyWordsList() {
    this.wordsList.forEach((word) => {
      word.editFlg = true;
    });
  }
}
