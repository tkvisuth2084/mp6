import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
    const session = await auth();

    if (!session) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-semibold text-pink-500">CS391 OAuth</h1>
                    <form action={async () => {
                        "use server";
                        await signIn("github");
                    }}>
                        <button type="submit" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
                            Sign in with GitHub
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    const user = session.user;

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {user?.image && (
                    <img src={user.image} alt="Profile" width={80} height={80} className="rounded-full" />
                )}
                <h1 className="text-xl font-semibold">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <button type="submit" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
                        Sign out
                    </button>
                </form>
            </div>
        </main>
    );
}