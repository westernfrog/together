import Image from "next/image";

export default function UserTag(params) {
  return (
    <>
      <div className="d-flex gap-3 py-3 bg-grey mb-3 px-3 rounded">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/774/774122.png"
          alt=""
          width={40}
          height={40}
          className="rounded-circle flex-shrink-0"
        />
        <div className="d-flex w-100 justify-content-between">
          <div>
            <h6 className="mb-0">Aman Singh</h6>
            <p className="mb-0 opacity-75">@westernfrog</p>
          </div>
        </div>
      </div>
    </>
  );
}
