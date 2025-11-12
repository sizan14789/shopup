import SingleCategory from "./SingleCategory";

const categories = [
  {
    id: 1,
    name: "Smartphones",
    tag: "tech",
  },
  {
    id: 2,
    name: "Laptops",
    tag: "tech",
  },
  {
    id: 3,
    name: "Accessories",
    tag: "tech",
  },
];

export default function Categories() {
  return (
    <>
      <div className="flex w-full items-center mt-12 gap-2">
        <p className="border-b w-full border-b-(--border-button) "></p>
        <h2 className="text-2xl font-semibold">Categories</h2>
        <p className="border-b w-full border-b-(--border-button) "></p>
      </div>
      {categories.map(({ id, name, tag }) => {
        return <SingleCategory key={id} name={name} tag={tag} />;
      })}
      <div className="mb-20" ></div>
    </>
  );
}
