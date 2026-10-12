// Layout maths for registrations set in UKNumberPlate (src/fonts/uk-number-plate.ttf), so
// every plate uses true UK proportions and the characters sit exactly in the middle.

const UPM = 2048; // font units per em
const CAP = 1400; // cap height in font units

// [advance, left side bearing, right side bearing] in font units, read from the TTF.
const glyphs: Record<string, [number, number, number]> = {
  A: [1123, 108, 134], B: [1115, 107, 108], C: [1151, 115, 141], D: [1120, 111, 112],
  E: [1140, 126, 123], F: [1137, 126, 121], G: [1159, 119, 143], H: [1123, 119, 115],
  I: [528, 139, 139], J: [1149, 134, 142], K: [1117, 121, 114], L: [1123, 122, 112],
  M: [1135, 120, 125], N: [1109, 118, 100], O: [1093, 104, 105], P: [1096, 106, 104],
  Q: [1162, 126, 119], R: [1117, 109, 117], S: [1106, 124, 112], T: [1112, 108, 107],
  U: [1117, 111, 107], V: [1117, 119, 99], W: [1123, 120, 111], X: [1115, 107, 110],
  Y: [1119, 117, 116], Z: [1123, 106, 114], 0: [1117, 111, 122], 1: [479, 114, 115],
  2: [1129, 110, 123], 3: [1121, 109, 114], 4: [1132, 111, 122], 5: [1120, 109, 117],
  6: [1117, 112, 110], 7: [1137, 118, 121], 8: [1123, 117, 114], 9: [1105, 112, 113],
};
const SPACE = 600;

/** Share of the plate's width taken by the blue UK band, and the minimum side margin. */
export const plateBand = 0.086;
export const plateMargin = 0.035;

const fallback: [number, number, number] = [1120, 116, 116];
const glyph = (char: string) => glyphs[char] ?? fallback;

// The DVLA layout: 79 mm tall characters, 11 mm apart, 33 mm between groups, on a 520 mm plate.
const mm = CAP / 79;
const bearings = Object.values(glyphs).reduce((sum, [, l, r]) => sum + l + r, 0) / Object.keys(glyphs).length;
const letterUnits = 11 * mm - bearings;
const wordUnits = 33 * mm - bearings - 2 * letterUnits - SPACE;

/** Letter and word spacing, in em, that turn the font's own spacing into the legal 11 mm and 33 mm gaps. */
export const plateSpacing = { letterSpacing: letterUnits / UPM, wordSpacing: wordUnits / UPM };

/** Width of the visible characters in em, from the first stroke to the last. */
function inkWidth(text: string) {
  const chars = [...text];
  const advances = chars.reduce((sum, c) => sum + (c === " " ? SPACE + wordUnits : glyph(c)[0]), 0);
  return (advances + (chars.length - 1) * letterUnits - glyph(chars[0])[1] - glyph(chars.at(-1)!)[2]) / UPM;
}

/**
 * Horizontal nudge in em that centres the ink rather than the text box. The box includes the
 * first glyph's left bearing, the last glyph's right bearing and a trailing letter space.
 */
function inkOffset(text: string) {
  const first = glyph(text[0])[1];
  const last = glyph(text.at(-1)!)[2];
  return -(first - last - letterUnits) / 2 / UPM;
}

/**
 * Size and position of a registration on a plate `width` units wide (a percentage when used
 * with container query units, pixels for share images). Characters are the true 79 mm tall
 * on a 520 mm plate and only shrink when a long registration wouldn't fit between the margins.
 */
export function plateText(registration: string, { width, band }: { width: number; band: boolean }) {
  const text = registration.toUpperCase().trim() || " ";
  const trueSize = ((width * 79) / 520) * (UPM / CAP);
  const room = width * (1 - (band ? plateBand : 0) - 2 * plateMargin);
  const fontSize = Math.min(trueSize, room / inkWidth(text));

  const letterSpacing = plateSpacing.letterSpacing * fontSize;
  const wordSpacing = plateSpacing.wordSpacing * fontSize;
  return {
    text,
    fontSize,
    letterSpacing,
    wordSpacing,
    /** Space between groups when they're laid out as separate boxes (share images). */
    groupGap: (SPACE / UPM) * fontSize + wordSpacing + letterSpacing,
    offset: inkOffset(text) * fontSize,
  };
}
