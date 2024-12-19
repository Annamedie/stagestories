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
      <main>
        <h2 className="sr-only">Edit Concert</h2>
        <div role="alert">
          <h3 className="text-white">
            We are sorry, this post does not exist anymore. Rock on!
          </h3>
        </div>
      </main>
    );
  }

  const postData = postSnap.data();
  return (
    <main>
      <h2 className="sr-only">Edit Concert</h2>
      <ConcertForm isEdit={true} postId={postId} initialData={postData} />
    </main>
  );
}
export default EditconcertPage;
