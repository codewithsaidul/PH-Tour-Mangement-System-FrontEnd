import { AddDivisionModals } from "@/components/modules/Admin/Division/AddDivisionModals";
import { useGetAllDivisionQuery } from "@/redux/feature/division/division.api";
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




export default function Division() {
  const { data: divisionData } = useGetAllDivisionQuery(undefined);


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
                  {/* <DeleteConfirmationModal */}
                    {/* // onConfirm={() => handleRemoveTourTypes(item._id)} */}
                  {/* > */}
                    <Button size="sm" className="cursor-pointer bg-red-500">
                      <Trash2Icon />
                    </Button>
                  {/* </DeleteConfirmationModal> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
