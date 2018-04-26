import {Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel} from '../../../models/bug.model';
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
    issues: []
  };
  newBugForm: FormGroup = new FormGroup({
    'summary': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    'description': new FormControl(null, [Validators.required, Validators.minLength(10)])
  });

  priorities: string[] = [
    'Fault (non-service related fault, such as spelling mistake, text error etc)',
    'Minor (non-critical error, that does not significantly affect the service)',
    'Major (significant error leading to service malfunction)',
    'Critical (error leading to service stop)'
  ];

  priority = 'Select one';
  loading = false;
  isSendedRequest = false;
  private newBug = {
    summary: '',
    description: '',
    kind: 1
  };
  private id: number;

  @ViewChild('uploader') _uploader: TemplateRef<any>;
  @ViewChild('uploader_container', {read: ViewContainerRef}) _uploader_container;
  @ViewChildren('uploader_field') _uploader_field: QueryList<any>;

  search(event): void {
    const title = event.target.value;
    if (title === '' || title === null || title === undefined) {
      this.similarBugs = {
        issues: []
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
    const formData = new FormData();
    formData.append('file', this._uploader_field.first.nativeElement.files[0]);
    formData.append('issue_id', '1');
    this._service.uploadFile(formData).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
    // if (this.newBugForm.valid) {
    //   this.similarBugs = {
    //     issues: []
    //   };
    //   this.isSendedRequest = true;
    //   this.newBug = {
    //     summary: this.newBugForm.value.summary,
    //     description: this.newBugForm.value.description,
    //     kind: 1
    //   };
    //   this._service.create(this.newBug).then((res) => {
    //     this.isSendedRequest = false;
    //     this.popup.showSuccess('Bug report created');
    //     this.id = res.id;
    //     // this.router.navigate(['../'], {relativeTo: this.activatedRoute})
    //   }).catch(err => {
    //     console.error(err);
    //   })
    // }
  }

  uploadFile() {
    this._uploader_container.createEmbeddedView(this._uploader);
    //this._service.uploadFile(this.id)
  }

  cancel(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  setTag(event): void {
    this.priority = event;
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

  ngOnInit() {
    this._uploader_container.createEmbeddedView(this._uploader);
  }
}
