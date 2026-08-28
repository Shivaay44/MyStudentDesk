import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  useImage?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  useImage = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs sm:text-sm',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Vector / Pixel Logo Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform hover:scale-105"
        >
          {/* Graduation Cap */}
          <path
            d="M50 14L8 35L50 56L92 35L50 14Z"
            fill="#5b45f5"
          />
          <path
            d="M8 35V48C8 48 10 50 12 50C14 50 16 48 16 48V39L50 56L84 39V48C84 48 86 50 88 50C90 50 92 48 92 48V35L50 14L8 35Z"
            fill="#4a32e5"
          />
          {/* Tassel */}
          <path
            d="M12 37V58C10 59 9 61 9 63C9 66 11 68 14 68C17 68 19 66 19 63C19 61 18 59 16 58V37H12Z"
            fill="#5b45f5"
          />

          {/* Book / Shield Frame (Navy/Dark Base) */}
          <path
            d="M20 54L50 70L80 54V72L50 88L20 72V54Z"
            fill="#0f172a"
            className="dark:fill-slate-100"
          />

          {/* Inner Badge with Checkmark */}
          <path
            d="M26 50L50 63L74 50V66L50 79L26 66V50Z"
            fill="#5b45f5"
          />

          {/* Checkmark inside Badge */}
          <path
            d="M44 65.5L39 60.5L42 57.5L44 59.5L58 45.5L61 48.5L44 65.5Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${titleSizes[size]} text-slate-900 dark:text-white`}>
            My<span className="text-[#5b45f5]">Student</span>Desk
          </span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#5b45f5]/10 text-[#5b45f5] border border-[#5b45f5]/20">
            v2.0
          </span>
        </div>
        {showSubtitle && (
          <p className={`font-semibold text-slate-500 dark:text-slate-400 mt-0.5 ${subSizes[size]} tracking-tight leading-tight`}>
            All-in-One Student Workspace
          </p>
        )}
      </div>
    </div>
  );
};
