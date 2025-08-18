import { AddDivisionModals } from "@/components/modules/Admin/Division/AddDivisionModals";

export default function Division() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-semibold font-tour-title">Division</h1>
        <AddDivisionModals />
      </div>
    </div>
  );
}
