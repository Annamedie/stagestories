import Link from "next/link";
import Edit from "../svg/Edit.svg";
interface EditProps {
  editUrl: string;
}
function EditConcertButton({ editUrl }: EditProps) {
  return (
    <Link
      href={editUrl}
      aria-label="Edit post"
      className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
    >
      <Edit height={30} />
    </Link>
  );
}
export default EditConcertButton;
