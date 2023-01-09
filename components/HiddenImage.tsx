import Image from "next/image";

export default function HiddenImage({
  path,
  credit,
  visible = false,
}: {
  path: string;
  credit: string;
  visible?: boolean;
}) {
  return (
    <div className="hidden">
      <Image src={path} alt={credit} width={100} height={100} />
    </div>
  );
}
