import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { GeneralService } from '../../../../core/services/general.service';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-lookup',
    templateUrl: './lookup.component.html',
    standalone:true,
    imports:[
      ReactiveFormsModule,
      CommonModule
    ],
    styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
    adminMenus: any = [];
    showAutoComplete = false;
    selectedItem: any;
    // test = false;
    input: any;
    items: any;
    search: any = new FormControl('');
    isLoading = false;
    @Input() option = 'autocomplete';
    lookup: any = new FormControl('');
    @Output() selectedItemEvent: any = new EventEmitter<any>();
    @Input() url = '';
    @Input() itemsLabel = '';
    @Input() lookupLabel = '';
    // private searchQuerySubject = new Subject<string>();

    constructor(
        private generalService: GeneralService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.search.value = '';
        if (this.option === 'autocomplete') {
            this.initAutocomplete();
        }
    }

    inputFocused(select: boolean) {
        this.showAutoComplete = true;
        // this.input = document.getElementById("menu_group");
    }

    selectItem(item: any) {
        // this.test = true;
        console.log('Boossss', this.selectedItem);
        this.selectedItem = item;
        this.selectedItemEvent.emit(item);
        this.showAutoComplete = false;
    }

    focusOut() {
        console.log('Focusout');
    }

    deselect() {
        this.selectedItem = null;
        this.showAutoComplete = true;
        this.lookup.value = '';
        this.selectedItemEvent.emit(null);
    }

    close() {
        this.showAutoComplete = false;
    }



    initAutocomplete() {
        if (!this.items && this.search.value === '') {
            this.isLoading = true;

            this.generalService
                .DoAutocomplete(this.url, '')
                .subscribe((value: string) => {
                    this.items = value;
                    this.isLoading = false;
                    console.log('itemss', this.items);
                });
        }
    }

    DoAutocomplete() {
        this.isLoading = true;

        if (this.search.value) {
            this.generalService
                .DoAutocomplete(this.url, this.search.value)
                .subscribe((value: string) => {
                    this.items = value;
                    this.isLoading = false;
                    console.log(!this.search.value);
                });
        } else {
            this.generalService
                .DoAutocomplete(this.url, '')
                .subscribe((value: string) => {
                    this.items = value;
                    this.isLoading = false;
                    console.log('itemss', this.items);
                });
        }
    }

    //       onInputChange(event: any) {
    //   const search = event.target.value;
    //   this.searchQuerySubject.next(search);
    // }

    DoLookup() {
        if (this.lookup.value !== '') {
            this.isLoading = true;
            this.generalService
                .DoLookup(this.url, this.lookup.value)
                .subscribe({
                    next: (item:any) => {
                        this.selectItem(item);
                        // this.selectedItem = client.objects[0];
                        this.isLoading = false;
                        console.log('Loookkss ', this.selectedItem);
                    },
                    error: (msg:any) => {
                        const notification = {
                            title: '',
                            type: 'failed',
                            message: 'Something went wrong, please retry again',
                        };
                        // this.store.dispatch(new OpenDialog(notification));
                    },
                });
        } else {
            const notification = {
                title: '',
                type: 'failed',
                message: 'Please Enter a value',
            };
            // this.store.dispatch(new OpenDialog(notification));
        }
    }

    onChangeTest() {
        console.log('333 444 555');
    }
}