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
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/feature/tour/tour.api";
import { tourSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const AddTour = () => {
  const { data: divisionData, isLoading: divisionLoading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const [addTour, { isLoading: addTourLoading }] = useAddTourMutation();
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "Dhaka to Rajshahi Heritage Tour",
      description:
        "Discover the historical treasures of Rajshahi, known as the 'Silk City' of Bangladesh. Explore ancient Buddhist ruins at Paharpur, visit the magnificent Puthia Palace complex, and experience the rich cultural heritage of north Bengal. Perfect for history enthusiasts and cultural explorers.",
      location: "Rajshahi",
      costFrom: "12000",
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      departureLocation: "Dhaka",
      arrivalLocation: "Rajshahi",
      included: [
        { value: "Accommodation for 2 nights" },
        { value: "All meals (breakfast, lunch, dinner)" },
        { value: "Transportation (AC bus)" },
        { value: "Professional tour guide" },
        { value: "Entry fees to all historical sites" },
        { value: "Paharpur monastery visit" },
      ],
      excluded: [
        { value: "Personal expenses" },
        { value: "Extra activities not mentioned" },
        { value: "Travel insurance" },
        { value: "Shopping expenses" },
        { value: "Photography charges at monuments" },
      ],
      amenities: [
        { value: "Comfortable hotel rooms" },
        { value: "Free WiFi" },
        { value: "Air conditioning" },
        { value: "Local transportation" },
        { value: "Cultural performance evening" },
      ],
      tourPlan: [
        { value: "Day 1: Arrival in Rajshahi and Puthia Palace complex tour" },
        { value: "Day 2: Paharpur Buddhist monastery and Mahasthangarh visit" },
        { value: "Day 3: Rajshahi city tour and silk weaving centers" },
      ],
      maxGuest: "20",
      minAge: "8",
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

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: amenitiesFields,
    append: appendAmenities,
    remove: removeAmenities,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

  const onSubmit = async (values: z.infer<typeof tourSchema>) => {
    const toastId = toast.loading("Creating tour....");

    if (images.length === 0) {
      toast.error("Please add some images", { id: toastId });
      return;
    }

    const tourData = {
      ...values,
      costFrom: Number(values.costFrom),
      minAge: Number(values.minAge),
      maxGuest: Number(values.maxGuest),
      startDate: formatISO(values.startDate),
      endDate: formatISO(values.endDate),
      included:
        values.included[0].value === ""
          ? []
          : values.included.map((item: { value: string }) => item.value),
      excluded:
        values.included[0].value === ""
          ? []
          : values.excluded.map((item: { value: string }) => item.value),
      amenities:
        values.amenities[0].value === ""
          ? []
          : values.amenities.map((item: { value: string }) => item.value),
      tourPlan:
        values.tourPlan[0].value === ""
          ? []
          : values.tourPlan.map((item: { value: string }) => item.value),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("files", image);
      }
    });

    try {
      const res = await addTour(formData).unwrap();

      if (res.success && res.statusCode === 201) {
        toast.success(res.message, { id: toastId });
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
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

              {/* ================ cost & location */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="costFrom"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* =================== depreture & arival location */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="departureLocation"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Departure Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="arrivalLocation"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Arrival Location</FormLabel>
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

              {/* ========== tour description & images ======================= */}
              <div className="flex flex-col min-[920px]:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1 max-[920px]:order-2">
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

              <div className="border-t border-muted w-full "></div>

              {/* =========== included =================== */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Included</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendIncluded({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {includedFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeIncluded(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ============== excluded ==================== */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Excluded</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendExcluded({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {excludedFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeExcluded(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ============== Amenities ==================== */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Amenities</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendAmenities({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {amenitiesFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`amenities.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeAmenities(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================== tour plan ===========================  */}
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold">Tour Plan</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendTourPlan({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {tourPlanFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`tourPlan.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeTourPlan(index)}
                        variant="destructive"
                        className="!bg-red-700"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="add-tour-form"
            disabled={addTourLoading}
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
