import SingleImageUploader from "@/components/ImageUploader/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export function AddDivisionModals() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null)

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });


  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log({
        ...values,
        image
    })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form
                id="add-division"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mb-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Division Name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>

              <SingleImageUploader onChange={setImage} />
            </Form>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-division">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
