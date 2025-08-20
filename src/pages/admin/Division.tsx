import { AddDivisionModals } from "@/components/modules/Admin/Division/AddDivisionModals";
import { useGetAllDivisionQuery, useRemoveDivisionMutation } from "@/redux/feature/division/division.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { toast } from "sonner";

export default function Division() {
  const { data: divisionData } = useGetAllDivisionQuery(undefined);
  const [ removeDivision ] = useRemoveDivisionMutation()

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeDivision(divisionId).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof (error as { data: { message: unknown } }).data.message ===
          "string"
      ) {
        toast.error((error as { data: { message: string } }).data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-semibold font-tour-title">Division</h1>
        <AddDivisionModals />
      </div>

      <div className="border border-muted p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {divisionData?.map((item: { name: string; _id: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell>
                  <DeleteConfirmationModal
                    onConfirm={() => handleRemoveDivision(item._id)}
                  >
                    <Button size="sm" className="cursor-pointer bg-red-500">
                      <Trash2Icon />
                    </Button>
                  </DeleteConfirmationModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
