# OrBit - Subscription Management Platform

![OrBit Logo](src/assets/logo.png)

**OrBit** is a modern, intuitive subscription management platform that helps you track, manage, and optimize all your recurring subscriptions in one place.

## 🎯 The Problem

In today's digital world, the average person has **10-15 active subscriptions** across streaming services, software tools, cloud storage, and more. This leads to:

- **Subscription Fatigue**: Losing track of what you're subscribed to
- **Wasted Money**: Paying for services you no longer use
- **Missed Payments**: Forgetting renewal dates and facing service interruptions
- **Budget Blindness**: Not knowing your total monthly subscription cost
- **Scattered Information**: Managing subscriptions across multiple platforms

## 💡 The Solution

OrBit provides a centralized dashboard to:

- **Track All Subscriptions**: View every subscription in one unified interface
- **Monitor Spending**: See your total monthly/yearly subscription costs at a glance
- **Never Miss Payments**: Get reminders before renewal dates
- **Analyze Spending Patterns**: Visualize where your money goes with interactive charts
- **Make Informed Decisions**: Identify subscriptions to keep, pause, or cancel

## ✨ Features

### 📊 Dashboard
- Real-time overview of total monthly costs
- Active subscription count
- Upcoming payment alerts
- Interactive spending charts
- Top subscriptions by cost

### 💳 Subscription Management
- Add, edit, and delete subscriptions
- Categorize by type (Entertainment, Productivity, Design Tools, Utilities)
- Track payment cycles (Monthly/Yearly)
- Monitor subscription status (Active, Pending, Cancelled)
- Search and filter subscriptions
- List and Grid view options
- Sort by name, price, or due date

### 📈 Reports & Analytics
- Total annual spend projection
- Average cost per subscription
- Category breakdown with visual progress bars
- Spending trend charts
- Export reports functionality

### 🔔 Payment Reminders
- Upcoming payment notifications
- Due date tracking
- Snooze reminders
- Mark payments as paid
- Overdue payment alerts

### ⚙️ Settings
- Profile management
- Notification preferences (Email, Push, Marketing)
- Security settings (Two-Factor Authentication)
- Billing information
- Password management

### 🔐 Authentication
- Email/Password login
- Google OAuth integration
- Secure signup flow
- Password reset functionality

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | Radix UI Primitives |
| **Charts** | Recharts |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Form Handling** | React Hook Form |
| **State Management** | React useState/useMemo |

## 📁 Project Structure

```
orbit/
├── public/                 # Static assets
│   ├── favicon.png
│   ├── logo-192.png
│   ├── logo-512.png
│   ├── apple-touch-icon.png
│   └── manifest.json       # PWA manifest
├── src/
│   ├── assets/             # Images and logos
│   │   └── logo.png
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── dashboard/      # Dashboard components
│   │   │   ├── AddSubscriptionModal.tsx
│   │   │   ├── ChartsSection.tsx
│   │   │   ├── EditSubscriptionModal.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── SubscriptionTable.tsx
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── design-system.tsx
│   │   │   ├── form-elements.tsx
│   │   │   └── ... (40+ UI components)
│   │   └── views/          # Page views
│   │       ├── RemindersView.tsx
│   │       ├── ReportsView.tsx
│   │       ├── SettingsView.tsx
│   │       └── SubscriptionsView.tsx
│   ├── styles/
│   │   └── globals.css     # Global styles & CSS variables
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind CSS output
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SriramDivi1/OrBit.git
   cd OrBit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Screenshots

### Login Page
- Clean, modern authentication interface
- Google OAuth integration
- Forgot password functionality

### Dashboard
- Overview statistics cards
- Spending trend charts
- Top subscriptions visualization
- Recent subscriptions table

### Subscriptions View
- Full subscription list with filtering
- Grid and List view options
- Search and sort functionality
- Quick actions (Edit/Delete)

### Reports
- Annual spend projections
- Category breakdown
- Visual analytics

### Reminders
- Upcoming payment list
- Due date indicators
- Quick actions (Snooze/Mark Paid)

## 🎨 Design System

OrBit uses a consistent design system with:

### Colors
- **Primary**: `#FF971D` (Orange)
- **Background**: `#FFFAF5` (Cream)
- **Sidebar**: `#0F1113` (Dark)
- **Success**: Green tones
- **Error**: Red tones
- **Warning**: Orange tones

### Typography
- **Font Family**: System UI (San Francisco, Segoe UI)
- **Headings**: Bold, tight tracking
- **Body**: Regular weight, comfortable line height

### Components
- Rounded corners (lg/xl/2xl)
- Subtle shadows
- Smooth transitions
- Consistent spacing (4px base unit)

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Bank account linking
- [ ] Subscription recommendations
- [ ] Shared family subscriptions
- [ ] Budget goals and alerts
- [ ] Mobile app (React Native)
- [ ] Browser extension for auto-detection
- [ ] Dark mode support
- [ ] Multi-currency support
- [ ] Export to CSV/PDF

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sriram Divi**

- GitHub: [@SriramDivi1](https://github.com/SriramDivi1)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons
- [Recharts](https://recharts.org/) for data visualization
- [Clearbit](https://clearbit.com/) for company logos

---

<p align="center">
  Made with ❤️ by Sriram Divi
</p>
