import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Hash } from "lucide-react";

export default function Scanner() {
  const navigate = useNavigate();
  const [manualEntry, setManualEntry] = useState(false);
  const [barcode, setBarcode] = useState("");

  const handleScan = () => {
    // Simulate scanning - in real app, would use camera API
    navigate("/report/1");
  };

  const handleManualSubmit = () => {
    if (barcode) {
      navigate("/report/1");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Scan Product</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        {!manualEntry ? (
          <>
            <div className="flex-1 flex items-center justify-center">
              <Card className="w-full aspect-square max-w-sm bg-muted/50 border-dashed border-2 border-muted-foreground/30 flex flex-col items-center justify-center">
                <Camera className="w-24 h-24 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground text-center px-8">
                  Position the barcode within the frame
                </p>
              </Card>
            </div>

            <div className="space-y-3 mt-8">
              <Button size="lg" className="w-full" onClick={handleScan}>
                <Camera className="mr-2 h-5 w-5" />
                Scan Barcode
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setManualEntry(true)}
              >
                <Hash className="mr-2 h-5 w-5" />
                Enter Barcode Manually
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">Enter Barcode</h2>
                <p className="text-sm text-muted-foreground">
                  Type the barcode number from the product
                </p>
              </div>

              <Input
                type="text"
                placeholder="e.g., 012345678901"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="text-lg h-14"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleManualSubmit}
                disabled={!barcode}
              >
                Look Up Product
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setManualEntry(false)}
              >
                <Camera className="mr-2 h-5 w-5" />
                Use Camera Instead
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
