import MultipleImageUploader from "@/components/ImageUploader/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetAllDivisionQuery } from "@/redux/feature/division/division.api";
import { useGetTourTypesQuery } from "@/redux/feature/tour/tour.api";
import { tourSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const AddTour = () => {
  const { data: divisionData, isLoading: divisionLoading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "Cox's Bazar Beach Adventure",
      description: "",
      division: "",
      tourType: "",
    },
  });

  const divisionOptions = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );
  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit = async (values: z.infer<typeof tourSchema>) => {
    const tourData = {
      ...values,
      startDate: formatISO(values.startDate),
      endDate: formatISO(values.endDate),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("files", image);
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="add-tour-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* ============ tour title ============ */}
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ============= division & tour type =============== */}
              <div className="flex flex-col min-[500px]:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={divisionLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionOptions?.map(
                            (option: { value: string; label: string }) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={tourTypeLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectContent>
                            {tourTypeOptions?.map(
                              (option: { value: string; label: string }) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ============= start & ending date =============== */}
              <div className="flex flex-col min-[500px]:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ========== tour description ======================= */}
              <div className="flex flex-col min-[500px]:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="resize-none h-52 no-scrollbar w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex-1 mt-5">
                  <MultipleImageUploader onChange={setImages} />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="add-tour-form"
            className="cursor-pointer"
          >
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddTour;
