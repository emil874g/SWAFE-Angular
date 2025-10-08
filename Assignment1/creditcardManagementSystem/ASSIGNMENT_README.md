# Credit Card Management System - SWAFE 2025 Hand-in 1

A comprehensive Angular 18 application for managing company credit cards and tracking expenses.

## 🚀 Features

### Functional Requirements Implemented

✅ **F0 - Application Skeleton**

- F0.1: Navigation bar with links to all screens
  - F0.1.1: Add credit card screen
  - F0.1.2: Transactions screen
  - F0.1.3: Home screen

✅ **F1 - Home Screen**

- F1.1: List of all credit cards

✅ **F2 - Credit Card List**

- F2.1: Card elements with card_number, cardholder_name, issuer
- F2.1.1: All required properties displayed
- F2.1.2: Click navigation to card details

✅ **F3 - Credit Card Details Screen**

- F3.1: Display all card properties (card_number, cardholder_name, csc_code, expiration_date_month, expiration_date_year, issuer)
- F3.2: Option to remove credit card
- F3.4: List of transactions for the card

✅ **F4 - Add Credit Card Screen**

- F4.1: Form with all required fields
- F4.1.1-F4.1.3: Card number validation (numbers only, 7-16 digits, required)
- F4.2.1-F4.2.4: CSC code validation (3 digits, numbers only, required)
- F4.3.1: Cardholder name validation (required)
- F4.4.1-F4.4.2: Expiration month validation (1-12 range, required)
- F4.5.1: Expiration year validation (required)

✅ **F5 - Transactions Screen**

- F5.1: List of all transactions
- F5.1.2: Option to add transactions
- F5.1.3: Option to filter transactions
- F5.1.4: Filter by card number

✅ **F6 - Transactions List**

- F6.1.1: Display all transaction properties
- F6.1.2: Credit card selection from list
- F6.1.3-F6.1.6: All field validations
- F6.1.7: Option to remove transactions

### Design Requirements Implemented

✅ **Latest Angular (18.x)**

- Using Angular 18.2.0

✅ **Zoneless Change Detection**

- Implemented `provideExperimentalZonelessChangeDetection()`
- Zone.js removed from polyfills in angular.json

✅ **Standalone Components**

- All components are standalone (no NgModules)

✅ **Lazy Loading**

- All route components are lazy-loaded using dynamic imports
- Home, Credit Card Details, Add Credit Card, and Transactions are all lazy-loaded

✅ **Custom Pipe**

- `ExpirationDatePipe` for formatting expiration dates (MM/YY format)
- Used in credit card details screen

✅ **Service Architecture**

- `AuthService` - Authentication and token management
- `CreditCardService` - Credit card CRUD operations
- `TransactionService` - Transaction management
- All services use HttpClient and RxJS

✅ **API Integration**

- Full integration with https://assignment1.swafe.dk/swagger/index.html
- All CRUD operations implemented

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18.2.0)

## 🔧 Installation

1. Navigate to the project directory:

```bash
cd creditcardManagementSystem
```

2. Install dependencies (if not already installed):

```bash
npm install
```

## 🎯 Usage

### First Time Setup

1. **Create a user account** at the API:

   - Go to https://assignment1.swafe.dk/swagger/index.html
   - Use the `POST /api/group` endpoint
   - Enter your prefix and group number
   - Example: `{ "prefix": "yourname", "groupNumber": 1 }`

2. **Start the application**:

```bash
npm start
```

3. **Login**:
   - Navigate to http://localhost:4200
   - Login with credentials:
     - Username: `{prefix}@bank.dk`
     - Password: `1234`

### Key Features Walkthrough

1. **Home Screen**

   - View all credit cards in a responsive grid
   - Click any card to view details

2. **Add Credit Card**

   - Click "Add Credit Card" in navigation
   - Fill out form with validation
   - All fields validated according to requirements

3. **View Card Details**

   - Click on any card from home screen
   - View all card information
   - See transactions for that card
   - Delete card option available

4. **Manage Transactions**
   - Navigate to "Transactions" screen
   - View all transactions across all cards
   - Add new transactions
   - Filter by card number
   - Delete transactions

## 🏗️ Project Structure

```
src/
├── app/
│   ├── credit-card/
│   │   ├── credit-card-list/          # Display list of cards (F2)
│   │   ├── credit-card-details/       # Card details with transactions (F3)
│   │   └── credit-card-screen/        # Add new card form (F4)
│   ├── transactions/
│   │   ├── transactions-overview/     # Main transactions page (F5)
│   │   └── transactions-list/         # Transaction list display (F6)
│   ├── layout/
│   │   └── navbar/                    # Navigation component (F0.1)
│   ├── home/                          # Home page with card list (F1)
│   └── shared/
│       ├── models/
│       │   ├── credit-card.model.ts   # Credit card interface
│       │   ├── transaction.model.ts   # Transaction interface
│       │   └── auth.model.ts          # Auth interfaces
│       ├── services/
│       │   ├── auth.service.ts        # Authentication service
│       │   ├── credit-card.service.ts # Credit card API service
│       │   └── transaction.service.ts # Transaction API service
│       └── pipes/
│           └── expiration-date.pipe.ts # Custom pipe for date formatting
├── app.config.ts                      # App configuration with zoneless
├── app.routes.ts                      # Lazy-loaded routes
├── styles.scss                        # Global styles
└── main.ts                           # Application entry point
```

## 🎨 Technical Implementation Details

### Zoneless Change Detection

Located in `src/app/app.config.ts`:

```typescript
provideExperimentalZonelessChangeDetection();
```

Zone.js removed from `angular.json` polyfills array.

### Lazy Loading

All routes in `src/app/app.routes.ts` use dynamic imports:

```typescript
{
  path: 'home',
  loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
}
```

### Custom Pipe

`ExpirationDatePipe` in `src/app/shared/pipes/expiration-date.pipe.ts`:

- Formats month and year into MM/YY format
- Standalone pipe
- Used in credit card details component

### Services

All services:

- Use `provideIn: 'root'` for singleton behavior
- Implement proper HttpClient integration
- Handle authentication tokens
- Use RxJS observables

## 🔐 API Integration

**Base URL**: `https://assignment1.swafe.dk/api`

**Endpoints Implemented**:

- `POST /Auth/login` - User authentication
- `GET /CreditCard` - Get all credit cards
- `GET /CreditCard/{id}` - Get specific card
- `POST /CreditCard` - Create new card
- `DELETE /CreditCard/{id}` - Delete card
- `GET /Transaction` - Get all transactions (with optional card number filter)
- `GET /Transaction/creditcard/{id}` - Get card-specific transactions
- `POST /Transaction` - Create transaction
- `DELETE /Transaction/{id}` - Delete transaction

## 📝 Validation Rules

### Credit Card (F4)

- **Card Number**: 7-16 digits, numbers only, required (F4.1.1, F4.1.2, F4.1.3)
- **CSC Code**: Exactly 3 digits, numbers only, required (F4.2.1, F4.2.2, F4.2.4)
- **Cardholder Name**: Required (F4.3.1)
- **Expiration Month**: 1-12, required (F4.4.1, F4.4.2)
- **Expiration Year**: Required (F4.5.1)
- **Issuer**: Required (implied)

### Transaction (F6)

- **Credit Card**: Must select from existing cards, required (F6.1.2)
- **Amount**: Must be greater than 0, required (F6.1.3, F6.1.4)
- **Currency**: Required (F6.1.5)
- **Date**: Required (F6.1.6)
- **Comment**: Optional

## 🛠️ Technologies

- **Angular 18.2.0** - Framework (latest major release)
- **TypeScript 5.5** - Programming language
- **SCSS** - Styling
- **RxJS 7.8** - Reactive programming
- **Angular Router** - Navigation with lazy loading
- **Angular Forms** - Form handling with validation
- **HttpClient** - API communication

## 🚀 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## ✅ Requirements Checklist

### Design Requirements

- [x] Latest Angular major release (18.2.0)
- [x] Zoneless change detection enabled
- [x] Zone.js not loaded
- [x] All components standalone
- [x] At least one component lazy-loaded (all route components are lazy-loaded)
- [x] Custom pipe implemented (ExpirationDatePipe)
- [x] Well-structured with services
- [x] API integration (https://assignment1.swafe.dk/swagger/index.html)

### Functional Requirements

- [x] F0: Application skeleton with navigation
- [x] F1: Home screen with credit card list
- [x] F2: Credit card list component
- [x] F3: Credit card details screen
- [x] F4: Add credit card screen with validation
- [x] F5: Transactions screen with filtering
- [x] F6: Transactions list with CRUD operations

## 📄 Notes

- The application uses token-based authentication stored in localStorage
- All API calls include the authentication token in headers
- Error handling implemented for all API calls
- Responsive design works on desktop and mobile
- Loading states and empty states included for better UX
