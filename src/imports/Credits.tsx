import svgPaths from "./svg-wplpcom0x3";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(9, 9, 9, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          {children}
        </svg>
      </div>
    </div>
  );
}

export default function Credits() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative size-full" data-name="Credits">
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Credits">
          <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Credits">
            <p className="font-['Lexend:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-black text-nowrap">© 2024 LightSpeed. All rights reserved.</p>
          </div>
          <div className="content-stretch flex font-['Lexend:Medium',sans-serif] font-medium gap-[20px] items-start leading-[1.5] relative shrink-0 text-[12px] text-black text-nowrap underline" data-name="Footer Links">
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0">Privacy Policy</p>
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0">Terms of Service</p>
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0">Cookies Settings</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Social Links">
          <Wrapper>
            <g id="Icon/Social/facebook">
              <rect fill="var(--fill-0, #090909)" height="32" rx="16" width="32" />
              <path d={svgPaths.p179a2400} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper>
          <Wrapper>
            <g id="Icon/Social/instagram">
              <rect fill="var(--fill-0, #090909)" height="32" rx="16" width="32" />
              <path d={svgPaths.p644fe7e} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper>
          <Wrapper>
            <g id="Icon/Social/x/twitter">
              <rect fill="var(--fill-0, #090909)" height="32" rx="16" width="32" />
              <path d={svgPaths.p1b1df500} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper>
          <Wrapper>
            <g id="Icon/Social/linkedin">
              <rect fill="var(--fill-0, #090909)" height="32" rx="16" width="32" />
              <path d={svgPaths.p2fa54000} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper>
          <Wrapper>
            <g id="Icon/Social/youtube">
              <rect fill="var(--fill-0, #090909)" height="32" rx="16" width="32" />
              <path d={svgPaths.p36e71380} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}