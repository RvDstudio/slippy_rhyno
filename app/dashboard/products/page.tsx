"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { File, ListFilter, MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  product_name: string;
  description: string;
  short_description: string;
  quantity: number;
  price: number;
  image_url: string;
  status: string;
  total_sales: number;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();

      if (!result || response.status === 401) {
        console.error("Unauthorized or no data");
        setProducts([]);
        return;
      }

      // Ensure we always set an array
      setProducts(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 pt-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="all"
                  className="text-[#0F495E] active:bg-transparent"
                >
                  All
                </TabsTrigger>
                <TabsTrigger value="active" className="text-[#0F495E]">
                  Active
                </TabsTrigger>
                <TabsTrigger value="draft" className="text-[#0F495E]">
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="hidden sm:flex text-[#0F495E]"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 bg-transparent text-[#0F495E]"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 bg-transparent text-[#0F495E]"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <AddProductDialog onProductAdded={handleProductAdded} />
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No products found
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="hidden sm:table-cell">
                              {product.image_url ? (
                                <Image
                                  alt={product.product_name}
                                  className="aspect-square rounded-xl object-cover"
                                  height={64}
                                  src={product.image_url}
                                  width={64}
                                />
                              ) : (
                                <div className="h-16 w-16 rounded-xl bg-muted" />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.product_name}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-[#0F495E] text-white">
                                {product.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              ${product.price.toFixed(2)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.total_sales}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(product.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{products.length}</strong> of{" "}
                    <strong>{products.length}</strong> products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
