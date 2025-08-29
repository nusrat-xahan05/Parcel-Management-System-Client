import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import books from '@/assets/images/books.png'
import clothes from '@/assets/images/clothes.png'
import parcels from '@/assets/images/parcels.png'
import express from '@/assets/images/express.png'
import grocery from '@/assets/images/grocery.png'

export function Services() {
    return (
        <div className="max-w-7xl mx-auto py-24 px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl font-extrabold pb-5 text-primary">Our Services</h3>
                <p className="text-foreground/50">
                    We offer a wide range of reliable delivery solutions designed to make
                    your life easier, faster, and more convenient.
                </p>
            </div>

            <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <img className="size-16" src={parcels} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3">Parcel Delivery</CardTitle>
                        <p className="text-muted-foreground">Reliable and secure parcel delivery with real-time tracking.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <img className="size-16" src={express} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3">Express Delivery</CardTitle>
                        <p className="text-muted-foreground">Urgent deliveries handled with same-day or next-day service.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <img className="size-16" src={grocery} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3">Grocery Delivery</CardTitle>
                        <p className="text-muted-foreground">Fresh groceries delivered quickly to your doorstep.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <img className="size-16" src={clothes} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3">Clothing Delivery</CardTitle>
                        <p className="text-muted-foreground">Safe and timely delivery of fashion and apparel items.</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary rounded-2xl shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <img className="size-16" src={books} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="mb-3">Book Delivery</CardTitle>
                        <p className="text-muted-foreground">Hassle-free delivery of books and educational materials.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
