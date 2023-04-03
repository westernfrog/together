import SuggestedCard from "./SuggestedCard";

export default function Suggested() {
  return (
    <>
      <div className="my-4 px-2">
        <h4 className="text-dm fw-bold">Suggested for you 👻</h4>
        <div className="overflow-auto" style={{ maxHeight: "500px" }}>
          <SuggestedCard />
        </div>
      </div>
    </>
  );
}
