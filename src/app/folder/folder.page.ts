import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
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
      .subscribe((res) => console.log(res));
  }
}
