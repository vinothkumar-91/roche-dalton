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
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-potential',
  templateUrl: './potential.component.html',
  styleUrls: ['./potential.component.css']
})
export class PotentialComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  popuptype:any = '';
  data_dataSource:any;
  dataTable=[{
    "Sr. No.": "1",
    "Territory ID": "IN_CEP_PKAT_KOC_2 -Nisamudeen",
    "Cluster": "Kerala",
    "CRM ID": "A-2101-10350717",
    "HCP Name": "Rony Benson",
    "FIELD5": "Account 1",
    "Account HCO ID": "A-2101-10339398",
    "Account Name": "Mar Sleeva",
    "Workdays/week": 5,
    "Avg No. of patients seen in a full workday": 10,
    "Share of New patients": "10%",
    "Share of old patients": "90%",
    "Breast": "15%",
    "Lung": "12%",
    "GI": "",
    "UC": "1%",
    "NHL": "2%",
    "CLL": "1%",
    "Others": "70%",
    "Total": 200,
    "Old": 180,
    "New": 20,
    "OOP": "100%",
    "Defence & ECHS":"100%",
    "CGHS":"100%",
    "Railways":"100%",
    "PSU":"100%",
    "ESI":"100%",
    "State Govt":"100%",
    "OOP (Affording >15 lakhs)": "10%"}];
  apiCall:boolean = false;
  detailView:boolean = false;currentObj:any = { "ppInput": { "trId": "IN_CEP_PKAT_KOC_2 -Nisamudeen", "account": { "hcoId": "A-2101-10339398", "name": "Mar Sleeva", "wd": 5, "avgPS": 10, "shNP": 10 }, "sops": { "Breast": 15, "Lung": 12, "GI": 0, "UC": 1, "NHL": 2, "CLL": 1 ,'FL 1':2,'FL':2,'HCC':2    }, "sofSOPS": { "oop": 100, "def": 0, "cghs": 0, "railways": 0, "psu": 0, "esi": 0,"stGvt": 0 },"apSOF": { "oop": 10, "def": 100, "cghs": 100, "railways": 100, "psu": 100, "esi": 100,"stGvt": 0 },"cf": { "oop": 75, "def": 100, "cghs": 100, "railways": 100, "psu": 100, "esi": 90,"stGvt": 100 }, "psmtotal": 200, "psmold": 180, "psmnew": 20 } };

  displayedColumns_order = [
    "Sr. No.",
    "Cluster",
    "Territory ID",
    "CRM ID",
    "HCP Name",
    "FIELD5",
    "Account HCO ID",
    "Account Name",
    "Workdays/week",
    "Avg No. of patients seen in a full workday",
    "Share of New patients",
    "Share of old patients",
    "Breast",
    "Lung",
    "GI",
    "UC",
    "NHL",
    "CLL",
    "Others",
    "Total",
    "Old",
    "New",
    "OOP",
    "Defence & ECHS",
    "CGHS",
    "Railways",
    "PSU",
    "ESI",
    "State Govt",
    "OOP (Affording >15 lakhs)"];


  detailTable:any=[
    {class:"other-info",name:"SoF split of patients",fields:[
      {"field":"OOP",value:"",id:"fid5-1"},
      {"field":"Defence & ECHS",value:"",id:"fid5-2"},
      {"field":"CGHS",value:"",id:"fid5-3"},
      {"field":"Railways",value:"",id:"fid5-4"},
      {"field":"PSU",value:"",id:"fid5-5"},
      {"field":"ESI",value:"",id:"fid5-6"},
      {"field":"State Govt",value:"",id:"fid5-7"}
    ]},
    {class:"other-info",name:"% of affording patients by SoF",fields:[
      {"field":"OOP",value:"",id:"fid5-1"},
      {"field":"Defence & ECHS",value:"",id:"fid5-2"},
      {"field":"CGHS",value:"",id:"fid5-3"},
      {"field":"Railways",value:"",id:"fid5-4"},
      {"field":"PSU",value:"",id:"fid5-5"},
      {"field":"ESI",value:"",id:"fid5-6"},
      {"field":"State Govt",value:"",id:"fid5-7"}
    ]},
    {class:"other-info",name:"Eligible patients by SoF",fields:[
      {"field":"OOP",value:"",id:"fid5-1"},
      {"field":"Defence & ECHS",value:"",id:"fid5-2"},
      {"field":"CGHS",value:"",id:"fid5-3"},
      {"field":"Railways",value:"",id:"fid5-4"},
      {"field":"PSU",value:"",id:"fid5-5"},
      {"field":"ESI",value:"",id:"fid5-6"},
      {"field":"State Govt",value:"",id:"fid5-7"}
    ]},
    {class:"other-info",name:"Affording patients by SoF",fields:[
      {"field":"OOP",value:"",id:"fid5-1"},
      {"field":"Defence & ECHS",value:"",id:"fid5-2"},
      {"field":"CGHS",value:"",id:"fid5-3"},
      {"field":"Railways",value:"",id:"fid5-4"},
      {"field":"PSU",value:"",id:"fid5-5"},
      {"field":"ESI",value:"",id:"fid5-6"},
      {"field":"State Govt",value:"",id:"fid5-7"}
    ]},
    {class:"other-info",name:"Affording patients by SoF - Post correction",fields:[
      {"field":"OOP",value:"",id:"fid5-1"},
      {"field":"Defence & ECHS",value:"",id:"fid5-2"},
      {"field":"CGHS",value:"",id:"fid5-3"},
      {"field":"Railways",value:"",id:"fid5-4"},
      {"field":"PSU",value:"",id:"fid5-5"},
      {"field":"ESI",value:"",id:"fid5-6"},
      {"field":"State Govt",value:"",id:"fid5-7"}
    ]},]




  formSet:any={};
  // = {"ppInput":{"trId":"IN_CEP_PKAT_KOC_2 -Nisamudeen","account":{"hcoId":"A-2101-10339398","name":"Mar Sleeva","wd":5,"avgPS":10,"shNP":0.1},"sops":{"Breast":0.15,"Lung":0.12,"GI":0.0,"UC":0.01,"NHL":0.02,"CLL":0.01},"sofSOPS":{"oop":1,"def":0,"cghs":0,"railways":0,"psu":0,"esi":0},"apSOF":{"oop":0.1,"stGvt":0}}}
  // [
    // {
    //   class:"basic-info", name:"Basic Info",fields:[
    //   {field:"Territory ID",value:"",id:"fid1-1"},
    //   {field:"CRM ID",value:"",id:"fid1-2"},
    //   {field:"HCP Name",value:"",id:"fid1-3"},
    //   {field:"Account HCO ID",value:"",id:"fid1-4"},
    //   {field:"Account Name",value:"",id:"fid1-5"},
    //   {field:"Workdays/ week",value:"",id:"fid1-6"},
    //   {field:"Avg No. of patients seen in a full workday",value:"",id:"fid1-7"},
    //   {field:"Share of New patients",value:"",id:"fid1-8"},
    //   {field:"Share of old patients - O/P",value:"",id:"fid1-9"},
    //   {field:"Split of Hematology patients",value:"",id:"fid1-10"},
    //   {field:"Affording patients by SoF",value:"",id:"fid1-11"},
    //   {field:"Affording patients by SoF - Post correction",value:"",id:"fid1-12"}
    //   ]
    // },
    // {class:"other-info",
    //   name:"#unique patients amongst all affording patients: Correction factor at cluster - SoF level to account for mutliple HCP consultations",fields:[
    //   {"field":"OOP",value:"",id:"fid2-1"},
    //   {"field":"Defence & ECHS",value:"",id:"fid2-2"},
    //   {"field":"CGHS",value:"",id:"fid2-3"},
    //   {"field":"Railways",value:"",id:"fid2-4"},
    //   {"field":"PSU",value:"",id:"fid2-5"},
    //   {"field":"ESI",value:"",id:"fid2-6"},
    //   {"field":"State Govt",value:"",id:"fid2-7"}
    // ]},
    // {class:"other-info",name:"% Split of patients seen",
    // fields:[
    // {field:"Breast",value:"",id:"fid3-1"},
    // {field:"Lung",value:"",id:"fid3-2"},
    // {field:"GI",value:"",id:"fid3-3"},
    // {field:"UC",value:"",id:"fid3-4"},
    // {field:"NHL",value:"",id:"fid3-5"},
    // {field:"CLL",value:"",id:"fid3-6"},
    // {field:"Others - O/P",value:"",id:"fid3-7"}
  // ]},
  // {class:"other-info",name:"Patients seen/ month",fields:[
  //   {"field":"Total - O/P",value:"",id:"fid4-1"},
  //   {"field":"Old - O/P",value:"",id:"fid4-2"},
  //   {"field":"New - O/P",value:"",id:"fid4-3"}
  // ]},
  // {class:"other-info",name:"Split of patients seen/ month",fields:[
  //   {"field":"Breast",value:"",id:"fid3-1"},
  //   {"field":"Lung",value:"",id:"fid3-2"},
  //   {"field":"GI",value:"",id:"fid3-3"},
  //   {"field":"UC",value:"",id:"fid3-4"},
  //   {"field":"NHL",value:"",id:"fid3-5"},
  //   {"field":"CLL",value:"",id:"fid3-6"},
  //   {"field":"Others - O/P",value:"",id:"fid3-7"}
  // ]},

  // {class:"other-info",name:"Split of Breast patients/ month",fields:[
  //   {"field":"HER2 Neo Adj",value:"",id:"fid3-1"},
  //   {"field":"HER2 Adj",value:"",id:"fid3-2"},
  //   {"field":"HER2 mBC",value:"",id:"fid3-3"},
  //   {"field":"HER2 eBC",value:"",id:"fid3-4"},
  //   {"field":"TNBC",value:"",id:"fid3-5"}
  // ]},
  // {class:"other-info",name:"Split of Lungs patients/ month",fields:[
  //   {"field":"1L NSCLC",value:"",id:"fid3-1"},
  //   {"field":"2L NSCLC",value:"",id:"fid3-2"},
  //   {"field":"1L ALK+LC",value:"",id:"fid3-3"},
  //   {"field":"2L ALK+LC",value:"",id:"fid3-4"}
  // ]},

  // ]



  @ViewChild(MatPaginator) data_paginator!: MatPaginator | null;
  @ViewChild(MatSort) data_sort!: MatSort | null;

  constructor(private datePipe: DatePipe,private excelService: ExcelService,route: ActivatedRoute,private router: Router,private http:HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) {
    for (let i = 2; i <= 56; i++) { this.dataTable.push(
      {
        "Sr. No.": String(i),
        "Cluster":"Kerala",
        "Territory ID": String(i)+"IN_CEP_PKAT_KOC_2 -Nisamudeen",
        "CRM ID": String(i)+"A-2101-10350717",
        "HCP Name": String(i)+"Rony Benson",
        "FIELD5": String(i)+"Account 1",
        "Account HCO ID": String(i)+"A-2101-10339398",
        "Account Name": String(i)+"Mar Sleeva",
        "Workdays/week": 5,
        "Avg No. of patients seen in a full workday": 10,
        "Share of New patients": "10%",
        "Share of old patients": "90%",
        "Breast": "15%",
        "Lung": "12%",
        "GI": "",
        "UC": "1%",
        "NHL": "2%",
        "CLL": "1%",
        "Others": "70%",
        "Total": 200,
        "Old": 180,
        "New": 20,
        "OOP": "100%",
        "Defence & ECHS":"100%",
        "CGHS":"100%",
        "Railways":"100%",
        "PSU":"100%",
        "ESI":"100%",
        "State Govt":"100%",
        "OOP (Affording >15 lakhs)": "10%"}
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


    dynamicExcel() {

      // const title = 'User Details';
      const header = this.displayedColumns_order;
      const data = this.dataTable;

      // // Create workbook and worksheet
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Potential');

      // // Add Row and formatting
      // const titleRow = worksheet.addRow([title]);
      // titleRow.font = {
      //   name: 'Comic Sans MS',
      //   family: 4,
      //   size: 16,
      //   underline: 'double',
      //   bold: true
      // };
      // titleRow.alignment = { horizontal: 'center' };
      // worksheet.addRow([]);
      // const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);

      // worksheet.mergeCells('A1:D2');

      // // Blank Row
      // worksheet.addRow([]);

      // Add Header Row
      const headerRow = worksheet.addRow(header);

      // Cell Style : Fill and Border

      headerRow.eachCell((cell, number) => {
        cell.fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'ffffffff' },bgColor: { argb: '00000000' }};
        cell.border = {top: { style: 'thin' },left: { style: 'thin' },bottom: { style: 'thin' },right: { style: 'thin' }};
      });


      // Add Data and Conditional Formatting
      var eData:any = [];
      data.forEach(d => { eData.push(Object.values(d)) });
      worksheet.addRows(eData);
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        fs.saveAs(blob, 'potential_export_'+this.datePipe.transform(new Date(), 'medium')+'.xlsx');
      });
   }


   sampleExcel(){

    const header1 = ["CLUSTER","TERRITORY_ID","HOSPITAL_NAME","CRM_ID","HCP_NAME","ACC_HCO_ID","ACC_NAME","WORKDAYS_BY_WEEK","AVG_NO_PAT_SEEN_FULL_WORKDAY","SHARE_OF_NEW_PATIENTS","OOP","DEFENCE_ECHS","CGHS","RAILWAYS","PSU","ESI","OOP_AFFORDING","STATE_GOVT_AFFORDING"];

    const header2 = ["Breast","Lung","GI","UC","NHL","CLL"];

    // // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet1 = workbook.addWorksheet('basic');
    const worksheet2 = workbook.addWorksheet('% Split of patients seen');
    const headerRow1 = worksheet1.addRow(header1);
    const headerRow2 = worksheet2.addRow(header2);

    // Cell Style : Fill and Border
    headerRow1.eachCell((cell, number) => {
      cell.fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'ffffffff' },bgColor: { argb: '00000000' }};
      cell.border = {top: { style: 'thin' },left: { style: 'thin' },bottom: { style: 'thin' },right: { style: 'thin' }};
    });
    headerRow2.eachCell((cell, number) => {
      cell.fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'ffffffff' },bgColor: { argb: '00000000' }};
      cell.border = {top: { style: 'thin' },left: { style: 'thin' },bottom: { style: 'thin' },right: { style: 'thin' }};
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, 'potential_entry_upload_sample_'+this.datePipe.transform(new Date(), 'medium')+'.xlsx');
    });
  }


   public tableData: any;
   public tableTitle: any;
   public isExcelValid: boolean = true;
   public invalidRow:any ;



 public uploadData(event:any) {

  const header = {
    'basic':["CLUSTER","TERRITORY_ID","HOSPITAL_NAME","CRM_ID","HCP_NAME","ACC_HCO_ID","ACC_NAME","WORKDAYS_BY_WEEK","AVG_NO_PAT_SEEN_FULL_WORKDAY","SHARE_OF_NEW_PATIENTS","OOP","DEFENCE_ECHS","CGHS","RAILWAYS","PSU","ESI","OOP_AFFORDING","STATE_GOVT_AFFORDING"],
    '% Split of patients seen':["Breast","Lung","GI","UC","NHL","CLL"]
  };


   const target: DataTransfer = <DataTransfer>(<unknown>event.target);
  //  if (target.files.length !== 1) {
  //    throw new Error('Cannot use multiple files');
  //  }
   const reader: FileReader = new FileReader();
   reader.readAsBinaryString(target.files[0]);
   reader.onload = (e: any) => {
     const binarystr: string = e.target.result;
     const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

    //  const wsname: string = wb.SheetNames[0];
    var invalidRow = [];
     wb.SheetNames.forEach((s:any) => {
      // console.log(s)
      const ws: XLSX.WorkSheet = wb.Sheets[s];
      // console.log(XLSX.utils.sheet_to_json(ws))
      const data = XLSX.utils.sheet_to_json(ws);

      // console.log(data,!data.length)
      if(!data.length){alert('Invalid Excel');return}

      this.tableData = data;
      // console.log(Object.keys(this.tableData[0]))
      this.tableTitle = Object.keys(this.tableData[0]);
      var i=0;


        if(JSON.stringify(this.tableTitle) === JSON.stringify(header[s])){
          this.tableData.forEach((d:any) => {
            var j=0;
            this.tableTitle.forEach((c:any) => {
              if(!d[this.tableTitle[j]]){
                invalidRow.push(i);

                // console.log(invalidRow)
              }j++;
            });
            i++;
          });
          // console.log(invalidRow)
          this.invalidRow = (invalidRow.filter((item, index) => invalidRow.indexOf(item) === index));
          // console.log(this.invalidRow)
          if(this.invalidRow.length!=0){this.isExcelValid = false};
          // console.log(this.isExcelValid)

        }else{
          alert("Invalid Excel Format")
        }


     });





   };
 }


 closePopup(e){
  this.newItemEvent.emit('');
}

}
