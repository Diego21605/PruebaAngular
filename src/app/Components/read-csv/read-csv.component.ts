import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from 'src/app/Services/MessagesService/messages.service';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.css']
})

export class ReadCSVComponent implements OnInit {
  
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  files: any[] = [];
  records: any[] = [];
  dataFile : any = [];

  multiAxisData: any;
  multiAxisOptions: any;

  constructor(private msj : MessagesService){}

  ngOnInit(): void {
  }

  //on file drop handler
  onFileDropped($event: any) {
    this.prepareFilesList($event)
    this.uploadListener($event);
  }

  // handle file from browsing
  fileBrowseHandler(files: any | unknown) {
    this.prepareFilesList(files.target.files);
    setTimeout(() => {
      this.uploadListener(files);
    }, 3000);
  }

  // Delete file from files list
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      this.msj.warningMessage("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  // Simulate the upload process
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  // onvert Files list to normal array list
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  // format bytes
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  uploadListener($event: any): void {
    let files = $event.srcElement.files;  
    if (this.isValidCSVFile(files[0])) {    
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);    
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
      };
      reader.onerror = () => {
        this.msj.warningMessage('Error is occured while reading file!');
      };  
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {  
    let csvArr : any = [];
    let tempdata : any [] = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord[6] == 'Guam') console.log(curruntRecord)
      tempdata.push({
        state : curruntRecord[6],
        state2: curruntRecord[5],
        totalDeaths : curruntRecord.reduce((a : any, b : any, index : number) => {
          if (curruntRecord[5] == '') {
            if (index > 13) a += parseInt(b);
          } else {
            if (index > 23) a += parseInt(b);
          }
          return a;
        }, 0),
        population : curruntRecord[5] == '' ? curruntRecord[12] : curruntRecord[13],
      });
    }
    csvArr = this.chargeArray(tempdata);
    this.llenarGraficaPedidos(csvArr.map((y: { totalDeaths: any; }) => y.totalDeaths), csvArr.map((y: { state: any; }) => y.state));
    return csvArr;  
  }

  chargeArray(data : any){
    let finalData : any [] = [];
    data.forEach((x: any) => {
      if (!finalData.map(y => y.state).includes(x.state)) {
        let _totalDeaths = data.filter((y: { state: any; }) => y.state == x.state).reduce((a: any,b: { totalDeaths: any; }) => a + parseInt(b.totalDeaths), 0);
        let _population = data.filter((y: { state: any; }) => y.state == x.state).reduce((a: any,b: { population: any; }) => a + parseInt(b.population), 0);
        let csvRecord: any = {
          state : x.state,
          totalDeaths : _totalDeaths,
          population : _population,
          diff : _population - _totalDeaths,
        }  
        finalData.push(csvRecord);
      }
    });
    console.log(finalData)
    return finalData;
  }

  stateMostDeaths(){
    let data = [...this.records];
    data.sort((a,b) => Number(b.totalDeaths) - Number(a.totalDeaths))
    return {
      name : data[0].state,
      total : data[0].totalDeaths
    }
  }

  stateFewerDeaths(){
    let data = [...this.records];
    data.sort((a,b) => Number(a.totalDeaths) - Number(b.totalDeaths))
    return {
      name : data[0].state,
      total : data[0].totalDeaths
    }
  }

  stateMotsAffected(){
    let data = [...this.records];
    data.sort((a,b) => Number(a.diff) - Number(b.diff))
    return {
      name : data[0].state,
      total : data[0].totalDeaths,
      population : data[0].population,
      diff : data[0].diff,
    }
  }
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.fileDropEl.nativeElement.value = "";  
    this.records = [];  
  }

  color() : string [] {
    let colores : string [] = [];
    for (let i = 0; i < 58; i++) {
      colores.push("#"+((1<<24)*Math.random()|0).toString(16).substring(0, 4));    
    }
    return colores;
  }

  colorBackground() : string [] {
    let colores : string [] = [];
    for (let i = 0; i < 58; i++) {
      colores.push("#"+((1<<24)*Math.random()|0).toString(16).substring(0, 4) + "2");    
    }
    return colores;
  }

  // 
  llenarGraficaPedidos(data : number [], headers : string []){
    this.multiAxisData = {
      labels: headers,
      datasets: [
        {
          data: data,
          backgroundColor: this.color(),
          hoverBackgroundColor: this.color()
        }
      ]
    };

    this.multiAxisOptions = {
      plugins: {
        legend: { labels: {  color: this.color(), font: { size: 18 } } },
        tooltip: { titleFont: { size: 25, }, bodyFont: { size: 20 }, },
      },
    };
  }
}