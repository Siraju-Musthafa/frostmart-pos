import React from "react";

const SalesInvoice = React.forwardRef(
  ({ bill }, ref) => {

    if (!bill) return null;

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
        className="
    p-4
    md:p-6
    w-full
    max-w-[500px]
    mx-auto
  "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          SnowFreez
        </h1>

        <p className="text-center text-sm" style={{ color: "#6b7280" }}>
          Frozen Food Store
        </p>
        <div className="text-center text-sm" style={{ color: "#6b7280" }}>
          <p>Phone: +91 XXXXXXXXXX</p>
          <p>Kozhikode, Kerala</p>
        </div>

        <hr className="my-4" />

        <div className="space-y-2 text-sm md:text-base">
          <p>
            <strong>Bill No:</strong> {bill.billNumber}
          </p>

          <p>
            <strong>Customer:</strong> {bill.customer?.hotelName || "Walk-in"}
          </p>

          <p>
            <strong>Payment:</strong> {bill.paymentMethod}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(bill.createdAt).toLocaleDateString()}
          </p>
        </div>

        <hr className="my-4" />

        {bill.items?.map((item) => (
          <div
            key={item.id}
            className="
    flex
    justify-between
    gap-3
    mb-2
    text-sm
    md:text-base
  "
          >
            <span className="break-words">
              {item.product.name}×{item.quantity}
            </span>

            <span>₹{item.subtotal}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div
          className="
    flex
    justify-between
    font-bold
    text-lg
    md:text-xl
  "
        >
          <span>Total</span>
          <span>₹{bill.totalAmount}</span>
        </div>
        <p className="text-center mt-6 text-sm" style={{ color: "#6b7280" }}>
          Thank you for your purchase
        </p>
      </div>
    );
  }
);

export default SalesInvoice;