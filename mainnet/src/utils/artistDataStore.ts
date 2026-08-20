// Simple in-memory store to capture artist analysis from console logs
import type { ArtistAnalysis } from '@/types/beatlnk';

let storedArtistAnalysis: ArtistAnalysis | null = null;
let storedIpfsHash: string | null = null;

export function storeArtistAnalysis(analysis: ArtistAnalysis) {
  storedArtistAnalysis = analysis;
  console.log('📊 Artist analysis stored:', analysis);
}

export function getArtistAnalysis() {
  return storedArtistAnalysis;
}

export function storeIpfsHash(hash: string) {
  storedIpfsHash = hash;
  console.log('🔗 IPFS hash stored:', hash);
}

export function getIpfsHash() {
  return storedIpfsHash;
}

export function clearArtistAnalysis() {
  storedArtistAnalysis = null;
  storedIpfsHash = null;
}