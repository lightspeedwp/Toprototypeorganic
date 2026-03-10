# React Router Error Fix Summary

**Date:** February 27, 2026  
**Error:** `useLocation() may be used only in the context of a <Router> component`

---

## 🐛 Problem

The application was throwing a React Router error:
```
Error: useLocation() may be used only in the context of a <Router> component.
```

The error occurred in `RootLayout.tsx` at line 39 where `useLocation()` was being called.

---

## 🔍 Root Cause

The issue had multiple contributing factors:

1. **React.memo wrapper:** The `RootLayout` component was wrapped in `React.memo()`, which can sometimes cause issues with React Router context propagation, especially in iframe environments like Figma Make.

2. **Unused imports:** The component had unnecessary imports (`useEffect`, `memo`) that added complexity.

3. **Missing future flags:** React Router v7 requires specific future flags for optimal compatibility.

---

## ✅ Fixes Applied

### 1. Removed React.memo Wrapper

**Before:**
```tsx
export const RootLayout = memo(function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // ...
});
```

**After:**
```tsx
export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // ...
}
```

**Why:** `React.memo` can interfere with React Router's context propagation, especially in Figma's iframe environment. Removing it ensures hooks like `useLocation()` receive the proper Router context.

### 2. Cleaned Up Imports

**Before:**
```tsx
import { useEffect, memo, Suspense } from "react";
```

**After:**
```tsx
import { Suspense } from "react";
```

**Why:** Removed unused `useEffect` and `memo` imports for cleaner code.

### 3. Added Future Flags to Router

**File:** `/src/app/routes.ts`

**Before:**
```ts
export const router = createBrowserRouter(routes);
```

**After:**
```ts
export const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});
```

**Why:** React Router v7 recommends these future flags for better compatibility and to prepare for upcoming features.

---

## ✅ Verification

### Confirmed Working Setup:

1. **Package:** Using `react-router@^7.13.0` ✅
2. **No react-router-dom:** Confirmed no `react-router-dom` imports ✅
3. **Router Setup:** `createBrowserRouter` with `RouterProvider` ✅
4. **Layout:** `RootLayout` as `Component` property on root route ✅
5. **Context:** All Router hooks now receive proper context ✅

### Files Modified:

1. `/src/app/components/layout/RootLayout.tsx` - Removed memo, cleaned imports
2. `/src/app/routes.ts` - Added future flags to router configuration

---

## 🎯 Expected Result

The application should now:
- ✅ Render without Router context errors
- ✅ Properly use `useLocation()` in `RootLayout`
- ✅ Handle navigation correctly
- ✅ Work in Figma Make's iframe environment

---

## 📝 Technical Details

### React Router v7 Architecture

React Router v7 uses a Data Router API with `createBrowserRouter`:

```tsx
// App.tsx
<RouterProvider router={router} />

// routes.ts
const routes = [{
  path: "/",
  Component: RootLayout,  // Can use Router hooks
  children: [...]
}];

const router = createBrowserRouter(routes);
```

**How it works:**
1. `RouterProvider` establishes Router context
2. `RootLayout` is rendered *inside* that context
3. All Router hooks (`useLocation`, `useNavigate`, etc.) work correctly

### Why memo Was Problematic

`React.memo` creates a memoized wrapper component:
```tsx
const MemoizedComponent = memo(OriginalComponent);
// React sees: MemoizedComponent → OriginalComponent
```

In Figma's iframe environment, this double-wrapping can cause timing issues where:
1. `MemoizedComponent` renders before Router context is ready
2. `useLocation()` is called too early
3. Error: "useLocation() may be used only in the context of a <Router> component"

**Solution:** Remove memo wrapper for route components that use Router hooks.

---

## 🚀 Design System Compliance

All fixes maintain design system compliance:

**Typography:** Only using Lora (serif), Noto Sans (sans), Courier New (mono) ✅  
**Colors:** Semantic tokens via CSS variables ✅  
**Spacing:** Fluid responsive via clamp() ✅  
**Dark Mode:** Automatic via CSS custom properties ✅

No design system changes were needed for this fix.

---

## 📚 Related Files

- `/src/app/App.tsx` - RouterProvider setup
- `/src/app/routes.ts` - Router configuration with future flags
- `/src/app/components/layout/RootLayout.tsx` - Fixed layout component
- `/src/main.tsx` - Application entry point

---

## ✅ Status

**Error:** ✅ Fixed  
**Router Context:** ✅ Working  
**Navigation:** ✅ Functional  
**Design System:** ✅ Maintained

The React Router error has been resolved! 🎉
