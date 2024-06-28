import { JsonPipe, KeyValuePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import moment from 'moment';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-att',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './att.component.html',
  styleUrl: './att.component.scss'
})
export class AttComponent {
  xmll?: any;
  fn: any;
  update(a: any) {
    this.xmll = a;
  }
  log(a: any) {
    const p: xml2js.Parser = new xml2js.Parser();
    p.parseString(this.xmll, (err, result) => {
      if (err) {
        throw err;
      }
      let map = new Map<string, string[]>();
      let list: any[] = result.ArrayOfEmployeeList.EmployeeList;
      list.forEach((item) => {
        let dateParts = (<string>item.AttendanceDate[0]).split('T');
        if (map.has(dateParts[0])) {
          let times = map.get(dateParts[0]);
          let times1 = times && times.length ? times[0] : null;
          if (times1) {
            let timea = moment(times1, "HH:mm:ss", true)
            let timeb = moment(dateParts[1], "HH:mm:ss", true)
            let yes = timeb.isBefore(timea);
            if (yes) {
              times?.unshift(dateParts[1])
            }
          } else {
            times?.push(dateParts[1]);
          }
        } else {
          map.set(dateParts[0], [dateParts[1]])
        }
      });
      this.fn = map;
      console.log(map)
      let finalmap = new Map<string, { start: { time: string, valid: boolean }, end: { time: string, valid: boolean } }[]>();
      map.forEach((item) => {
        item.forEach((time) => {
          let timea = moment("09:30:00", "HH:mm:ss", true)
          let timeb = moment(time, "HH:mm:ss", true)
          let yes = timeb.isBefore(timea);
        })
      })
    });
  }
}
