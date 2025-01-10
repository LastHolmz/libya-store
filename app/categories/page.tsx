import { getCategories } from "@/database/categories";

const page = async () => {
  const categories = await getCategories();
  return (
    <main>
      {categories.map((category, index) => (
        <div key={index}>
          {category.title}- {"   "}
          <span>{category.id}</span>
        </div>
      ))}
    </main>
  );
};

export default page;
