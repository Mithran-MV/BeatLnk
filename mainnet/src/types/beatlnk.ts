/**
 * Shapes that cross module boundaries in BeatLnk.
 *
 * These describe what the code actually reads rather than mirroring the whole
 * Spotify or Reclaim payload: fields are optional wherever the data arrives
 * from outside and may genuinely be missing.
 */

/** An artist as it appears on a Spotify track. */
export interface SpotifyArtist {
  name?: string;
  id?: string;
}

/** A Spotify track, reduced to the fields BeatLnk looks at. */
export interface SpotifyTrack {
  name?: string;
  artists?: SpotifyArtist[];
  /** track length in milliseconds */
  duration_ms?: number;
}

/** One entry from the user's liked songs. */
export interface LikedSong {
  track?: SpotifyTrack;
  added_at?: string;
}

/**
 * The summary built from a verified liked-songs list: how often each artist
 * appears, who came top, and whether that is enough for the custom NFT.
 */
export interface ArtistAnalysis {
  topArtist: { name: string; count: number } | null;
  /** artist name -> number of liked songs */
  allArtists: Record<string, number>;
  totalSongs: number;
  nftEligible: boolean;
}

/**
 * A stored Reclaim proof. The SDK's payload is passed through untouched and
 * BeatLnk adds its own fields on the way to IPNS, so the known keys are listed
 * and the rest is left open rather than asserted.
 */
export interface StoredProof {
  walletAddress?: string;
  /** the verified payload, as the provider returned it */
  publicData?: { liked_songs?: LikedSong[] };
  timestamp?: string | number;
  artistAnalysis?: ArtistAnalysis;
  [key: string]: unknown;
}

/**
 * The subset of EIP-1193 BeatLnk uses. `request` is deliberately loose in its
 * result: what comes back depends entirely on the method being called.
 */
export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

/**
 * What /api/debug-data returns: where the app can currently see the user's
 * verified data, and what it found in each place. Only the fields DebugPanel
 * renders are described.
 */
export interface DebugPayload {
  error?: string;
  debug?: {
    session: {
      walletAddress?: string;
      user?: { id?: string; username?: string };
    };
    dataSources: {
      inMemory: { available: boolean; data?: ArtistAnalysis | null };
      ipfsHash: { available: boolean; hash?: string };
      ipns: { available: boolean; count?: number; data: StoredProof[] };
    };
  };
}
