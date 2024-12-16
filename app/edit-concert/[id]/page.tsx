import ConcertForm from "@/app/components/ConcertForm";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

interface EditconcertPageProps {
  params: {
    id: string;
  };
}

async function EditconcertPage({ params }: EditconcertPageProps) {
  const postId = params.id;
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    return (
      <div>
        <h1 className="text-white">
          We are sorry this post do no longer exist, rock on!
        </h1>
      </div>
    );
  }

  const postData = postSnap.data();
  return (
    <div>
      <ConcertForm isEdit={true} postId={postId} initialData={postData} />
    </div>
  );
}
export default EditconcertPage;
