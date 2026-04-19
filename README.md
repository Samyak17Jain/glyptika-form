# Glyptika PIQ Form

This project is a React + Vite web app for filling out a Personal Information Questionnaire (PIQ) and exporting it as a PDF.

It provides a multi-step form for:

- personal information
- educational information
- co-curricular activities
- college societies
- projects or internship experience
- sports
- final review before export

The app also lets the user upload a photo and generates a formatted PDF version of the questionnaire from the entered data.

## Tech Stack

- React
- Vite
- plain CSS
- client-side PDF generation using `html2canvas` and `jsPDF` loaded from CDN

## Project Structure

```text
src/
  components/   UI components such as forms, review, and PDF template
  hooks/        form state management
  styles/       global styling
  utils/        validation and PDF generation helpers
```

## How To Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

After starting the server, open the local URL shown in the terminal. In most cases for Vite, it will be:

```text
http://localhost:5173
```

## Other Useful Commands

Run the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## How The App Works

1. The app starts from `src/main.jsx`.
2. `src/App.jsx` controls the step-by-step questionnaire flow.
3. `src/hooks/useFormData.js` stores and updates all form state.
4. Validation helpers in `src/utils/validators.js` check required fields.
5. `src/components/PDFTemplate.jsx` renders the hidden printable layout.
6. `src/utils/pdfGenerator.js` captures that layout and downloads the PDF.

## Notes

- The PDF is generated on the client side in the browser.
- PDF generation depends on loading CDN scripts for `html2canvas` and `jsPDF`, so an internet connection is needed for PDF export.
- The main required fields before download are the user's name and email.

## Development Status

This repository is set up as a frontend-only application. It does not require a backend server or database to run locally.
