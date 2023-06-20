import Logo from "../images/logo.svg";

function Header() {
  return (
    <div className="bg-slate-700 w-full h-16 flex justify-between align-middle">
      <div
        className="w-[100x] self-center h-[60px]"
        style={{
          backgroundImage: `url(${Logo})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "fit",
        }}
      ></div>
      <div className="flex align-middle space-x-5">
        <h2>Product</h2>
        <h2>Use Cases</h2>
        <h2>Pricing</h2>
        <h2>About Us</h2>
      </div>
    </div>
  );
}

export default Header;
