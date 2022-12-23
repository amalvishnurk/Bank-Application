import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  // to receive value from parent use Input() in child
  @Input() item: string | undefined
  @Input() serverMsg: string | undefined
  //  onCancel is a user defined event
  // to send value form child to parent use Output()
  @Output() onCancel = new EventEmitter()
  @Output() onRemove = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    // occur the onCancel event here using emit()
    this.onCancel.emit()
  }

  remove() {
    let deleteConfirm=true
    this.onRemove.emit([this.item,deleteConfirm])
    this.item=""
  }

}
