"use client";
import { Placeholder } from "@/src/components/placeholder";

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "Something went wrong!"} />;
}
