import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { Movement } from '../../entities/movement.entity';
import { Category } from '../../entities/category.entity';

@Component({
  selector: 'app-view-movement',
  templateUrl: './view-movement.component.html',
  styleUrls: ['./view-movement.component.css'],
})
export class ViewMovementComponent {
  movements: Movement[] = [];
  balance: number = 0; 
  categories: Category[] = []; 
  loading = false;
  
  filtro = {
    numeroMovimenti: 5,
    dataInizio: '',
    dataFine: '',
  };

  selectedCategory: string | null = '';
  filterMode: 'date' | 'category' = 'category'; 
  
  setFilterMode(mode: 'date' | 'category') {
    this.filterMode = mode;
}
  ngOnInit() {
    this.loadMovements();
    this.categoryService.listCategory().subscribe((categories) => {
      this.categories = categories;
    });
    
  }

  constructor(private movementService: MovementService, private categoryService: CategoryService) {}

  
  loadMovements() {
    const { numeroMovimenti, dataInizio, dataFine } = this.filtro;
    this.loading = true;
    if (dataInizio && dataFine) {
      this.movementService.listMovementsByDateRange(numeroMovimenti, dataInizio, dataFine).subscribe((data) => {
        this.movements = data.movements;
      });
      this.loading = false;
    } else if (this.selectedCategory) {
      this.movementService.listMovementsByCategory(this.selectedCategory, numeroMovimenti).subscribe((data) => {
        this.movements = data.movements;
      });
      this.loading = false;
    } else {
      this.movementService.listMovementsWithBalance(numeroMovimenti).subscribe((data) => {
        this.movements = data.movements;
        this.balance = data.balance; 
      });
      this.loading = false;
    } 
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      this.filtro.dataInizio = '';
      this.filtro.dataFine = '';
    }
  }

  clearCategory() {
    this.selectedCategory = null;
  }

  exportMovements() {
    const { numeroMovimenti, dataInizio, dataFine } = this.filtro;

    if (dataInizio && dataFine) {
      const formattedStartDate = new Date(dataInizio).toISOString().split('T')[0]; 
      const formattedEndDate = new Date(dataFine).toISOString().split('T')[0];    
      this.movementService.exportMovementsByDateRangeToCSV(numeroMovimenti, formattedStartDate, formattedEndDate).subscribe((csvData) => {
        this.downloadCSV(csvData);
      });
    } else if (this.selectedCategory) {
      this.movementService.exportMovementsByCategoryToCSV(numeroMovimenti, this.selectedCategory).subscribe((csvData) => {
        this.downloadCSV(csvData);
      });
    } else {
      this.movementService.exportMovementsToCSV(numeroMovimenti).subscribe((csvData) => {
        this.downloadCSV(csvData);
      });
    }
  }
  
  downloadCSV(csvData: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movimenti.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  applyFilters() {
    this.loadMovements();
  }
}
