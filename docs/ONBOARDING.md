# Intern Onboarding Guide

Welcome to the BharatMinds AI Counsellor team! 🎉

---

## 📅 Your First Week

### Day 1: Setup & Introduction

#### Morning (9 AM - 12 PM)
- [ ] **Welcome meeting** with the team
- [ ] **Receive access** to:
  - GitHub repository
  - Slack/Discord workspace
  - Development Appwrite project
  - Project management tool
- [ ] **Setup development environment**
  - Install Node.js 18+
  - Install Git
  - Install VS Code (recommended)
  - Clone repository
  - Install dependencies

#### Afternoon (1 PM - 5 PM)
- [ ] **Environment configuration**
  - Copy `.env.example` to `.env.local`
  - Get development credentials from team lead
  - Run `npm run dev`
  - Verify app runs on `localhost:3000`
- [ ] **Read documentation**
  - [Architecture](./ARCHITECTURE.md)
  - [Contributing Guide](./CONTRIBUTING.md)
  - Your team guide (Frontend/Backend)

---

### Day 2: Codebase Exploration

#### Morning
- [ ] **Codebase walkthrough** with team lead
  - Project structure
  - Key files and directories
  - Data flow
  - Common patterns

#### Afternoon
- [ ] **Explore on your own**
  - Navigate through the code
  - Run the app and test features
  - Read component/service code
  - Take notes on questions

---

### Day 3: Tools & Workflow

#### Morning
- [ ] **Learn the Git workflow**
  - Branch naming conventions
  - Commit message format
  - PR creation process
  - Code review process

#### Afternoon
- [ ] **Setup development tools**
  - Install VS Code extensions:
    - ESLint
    - Prettier
    - TypeScript
    - Tailwind CSS IntelliSense
  - Configure Git hooks
  - Test linting and formatting

---

### Day 4: First Task

#### Morning
- [ ] **Receive first task** from team lead
- [ ] **Understand requirements**
  - Read task description
  - Ask clarifying questions
  - Break down into subtasks

#### Afternoon
- [ ] **Start coding**
  - Create feature branch
  - Write code
  - Test locally
  - Commit changes

---

### Day 5: First PR

#### Morning
- [ ] **Complete first task**
  - Finish implementation
  - Write tests
  - Self-review code

#### Afternoon
- [ ] **Create Pull Request**
  - Push to GitHub
  - Fill PR template
  - Request review
- [ ] **Week 1 retrospective**
  - Share learnings
  - Ask questions
  - Get feedback

---

## 🛠️ Development Setup

### Required Software

```bash
# Node.js (v18 or higher)
node --version  # Should show v18.x.x or higher

# npm (comes with Node.js)
npm --version

# Git
git --version
```

### Installation Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd ai-counsellor-web

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local

# 4. Edit .env.local with development credentials
# (Get these from your team lead)

# 5. Run development server
npm run dev

# 6. Open browser
# Navigate to http://localhost:3000
```

### VS Code Extensions

Install these for better development experience:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript** - TypeScript support
4. **Tailwind CSS IntelliSense** - Tailwind autocomplete
5. **GitLens** - Git integration
6. **Error Lens** - Inline error display

---

## 📚 Learning Resources

### Must Read

1. **Project Documentation**
   - [Architecture](./ARCHITECTURE.md)
   - [Contributing](./CONTRIBUTING.md)
   - [Frontend Guide](./FRONTEND_GUIDE.md) (if frontend)
   - [Backend Guide](./BACKEND_GUIDE.md) (if backend)

2. **Technology Stack**
   - [Next.js Documentation](https://nextjs.org/docs)
   - [React Documentation](https://react.dev)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
   - [Tailwind CSS](https://tailwindcss.com/docs)
   - [Appwrite Documentation](https://appwrite.io/docs)

### Recommended Learning Path

#### Week 1-2: Basics
- [ ] Next.js fundamentals
- [ ] React hooks
- [ ] TypeScript basics
- [ ] Tailwind CSS

#### Week 3-4: Advanced
- [ ] Next.js App Router
- [ ] Server vs Client components
- [ ] API routes
- [ ] Appwrite integration

#### Month 2: Mastery
- [ ] Performance optimization
- [ ] Testing strategies
- [ ] Security best practices
- [ ] Code review skills

---

## 👥 Team Structure

### Your Team Lead
- **Role**: Guide and mentor you
- **Availability**: Daily during work hours
- **Contact**: Via Slack/Discord

### Founder/Tech Lead
- **Role**: Final code review and architecture
- **Availability**: Weekly meetings
- **Contact**: Via Slack for urgent matters

### Fellow Interns
- **Role**: Collaborate and learn together
- **Availability**: Daily
- **Contact**: Team channels

---

## 📋 Daily Workflow

### Morning (9 AM)
1. Check Slack/Discord for updates
2. Attend daily stand-up (15 min)
3. Review assigned tasks
4. Plan your day

### Work Hours (9:30 AM - 5:30 PM)
1. Work on assigned tasks
2. Commit code regularly
3. Ask questions when stuck
4. Take breaks

### End of Day (5:30 PM)
1. Push your code
2. Update task status
3. Document blockers
4. Plan tomorrow

---

## 🎯 Your Responsibilities

### Code Quality
- Write clean, readable code
- Follow coding standards
- Add comments for complex logic
- Write tests for new features

### Communication
- Attend daily stand-ups
- Update task status
- Ask questions early
- Share blockers immediately

### Learning
- Read documentation
- Learn from code reviews
- Practice new skills
- Share knowledge

### Collaboration
- Help fellow interns
- Review code when asked
- Participate in discussions
- Be respectful and professional

---

## 🚨 Common Issues & Solutions

### Issue: App won't start

```bash
# Solution 1: Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run dev

# Solution 2: Check environment variables
cat .env.local  # Verify all variables are set

# Solution 3: Check Node version
node --version  # Should be v18+
```

### Issue: Import errors

```bash
# Solution: Check path aliases
# Use @/ for imports from src/
import { Button } from '@/components/ui';
```

### Issue: TypeScript errors

```bash
# Solution: Restart TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Git conflicts

```bash
# Solution: Update your branch
git checkout develop
git pull origin develop
git checkout your-branch
git rebase develop
# Resolve conflicts
git add .
git rebase --continue
```

---

## 📞 Getting Help

### Step 1: Self-Help
1. Check documentation
2. Search Google/Stack Overflow
3. Review similar code in the project

### Step 2: Team Help
1. Ask in team channel
2. Tag relevant team members
3. Provide context and error messages

### Step 3: Team Lead
1. Schedule 1-on-1 if needed
2. Prepare specific questions
3. Share screen if helpful

### Emergency
- Critical bugs: Tag @tech-lead immediately
- Blocked on task: Message team lead
- Personal issues: DM team lead privately

---

## 🎓 Growth Opportunities

### Skills You'll Develop
- Modern web development (Next.js, React)
- TypeScript programming
- API development
- Database operations
- Git workflow
- Code review
- Team collaboration

### Career Benefits
- Real-world project experience
- Portfolio project
- Recommendation letter
- Potential full-time offer
- Industry connections

### Advancement Path
```
Junior Intern (Month 1-2)
    ↓
Mid-Level Intern (Month 3-4)
    ↓
Senior Intern / Team Lead (Month 5-6)
    ↓
Full-Time Offer (if available)
```

---

## ✅ Week 1 Checklist

Before end of Week 1, you should have:

- [ ] Setup complete development environment
- [ ] Run the app successfully
- [ ] Read all documentation
- [ ] Understand Git workflow
- [ ] Created first feature branch
- [ ] Made first commit
- [ ] Created first PR
- [ ] Received first code review
- [ ] Met all team members
- [ ] Asked at least 5 questions

---

## 🎉 Welcome Aboard!

We're excited to have you on the team! Remember:

- **Ask questions** - No question is too small
- **Make mistakes** - That's how you learn
- **Be curious** - Explore and experiment
- **Have fun** - Enjoy the journey!

Your contributions will help thousands of students get into their dream colleges. That's amazing! 🚀

---

**Questions?** Ask in #general or DM your team lead!

**Ready to start?** Begin with Day 1 tasks above! 💪
