export default function Home() {
  return (
    <>
      <div className="md:flex-row flex-col container flex mx-auto border-b border-gray-200 p-2">
        <div className="md:ml-5 mx-auto bg-blue-100 text-3xl">
          Total 30pt
        </div>
        <div className="md:ml-auto md:mr-0 mx-auto bg-blue-100 text-3xl">
          4 / 10
        </div>
      </div>
      <div className="container flex mx-auto border-b border-gray-200 py-3">
        <div className="mx-auto bg-blue-100">
          image
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap">
        {
          Array(4).fill(null).map((_, i) => (
            <div className="md:w-1/2 w-full p-4 hover:scale-105">
              <div className="text-center bg-gray-200 rounded-lg p-8">hoeg</div>
            </div>
          ))
        }
      </div>
    </>
  );
}
