import { Stories } from "./Stories";
import { Posts } from "./Posts"
import { MiniProfile } from "./MiniProfile"
import { Suggestions } from "./Suggestions"
import { useSession } from "next-auth/react";
export function Feed() {
    const session = useSession()

    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session.data && "!grid-cols-1 !max-w-3xl mx-auto"}`}>
            <section className="col-span-2">
                <Stories />
                <Posts />
            </section>
            {session.data &&
                <section className="hidden md:col-span-1 xl:inline-grid">
                    <div className="fixed top-12">
                        <MiniProfile />
                        <Suggestions />
                    </div>
                </section>}

        </main>
    )
}