"""Build the /gap Open Graph SVG.

Outlines come from the site's variable fonts (Bricolage Grotesque headline,
Inter body) so the card does not depend on which fonts the machine has
installed. Requires fonttools, brotli, and uharfbuzz.
"""

import io
import re
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

WIDTH = 1200
HEIGHT = 630
PINK = "#fc66a7"
INK = "#181716"
PAD_X = 80

HEADLINE_SIZE = 122
BODY_SIZE = 30
LOGO_H = 72
GAP_LOGO = 40
GAP_BODY = 44
LINE_EM = 1.12
TRACKING = -0.025
BODY_LEADING = 1.45

# Optical extents, as a fraction of font size, used to center the lockup.
HEAD_ASCENT = 0.78
HEAD_DESCENT = 0.20
BODY_ASCENT = 0.80
BODY_DESCENT = 0.26

LINE_1 = "Where\u2019s the gap"
LINE_2 = "in your marketing?"
BODY_1 = "Four questions, two minutes."
BODY_2 = "A short personal video in response to your answers."


def instance_font(src: Path, coords: dict) -> TTFont:
    font = TTFont(src)
    inst = instantiateVariableFont(font, coords, inplace=False, updateFontNames=False)
    # Source files are woff2; HarfBuzz needs a real TrueType sfnt.
    inst.flavor = None
    return inst


class FaceFont:
    def __init__(self, tt: TTFont):
        buf = io.BytesIO()
        tt.save(buf)
        face = hb.Face(hb.Blob(buf.getvalue()))
        if face.glyph_count == 0:
            raise RuntimeError("HarfBuzz could not read the instanced font")
        font = hb.Font(face)
        font.scale = (face.upem, face.upem)
        self.hb = font
        self.upem = face.upem
        self.glyphs = tt.getGlyphSet()

    def outlines(self, text: str, font_size: float, x: float, baseline: float, tracking_em: float = 0):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb, buf)

        scale = font_size / self.upem
        track = tracking_em * self.upem
        groups = []
        cursor = 0.0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            name = self.hb.glyph_to_string(info.codepoint)
            if name not in self.glyphs:
                raise RuntimeError(f"Missing glyph {name!r} for {text!r}")
            pen = SVGPathPen(self.glyphs)
            self.glyphs[name].draw(pen)
            commands = pen.getCommands()
            if commands:
                gx = cursor + pos.x_offset
                gy = pos.y_offset
                groups.append(f'<g transform="translate({gx:.2f},{gy:.2f})"><path d="{commands}"/></g>')
            cursor += pos.x_advance + track

        width = cursor * scale
        svg = (
            f'<g fill="{INK}" transform="translate({x:.2f},{baseline:.2f}) '
            f'scale({scale:.6f},{-scale:.6f})">{"".join(groups)}</g>'
        )
        return svg, width


def logo_markup(root: Path) -> str:
    raw = (root / "public/logo-dark.svg").read_text()
    parts = []
    for match in re.finditer(r"<(path|rect)\b[^>]*/>", raw):
        tag = re.sub(r'\sclass="cls-1"', "", match.group(0))
        tag = tag.replace("/>", f' fill="{INK}"/>')
        parts.append(tag)
    if not parts:
        raise RuntimeError("public/logo-dark.svg did not contain any paths")
    return "\n".join(parts)


def build_svg(root: Path) -> str:
    bricolage = FaceFont(
        instance_font(
            root / "app/fonts/bricolage-grotesque-latin.woff2",
            {"wght": 700, "opsz": 96},
        )
    )
    inter = FaceFont(instance_font(root / "app/fonts/inter-latin.woff2", {"wght": 500}))

    _, line_two_width = bricolage.outlines(LINE_2, HEADLINE_SIZE, 0, 0, TRACKING)
    _, body_width = inter.outlines(BODY_2, BODY_SIZE, 0, 0, 0)
    max_x = WIDTH - PAD_X
    if PAD_X + line_two_width > max_x or PAD_X + body_width > max_x:
        raise RuntimeError("OG copy is wider than the 1200px card")

    headline_ink = (HEAD_ASCENT + LINE_EM + HEAD_DESCENT) * HEADLINE_SIZE
    body_ink = (BODY_ASCENT + BODY_LEADING + BODY_DESCENT) * BODY_SIZE
    content = LOGO_H + GAP_LOGO + headline_ink + GAP_BODY + body_ink
    top = (HEIGHT - content) / 2

    logo_y = top
    baseline_1 = logo_y + LOGO_H + GAP_LOGO + HEAD_ASCENT * HEADLINE_SIZE
    baseline_2 = baseline_1 + LINE_EM * HEADLINE_SIZE
    body_1 = baseline_2 + HEAD_DESCENT * HEADLINE_SIZE + GAP_BODY + BODY_ASCENT * BODY_SIZE
    body_2 = body_1 + BODY_LEADING * BODY_SIZE
    logo_scale = LOGO_H / 148.61

    headline_1, _ = bricolage.outlines(LINE_1, HEADLINE_SIZE, PAD_X, baseline_1, TRACKING)
    headline_2, _ = bricolage.outlines(LINE_2, HEADLINE_SIZE, PAD_X, baseline_2, TRACKING)
    body_line_1, _ = inter.outlines(BODY_1, BODY_SIZE, PAD_X, body_1, 0)
    body_line_2, _ = inter.outlines(BODY_2, BODY_SIZE, PAD_X, body_2, 0)

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="{WIDTH}" height="{HEIGHT}" fill="{PINK}"/>
  <g transform="translate({PAD_X},{logo_y:.2f}) scale({logo_scale:.6f}) translate(-127.81,-122.82)">
    {logo_markup(root)}
  </g>
  {headline_1}
  {headline_2}
  {body_line_1}
  {body_line_2}
</svg>
"""


def main() -> None:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    sys.stdout.write(build_svg(root))


if __name__ == "__main__":
    main()
