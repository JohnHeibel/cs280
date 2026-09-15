// Short captions shown under the lab viewer for each stage. Edit freely.
// Keys: stage id -> text.  A per-tier override is possible via CAPTIONS.llm[stage].
window.CAPTIONS = {
  john: {
    unaligned:   "The three strips stacked as R, G, B with no alignment.",
    single_l2:   "Exhaustive search over [-15, 15] pixels scoring each shift with the L2 distance on the interior 70% of the image.",
    single_ncc:  "Same search, scored with normalized cross-correlation.",
    pyr_l2:      "Coarse-to-fine pyramid (box-mean downsampling by 64, 32, ... 1), L2 on raw pixels.",
    pyr_ncc:     "Coarse-to-fine pyramid, NCC on raw pixels.",
    pyr_feat:    "Pyramid built from Sobel edge features instead of raw pixels (levels >= 32 px). Needed for emir, small gains elsewhere.",
    aligned_full:"Full plate composited at the found offsets: borders and wrapped rows are visible.",
    crop:        "Border detection from row/column profiles of near-black / near-white pixels, plus removal of the rows and columns wrapped by np.roll.",
    contrast:    "Min/max stretch did nothing (every scan has pure black and white pixels), so: linear stretch between the 1st and 99th percentiles.",
    wb:          "Gray world, the one white balance that honestly worked: scale each channel so the channel means agree, whites look natural.",
    colormap:    "Fixed 3x3 mixing matrix (rows sum to 1, so grays stay gray) scaled by 1.3; replaces an earlier plain saturation boost.",
  },
  llm: {
    pyr_l2:      "Binomial (Gaussian) pyramid, exhaustive search at ~130 px, ±2 px refinement per level; L2 on raw pixels.",
    pyr_ncc:     "Same pyramid with NCC on raw pixels.",
    pyr_feat:    "NCC on gradient magnitude computed at each pyramid level.",
    similarity:  "Grid search over small rotations and scales on a 700 px copy, refined twice, then re-run at full resolution; accepted only if NCC improves by more than 0.01.",
    crop:        "Per-strip border boxes (saturated / dark / uniform lines connected to the edge, plus the soft emulsion ramp) shifted by each channel's offset and intersected.",
    contrast:    "Global percentile stretch (0.5-99.5) applied identically to all channels, then a gentle gamma toward a fixed median.",
    wb:          "Shades-of-gray illuminant estimate (Minkowski p=6) on a blurred copy with clipped pixels excluded; von Kries diagonal correction.",
    colormap:    "3x3 matrix learned from nine LoC professional restorations by covariance matching, rows normalized so greys stay grey.",
  }
};
