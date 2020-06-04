import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()

export class ExportService {
	
	constructor(){}

	exportToExcelTheInfo(json: any[], excelFileName: string): void{
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

		worksheet.A1.v = 'ID';
		worksheet.B1.v = 'NOMBRES';
		worksheet.C1.v = 'APELLIDOS';
		worksheet.D1.v = 'EMAIL';
		worksheet.E1.v = 'TELÉFONO';
		worksheet.F1.v = 'SUGERENCIA';
		worksheet.G1.v = 'LOCALIDAD';

		const workbook: XLSX.WorkBook = {
			Sheets: {'Sugerencias': worksheet},
			SheetNames: ['Sugerencias']
		}		
		const excelBuffer:any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

		// Llamar al método que guarda el fichero
		this.saveExcel(excelBuffer, excelFileName);
	}

	private saveExcel(buffer:any, fileName:string): void{
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth()+1;
		let year = date.getFullYear();

		const data:Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + ' ' + day + '-' + month + '-' + year + EXCEL_EXT);
	}
}