import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalsService } from 'src/app/modals/modals.service';
import { KnowledgeBase } from 'src/app/models/knowledgeBase.model';
import { KnowledgesService } from 'src/app/services/knowledges.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Knowledge } from 'src/app/models/knowledge.model';
import piakb from 'src/assets/files/pia_knowledge-base.json';
import { AppDataService } from 'src/app/services/app-data.service';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  base: KnowledgeBase = null;
  knowledges: Knowledge[] = [];
  entryForm: FormGroup;
  editMode: 'edit' | 'new';
  showForm: boolean = false;
  selectedKnowledgeId: number;
  categories: string[] = [];
  filters: string[] = [];
  data: any;
  itemsSelected: string[] = [];

  constructor(
    private _modalsService: ModalsService,
    private _knowledgesService: KnowledgesService,
    private _appDataService: AppDataService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    let sectionId = parseInt(this.route.snapshot.params.id, 10);
    this._knowledgesService.selected = sectionId;
    this.base = new KnowledgeBase();
    this.base
      .get(sectionId)
      .then(() => {
        // GET Knowledges entries from selected base
        this._knowledgesService.getEntries(this.base.id).then((result: Knowledge[]) => {
          this.knowledges = result;
        });
      })
      .catch(() => {});

    // Init Form
    this.entryForm = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      description: new FormControl()
    });

    // get default categories
    for (var item of piakb) {
      if (!this.categories.includes(item.category)) {
        this.categories.push(item.category);
      }
    }
    // get default filters
    for (var item of piakb) {
      if (!this.filters.includes(item.filters) && item.filters !== '') {
        this.filters.push(item.filters);
      }
    }
    console.log(this.filters);

    this.data = this._appDataService.dataNav;
  }

  /**
   * Create a new Knowledge entry
   */
  onSubmit() {
    let entry = new Knowledge();

    entry.name = this.entryForm.value.name;
    entry.slug = slugify(entry.name);
    entry.category = this.entryForm.value.category;
    entry.description = this.entryForm.value.description;

    entry.create(this._knowledgesService.selected).then((result: Knowledge) => {
      this.knowledges.push(result);
      this.entryForm.reset();
      this.showForm = false;
      this.editEntry(result.id); // Go to edition mode
    });
  }

  /**
   * Open form in edition mode, with preset values
   * @param id Knowledge entry's id
   */
  editEntry(id) {
    let tempk = new Knowledge();
    tempk
      .find(id)
      .then((result: Knowledge) => {
        // SET FORM CONTROL

        this.entryForm.controls['name'].setValue(result.name);
        this.entryForm.controls['category'].setValue(result.category);
        this.entryForm.controls['description'].setValue(result.description);
        this.itemsSelected = [];
        if (result.items) {
          this.itemsSelected = result.items;
        }

        this.selectedKnowledgeId = result.id;
        // SHOW FORM
        this.editMode = 'edit';
        this.showForm = true;
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * One shot update
   */
  focusOut() {
    let entry = new Knowledge();
    entry.get(this.selectedKnowledgeId).then(() => {
      // set new properties values
      entry.name = this.entryForm.value.name;
      entry.description = this.entryForm.value.description;
      entry.slug = slugify(entry.name);
      entry.category = this.entryForm.value.category;
      entry.description = this.entryForm.value.description;
      entry.items = this.itemsSelected;
      // Update object
      entry.update().then(() => {
        // Update list
        let index = this.knowledges.findIndex(e => e.id === entry.id);
        if (index !== -1) {
          this.knowledges[index] = entry;
        }
      });
    });
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.itemsSelected.push(e.target.value);
    } else {
      this.itemsSelected.forEach(item => {
        let index = this.itemsSelected.indexOf(item);
        this.itemsSelected.splice(index, 1);
      });
    }
    this.focusOut();
  }
}
