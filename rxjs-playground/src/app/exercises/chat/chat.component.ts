import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, merge, concat, race, forkJoin, EMPTY, iif, of, combineLatest, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxw-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  msgRaw = {
    julia$: new Subject<string>(),
    georg$: new Subject<string>(),
    john$: new Subject<string>()
  };

  private msg = {
    julia$: this.msgRaw.julia$.pipe(map(msg => 'JULIA: ' + msg)),
    georg$: this.msgRaw.georg$.pipe(map(msg => 'GEORG: ' + msg)),
    john$: this.msgRaw.john$.pipe(map(msg => 'JOHN: ' + msg)),
  };

  logStream$ = new ReplaySubject<string>();

  ngOnInit() {

    /**
     * Führe die Nachrichten aller Teilnehmenden in einem Datenstrom zusammen.
     *
     * Abonniere hierfür den Datenstrom und gib die Nachrichten mit der Methode this.log() aus.
     * - merge (Turn multiple observables into a single observable.)
     * - concat (Emit values from source 1, when complete, subscribe to source 2...)
     * - race (The observable to emit first is used.)
     * - forkJoin (When all observables complete, emit the last emitted value from each.)
     */

    /**************!!**************/

     combineLatest([
        this.msg.julia$,
        this.msg.georg$,
        this.msg.john$
     ]).subscribe({                                   
      next: e => this.log(e),
      error: err => this.log('❌ ERROR: ' + err),
      complete: () => this.log('✅ All members left')
    });

    /**************!!**************/
  }

  private log(msg: any) {
    this.logStream$.next(msg.toString());
  }
}
