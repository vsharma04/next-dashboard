import Image from 'next/image';
// import AKLogo from '@/assets/icons/AKlogo.svg';
// import GKLogo from '@/assets/icons/gw-logo.png';

export default function UserIcon() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative block h-10 w-10 max-w-10 rounded-full overflow-hidden z-1">
        <Image
          src="/assets/icons/gw-logo.png"
          alt="GK Logo"
          className="w-full h-full object-cover rounded-full"
          width={40}
          height={40}
          priority={true}
        />
      </span>
      <span className="relative block h-10 w-10 max-w-10 rounded-full overflow-hidden z-1">
        <Image
          src="/assets/icons/AKlogo.svg"
          alt="AK Logo"
          className="w-full h-full object-cover rounded-full"
          width={40}
          height={40}
        />
      </span>
    </div>
  );
}
