import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Oval
        height={80}
        width={80}
        color="#00BFFF"
        ariaLabel="loading"
        secondaryColor="#ff5733"
        strokeWidth={4}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
