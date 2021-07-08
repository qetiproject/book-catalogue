import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services';

@Injectable()
export class AddBookStorage {
  lastThreeSearches: string[] = [];

  constructor(private storage: StorageService) {}

  addToLastSearches(name: string) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      this.storage.set('lastThreeSearches', this.lastThreeSearches);
      return;
    }
    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];

    this.storage.set('lastThreeSearches', this.lastThreeSearches);
  }

  restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }
}
