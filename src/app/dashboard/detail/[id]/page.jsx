// pages/detail/[id].js
"use client"
import { useParams } from "next/navigation";



const DetailPage = () => {

  const { id } = useParams();

  return (
    <div>
      <h1>Detail Page for ID: {id}</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default DetailPage;
