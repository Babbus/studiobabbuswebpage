import { siteMeta } from "@/content/site";
import { instagramPosts, instagramProfile } from "@/content/instagram";

export default function InstagramProfile() {
	return (
		<div className="group flex flex-col gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-teal-400/30 hover:bg-white/[0.05] transition-all duration-300">
			<div className="flex items-center gap-4">
				<div className="relative">
					<div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
						<div className="w-full h-full rounded-full bg-black/20 grid place-items-center text-2xl overflow-hidden">
							{/* Replace this with actual image when available */}
							<div className="w-full h-full bg-gradient-to-br from-teal-900/40 via-teal-700/20 to-transparent rounded-full grid place-items-center text-teal-300 text-lg font-bold">
								B
							</div>
						</div>
					</div>
					<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-2 border-background grid place-items-center text-xs text-black">
						📷
					</div>
				</div>
				<div className="flex-1">
					<div className="font-medium group-hover:text-teal-100 transition-colors duration-300">@{instagramProfile.username}</div>
					<div className="text-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300">{instagramProfile.bio || "Sound Designer & Producer"}</div>
					<a 
						href={instagramProfile.profileUrl || siteMeta.socials?.find((s) => s.label === "Instagram")?.url} 
						target="_blank" 
						className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-300 underline underline-offset-2"
					>
						Follow on Instagram
					</a>
				</div>
			</div>

			{instagramPosts.length > 0 && (
				<div className="mt-1 grid grid-cols-3 gap-1">
					{instagramPosts.slice(0, 3).map((p) => (
						<a key={p.id} href={p.url} target="_blank" className="block aspect-square overflow-hidden rounded-md border border-white/10 hover:border-teal-400/40 hover:scale-[1.02] transition-all">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={p.imageUrl} alt={p.caption || "Instagram post"} className="w-full h-full object-cover" />
						</a>
					))}
				</div>
			)}
		</div>
	);
} 