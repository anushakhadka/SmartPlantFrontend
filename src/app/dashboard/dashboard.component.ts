import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private fileUploadService: DetectingService) {
  }

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  nameOfPlant: ''
  descriptionOfPlant: ''




  onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Display image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.fileUploadService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log(response)
          this.nameOfPlant = response.image_url;
          console.log(this.nameOfPlant)
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );

      console.log(this.selectedFile)
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  getWelcome() {
    this.fileUploadService.getData().subscribe(response => {
      console.log(response)
    })
  }

  getDataOfPlant(data: any) {
    this.fileUploadService.generateData(data).subscribe(response=>{
      console.log(response)
      this.descriptionOfPlant = response.response
    })
  }

}
