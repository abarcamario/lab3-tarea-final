import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <title>Laboratorio 3 - Mario Abarca</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f6f8;
              color: #333;
              text-align: center;
              margin-top: 100px;
            }
            h1 {
              color: #007acc;
            }
            p {
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <h1>Laboratorio 3 - CI/CD en Kubernetes</h1>
          <p>Este es el desarrollo del Laboratorio 3 en Kubernetes realizado por <strong>Mario Abarca</strong></p>
        </body>
      </html>
    `;
  }

  getLabInfo(): { AMBIENTE: string | null; API_KEY: string | null } {
    return {
      AMBIENTE: process.env.AMBIENTE || null,
      API_KEY: process.env.API_KEY || null,
    };
  }
}
