# Contributing to BharatMinds AI Counsellor

Thank you for contributing! This guide will help you get started.

## 🚀 Quick Start

### 1. Setup Your Environment

```bash
# Clone the repository
git clone <repository-url>
cd ai-counsellor-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Ask your team lead for development credentials

# Run the development server
npm run dev
```

### 2. Create a Feature Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/[team]/[feature-name]

# Examples:
# git checkout -b feature/frontend/login-page
# git checkout -b feature/backend/student-api
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the coding standards
- Add tests for new features
- Update documentation if needed

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat(auth): add login page with validation"

# Push to your branch
git push origin feature/[team]/[feature-name]
```

### 5. Create a Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Request review from your team lead
6. Address review comments
7. Wait for approval and merge

---

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
}

export const UserCard: FC<UserProps> = ({ name, email }) => {
  return <div>{name}</div>;
};

// ❌ Bad
export default function UserCard(props: any) {
  return <div>{props.name}</div>;
}
```

### React Components

```tsx
// ✅ Good - Named export, typed props
import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};

// ❌ Bad - Default export, no types
export default function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Naming

```
✅ Good:
- LoginForm.tsx (components)
- auth.service.ts (services)
- useAuth.ts (hooks)
- user.types.ts (types)

❌ Bad:
- loginform.tsx
- AuthService.ts
- UseAuth.ts
- userTypes.ts
```

---

## 🧪 Testing

### Write Tests for:

- All new components
- All new services
- All new API routes
- All bug fixes

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 📋 Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List key changes
- One per line

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] Added tests
- [ ] Tests pass locally
- [ ] No console.logs or debugger statements
```

---

## 🔍 Code Review Process

### As an Author

1. **Self-review** your code before requesting review
2. **Respond promptly** to review comments
3. **Be open** to feedback and suggestions
4. **Ask questions** if you don't understand feedback

### As a Reviewer

1. **Be respectful** and constructive
2. **Explain why** when requesting changes
3. **Approve quickly** if code looks good
4. **Test locally** for complex changes

---

## 🚫 What NOT to Commit

```bash
# Never commit:
.env.local
.env.production
*.log
.DS_Store
node_modules/
.next/
dist/
build/

# Secrets
*_SECRET
*_KEY
*_TOKEN
```

---

## 🎯 Task Assignment

### Frontend Tasks
- UI components
- Page layouts
- Styling
- Client-side logic
- Responsive design

### Backend Tasks
- API routes
- Database operations
- Business logic
- Authentication
- Data processing

---

## 💬 Communication

### Channels
- **#general**: General discussion
- **#frontend**: Frontend team
- **#backend**: Backend team
- **#code-review**: PR notifications
- **#help**: Ask for help

### Stand-ups (Daily)
- What did you do yesterday?
- What will you do today?
- Any blockers?

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Browser: Chrome 120
- OS: macOS
- Device: Desktop
```

---

## 📚 Resources

- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [Frontend Guide](./docs/FRONTEND_GUIDE.md)
- [Backend Guide](./docs/BACKEND_GUIDE.md)
- [API Documentation](./docs/API.md)

---

## ❓ Getting Help

1. **Check documentation** first
2. **Search existing issues** on GitHub
3. **Ask in team channel** on Slack/Discord
4. **Tag your team lead** if urgent
5. **Schedule 1-on-1** for complex issues

---

## 🎉 Recognition

Great contributors will be:
- Mentioned in release notes
- Featured in team meetings
- Considered for leadership roles
- Given recommendation letters

---

Thank you for contributing to BharatMinds AI Counsellor! 🚀
