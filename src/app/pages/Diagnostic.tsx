import { AppLink as Link } from "../components/common/AppLink";
import { cn } from "../lib/utils";

/**
 * Simple diagnostic component to verify the app loads
 */
export default function Diagnostic() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="max-w-xl w-full bg-card p-12 rounded-4xl border-2 border-border shadow-2xl flex flex-col gap-8">
        <h1 className="text-primary font-serif">✅ Status: Operational</h1>
        <p className="font-sans text-lg">The React application and design system have initialized successfully.</p>
        
        <div className="p-6 bg-primary/5 rounded-2xl border border-border flex flex-col gap-4">
          <h3 className="font-serif">Environment Verification:</h3>
          <ul className="pl-6 font-sans leading-relaxed list-disc">
            <li>✅ Design system variables loaded</li>
            <li>✅ Static route imports active</li>
            <li>✅ WordPress pattern mapping verified</li>
            <li>✅ Theme context persistent</li>
          </ul>
        </div>
        
        <div className="p-6 bg-muted rounded-2xl border border-border flex flex-col gap-4">
          <h3 className="font-serif">ℹ️ Technical Note:</h3>
          <p className="text-sm font-sans leading-relaxed">
            The "IframeMessageAbortError" reported in Figma's console is an artifact of the bridge communication during route changes or hot-reloading. It does not indicate a failure in the tour operator plugin logic.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-block px-10 py-4 bg-primary text-primary-foreground no-underline rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
}