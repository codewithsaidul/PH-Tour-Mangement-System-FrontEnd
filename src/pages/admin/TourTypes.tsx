import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";
import { AddTourTypeModal } from "@/components/modules/Admin/TourTypes/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery, useRemoveTourTypesMutation } from "@/redux/feature/tour/tour.api";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function TourTypes() {
  const { data } = useGetTourTypesQuery(undefined);
  const [ removeTourType ] = useRemoveTourTypesMutation()

  const handleRemoveTourTypes = async (tourTypeId: string) => {
    const toastId = toast.loading("Removing...")
      try {
        const res = await removeTourType(tourTypeId).unwrap();

        if (res.success) {
          toast.success(res.message, { id: toastId })
        }
      } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof (error as { data: { message: unknown } }).data.message === "string"
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
        <h1 className="text-3xl font-semibold font-tour-title">Tour Types</h1>
        <AddTourTypeModal />
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
            {data?.data?.map((item: { name: string; _id: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell>
                  <DeleteConfirmationModal onConfirm={() => handleRemoveTourTypes(item._id)}>
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
