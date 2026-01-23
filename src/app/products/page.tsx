import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
};

export default function Page() {
  return <ProductsClient />;
}
