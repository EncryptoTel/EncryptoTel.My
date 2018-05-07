import {Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel, Priority} from '../../../models/bug.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FadeAnimation} from '../../../shared/functions';
import {PopupServices} from '../../../services/popup.services';


@Component({
  selector: 'bugs-create-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class BugsCreateComponent implements OnInit {
  constructor(private _service: BugsServices,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private popup: PopupServices) {
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  title = 'Bugs Create';
  similarBugs: BugModel = {
    data: [],
    last_page: 0,
    per_page: 0
  };
  newBugForm: FormGroup = new FormGroup({
    'summary': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    'description': new FormControl(null, [Validators.required, Validators.minLength(10)])
  });

  priorities: Priority[] = [];

  priority: Priority = {
    name: '[Select one]',
    id: undefined,
    description: ''
  };
  loading = false;
  isSendedRequest = false;
  isValidPriority = false;
  private newBug = {
    summary: '',
    description: '',
    priority: 0,
    kind: 1
  };

  @ViewChild('uploader') _uploader: TemplateRef<any>;
  @ViewChild('uploader_container', {read: ViewContainerRef}) _uploader_container;
  @ViewChildren('uploader_field') _uploader_field: QueryList<any>;

  search(event): void {
    const title = event.target.value;
    if (title === '' || title === null || title === undefined) {
      this.similarBugs = {
        data: [],
        last_page: 0,
        per_page: 0
      }
    } else {
      this.loading = true;
      this._service.search(title).then((res: BugModel) => {
        this.similarBugs = res;
        this.loading = false;
      }).catch(err => {
        console.error(err);
      })
    }
  }

  create(): void {
    this.newBugForm.controls.summary.markAsTouched();
    this.newBugForm.controls.description.markAsTouched();
    if (this.newBugForm.valid && this.priority.id) {
      this.similarBugs = {
        data: [],
        last_page: 0,
        per_page: 0
      };
      this.isSendedRequest = true;
      this.newBug = {
        summary: this.newBugForm.value.summary,
        description: this.newBugForm.value.description,
        priority: this.priority.id,
        kind: 1
      };
      this._service.create(this.newBug).then((res) => {
        let fileCounter = 0;
        this._uploader_field.forEach(el => {
          if (el.nativeElement.files.length > 0) {
            fileCounter += 1;
            return;
          }
        });
        if (fileCounter > 0) {
          this.uploadFiles(res.id);
        } else {
          this.isSendedRequest = false;
          this.popup.showSuccess('Bug report created');
          this.router.navigate(['../'], {relativeTo: this.activatedRoute})
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }

  createAttachInput(uploader_field, pseudo_uploader_field) {
    if (uploader_field.files[0].size >= 10485760) {
      this.popup.showError('File must be less then 10mb');
      uploader_field.value = null;
    } else {
      this._uploader_container.createEmbeddedView(this._uploader);
      uploader_field.style.display = 'none';
      pseudo_uploader_field.style.display = 'none';
    }
  }

  cancelAttach(uploader_field, uploader_ref) {
    uploader_field.value = null;
    uploader_ref.style.display = 'none';
  }

  uploadFiles(id: string) {
    let counter = 0;
    this._uploader_field.forEach(el => {
      for (let i = 0; i < el.nativeElement.files.length; i++) {
        const formData = new FormData();
        formData.append('issue_id', id);
        formData.append('file', el.nativeElement.files[i]);
        this._service.uploadFile(formData).then(() => {
          counter += 1;
          if (counter >= el.nativeElement.files.length) {
            this.isSendedRequest = false;
            this.popup.showSuccess('Bug report created');
            this.router.navigate(['../'], {relativeTo: this.activatedRoute})
          }
        }).catch(err => {
          console.error(err);
          this.isSendedRequest = false;
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  setPriority(event): void {
    this.priority.id = event.id;
    this.isValidPriority = true;
  }

  vote(event, searchField): void {
    this._service.vote(event).then(() => {
      this._service.search(searchField.value).then((res: BugModel) => {
        this.similarBugs = res;
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
  }

  report(event, searchField): void {
    this._service.report(event).then(() => {
      this._service.search(searchField.value).then((res: BugModel) => {
        this.similarBugs = res;
      }).catch(err => {
        console.error(err);
      });
    })
  }

  getBug(bug): void {
    this.router.navigate(['bugs', bug.id])
  }

  getPriorities() {
    this._service.getPriorities().then(res => {
      this.priorities = res.priorities;
    }).catch(err => {
      console.error(err);
    })
  }

  ngOnInit() {
    this._uploader_container.createEmbeddedView(this._uploader);
    this.getPriorities();
  }
}
