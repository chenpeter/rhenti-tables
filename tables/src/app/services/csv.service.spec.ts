// import { TestBed } from '@angular/core/testing';

// import { CsvService } from './csv.service';

// describe('CsvService', () => {
//   let service: CsvService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CsvService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  parseCsvFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = lines.slice(1)
          .filter(line => line.trim()) // Remove empty lines
          .map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
              obj[header] = values[i]?.trim();
              return obj;
            }, {} as any);
          });
          
        resolve(data);
      };
      
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}