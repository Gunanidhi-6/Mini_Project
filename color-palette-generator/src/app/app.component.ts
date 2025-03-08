import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Make sure this is a standalone component
  imports: [CommonModule], // Import CommonModule to use *ngFor and other directives
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  colors: string[] = [];

  constructor() {
    this.generateRandomColors();
  }

  generateRandomColors(): void {
    this.colors = Array.from({ length: 5 }, () => this.getRandomHexColor());
  }

  getRandomHexColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  copyToClipboard(color: string): void {
    navigator.clipboard.writeText(color).then(() => alert(`Copied: ${color}`));
  }

  async fetchPaletteFromAPI(): Promise<void> {
    try {
      const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default' }),
      });
      const data = await response.json();
      this.colors = data.result.map((rgb: number[]) =>
        `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`
      );
    } catch (error) {
      console.error('Error fetching palette:', error);
    }
  }
}
