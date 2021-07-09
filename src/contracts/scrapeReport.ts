interface PartReference {
  partHash: string;
  partDataSize: number;
  refCount: number;
}

export interface ScrapeReport {
  globalScraperNet: {
    manifestMapSize: number;
    partsMapSize: number;
    globalPartsMapReferences: {
      partReferences: PartReference[];
      totalPartReferences: number;
      totalUniquePartReferencesToManifests: number;
      totalPartDataSize: number;
    }
  },
  convergedScraperStatsCache: {
    currentConvergencePublishingScrapers: number;
    currentConvergencePartPointerMapSize: number;
    pastConvergenceMapSize: number;
    totalConvergencesPartPointerMapsSize: number;
    totalConvergencesPartUniquePointerMapsSize: number;
    partObjectsReduced: number;
  }
}
