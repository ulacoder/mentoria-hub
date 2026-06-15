import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg overflow-hidden relative">
        <Image
          src="/logo.jpg"
          alt="Mentoria Hub"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <span className="text-xl font-heading font-bold">Mentoria Hub</span>
    </Link>
  );
}
