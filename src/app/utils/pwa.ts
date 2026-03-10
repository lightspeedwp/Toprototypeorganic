/**
 * PWA (Progressive Web App) Utilities
 * 
 * Utilities for Progressive Web App functionality.
 * 
 * **Features:**
 * - Service worker registration
 * - Install prompt handling
 * - Update detection
 * - Offline detection
 * - Push notification support
 * 
 * @module pwa
 * @category utils
 */

/**
 * Service worker registration result.
 */
interface ServiceWorkerResult {
  success: boolean;
  registration?: ServiceWorkerRegistration;
  error?: Error;
}

/**
 * Register service worker.
 * 
 * @returns Registration result
 */
export async function registerServiceWorker(): Promise<ServiceWorkerResult> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return { success: false, error: new Error("Service workers not supported") };
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("✅ Service Worker registered:", registration.scope);

    // Check for updates every hour
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;

      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("🔄 New version available!");
            // Notify user about update
            showUpdateNotification();
          }
        });
      }
    });

    return { success: true, registration };
  } catch (error) {
    console.error("❌ Service Worker registration failed:", error);
    return { success: false, error: error as Error };
  }
}

/**
 * Unregister service worker.
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const success = await registration.unregister();
      console.log("Service Worker unregistered:", success);
      return success;
    }
    return false;
  } catch (error) {
    console.error("Failed to unregister Service Worker:", error);
    return false;
  }
}

/**
 * Check if app is running as PWA.
 */
export function isPWA(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-ignore
    window.navigator.standalone === true
  );
}

/**
 * Check if device is online.
 */
export function isOnline(): boolean {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
}

/**
 * Listen for online/offline events.
 */
export function watchOnlineStatus(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
}

/**
 * Install prompt state.
 */
let deferredPrompt: any = null;

/**
 * Setup install prompt.
 */
export function setupInstallPrompt(): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (e: Event) => {
    // Prevent default install prompt
    e.preventDefault();
    // Store the event for later use
    deferredPrompt = e;
    console.log("💾 Install prompt available");
  };

  window.addEventListener("beforeinstallprompt", handler);

  // Return cleanup function
  return () => {
    window.removeEventListener("beforeinstallprompt", handler);
  };
}

/**
 * Show install prompt.
 * 
 * @returns True if user accepted
 */
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    console.warn("Install prompt not available");
    return false;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for user's response
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the install prompt`);

  // Clear the deferred prompt
  deferredPrompt = null;

  return outcome === "accepted";
}

/**
 * Check if install prompt is available.
 */
export function isInstallPromptAvailable(): boolean {
  return deferredPrompt !== null;
}

/**
 * Request push notification permission.
 * 
 * @returns True if permission granted
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

/**
 * Show local notification.
 */
export async function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  if (Notification.permission === "granted") {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.showNotification(title, options);
    } else {
      new Notification(title, options);
    }
  }
}

/**
 * Subscribe to push notifications.
 */
export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // Replace with your VAPID public key
      applicationServerKey: "YOUR_VAPID_PUBLIC_KEY",
    });

    console.log("Push subscription:", subscription);
    return subscription;
  } catch (error) {
    console.error("Push subscription failed:", error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications.
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const success = await subscription.unsubscribe();
      console.log("Push unsubscribe:", success);
      return success;
    }

    return false;
  } catch (error) {
    console.error("Push unsubscribe failed:", error);
    return false;
  }
}

/**
 * Show update notification to user.
 */
function showUpdateNotification(): void {
  // Create a custom notification or use a toast
  const shouldReload = confirm("A new version is available! Reload to update?");

  if (shouldReload) {
    window.location.reload();
  }
}

/**
 * Auto-register service worker in production.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    registerServiceWorker();
    setupInstallPrompt();
  });
}

/**
 * Log PWA status in development.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    console.log("\n╔══════════════════════════════════════════════════════════════╗");
    console.log("║                PWA STATUS                                    ║");
    console.log("╚══════════════════════════════════════════════════════════════╝\n");
    console.log(`📱 Running as PWA: ${isPWA() ? "Yes" : "No"}`);
    console.log(`🌐 Online: ${isOnline() ? "Yes" : "No"}`);
    console.log(`🔔 Notifications: ${Notification?.permission || "Not supported"}`);
    console.log(`⚙️  Service Worker: ${navigator.serviceWorker ? "Supported" : "Not supported"}`);
    console.log("\n════════════════════════════════════════════════════════════════\n");
  });
}
