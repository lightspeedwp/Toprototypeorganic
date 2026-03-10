import svgPaths from "./svg-njulugncd6";
import clsx from "clsx";
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper2 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper2>;
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper2 additionalClassNames={clsx("basis-0 grow h-[40px] min-h-px min-w-px relative rounded-[4px] shrink-0", additionalClassNames)}>{children}</Wrapper2>;
}
type Icon1Props = {
  additionalClassNames?: string;
};

function Icon1({ additionalClassNames = "" }: Icon1Props) {
  return (
    <div className={clsx("absolute size-[16px] top-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #090909)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}
type LinkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LinkText({ text, additionalClassNames = "" }: LinkTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[21.5px] items-start left-0 top-px", additionalClassNames)}>
      <p className="basis-0 font-['Noto_Sans:Display_Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[#565656] text-[16px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#565656] text-[16px] text-nowrap top-0" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type HeadingText2Props = {
  text: string;
};

function HeadingText2({ text }: HeadingText2Props) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[#090909] text-[16px] text-nowrap top-[-0.5px]">{text}</p>
    </div>
  );
}
type TextText2Props = {
  text: string;
};

function TextText2({ text }: TextText2Props) {
  return (
    <Wrapper1 additionalClassNames="h-[21px] w-[70.727px]">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[71px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </Wrapper1>
  );
}
type ParagraphText3Props = {
  text: string;
};

function ParagraphText3({ text }: ParagraphText3Props) {
  return (
    <div className="h-[21px] relative shrink-0 w-full">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] text-nowrap top-0" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <div className="absolute bg-[#e1e1e1] content-stretch flex h-[24.5px] items-start left-[269.17px] px-[8px] py-[4px] rounded-[1.67772e+07px] top-[14px] w-[55.828px]">
      <p className="font-['Noto_Sans:Display_Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#565656] text-[12px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type ParagraphText2Props = {
  text: string;
};

function ParagraphText2({ text }: ParagraphText2Props) {
  return (
    <div className="h-[18.375px] relative shrink-0 w-full">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[121px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type ParagraphText1Props = {
  text: string;
};

function ParagraphText1({ text }: ParagraphText1Props) {
  return (
    <div className="h-[42px] relative shrink-0 w-full">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[185px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ additionalClassNames = "" }: IconProps) {
  return (
    <div className={clsx("absolute size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #565656)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #565656)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[42px] relative shrink-0 w-full">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[193px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type HeadingText1Props = {
  text: string;
};

function HeadingText1({ text }: HeadingText1Props) {
  return (
    <div className="h-[20px] relative shrink-0 w-full">
      <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[#090909] text-[16px] text-nowrap top-[-0.5px]">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper1 additionalClassNames="h-[21px] w-[77.438px]">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[78px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </Wrapper1>
  );
}
type HeadingTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingText({ text, additionalClassNames = "" }: HeadingTextProps) {
  return (
    <Wrapper2 additionalClassNames={clsx("h-[40px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[40px] left-0 text-[#090909] text-[32px] text-nowrap top-[-0.5px]">{text}</p>
    </Wrapper2>
  );
}
type ImageAndTextProps = {
  text: string;
};

function ImageAndText({ text }: ImageAndTextProps) {
  return (
    <Wrapper1 additionalClassNames="h-[36px] w-[30px]">
      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[36px] left-0 text-[#090909] text-[30px] text-nowrap top-[-0.5px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
        {text}
      </p>
    </Wrapper1>
  );
}

export default function ToPlugin() {
  return (
    <div className="bg-white relative size-full" data-name="TO Plugin">
      <div className="absolute content-stretch flex flex-col h-[3090.375px] items-start left-0 pb-0 pt-[65px] px-0 top-0 w-[1110px]" data-name="PageLayout">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1110px]" data-name="Main Content">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
            <div className="bg-[rgba(225,225,225,0.3)] h-[391px] relative shrink-0 w-full" data-name="TemplateTester">
              <div aria-hidden="true" className="absolute border-[#757575] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="size-full">
                <div className="content-stretch flex flex-col items-start pb-px pt-[64px] px-[171px] relative size-full">
                  <div className="content-stretch flex flex-col gap-[16px] h-[262px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="h-[75px] relative shrink-0 w-full" data-name="Heading 1">
                      <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[75px] left-[384.47px] text-[#090909] text-[60px] text-center text-nowrap top-0 translate-x-[-50%]">Template Tester</p>
                    </div>
                    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[384.13px] text-[#565656] text-[16px] text-center text-nowrap top-0 translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                        Test all WordPress templates and page archetypes in one place
                      </p>
                    </div>
                    <div className="h-[115px] relative shrink-0 w-full" data-name="Container">
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[115px] items-start left-[209.9px] top-0 w-[102.961px]" data-name="Container">
                        <div className="h-[90px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[90px] left-[51.97px] text-[#4a7311] text-[60px] text-center text-nowrap top-[-0.5px] translate-x-[-50%]">15</p>
                        </div>
                        <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-[51px] text-[#565656] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Total Templates
                          </p>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[115px] items-start left-[344.86px] top-0 w-[110.508px]" data-name="Container">
                        <div className="h-[90px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[90px] left-[56.23px] text-[#4a7311] text-[60px] text-center text-nowrap top-[-0.5px] translate-x-[-50%]">11</p>
                        </div>
                        <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-[55.5px] text-[#565656] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Active Templates
                          </p>
                        </div>
                      </div>
                      <div className="absolute content-stretch flex flex-col gap-[4px] h-[115px] items-start left-[487.37px] top-0 w-[70.734px]" data-name="Container">
                        <div className="h-[90px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[90px] left-[35.38px] text-[#4a7311] text-[60px] text-center text-nowrap top-[-0.5px] translate-x-[-50%]">7</p>
                        </div>
                        <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-[35.5px] text-[#565656] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Categories
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white h-[2041.375px] relative shrink-0 w-full" data-name="TemplateTester">
              <div className="size-full">
                <div className="content-stretch flex flex-col gap-[48px] items-start pb-0 pt-[64px] px-[32px] relative size-full">
                  <div className="content-stretch flex flex-col gap-[24px] h-[327.75px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
                      <ImageAndText text="🗺️" />
                      <HeadingText text="Tours" additionalClassNames="w-[87.016px]" />
                      <TextText text="4 templates" />
                    </div>
                    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_134.38fr)_minmax(0px,_1fr)] h-[263.75px] relative shrink-0 w-full" data-name="Container">
                      <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Tours Archive" />
                          <ParagraphText text="WordPress template: archive-tour.html" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[136px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /tour-archive-wp
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[93.38px]" />
                      </div>
                      <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Tour Detail" />
                          <ParagraphText1 text="WordPress template: single-tour.html" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[129px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /tour-single-wp
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[93.38px]" />
                      </div>
                      <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Tours Archive (Legacy)" />
                          <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[184px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Content hub archetype with filtering
                            </p>
                          </div>
                          <ParagraphText2 text="Route: /tours-archive" />
                        </div>
                        <TextText1 text="Legacy" />
                        <Icon additionalClassNames="left-[297px] top-[93.38px]" />
                      </div>
                      <div className="[grid-area:2_/_1] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Tour Detail (Legacy)" />
                          <ParagraphText3 text="Single detail archetype" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[108px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /tour-single
                            </p>
                          </div>
                        </div>
                        <TextText1 text="Legacy" />
                        <Icon additionalClassNames="left-[297px] top-[72.38px]" />
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[24px] h-[368.75px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
                      <ImageAndText text="🌍" />
                      <HeadingText text="Destinations" additionalClassNames="w-[192.805px]" />
                      <TextText text="4 templates" />
                    </div>
                    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_154.38fr)_minmax(0px,_1fr)] h-[304.75px] relative shrink-0 w-full" data-name="Container">
                      <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[31px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Destinations Archive" />
                          <ParagraphText text="WordPress template: archive-destination.html" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[177px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /destination-archive-wp
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[113.38px]" />
                      </div>
                      <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[31px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Destination Detail" />
                          <ParagraphText1 text="WordPress template: single-destination.html" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[170px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /destination-single-wp
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[113.38px]" />
                      </div>
                      <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[112.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <div className="h-[40px] relative shrink-0 w-full" data-name="Heading 3">
                            <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[#090909] text-[16px] top-[-0.5px] w-[159px]">Destinations Archive (Legacy)</p>
                          </div>
                          <ParagraphText1 text="Content hub for hierarchical content" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[162px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /destinations-archive
                            </p>
                          </div>
                        </div>
                        <TextText1 text="Legacy" />
                        <Icon additionalClassNames="left-[297px] top-[113.38px]" />
                      </div>
                      <div className="[grid-area:2_/_1] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Destination Detail (Legacy)" />
                          <ParagraphText text="Single detail with hierarchical relationships" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[149px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /destination-single
                            </p>
                          </div>
                        </div>
                        <TextText1 text="Legacy" />
                        <Icon additionalClassNames="left-[297px] top-[93.38px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[198.375px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-0 w-[1046px]" data-name="Container">
                      <ImageAndText text="🏨" />
                      <HeadingText text="Accommodation" additionalClassNames="w-[245.883px]" />
                      <TextText2 text="1 template" />
                    </div>
                    <div className="absolute bg-white border border-[#757575] border-solid h-[134.375px] left-0 rounded-[6px] top-[64px] w-[338px]" data-name="Button">
                      <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[20px] pl-0 pr-[80px] py-0 top-[20px] w-[296px]" data-name="Container">
                        <HeadingText1 text="Accommodation Archive" />
                        <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[190px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Accommodation listings with filtering
                          </p>
                        </div>
                        <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[184px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Route: /accommodation-archive
                          </p>
                        </div>
                      </div>
                      <Icon additionalClassNames="left-[296px] top-[92.38px]" />
                    </div>
                  </div>
                  <div className="h-[177.375px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-0 w-[1046px]" data-name="Container">
                      <ImageAndText text="👥" />
                      <HeadingText text="Team" additionalClassNames="w-[82.172px]" />
                      <TextText2 text="1 template" />
                    </div>
                    <div className="absolute bg-white border border-[#757575] border-solid h-[113.375px] left-0 rounded-[6px] top-[64px] w-[338px]" data-name="Button">
                      <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[20px] pl-0 pr-[80px] py-0 top-[20px] w-[296px]" data-name="Container">
                        <HeadingText1 text="Team Archive" />
                        <ParagraphText3 text="Team members with FAQs" />
                        <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[120px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Route: /team-archive
                          </p>
                        </div>
                      </div>
                      <Icon additionalClassNames="left-[296px] top-[71.38px]" />
                    </div>
                  </div>
                  <div className="h-[177.375px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-0 w-[1046px]" data-name="Container">
                      <ImageAndText text="📝" />
                      <HeadingText text="Blog Pages" additionalClassNames="w-[161.109px]" />
                      <TextText2 text="1 template" />
                    </div>
                    <div className="absolute bg-white border border-[#757575] border-solid h-[113.375px] left-0 rounded-[6px] top-[64px] w-[338px]" data-name="Button">
                      <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[20px] pl-0 pr-[80px] py-0 top-[20px] w-[296px]" data-name="Container">
                        <HeadingText1 text="Blog Archive" />
                        <ParagraphText3 text="Editorial listing archetype" />
                        <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[116px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Route: /blog-archive
                          </p>
                        </div>
                      </div>
                      <Icon additionalClassNames="left-[296px] top-[71.38px]" />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[24px] h-[177.375px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
                      <ImageAndText text="📄" />
                      <HeadingText text="Content Pages" additionalClassNames="w-[218.344px]" />
                      <TextText text="3 templates" />
                    </div>
                    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[113.375px] relative shrink-0 w-full" data-name="Container">
                      <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="About Us" />
                          <ParagraphText3 text="Company information" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[112px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /about-page
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[72.38px]" />
                      </div>
                      <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="Contact" />
                          <ParagraphText3 text="Contact information and form" />
                          <ParagraphText2 text="Route: /contact-page" />
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[72.38px]" />
                      </div>
                      <div className="[grid-area:1_/_3] bg-white place-self-stretch relative rounded-[6px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[6px]" />
                        <div className="absolute content-stretch flex flex-col gap-[8px] h-[71.375px] items-start left-[21px] pl-0 pr-[80px] py-0 top-[21px] w-[296px]" data-name="Container">
                          <HeadingText1 text="FAQ" />
                          <ParagraphText3 text="Frequently asked questions" />
                          <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[97px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                              Route: /faq-page
                            </p>
                          </div>
                        </div>
                        <Icon additionalClassNames="left-[297px] top-[72.38px]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[198.375px] relative shrink-0 w-full" data-name="Container">
                    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-0 w-[1046px]" data-name="Container">
                      <ImageAndText text="🏷️" />
                      <HeadingText text="Taxonomy Archives" additionalClassNames="w-[295.414px]" />
                      <TextText2 text="1 template" />
                    </div>
                    <div className="absolute bg-white border border-[#757575] border-solid h-[134.375px] left-0 rounded-[6px] top-[64px] w-[338px]" data-name="Button">
                      <div className="absolute content-stretch flex flex-col gap-[8px] h-[92.375px] items-start left-[20px] pl-0 pr-[80px] py-0 top-[20px] w-[296px]" data-name="Container">
                        <HeadingText1 text="Travel Style Archive" />
                        <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-0 text-[#565656] text-[14px] top-0 w-[151px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Taxonomy archive with contextual navigation
                          </p>
                        </div>
                        <div className="h-[18.375px] relative shrink-0 w-full" data-name="Paragraph">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[18.375px] left-0 text-[12.25px] text-[rgba(86,86,86,0.6)] top-[-0.5px] w-[148px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Route: /taxonomy-archive
                          </p>
                        </div>
                      </div>
                      <Icon additionalClassNames="left-[296px] top-[92.38px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(225,225,225,0.3)] h-[210px] relative shrink-0 w-full" data-name="TemplateTester">
              <div aria-hidden="true" className="absolute border-[#757575] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
              <div className="size-full">
                <div className="content-stretch flex flex-col items-start pb-0 pt-[49px] px-[171px] relative size-full">
                  <div className="content-stretch flex flex-col gap-[16px] h-[113px] items-start relative shrink-0 w-full" data-name="Container">
                    <div className="h-[25px] relative shrink-0 w-full" data-name="Heading 3">
                      <p className="absolute font-['Lora:SemiBold',sans-serif] font-semibold leading-[25px] left-[384.05px] text-[#090909] text-[20px] text-center text-nowrap top-[-0.5px] translate-x-[-50%]">Development Tool</p>
                    </div>
                    <div className="h-[72px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[384.21px] text-[#565656] text-[16px] text-center top-0 translate-x-[-50%] w-[762px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                        This Template Tester is a development tool for validating WordPress block theme patterns and page archetypes. All templates shown here map directly to WordPress templates, template parts, and block patterns as defined in the Guidelines.md.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(225,225,225,0.3)] h-[383px] relative shrink-0 w-[1110px]" data-name="Footer">
          <div aria-hidden="true" className="absolute border-[#757575] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[49px] px-0 relative size-full">
            <div className="h-[286px] relative shrink-0 w-full" data-name="Container">
              <div className="size-full">
                <div className="content-stretch flex flex-col gap-[32px] items-start px-[32px] py-0 relative size-full">
                  <div className="gap-[32px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[192px] relative shrink-0 w-full" data-name="Footer">
                    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start pb-0 place-self-stretch pt-[48px] px-0 relative shrink-0" data-name="Container">
                      <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
                        <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#565656] text-[16px] top-0 w-[230px]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                          Creating unforgettable African safari experiences since 2005
                        </p>
                      </div>
                    </div>
                    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
                      <HeadingText2 text="Explore" />
                      <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start relative shrink-0 w-full" data-name="List">
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Tours" additionalClassNames="w-[41.617px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Destinations" additionalClassNames="w-[94.273px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Accommodation" additionalClassNames="w-[123.156px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Travel Styles" additionalClassNames="w-[92.344px]" />
                        </div>
                      </div>
                    </div>
                    <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
                      <HeadingText2 text="Company" />
                      <div className="content-stretch flex flex-col gap-[8px] h-[152px] items-start relative shrink-0 w-full" data-name="List">
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="About Us" additionalClassNames="w-[68.93px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Our Team" additionalClassNames="w-[73.891px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Blog" additionalClassNames="w-[34.055px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="Contact" additionalClassNames="w-[57.891px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <Text text="FAQ" additionalClassNames="w-[30.391px]" />
                        </div>
                      </div>
                    </div>
                    <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
                      <HeadingText2 text="Contact" />
                      <div className="content-stretch flex flex-col gap-[8px] h-[88px] items-start relative shrink-0 w-full" data-name="List">
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-0 text-[#565656] text-[16px] text-nowrap top-0" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                            Cape Town, South Africa
                          </p>
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <LinkText text="+27 21 123 4567" additionalClassNames="w-[122.305px]" />
                        </div>
                        <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
                          <LinkText text="info@touroperator.com" additionalClassNames="w-[175.141px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col h-[62px] items-start pb-0 pt-[33px] px-0 relative shrink-0 w-full" data-name="Footer">
                    <div aria-hidden="true" className="absolute border-[#757575] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex h-[29px] items-center justify-between relative shrink-0 w-full" data-name="Container">
                      <Wrapper1 additionalClassNames="h-[24px] w-[311.523px]">
                        <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[156px] text-[#565656] text-[16px] text-center text-nowrap top-0 translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                          © 2024 Tour Operator. All rights reserved.
                        </p>
                      </Wrapper1>
                      <Wrapper1 additionalClassNames="h-[29px] rounded-[4px] w-[152.602px]">
                        <div className="absolute left-[12px] size-[16px] top-[6.5px]" data-name="Icon">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <g id="Icon">
                              <path d={svgPaths.p3a250780} id="Vector" stroke="var(--stroke-0, #565656)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            </g>
                          </svg>
                        </div>
                        <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[21px] left-[88.5px] text-[#565656] text-[14px] text-center text-nowrap top-[4px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                          Template Tester
                        </p>
                      </Wrapper1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.6)] content-stretch flex flex-col h-[65px] items-start left-0 pb-px pt-0 px-[32px] top-0 w-[1110px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#757575] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between pl-[162.203px] pr-[0.008px] py-0 relative size-full">
              <div className="h-[40px] relative shrink-0 w-[680.406px]" data-name="Navigation">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
                  <Wrapper1 additionalClassNames="h-[40px] rounded-[4px] w-[85.617px]">
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[33px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Tours
                    </p>
                    <Icon1 additionalClassNames="left-[57.62px]" />
                  </Wrapper1>
                  <Wrapper1 additionalClassNames="h-[40px] rounded-[4px] w-[138.273px]">
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[59px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Destinations
                    </p>
                    <Icon1 additionalClassNames="left-[110.27px]" />
                  </Wrapper1>
                  <Wrapper>
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[74.5px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Accommodation
                    </p>
                    <Icon1 additionalClassNames="left-[139.16px]" />
                  </Wrapper>
                  <Wrapper1 additionalClassNames="h-[40px] rounded-[4px] w-[78.055px]">
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[29.5px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Blog
                    </p>
                    <Icon1 additionalClassNames="left-[50.05px]" />
                  </Wrapper1>
                  <Wrapper1 additionalClassNames="h-[40px] rounded-[4px] w-[89.414px]">
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[35.5px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      About
                    </p>
                    <Icon1 additionalClassNames="left-[61.41px]" />
                  </Wrapper1>
                  <Wrapper1 additionalClassNames="h-[40px] rounded-[4px] w-[101.891px]">
                    <p className="absolute font-['Noto_Sans:Display_Regular',sans-serif] font-normal leading-[24px] left-[41.5px] text-[#090909] text-[16px] text-center text-nowrap top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Contact
                    </p>
                    <Icon1 additionalClassNames="left-[73.89px]" />
                  </Wrapper1>
                </div>
              </div>
              <div className="h-[40px] relative shrink-0 w-[157.898px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
                  <div className="relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
                      <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                        <div className="absolute inset-[12.5%]" data-name="Vector">
                          <div className="absolute inset-[-5.56%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                              <path d={svgPaths.p9bfa300} id="Vector" stroke="var(--stroke-0, #090909)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Wrapper additionalClassNames="bg-[#4a7311]">
                    <p className="absolute font-['Noto_Sans:Display_Medium',sans-serif] font-medium leading-[24px] left-[55px] text-[16px] text-center text-nowrap text-white top-[8px] translate-x-[-50%]" style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}>
                      Book Now
                    </p>
                  </Wrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#4a7311] content-stretch flex items-center justify-center left-[1046px] opacity-0 rounded-[1.67772e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[48px] top-[797px]" data-name="BackToTopButton">
        <div className="relative shrink-0 size-[24px]" data-name="Icon">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Icon">
              <path d="M18 15L12 9L6 15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}