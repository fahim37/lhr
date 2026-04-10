"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

interface AddOn {
  _id: string;
  name?: string;
  addOn?: string;
  flexiblePrice: number;
  tieredPrice: number;
  pack?: string;
  description?: string;
  planId?: string;
}

interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  pack: "monthly" | "weekly" | "daily";
  type: "flexible" | "tiered"
}

export default function AddOnsPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params.planId as string;
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const token = session?.accessToken;

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [plan, setPlan] = useState<Plan | null>(null);
  const [addOns, setAddOns] = useState<AddOn[] | null>(null);
  const [isPlanLoading, setIsPlanLoading] = useState(true);
  const [isAddOnsLoading, setIsAddOnsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch the selected plan details
  useEffect(() => {
    let isMounted = true;

    const fetchPlan = async () => {
      if (planId && status !== "loading") {
        setIsPlanLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/plans/get-a-plan/${planId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const planData = await res.json();
          if (isMounted) {
            setPlan(planData.data);
          }
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          if (isMounted) {
            setIsPlanLoading(false);
          }
        }
      }
    };

    fetchPlan();

    return () => {
      isMounted = false;
    };
  }, [planId, token, status]);

  // Fetch all available add-ons
  useEffect(() => {
    let isMounted = true;

    const fetchAddOns = async () => {
      if (status !== "loading") {
        setIsAddOnsLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/addsOnService/get-all-addsOnService`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const addOnsData = await res.json();
          if (isMounted) {
            setAddOns(addOnsData.data);
          }
        } catch (error) {
          console.error("Error fetching add-ons:", error);
        } finally {
          if (isMounted) {
            setIsAddOnsLoading(false);
          }
        }
      }
    };

    fetchAddOns();

    return () => {
      isMounted = false;
    };
  }, [token, status]);

  // Update total price whenever selected add-ons change
  useEffect(() => {
    if (!plan) return;

    let total = plan.price;

    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns?.find((a: AddOn) => a._id === addOnId);
      if (addOn) {
        total += plan?.type === "flexible" ? addOn?.flexiblePrice : addOn?.tieredPrice
      };
    });

    setTotalPrice(total);
  }, [selectedAddOns, addOns, plan]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(addOnId)) {
        return prev.filter((id) => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
  };

  const handleAddAddOnsToCart = async () => {
    if (!userId || !planId) return;

    setIsLoading(true);

    try {
      // Add each selected add-on to the plan
      for (const addOnId of selectedAddOns) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/addsOnService/${planId}/addsOnService/${addOnId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Create payment intent and redirect to Stripe
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            planId,
            amount: totalPrice,
          }),
        }
      );

      const responseData = await res.json();

      if (responseData?.data?.url) {
        router.push(responseData.data.url);
      }
    } catch (error) {
      console.error("Error adding add-ons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Render loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="container py-16 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Render loading state while fetching data
  if (isPlanLoading || isAddOnsLoading) {
    return (
      <div className="container py-16 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-300">Loading add-ons...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container py-16">
      <Button
        variant="ghost"
        className="mb-6 text-gray-300 hover:text-white hover:bg-transparent"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[40px] font-bold mb-2">
          <div className="text-white">Customize your plan</div>
          <div className="text-primary">with add-on services</div>
        </h2>
        <p className="text-gray-300">
          Enhance your {plan?.name} plan with these additional services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">
            Selected Plan
          </h3>
          <Card className="bg-[#FFFFFF1A] border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-[#F7E39F] capitalize">
                  {plan?.name}
                </h4>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold text-[#F7E39F]">
                    ${plan?.price}
                  </span>
                  <span className="text-sm text-gray-300 ml-2">
                    / {plan?.pack}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold my-6 text-white">
            Available Add-ons
          </h3>
          <div className="space-y-4">
            {addOns?.map((addOn: AddOn) => (
              <Card
                key={addOn._id}
                className={`bg-[#FFFFFF1A] border-0 overflow-hidden transition-all ${selectedAddOns.includes(addOn._id)
                  ? "ring-2 ring-primary"
                  : "hover:bg-[#FFFFFF30]"
                  }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`addon-${addOn._id}`}
                      checked={selectedAddOns.includes(addOn._id)}
                      onCheckedChange={() => handleAddOnToggle(addOn._id)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-black"
                    />
                    <div>
                      <label
                        htmlFor={`addon-${addOn._id}`}
                        className="text-[#F7E39F] font-medium cursor-pointer"
                      >
                        {addOn.name || addOn.addOn || "Add-on Service"}
                      </label>
                      {addOn.description && (
                        <p className="text-sm text-gray-300">
                          {addOn.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-[#F7E39F] font-semibold">
                    +{plan?.type === "flexible" ? addOn?.flexiblePrice : addOn?.tieredPrice}$
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">
            Order Summary
          </h3>
          <Card className="bg-[#FFFFFF1A] border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">
                    Base Plan ({plan?.name})
                  </span>
                  <span className="text-white font-medium">${plan?.price}</span>
                </div>

                {selectedAddOns.length > 0 && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="space-y-2">
                      <h4 className="text-gray-300">Selected Add-ons</h4>
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOns?.find(
                          (a: AddOn) => a._id === addOnId
                        );
                        return (
                          <div key={addOnId} className="flex justify-between">
                            <span className="text-gray-300 flex items-center">
                              <Plus className="h-3 w-3 mr-2 text-primary" />
                              {addOn?.name || addOn?.addOn || "Add-on Service"}
                            </span>
                            <span className="text-white font-medium">
                              ${plan?.type === "flexible" ? addOn?.flexiblePrice : addOn?.tieredPrice}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <Separator className="bg-gray-700" />

                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-primary font-bold text-xl">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                onClick={handleAddAddOnsToCart}
                disabled={isLoading}
                className="w-full bg-[#f8d87c] text-[#050a3a] hover:bg-[#f8d87c]/90 h-12"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
