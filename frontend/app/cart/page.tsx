
import CartContainer from "./CartContainer";

export default function Cart() {


  return (
    <div className="shell flex grow my-10">
      <div className="core grow flex flex-col">
        <h2 className="text-4xl mb-4">Cart</h2>
        
        <CartContainer />
        
      </div>
    </div>
  );
}
