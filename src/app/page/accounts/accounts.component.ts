import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalVariablesService } from '../../global-variables.service';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnWidth, ExcelService } from '../../excel.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  popuptype:any = 'bulkupload';
  data_dataSource:any;
  dataTable=[{
    NAME:'Vinoth',
    CRM_ID:	'c01',
    ACC_HCO_ID:	'a02',
    ACC_NAME:	'Mar Sleeva',
    CLUSTER:	'TN',
    HOSPITAL_NAME:	'Mar Sleeva',
    LOCATION:	'TN',
    MAIL_ID:'vinoth@gmail.com'
  }];
  apiCall:boolean = false;
  detailView:boolean = false;currentObj:any = {};
  displayedColumns_order = ["NAME",	"CRM_ID",	"ACC_HCO_ID",	"ACC_NAME",	"CLUSTER",	"HOSPITAL_NAME",	"LOCATION",	"MAIL_ID"];

  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;

  constructor(private datePipe: DatePipe,private excelService: ExcelService,route: ActivatedRoute,private router: Router,private http:HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) {
    for (let i = 2; i <= 56; i++) { this.dataTable.push(
      {
        NAME:'Contact_'+i,
        CRM_ID:	'c01'+i,
        ACC_HCO_ID:	'a02'+i,
        ACC_NAME:	'Mar Sleeva'+i,
        CLUSTER:	'TN',
        HOSPITAL_NAME:	'Mar Sleeva',
        LOCATION:	'TN',
        MAIL_ID:'mail_'+i+'_@gmail.com'
      }
    )}

      this.data_dataSource = new MatTableDataSource(this.dataTable);
    }

    ngOnInit() {
      this.tableRedraw()
    }

    ngAfterViewInit() {this.tableRedraw()}

    tableRedraw(){
        setTimeout(() => {
            this.data_dataSource.paginator = this.data_paginator;
            this.data_dataSource.sort = this.data_sort;
        });
    }


    filter:string | undefined;
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();filterValue = filterValue.toLowerCase();
      this.data_dataSource.filter = filterValue;
    }


    tabchanged(tab: number){
      this.data_dataSource.filter = '';this.filter = '';
      setTimeout(() => {this.tableRedraw()}, 1);
    }


    sampleExcel(){

      const header = this.displayedColumns_order;
      // const data = this.dataTable;

      // // Create workbook and worksheet
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('basic');
      const headerRow = worksheet.addRow(header);

      // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffffffff' },
          bgColor: { argb: '00000000' }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });


      // Add Data and Conditional Formatting
      // var eData:any = [];
      // data.forEach(d => { eData.push(Object.values(d)) });
      // worksheet.addRows(eData);

      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        fs.saveAs(blob, 'crm_upload_sample_'+this.datePipe.transform(new Date(), 'medium')+'.xlsx');
      });
    }


    public tableData: any;
    public tableTitle: any;
    public isExcelValid: boolean = true;
    public invalidRow:any ;


  public uploadData(e) {
    console.log(e.target.files[0]);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects


      this.tableData = data;
      this.tableTitle = Object.keys(this.tableData[0]);
      console.log(this.tableTitle,this.displayedColumns_order);
      // console.log(this.tableTitle == this.displayedColumns_order)

      console.log(JSON.stringify(this.tableTitle) === JSON.stringify(this.displayedColumns_order))

      var invalidRow = [];var i=0;

      if(JSON.stringify(this.tableTitle) === JSON.stringify(this.displayedColumns_order)){
        this.tableData.forEach((d:any) => {
          // console.log(d)
          var j=0;
          this.tableTitle.forEach((c:any) => {
            if(!d[this.tableTitle[j]]){
              invalidRow.push(i);
            }
            j++;
          });
          i++;
        });
        this.invalidRow = (invalidRow.filter((item, index) => invalidRow.indexOf(item) === index));
        this.isExcelValid = this.invalidRow.length==0;
        console.log(this.isExcelValid)
      }else{
        alert("Invalid Excel Format")
      }
    };
  }


}
