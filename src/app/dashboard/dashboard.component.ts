import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetectingService} from "../detecting.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgxSpinnerModule],
  providers: [DetectingService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private fileUploadService: DetectingService, private spinner: NgxSpinnerService) {
  }

  languages = [
    {name: 'Mandarin Chinese', value: 'zh'},
    {name: 'Spanish', value: 'es'},
    {name: 'English', value: 'en'},
    {name: 'Hindi', value: 'hi'},
    {name: 'Arabic', value: 'ar'},
    {name: 'Bengali', value: 'bn'},
    {name: 'Portuguese', value: 'pt'},
    {name: 'Russian', value: 'ru'},
    {name: 'Urdu', value: 'ur'},
    {name: 'Indonesian / Malay', value: 'id'},
  ];

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  nameOfPlant: ''
  descriptionOfPlant: ''
  selectedLanguage: string = 'en';
  translatedText: ''


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
    this.fileUploadService.generateData(data).subscribe(response => {
      console.log(response)
      this.descriptionOfPlant = response.response
    })
  }

  translateTheFile(data: any, language: any) {
    this.spinner.show()
    this.fileUploadService.translate(data, language).subscribe(response => {
      this.spinner.hide();
      this.translatedText = response.response;
    })
  }

  readTheText(data: any, language: any) {
    this.spinner.show()
    this.fileUploadService.readText(data, language).subscribe(response => {
      this.spinner.hide()
    })
  }

click() {
  this.fileUploadService.getData().subscribe(response => {
    console.log(response)
  })

}
}
