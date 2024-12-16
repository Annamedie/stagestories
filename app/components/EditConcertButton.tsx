import Link from "next/link";
import Edit from "../svg/Edit.svg";
interface EditProps {
  editUrl: string;
}
function EditConcertButton({ editUrl }: EditProps) {
  return (
    <Link href={editUrl}>
      <Edit height={30} aria-label="Edit post" />
    </Link>
  );
}
export default EditConcertButton;
