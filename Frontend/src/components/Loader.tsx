import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Triangle height={80} width={80} color="#0796EF" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
