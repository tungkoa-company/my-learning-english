import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { randomId, testFunction } from '../../common/helper';

interface Words {
  id;
  englishWord: string;
  meaning: string;
  desc: string;
  relatedWords: string;
}
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folder: string;
  wordsList: Words[];
  editCache: { [key: string]: { edit: boolean; data: Words } } = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    console.log(randomId());
    testFunction('updateData', this);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.store
      .collection('words')
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
    this.db
      .list('/words')
      .valueChanges()
      .subscribe((res: Words[]) => {
        this.wordsList = res;
        console.log(res);
        this.updateEditCache();
      });
  }

  updateData() {
    // this.wordsList.push({ id: 1234 });
    console.log();
    this.wordsList.forEach((item) => {
      item.id = randomId();
    });
    console.log(this.wordsList);
    this.updateEditCache();
    // this.db
    //   .list('/words')
    //   .set('words', 12)
    //   .then((res) => {
    //     console.log(res);
    //   });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.wordsList.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.wordsList[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.wordsList.findIndex((item) => item.id === id);
    Object.assign(this.wordsList[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.wordsList.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
