"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "../lib/auth-client";


export default function Navaber() {

    const { data: session, isPending } = useSession();
    const router = useRouter();


    const handleLogout = async () => {
        await signOut();
        router.refresh();
        router.push("/");
    };


    if (isPending) {
        return (
            <nav className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
                    Loading...
                </div>
            </nav>
        );
    }


    return (
        <nav className="border-b bg-white">

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">


                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-black"
                >
                    ACME
                </Link>



                {/* Menu */}
                <div className="hidden md:flex items-center gap-8 text-black">

                    <Link href="/">
                        Home
                    </Link>


                    {
                        session?.user && (
                            <Link href="/features">
                                Features
                            </Link>
                        )
                    }


                    <Link href="/pricing">
                        Pricing
                    </Link>
                    <Link href="/profile">
                        Profile
                    </Link>


                    <Link href="/contact">
                        Contact
                    </Link>

                </div>




                {/* Auth Section */}
                <div className="flex items-center gap-3">


                    {
                        session?.user ? (

                            <>

                                <div className="text-right">

                                    <p className="font-semibold text-black">
                                        {session.user.name}
                                    </p>


                                    <p className="text-sm text-gray-500">
                                        {session.user.email}
                                    </p>

                                </div>



                                <Button
                                    color="danger"
                                    onPress={handleLogout}
                                >
                                    Logout
                                </Button>


                            </>


                        ) : (

                            <>


                                <Link href="/Auths/sing-in">

                                    <Button variant="secondary">
                                        Sign In
                                    </Button>

                                </Link>



                                <Link href="/Auths/sing-up">

                                    <Button color="primary">
                                        Sign Up
                                    </Button>

                                </Link>


                            </>

                        )
                    }


                </div>


            </div>

        </nav>
    );
}