"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-9xl font-bold text-green-600">404</h1>
            <h2 className="text-3xl font-semibold text-slate-900 mt-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mt-2 mb-8">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}