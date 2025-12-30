interface BlobProps {
  colours?: string[];
}

const gradientAnimation = `
  @keyframes drift {
    0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
    33% { transform: translateY(-20px) translateX(10px) scale(1.02); }
    66% { transform: translateY(10px) translateX(-15px) scale(0.98); }
  }
  .animate-gradient-circle {
    animation: drift 10s ease-in-out infinite;
    transform-origin: center;
  }
  .delay-1 { animation-delay: -2s; }
  .delay-2 { animation-delay: -5s; }
`;

export function GradientLight({ colours }: BlobProps) {
  const bg = colours?.[0] ?? "#6600FF";
  const accent = colours?.[3] ?? "#00CC99";

  return (
    <svg
      id="visual-gradient-light"
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{gradientAnimation}</style>
      <defs>
        <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="120" result="blur" />
        </filter>
      </defs>
      <rect width="900" height="600" fill={bg} />
      <g filter="url(#blur1)">
        <circle
          className="animate-gradient-circle"
          cx="603"
          cy="146"
          fill={accent}
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-1"
          cx="395"
          cy="504"
          fill={bg}
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-2"
          cx="766"
          cy="524"
          fill={accent}
          r="357"
        />
        <circle
          className="animate-gradient-circle"
          cx="425"
          cy="77"
          fill={accent}
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-1"
          cx="75"
          cy="238"
          fill={bg}
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-2"
          cx="478"
          cy="311"
          fill={accent}
          r="357"
        />
      </g>
    </svg>
  );
}

export function GradientDark() {
  return (
    <svg
      id="visual-gradient-dark"
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{gradientAnimation}</style>
      <defs>
        <filter id="blur-dark" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="120" result="blur" />
        </filter>
      </defs>
      <rect width="900" height="600" fill="#0a0a0a" />
      <g filter="url(#blur-dark)">
        {/* Deep Grey and Black accents for a subtle smoke effect */}
        <circle
          className="animate-gradient-circle"
          cx="603"
          cy="146"
          fill="#1a1a1a"
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-1"
          cx="395"
          cy="504"
          fill="#000000"
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-2"
          cx="766"
          cy="524"
          fill="#222222"
          r="357"
        />
        <circle
          className="animate-gradient-circle"
          cx="425"
          cy="77"
          fill="#1a1a1a"
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-1"
          cx="75"
          cy="238"
          fill="#000000"
          r="357"
        />
        <circle
          className="animate-gradient-circle delay-2"
          cx="478"
          cy="311"
          fill="#222222"
          r="357"
        />
      </g>
    </svg>
  );
}
