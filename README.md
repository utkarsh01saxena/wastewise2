# 🌱 WasteWise

<div align="center">

![WasteWise Logo](https://img.shields.io/badge/WasteWise-Smart%20Waste%20Management-green?style=for-the-badge&logo=leaf&logoColor=white)

**Revolutionizing urban waste management through AI-powered smart bins with automated waste classification and real-time feedback**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://wastewise.lovable.app) • [📱 Features](#-features) • [🛠 Installation](#-installation) • [📖 Documentation](#-documentation)

</div>

---

## 🎯 Overview

WasteWise is a comprehensive smart waste management solution that combines IoT technology, AI-powered waste classification, and community engagement to revolutionize urban sustainability. The platform serves both residents and city authorities with dedicated dashboards for monitoring, compliance tracking, and gamified waste segregation.

### 🌟 Key Highlights

- **🤖 AI-Powered Classification**: Smart bins automatically classify waste into dry and wet categories
- **📊 Real-time Compliance Detection**: Instant feedback and compliance scoring for proper waste segregation  
- **🎮 Gamification System**: Points, achievements, and leaderboards to encourage community participation
- **🏛️ Authority Dashboard**: Comprehensive monitoring and reporting tools for city officials
- **📱 Responsive Design**: Beautiful, mobile-first interface built with modern web technologies

---

## ✨ Features

### 👥 For Residents
- **Personal Dashboard**: Track waste disposal history and compliance scores
- **Gamified Experience**: Earn points, unlock achievements, and compete with neighbors
- **Real-time Feedback**: Instant classification results and improvement suggestions
- **Community Features**: Nearby bin finder and society-wide challenges
- **Progress Tracking**: Weekly/monthly performance analytics

### 🏛️ For Authorities  
- **City-wide Monitoring**: Overview of all societies and compliance metrics
- **Analytics & Reporting**: Detailed insights into waste patterns and trends
- **Alert System**: Real-time notifications for maintenance and low compliance
- **Performance Metrics**: Track improvement across different communities
- **Data Export**: Generate comprehensive reports for stakeholders

### 🔧 Technical Features
- **Secure Authentication**: Role-based access control with Supabase Auth
- **Real-time Updates**: Live data synchronization across all dashboards
- **Scalable Database**: PostgreSQL with Row Level Security (RLS)
- **Modern UI/UX**: shadcn/ui components with beautiful animations
- **Mobile Responsive**: Optimized for all device sizes

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe development experience  
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Clean, customizable icons
- **React Router DOM** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Fine-grained access control
- **Real-time Subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Git** - Version control

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wastewise.git
   cd wastewise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env file
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or  
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### 🗄️ Database Setup

The application uses Supabase for backend services. The database schema includes:

- **societies** - Community/apartment complex information
- **profiles** - User profiles with role-based access (resident/authority)
- **households** - Household information linked to residents
- **smart_bins** - IoT device locations and metadata
- **waste_disposal_records** - Historical waste disposal data with AI classification

---

## 📖 Usage

### 🏠 Getting Started as a Resident

1. **Sign Up**: Create an account and select "Resident" role
2. **Complete Profile**: Add your household information
3. **Start Disposing**: Use smart bins in your community
4. **Track Progress**: Monitor your compliance score and earned points
5. **Engage**: Participate in community challenges and compete on leaderboards

### 🏛️ Getting Started as an Authority

1. **Sign Up**: Create an account and select "Authority" role  
2. **Access Dashboard**: View city-wide waste management metrics
3. **Monitor Compliance**: Track society-wise performance
4. **Generate Reports**: Export data for stakeholder meetings
5. **Take Action**: Send alerts and schedule maintenance

---

## 🏗️ Project Structure

```
wastewise/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ProtectedRoute.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.tsx   # Authentication logic
│   │   └── use-toast.ts  # Toast notifications
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client and types
│   ├── pages/            # Application pages/routes
│   │   ├── Auth.tsx      # Login/Signup page
│   │   ├── Index.tsx     # Landing page
│   │   ├── ResidentDashboard.tsx
│   │   └── AuthorityDashboard.tsx
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── supabase/             # Database migrations and config
└── package.json          # Project dependencies
```

---

## 🎨 Design System

WasteWise uses a carefully crafted design system with:

- **🎨 Color Palette**: Eco-friendly greens with accessible contrast ratios
- **📱 Responsive Grid**: Mobile-first approach with Tailwind CSS
- **🌙 Theme Support**: Light and dark mode compatibility
- **♿ Accessibility**: WCAG compliant components and interactions
- **✨ Animations**: Smooth transitions and micro-interactions

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
- Use the [GitHub Issues](https://github.com/yourusername/wastewise/issues) page
- Provide clear reproduction steps
- Include environment details

### 💡 Feature Requests  
- Open a feature request issue
- Describe the problem and proposed solution
- Consider implementation complexity

### 🔧 Development
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Roadmap

### 🎯 Current Features (Phase 1)
- ✅ User authentication and role management
- ✅ Resident and authority dashboards  
- ✅ Basic waste tracking and compliance scoring
- ✅ Responsive UI with modern design

### 🚀 Upcoming Features (Phase 2)
- 🔄 Real-time IoT data integration
- 📍 Interactive maps with bin locations
- 🏆 Advanced gamification features
- 📱 Mobile app companion
- 🤖 Enhanced AI classification algorithms

### 🌟 Future Vision (Phase 3)
- 🌐 Multi-city deployment support
- 📈 Advanced analytics and ML insights
- 🔔 Smart notification system
- 🏪 Reward marketplace integration
- 🌍 Carbon footprint tracking

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Swachh Bharat Mission Urban 2.0** - Inspiration for sustainable waste management
- **Supabase Team** - Amazing backend-as-a-service platform
- **shadcn/ui** - Beautiful and accessible component library
- **React Community** - Continuous innovation in web development
- **Open Source Contributors** - Making technology accessible to all

---

## 📞 Contact & Support

- **📧 Email**: support@wastewise.app
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/wastewise/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/wastewise/discussions)
- **🐦 Twitter**: [@WasteWiseApp](https://twitter.com/wastewiseapp)

---

<div align="center">

**Made with ❤️ for a sustainable future**

⭐ **Star this repository if you found it helpful!** ⭐

[🔝 Back to Top](#-wastewise)

</div>