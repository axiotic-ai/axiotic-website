# 20 Pillar Section Design Variations

## Design 1: Current Light Cards (Baseline)
```javascript
class="rounded-xl bg-gradient-to-br from-white to-slate-50/80 border-2 border-slate-300 p-8 hover:border-amber-500/40 shadow-xl transition-all"
// Icon: w-12 h-12 rounded-lg bg-amber-100
// Title: text-xl font-bold mb-4 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
```

## Design 2: Dark Cards with Amber Border
```javascript
class="rounded-xl bg-slate-900/80 border-2 border-amber-400/50 p-8 hover:border-amber-500 shadow-xl transition-all"
// Icon: w-12 h-12 rounded-lg bg-amber-400/20 border border-amber-400/30
// Title: text-xl font-bold mb-4 text-amber-100
// Text: text-slate-300 text-sm
// Grid: sm:grid-cols-2
```

## Design 3: Minimal Bordered Cards
```javascript
class="rounded-lg border-2 border-slate-200 bg-white p-6 hover:border-amber-400 hover:shadow-lg transition-all"
// Icon: w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200
// Title: text-lg font-semibold mb-3 text-slate-900
// Text: text-slate-600 text-sm
// Grid: sm:grid-cols-2
```

## Design 4: Gradient Cards with Icon Badge
```javascript
class="rounded-2xl bg-gradient-to-br from-amber-50 via-white to-slate-50 border border-amber-200/50 p-6 hover:shadow-2xl transition-all"
// Icon: absolute top-4 right-4 w-14 h-14 rounded-full bg-amber-400 shadow-lg
// Title: text-lg font-bold mb-3 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
// Position: relative
```

## Design 5: Hexagon Icon Containers
```javascript
class="rounded-xl bg-white border-2 border-slate-200 p-8 hover:border-amber-400 hover:bg-amber-50/30 transition-all"
// Icon: w-16 h-16 hexagon shape bg-gradient-to-br from-amber-400 to-orange-500
// Title: text-xl font-bold mb-4 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
```

## Design 6: Stacked Cards with Top Icon
```javascript
class="rounded-2xl bg-white shadow-md p-8 hover:shadow-xl transition-all border-t-4 border-amber-400"
// Icon: w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4 mx-auto
// Title: text-xl font-bold mb-3 text-center text-slate-900
// Text: text-slate-600 text-sm text-center
// Grid: sm:grid-cols-2
```

## Design 7: Glassmorphism Cards
```javascript
class="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all shadow-lg"
// Icon: w-14 h-14 rounded-xl bg-amber-400/20 backdrop-blur-sm border border-amber-400/30
// Title: text-xl font-bold mb-4 text-white
// Text: text-slate-200 text-sm
// Grid: sm:grid-cols-2
```

## Design 8: Numbered Cards with Large Icons
```javascript
class="rounded-xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 p-6 hover:border-amber-400 transition-all relative"
// Number: absolute top-2 left-2 text-4xl font-black text-amber-400/20
// Icon: w-20 h-20 rounded-full bg-amber-100 mx-auto mb-4
// Title: text-lg font-bold mb-3 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
```

## Design 9: Sidebar Icon Layout
```javascript
class="rounded-xl bg-white border-l-4 border-amber-400 shadow-md p-6 hover:shadow-lg transition-all flex gap-4"
// Icon: w-16 h-16 rounded-lg bg-amber-100 flex-shrink-0
// Content: flex-1
// Title: text-lg font-bold mb-2 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-1 (full width)
```

## Design 10: Compact Horizontal Cards
```javascript
class="rounded-lg bg-white border border-slate-200 p-4 hover:border-amber-400 hover:bg-amber-50 transition-all"
// Icon: w-10 h-10 rounded-lg bg-amber-100 inline-block mr-3 align-top
// Title: text-base font-bold mb-1 inline-block text-slate-900
// Text: text-slate-600 text-xs
// Grid: sm:grid-cols-1 (compact, horizontal)
```

## Design 11: Elevated Cards with Shadow
```javascript
class="rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
// Icon: w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md mb-4
// Title: text-xl font-bold mb-4 text-slate-900
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
```

## Design 12: Outlined Cards with Icon Circle
```javascript
class="rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 hover:border-amber-400 hover:bg-amber-50/50 transition-all"
// Icon: w-16 h-16 rounded-full border-4 border-amber-400 bg-white mx-auto mb-4
// Title: text-lg font-bold mb-3 text-center text-slate-900
// Text: text-slate-700 text-sm text-center
// Grid: sm:grid-cols-2
```

## Design 13: Dark Theme with Gradient Accents
```javascript
class="rounded-xl bg-slate-800 border border-slate-700 p-8 hover:border-amber-500 hover:bg-slate-750 transition-all"
// Icon: w-14 h-14 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg mb-4
// Title: text-xl font-bold mb-4 text-white
// Text: text-slate-300 text-sm
// Grid: sm:grid-cols-2
```

## Design 14: Minimalist with Bottom Border
```javascript
class="bg-white p-6 border-b-4 border-transparent hover:border-amber-400 transition-all"
// Icon: w-12 h-12 rounded-lg bg-amber-50 mb-4
// Title: text-lg font-semibold mb-3 text-slate-900
// Text: text-slate-600 text-sm
// Grid: sm:grid-cols-2
```

## Design 15: Card with Top Gradient Bar
```javascript
class="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-all"
// Top Bar: h-2 bg-gradient-to-r from-amber-400 to-orange-500
// Icon: w-14 h-14 rounded-xl bg-amber-100 mt-4 mb-4
// Title: text-xl font-bold mb-4 text-slate-900
// Text: text-slate-700 text-sm px-6 pb-6
// Grid: sm:grid-cols-2
```

## Design 16: Rounded Pills Style
```javascript
class="rounded-full bg-gradient-to-r from-amber-50 to-white border-2 border-amber-200 px-8 py-6 hover:border-amber-400 transition-all"
// Icon: w-12 h-12 rounded-full bg-amber-400 mx-auto mb-4
// Title: text-lg font-bold mb-3 text-center text-slate-900
// Text: text-slate-700 text-sm text-center
// Grid: sm:grid-cols-2
```

## Design 17: Split Color Cards
```javascript
class="rounded-xl bg-white border-2 border-slate-200 overflow-hidden hover:border-amber-400 transition-all"
// Left Side: w-2 bg-gradient-to-b from-amber-400 to-orange-500
// Icon: w-14 h-14 rounded-lg bg-amber-100 ml-4 mt-4 mb-4
// Title: text-xl font-bold mb-4 text-slate-900 px-4
// Text: text-slate-700 text-sm px-4 pb-6
// Grid: sm:grid-cols-2
// Layout: flex
```

## Design 18: Icon-First Large Cards
```javascript
class="rounded-2xl bg-gradient-to-br from-white via-amber-50/30 to-white border border-amber-200 p-8 hover:shadow-xl transition-all text-center"
// Icon: w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-6 shadow-lg
// Title: text-2xl font-bold mb-4 text-slate-900
// Text: text-slate-700 text-base
// Grid: sm:grid-cols-2
```

## Design 19: Compact Grid with Small Icons
```javascript
class="rounded-lg bg-white border border-slate-200 p-5 hover:border-amber-400 hover:bg-amber-50/50 transition-all"
// Icon: w-10 h-10 rounded-md bg-amber-100 mb-3
// Title: text-base font-bold mb-2 text-slate-900
// Text: text-slate-600 text-xs leading-relaxed
// Grid: sm:grid-cols-2 lg:grid-cols-4 (more compact, 4 columns)
```

## Design 20: Asymmetric Cards with Offset Icon
```javascript
class="rounded-xl bg-white border-2 border-slate-200 p-6 hover:border-amber-400 transition-all relative"
// Icon: absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-white
// Title: text-lg font-bold mb-3 text-slate-900 pr-12
// Text: text-slate-700 text-sm
// Grid: sm:grid-cols-2
```

## Implementation Notes

Each design can be implemented by:
1. Updating the `content-loader.js` consulting pillars rendering section
2. Adjusting CSS classes in the template string
3. Modifying grid layout classes
4. Updating icon container styling
5. Adjusting typography and spacing

To test a design, replace the template in `content-loader.js` lines 73-107 with the desired design's classes and structure.

