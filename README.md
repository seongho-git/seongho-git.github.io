# Seongho Kim - Portfolio Website

This is a personal portfolio website built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

## Project Structure

The project follows a modular Next.js App Router structure:

```
.
├── app/
│   ├── layout.tsx       # Root layout (metadata, fonts, theme provider)
│   ├── page.tsx         # Main landing page (composed of sections)
│   └── deadlines/       # Deadlines page
├── components/
│   ├── sections/        # Modular sections for the landing page
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Publications.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── ui/              # Reusable UI components (buttons, cards, etc.)
│   ├── site-header.tsx  # Navigation header
│   └── theme-toggle.tsx # Dark mode toggle
├── lib/
│   ├── data.ts             # CV data (Personal info, Publications, etc.)
│   └── conference-data.ts  # Conference deadlines data
└── public/              # Static assets (images, PDFs)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seongho-git/seongho-git.github.io.git
   cd seongho-git.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also view the conference deadlines at [http://localhost:3000/deadlines](http://localhost:3000/deadlines).

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
pnpm build
```

The output will be in the `out` directory (static export).

## Customization

- **Content**: Edit `lib/data.ts` to update your personal info, publications, experience, etc.
- **Deadlines**: Edit `lib/conference-data.ts` to update the conference list.
- **Styling**: Tailwind CSS classes are used throughout the components. Configuration is in `tailwind.config.ts`.

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (Icons)
- [shadcn/ui](https://ui.shadcn.com/) (UI Components)
