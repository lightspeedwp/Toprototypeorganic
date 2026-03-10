/**
 * Video Player Component
 * 
 * Embedded video player with support for YouTube, Vimeo, and HTML5 video.
 * Responsive and accessible with play/pause controls.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for captions
 * - Colors: Semantic tokens (background, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - YouTube embed support
 * - Vimeo embed support
 * - HTML5 video support
 * - Responsive 16:9 aspect ratio
 * - Autoplay control
 * - Muted control
 * - Loop control
 * - Privacy-enhanced mode (YouTube)
 * - Lazy loading
 * 
 * @module VideoPlayer
 * @category common
 */

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Video source types.
 */
export type VideoSource = "youtube" | "vimeo" | "html5";

/**
 * VideoPlayer component props.
 */
interface VideoPlayerProps {
  /** Video source (YouTube ID, Vimeo ID, or video URL) */
  src: string;
  /** Video source type */
  source?: VideoSource;
  /** Video title for accessibility */
  title?: string;
  /** Aspect ratio */
  aspectRatio?: "16:9" | "4:3" | "1:1";
  /** Autoplay video */
  autoplay?: boolean;
  /** Mute video */
  muted?: boolean;
  /** Loop video */
  loop?: boolean;
  /** Show controls */
  controls?: boolean;
  /** Video poster image (HTML5 only) */
  poster?: string;
  /** Enable lazy loading */
  lazyLoad?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Video Player Component
 * 
 * @param {VideoPlayerProps} props - Component properties
 * @returns {JSX.Element} Rendered video player
 * 
 * @example
 * ```tsx
 * // YouTube video
 * <VideoPlayer
 *   src="dQw4w9WgXcQ"
 *   source="youtube"
 *   title="Tour Highlight Video"
 * />
 * 
 * // Vimeo video
 * <VideoPlayer
 *   src="123456789"
 *   source="vimeo"
 *   title="Destination Guide"
 * />
 * 
 * // HTML5 video
 * <VideoPlayer
 *   src="/videos/tour-preview.mp4"
 *   source="html5"
 *   poster="/images/video-poster.jpg"
 *   controls
 * />
 * ```
 */
export function VideoPlayer({
  src,
  source = "youtube",
  title = "Video",
  aspectRatio = "16:9",
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  poster,
  lazyLoad = true,
  className,
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(!lazyLoad);

  /**
   * Get aspect ratio padding class.
   */
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16:9":
        return "aspect-video";
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-square";
      default:
        return "aspect-video";
    }
  };

  /**
   * Get YouTube embed URL.
   */
  const getYouTubeUrl = () => {
    const params = new URLSearchParams();
    if (autoplay) params.set("autoplay", "1");
    if (muted) params.set("mute", "1");
    if (loop) {
      params.set("loop", "1");
      params.set("playlist", src);
    }
    if (!controls) params.set("controls", "0");
    
    return `https://www.youtube-nocookie.com/embed/${src}?${params.toString()}`;
  };

  /**
   * Get Vimeo embed URL.
   */
  const getVimeoUrl = () => {
    const params = new URLSearchParams();
    if (autoplay) params.set("autoplay", "1");
    if (muted) params.set("muted", "1");
    if (loop) params.set("loop", "1");
    
    return `https://player.vimeo.com/video/${src}?${params.toString()}`;
  };

  /**
   * Handle load click (lazy loading).
   */
  const handleLoadClick = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border bg-muted",
        getAspectRatioClass(),
        className
      )}
    >
      {!isLoaded ? (
        // Lazy Load Placeholder
        <button
          onClick={handleLoadClick}
          className="absolute inset-0 flex items-center justify-center bg-muted transition-colors hover:bg-muted/80"
          aria-label={`Load video: ${title}`}
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play size={32} fill="currentColor" />
            </div>
            <p className="text-sm text-muted-foreground">Click to load video</p>
          </div>
        </button>
      ) : (
        <>
          {/* YouTube Video */}
          {source === "youtube" && (
            <iframe
              src={getYouTubeUrl()}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              loading={lazyLoad ? "lazy" : undefined}
            />
          )}

          {/* Vimeo Video */}
          {source === "vimeo" && (
            <iframe
              src={getVimeoUrl()}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              loading={lazyLoad ? "lazy" : undefined}
            />
          )}

          {/* HTML5 Video */}
          {source === "html5" && (
            <video
              src={src}
              poster={poster}
              controls={controls}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              className="absolute inset-0 h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
}

/**
 * VideoGallery Component
 * 
 * Grid of video players with titles and descriptions.
 * 
 * @example
 * ```tsx
 * const videos = [
 *   { src: "dQw4w9WgXcQ", source: "youtube", title: "Tour Highlights" },
 *   { src: "123456789", source: "vimeo", title: "Destination Guide" },
 * ];
 * 
 * <VideoGallery videos={videos} columns={2} />
 * ```
 */
export function VideoGallery({
  videos,
  columns = 2,
  className,
}: {
  videos: Array<{
    src: string;
    source?: VideoSource;
    title?: string;
    description?: string;
  }>;
  columns?: 2 | 3;
  className?: string;
}) {
  const columnClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-6", columnClass, className)}>
      {videos.map((video, index) => (
        <div key={index} className="space-y-3">
          <VideoPlayer
            src={video.src}
            source={video.source}
            title={video.title}
            lazyLoad
          />
          {(video.title || video.description) && (
            <div>
              {video.title && (
                <h3 className="mb-1 text-foreground">{video.title}</h3>
              )}
              {video.description && (
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * VideoEmbed Component (Alias)
 * 
 * Alternative name for semantic clarity in editorial content.
 */
export const VideoEmbed = VideoPlayer;

export default VideoPlayer;