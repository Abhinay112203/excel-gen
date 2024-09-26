
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import moment from 'moment';
import { WorkBook, WorkSheet, read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  title = 'excel-gen';
  excelData: any[] = [];
  itemsList: string[] = [];
  mappedData: Map<string, {itemCode: string, batches: any[]}> = new Map();
  finalPricesList: {
    itemCode: string,
    itemName: string,
    price: string,
    batches: string
  }[] = [];
  exportRequired: boolean = false;
  items(evt: string) {
    let arr = evt.split("\n").filter((item) => !(new RegExp('F[0-9]')).test(item)).filter((item) => item.length > 0);
    this.itemsList = arr;
  }
  ngOnInit(): void {
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: WorkBook = read(ab, { cellDates: true, dateNF: "dd/mm/yyyy" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.excelData = (utils.sheet_to_json(ws, { header: 1, defval: null })).slice(6, -1)
      this.mappedData = new Map<string, {itemCode: string, batches: any[]}>();
      this.excelData = this.excelData.filter(item => this.itemsList.includes(item[3]));
      this.excelData.forEach((item) => {
        const itemRef = item[3];
        if (this.mappedData.has(itemRef)) {
          let existing = this.mappedData.get(itemRef);
          existing?.batches.push(item);
        } else {
          this.mappedData.set(itemRef, {itemCode: item[2], batches: [item]});
        }
      });
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
  log() {
    let final: any[] = [];
    this.mappedData.forEach((val, key) => {
      let batch = this.calculateAverage(val.batches);
      try {
        final.push({
          itemCode: val.itemCode,
          itemName: key,
          price: Number(Math.round(batch.price)),
          batches: String(val.batches.length)
        });
      } catch (error) {
        console.log(error);
      }
    });
    this.finalPricesList = [...final];
    if (this.exportRequired) {
      this.toJson(final);
    }
  }

  toJson(arr: any[]) {
    const fileName = 'test.xlsx';
    const ws: WorkSheet = utils.json_to_sheet(arr);
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'test');
    writeFile(wb, fileName);
  }

  calculateAverage(batches: any[]) {
    let res = batches.reduce((ex, batch) => {
      let bP = batch[18];
      let bQ = batch[13];
      let bM = batch[20];
      let pDays = batch[11] ? Number(batch[11]) : 0;
      if (pDays < 0) {
        return ex;
      } else {
        return {
          price: ((ex.price * ex.qty) + (bQ * (bP * (1 + (bM / 100))))) / (ex.qty + bQ),
          qty: ex.qty + bQ
        }
      }
    }, {
      price: 0,
      qty: 0
    });
    return res;
  }

}
