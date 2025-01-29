import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-super-agent-badge',
  templateUrl: './super-agent-badge.component.html',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  styleUrls: ['./super-agent-badge.component.scss']
})
export class SuperAgentBadgeComponent implements OnInit {

  badgeForm!: FormGroup | any;
  imageUrl: any;
  isModalShown:boolean=false
  isFormValid:boolean=true

  isMenuShown:boolean=false
  @ViewChild('myModal') myModal: ElementRef | any;
  

  
  constructor() {

  }

  ngOnInit() {
        this.badgeForm = new FormGroup({
      assureur: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),

      preneur: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      policeNumber: new FormControl('', Validators.required),
      marque: new FormControl('', Validators.required),
      plaque: new FormControl('', Validators.required),
      chasis: new FormControl('', Validators.required),
      usage: new FormControl('', Validators.required),
      passagersCabine: new FormControl('', Validators.required),
      passagersPlateau: new FormControl('', Validators.required),







    });
  }

  // previewImage(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {

  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrl = e.target.result;

  //       this.badgeForm.patchValue({
  //         photo:this.imageUrl
  //       })
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  checkGlobalForm() {
    if (!this.badgeForm.valid) {
      this.isFormValid = false;
      
      // Iterate over all form controls and mark them as touched
      Object.keys(this.badgeForm.controls).forEach(field => {
        const control = this.badgeForm.get(field);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
  

  toggleMenu(){
    this.isMenuShown=!this.isMenuShown
  }


  saveAsImage() {
    const modalContent = this.myModal.nativeElement;
    html2canvas(modalContent).then(canvas => {
      
      const image = canvas.toDataURL('image/png');

      
      const link = document.createElement('a');
      link.href = image;
      link.download = `efeza-badge-${this.badgeForm.value.firstName}.png`; 
      link.click(); 
      this.toggleMenu()
    });
  }

  saveAsPDF(pageSize: string) {
    const modalContent = this.myModal.nativeElement;
  
    let pageWidth:any, pageHeight:any;
    switch (pageSize) {
      case 'A4':
        pageWidth = 297;
        pageHeight = 210;
        break;
      case 'A5':
        pageWidth = 210;
        pageHeight = 148;
        break;
      case 'A6':
        pageWidth = 150;
        pageHeight = 100;
        break;
      default:
        pageWidth = 297;
        pageHeight = 210;
        break;
    }
  
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });
  
    html2canvas(modalContent, { scale: 4 }).then(canvas => {
      const imageData = canvas.toDataURL('image/png');

      pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight);

      pdf.save(`efeza-badge-${this.badgeForm.value.firstName}.pdf`);
      this.toggleMenu()
    });
  }


  printModalContent() {
    const modalContent = this.myModal.nativeElement.innerHTML;
    const printWindow :any= window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(modalContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  
  
  
  
  
  

  closeModal(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.inner-container')) {
        this.isModalShown = false;
    }
}
}
