# 📁 Fokuslah Quiz - Project Structure

> **Detailed breakdown of the Fokuslah Quiz project file organization and architecture.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)

![Project Structure](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G6q1Cu7D3kN50vvDgdjF0OMB3QotM6.png)

---

## 🚀 **Development Workflow**

### **Getting Started**

\`\`\`bash

# Clone the repository

git clone https://github.com/your-username/fokuslah-quiz.git

# Navigate to project directory

cd fokuslah-quiz

# Install dependencies with Yarn

yarn install

# Start development server

yarn dev
\`\`\`

### **Development Server**

\`\`\`bash

# Start development server

yarn dev

# Server will be available at:

# Local: http://localhost:3000

# Network: http://[your-ip]:3000

\`\`\`

---

## 🛠️ Technical Architecture

### **State Management**

- **React Context API** - Single source of truth for all quiz state
- **QuizContext** - Centralized provider with comprehensive functionality
- **No localStorage** - Pure in-memory state for optimal performance
- **Type safety** - Full TypeScript coverage with strict mode

### **Component Architecture**

- **Functional components** - Modern React with hooks
- **Context consumption** - Direct context usage without custom hooks
- **Prop drilling elimination** - Clean component tree with context
- **Separation of concerns** - UI components focused on presentation

### **Performance Optimizations**

- **Font optimization** - Montserrat with display swap and preloading
- **Component memoization** - Optimized re-renders with useCallback
- **Context optimization** - Minimal re-renders with proper state structure
- **Bundle optimization** - Tree shaking and code splitting

### **Security & Validation**

- **Input validation** - All user inputs are sanitized and validated
- **State guards** - Multiple protection layers against invalid states
- **NaN protection** - Robust timer validation with fallbacks
- **Pause protection** - Prevents cheating during pause states

---

### **📁 Feature Directories**

#### **`/assets`**

- **Purpose**: Static assets and media files
- **Contents**: Images, icons, and other static resources
- **Usage**: Referenced throughout the application for UI elements
- **Examples**: Logo images, background graphics, icon sets

#### **`/onboarding`**

- **Purpose**: User onboarding flow and welcome screens
- **Contents**: Welcome components and introduction logic
- **Features**: Language selection, feature overview, getting started
- **Components**: OnboardingWelcome, LanguageSelector

#### **`/quiz`**

- **Purpose**: Core quiz functionality and components
- **Contents**: Question display, answer handling, quiz logic
- **Features**: Question cards, option selection, progress tracking
- **Components**: QuestionCard, QuizApp main orchestrator

#### **`/result`**

- **Purpose**: Results display and analytics
- **Contents**: Score calculation, performance analysis, feedback
- **Features**: Results summary, skill analysis, recommendations
- **Components**: ResultsPage, analytics dashboard

---

## 🧩 **`/components` - Reusable UI Components**

| Component        | File              | Purpose                   | Features                                            |
| ---------------- | ----------------- | ------------------------- | --------------------------------------------------- |
| **Progress Bar** | `ProgressBar.tsx` | Visual progress indicator | Question tracking, score display, completion status |
| **Timer**        | `Timer.tsx`       | Real-time countdown       | Pause/resume, visual warnings, timeout handling     |

### **Component Architecture**

- **Functional Components** - Modern React with hooks
- **TypeScript** - Full type safety and IntelliSense
- **Tailwind CSS** - Utility-first styling approach
- **Context Integration** - Direct context consumption for state

---

## 🔄 **`/context` - State Management**

| File              | Purpose      | Description                                        |
| ----------------- | ------------ | -------------------------------------------------- |
| `QuizContext.tsx` | Global State | Centralized quiz state management with Context API |

### **Context Features**

- **Quiz State Management** - Current question, answers, score tracking
- **Language Support** - Multi-language state and switching
- **Timer Integration** - Time tracking and timeout handling
- **Pause/Resume Logic** - Quiz state preservation during breaks
- **Auto-submission** - Smart timeout handling with random wrong answers

### **Context Provider Usage**

\`\`\`typescript
// Wrap your app with QuizProvider
import { QuizProvider } from "@/context/QuizContext"

export default function App() {
return (
<QuizProvider>
<YourComponents />
</QuizProvider>
)
}

// Use context in components
import { useQuizContext } from "@/context/QuizContext"

function YourComponent() {
const { quizState, answerQuestion, nextQuestion } = useQuizContext()
// Component logic here
}
\`\`\`

---

## 📚 **`/lib` - Data Layer**

| File               | Content       | Language           | Questions            |
| ------------------ | ------------- | ------------------ | -------------------- |
| `quiz-english.ts`  | Question Data | English 🇬🇧         | 5 SPM Math questions |
| `quiz-malaysia.ts` | Question Data | Bahasa Malaysia 🇲🇾 | 5 SPM Math questions |

### **Data Structure**

\`\`\`typescript
interface Question {
id: number
question: string
options: string[]
correctAnswer: number
explanation: string
difficulty: "easy" | "medium" | "hard"
motivationalText: string
statisticText: string
timeLimit: number // in seconds
}
\`\`\`

### **Question Categories**

- **Algebra & Equations** - Linear equations, basic algebra
- **Geometry & Measurement** - Area calculations, geometric formulas
- **Functions & Graphs** - Quadratic functions, coordinate geometry
- **Logarithms** - Advanced mathematical concepts

---

## 🏷️ **`/types` - Type Definitions**

| File             | Purpose          | Contents                                       |
| ---------------- | ---------------- | ---------------------------------------------- |
| `quiz.type.d.ts` | TypeScript Types | Interface definitions for quiz data structures |

### **Key Interfaces**

\`\`\`typescript
interface Question {
id: number
question: string
options: string[]
correctAnswer: number
explanation: string
difficulty: "easy" | "medium" | "hard"
motivationalText: string
statisticText: string
timeLimit: number
}

interface QuizState {
currentQuestion: number
answers: (number | null)[]
score: number
isCompleted: boolean
startTime: Date
endTime?: Date
isPaused: boolean
timeRemaining: number
}

type Language = "my" | "en"
\`\`\`

---

## 🛠️ **`/utils` - Utility Functions**

| File        | Purpose         | Functions                                            |
| ----------- | --------------- | ---------------------------------------------------- |
| `format.ts` | Data Formatting | Time formatting, score calculations, text processing |

### **Utility Functions**

\`\`\`typescript
// Time formatting
function formatTime(seconds: number): string

// Score calculations  
function calculatePercentage(score: number, total: number): number

// Random answer selection for timeouts
function getRandomWrongAnswer(correctAnswer: number, totalOptions: number): number

// Text processing and validation
function validateInput(input: string): boolean
\`\`\`

---

## 🎯 **Architecture Principles**

### **📁 Folder Organization**

- **Feature-based** - Grouped by functionality in `/app` directory
- **Component-based** - Reusable UI elements in `/components`
- **Scalable** - Easy to add new features and components
- **Separation of Concerns** - Clear boundaries between different layers

### **🔗 Dependencies Flow**

\`\`\`
app/ (pages & features)
↓
components/ (reusable UI)
↓  
context/ (state management)
↓
lib/ (data) + utils/ (helpers)
↓
types/ (TypeScript definitions)
\`\`\`

### **📦 Module Strategy**

- **Barrel Exports** - Clean import statements
- **Tree Shaking** - Optimized bundle size
- **Code Splitting** - Route-based lazy loading
- **Type Safety** - Comprehensive TypeScript coverage

---

## 🎨 Styling & Design

### **Design System**

- **Colors**: Blue-purple gradient theme with semantic color coding
- **Typography**: Montserrat font family with 6 weight variants (300-800)
- **Spacing**: Consistent 8px grid system
- **Shadows**: Layered depth with subtle elevation

### **Custom Typography Classes**

\`\`\`css
.quiz-title /_ Main headings - 4xl, bold, tracking-tight _/
.quiz-subtitle /_ Secondary text - xl, medium, gray-600 _/
.quiz-question /_ Question text - xl, semibold, gray-800 _/
.quiz-option /_ Answer options - medium, gray-700 _/
.quiz-button /_ Interactive buttons - semibold, tracking-wide _/
.quiz-stats /_ Numerical displays - bold, tabular-nums _/
\`\`\`

### **Responsive Breakpoints**

- **Mobile**: 320px - 768px (Primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+ (Enhanced experience)

---

## 🚀 **Development Workflow**

### **Adding New Features**

1. **Define Types** - Add interfaces in `/types/quiz.type.d.ts`
2. **Create Data** - Add content in `/lib` if needed
3. **Build Components** - Develop UI in `/components`
4. **Update Context** - Modify state management in `/context`
5. **Create Features** - Add functionality in `/app` directories

### **File Naming Conventions**

- **Components** - PascalCase (e.g., `ProgressBar.tsx`)
- **Pages** - lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Data Files** - kebab-case (e.g., `quiz-english.ts`)
- **Types** - descriptive with extension (e.g., `quiz.type.d.ts`)

---

## 📊 **Project Metrics**

### **File Distribution**

- **App Directory**: 4 core files + 4 feature folders
- **Components**: 2 reusable UI components
- **Context**: 1 centralized state manager
- **Data**: 2 language-specific question sets
- **Types**: 1 comprehensive type definition file
- **Utils**: 1 utility function collection

### **Code Organization**

- **TypeScript Coverage**: 100%
- **Component Reusability**: High
- **State Management**: Centralized with Context API
- **Data Separation**: Language-based question sets
- **Type Safety**: Comprehensive interface definitions

---

## 🔍 **Quick Navigation Guide**

### **🎨 UI Development**

- Start with `/components` for reusable elements
- Check `/app` directories for feature-specific implementations
- Reference `/types` for component prop interfaces

### **📊 Data Management**

- Question content in `/lib/quiz-*.ts`
- State logic in `/context/QuizContext.tsx`
- Type definitions in `/types/quiz.type.d.ts`

### **🛠️ Utilities & Helpers**

- Formatting functions in `/utils/format.ts`
- Validation logic in utility files
- Shared constants and configurations

---

## 📝 **Development Notes**

### **Best Practices**

- **Import Organization** - Group imports by source (React, libraries, local)
- **Component Structure** - Props interface, component, export
- **State Updates** - Use proper TypeScript typing for state changes
- **Error Handling** - Implement proper error boundaries and validation

### **Performance Considerations**

- **Code Splitting** - Lazy load heavy components
- **Memoization** - Use React.memo for expensive renders
- **Context Optimization** - Minimize context re-renders
- **Bundle Analysis** - Regular bundle size monitoring

---

<div align="center">

**Made with ❤️ for Malaysian students**

_Project Structure Documentation v1.0_

</div>
