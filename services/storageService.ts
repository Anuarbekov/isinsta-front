import { supabase } from "../supabase";
import { Session, ImageData, VoteType } from "../types";

export const storageService = {
createSession: async (
images: Omit<ImageData, "votesYes" | "votesNo">[]
): Promise<Session> => {
const sessionId = crypto.randomUUID();
const createdAt = Date.now();
const createdAtIso = new Date(createdAt).toISOString();

const { error: sessionError } = await supabase.from("sessions").insert({
id: sessionId,
created_at: createdAtIso,
});

if (sessionError) {
console.error("Error creating session record:", sessionError);
throw sessionError;
}

const rows = images.map((img) => ({
id: img.id,
session_id: sessionId,
url: img.url,
name: img.name,
likes: 0,
dislikes: 0,
created_at: createdAtIso,
}));
const { error: photosError } = await supabase.from("photos").insert(rows);

if (photosError) {
console.error("Error adding photos:", photosError);
throw photosError;
}

return {
id: sessionId,
createdAt,
isActive: true,
images: images.map((img) => ({
...img,
votesYes: 0,
votesNo: 0,
})),
};
},

getSession: async (sessionId: string): Promise<Session | null> => {
const { data, error } = await supabase
.from("photos")
.select("*")
.eq("session_id", sessionId)
.order("created_at", { ascending: true });

if (error || !data || data.length === 0) return null;

const images: ImageData[] = data.map((row: any, index: number) => ({
id: row.id,
url: row.url,
name: row.name,
votesYes: row.likes || 0,
votesNo: row.dislikes || 0,
}));

const createdAt = new Date(data[0].created_at).getTime();

return {
id: sessionId,
createdAt,
isActive: true,
images,
};
},

submitVote: async (
sessionId: string,
imageId: string,
type: VoteType
): Promise<void> => {
const direction = type === VoteType.YES ? "yes" : "no";

const { error } = await supabase.rpc("increment_vote", {
row_id: imageId,
vote_type: direction,
});

if (error) {
console.error("Error submitting vote:", error);
}
},
};