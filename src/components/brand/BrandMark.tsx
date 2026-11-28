import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
};

export function BrandMark({ href = "/" }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-md"
    >
      <Image
        src="/assets/samrajya-logo-no-text.png"
        alt="Samrajya"
        width={28}
        height={28}
        className="size-7"
        priority
      />
      <span className="text-sm font-medium tracking-tight text-white">
        Samrajya
      </span>
    </Link>
  );
}
