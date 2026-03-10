# Interface Icons

## Purpose

This document catalogs **UI control and interface icons** from lucide-react for the LightSpeed Tour Operator plugin prototype.

---

## CRITICAL: Verification Required

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

---

## Navigation Icons

| Icon | Import Name | Usage |
|------|-------------|-------|
| → | `ChevronRight` | Next, forward, breadcrumbs |
| ← | `ChevronLeft` | Back, previous |
| ↑ | `ChevronUp` | Collapse, scroll up |
| ↓ | `ChevronDown` | Expand, scroll down, dropdown |
| ☰ | `Menu` | Mobile menu, hamburger |
| ✕ | `X` | Close, dismiss |
| ← | `ArrowLeft` | Navigate back |
| → | `ArrowRight` | Navigate forward |
| ↑ | `ArrowUp` | Back to top |

**Example:**
```typescript
import { ChevronRight, ChevronDown, Menu, X } from "lucide-react";
```

---

## Action Icons

| Icon | Import Name | Usage |
|------|-------------|-------|
| 🔍 | `Search` | Search functionality |
| 🔎 | `Filter` | Filter controls |
| ✓ | `Check` | Success, confirm, included |
| ✕ | `X` | Error, remove, close |
| ✎ | `Edit` | Edit, modify |
| 🗑️ | `Trash2` | Delete, remove |
| ⟳ | `RefreshCw` | Reload, refresh |
| ⚙️ | `Settings` | Settings, preferences |
| ⊕ | `Plus` | Add, create new |
| ⊖ | `Minus` | Remove, decrease |

**Example:**
```typescript
import { Search, Filter, Edit, Trash2 } from "lucide-react";

<button className="flex items-center gap-2">
  <Search className="w-4 h-4" />
  <span>Search</span>
</button>
```

---

## Status Icons

| Icon | Import Name | Usage |
|------|-------------|-------|
| ℹ️ | `Info` | Information |
| ⚠️ | `AlertCircle` | Warning, alert |
| ✓ | `CheckCircle` | Success |
| ✕ | `XCircle` | Error |
| ⚡ | `Zap` | Featured, premium |
| 🔔 | `Bell` | Notifications |

**Example:**
```typescript
import { AlertCircle, CheckCircle } from "lucide-react";

<div className="flex items-center gap-2 text-destructive">
  <AlertCircle className="w-4 h-4" />
  <span>Please complete all fields</span>
</div>
```

---

## Social & Communication

| Icon | Import Name | Usage |
|------|-------------|-------|
| 📧 | `Mail` | Email contact |
| 📞 | `Phone` | Phone contact |
| 💬 | `MessageCircle` | Messages, chat |
| 📱 | `Smartphone` | Mobile contact |
| 🔗 | `Link` | External links |
| 📄 | `FileText` | Documents |
| 📥 | `Download` | Downloads |
| 📤 | `Upload` | Uploads |
| 🖨️ | `Printer` | Print |
| 📤 | `Share2` | Share content |

**Example:**
```typescript
import { Mail, Phone, MessageCircle } from "lucide-react";

<div className="flex gap-4">
  <a href="mailto:info@example.com" className="flex items-center gap-2">
    <Mail className="w-4 h-4" />
    <span>Email Us</span>
  </a>
  <a href="tel:+1234567890" className="flex items-center gap-2">
    <Phone className="w-4 h-4" />
    <span>Call Us</span>
  </a>
</div>
```

---

## View & Display

| Icon | Import Name | Usage |
|------|-------------|-------|
| 👁️ | `Eye` | View, show |
| 🚫 | `EyeOff` | Hide, hidden |
| ▦ | `LayoutGrid` | Grid view |
| ▤ | `List` | List view |
| ⊞ | `Maximize2` | Fullscreen, expand |
| ⊟ | `Minimize2` | Minimize, collapse |

**Example:**
```typescript
import { LayoutGrid, List } from "lucide-react";

<div className="flex gap-2">
  <button className="p-2 rounded-md hover:bg-muted">
    <LayoutGrid className="w-5 h-5" />
  </button>
  <button className="p-2 rounded-md hover:bg-muted">
    <List className="w-5 h-5" />
  </button>
</div>
```

---

## Common Patterns

### Search Input
```typescript
import { Search } from "lucide-react";

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <input
    type="search"
    className="pl-10 pr-3 py-2 rounded-md border border-border"
    placeholder="Search..."
  />
</div>
```

### Mobile Menu Toggle
```typescript
import { Menu, X } from "lucide-react";

<button onClick={toggleMenu} className="p-2">
  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  <span className="sr-only">Toggle menu</span>
</button>
```

### Breadcrumbs
```typescript
import { ChevronRight } from "lucide-react";

<nav className="flex items-center gap-2 text-sm">
  <a href="/">Home</a>
  <ChevronRight className="w-4 h-4 text-muted-foreground" />
  <a href="/tours">Tours</a>
  <ChevronRight className="w-4 h-4 text-muted-foreground" />
  <span>Iceland Explorer</span>
</nav>
```

### Accordion
```typescript
import { ChevronDown } from "lucide-react";

<button className="flex items-center justify-between w-full">
  <span>Question</span>
  <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
</button>
```

---

## Related Documentation

- [icons/travel.md](travel.md) - Travel-related icons
- [overview-icons.md](../overview-icons.md) - Icon system overview
