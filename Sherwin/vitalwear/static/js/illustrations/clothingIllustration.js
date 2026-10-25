// Author: Sherwin S
// Part of the clothing drawings shown when an item has no photo. This file holds
// clothingIllustration().

// Draws a simple picture of the item (shirt, hoodie, pants, jacket, shoes or dress) in its
// colour.
function clothingIllustration(item) {
  const color = clothingColor(item.color);
  const category = item.category;

  const outline = `
    stroke="#243044"
    stroke-width="3"
    stroke-linejoin="round"
  `;

  let shape = "";

  if (["T-Shirt", "Polo", "Dress Shirt"].includes(category)) {
    shape = `
      <path d="M83 30 L62 42 L34 78 L60 97
               L80 77 L80 170 L160 170
               L160 77 L180 97 L206 78
               L178 42 L157 30
               Q140 51 120 51
               Q100 51 83 30Z"
            fill="${color}" ${outline}/>

      <path d="M98 33 Q120 73 142 33"
            fill="none" stroke="#243044" stroke-width="3"/>
    `;

    if (category === "Polo" || category === "Dress Shirt") {
      shape += `
        <path d="M97 32 L120 58 L143 32
                 L132 70 L120 59 L108 70Z"
              fill="#ffffff" fill-opacity=".65"
              stroke="#243044" stroke-width="2"/>

        <path d="M120 60 L120 108"
              stroke="#243044" stroke-width="2"/>
      `;
    }

  } else if (["Hoodie", "Crewneck"].includes(category)) {
    shape = `
      <path d="M91 36 L63 48 L31 108
               L55 120 L78 88 L78 170
               L162 170 L162 88
               L185 120 L209 108
               L177 48 L149 36Z"
            fill="${color}" ${outline}/>

      <path d="M91 37 Q120 8 149 37
               Q143 75 120 76
               Q97 75 91 37Z"
            fill="${color}" ${outline}/>

      <path d="M80 170 L160 170"
            stroke="#243044" stroke-width="7"/>
    `;

    if (category === "Hoodie") {
      shape += `
        <path d="M107 68 L105 98 M133 68 L135 98"
              stroke="#f8fafc" stroke-width="3"/>

        <path d="M91 130 L149 130 L144 156 L96 156Z"
              fill="none" stroke="#243044" stroke-width="3"/>
      `;
    }

  } else if (
    ["Jeans", "Pants", "Chinos", "Shorts"].includes(category)
  ) {
    const short = category === "Shorts";
    const hem = short ? 119 : 182;

    shape = `
      <path d="M76 28 L164 28
               L172 ${hem}
               L128 ${hem}
               L120 90
               L112 ${hem}
               L68 ${hem}Z"
            fill="${color}" ${outline}/>

      <path d="M76 48 L164 48
               M120 48 L120 89"
            fill="none" stroke="#243044" stroke-width="3"/>

      <path d="M81 53 L97 75 M159 53 L143 75"
            stroke="#243044" stroke-width="2"
            fill="none"/>
    `;

    if (category === "Jeans") {
      shape += `
        <path d="M80 82 L93 169 M160 82 L147 169"
              stroke="#ffffff" stroke-opacity=".2"
              stroke-width="3"/>
      `;
    }

  } else if (["Heavy Jacket", "Rain Jacket"].includes(category)) {
    shape = `
      <path d="M89 28 L60 42 L28 119
               L53 133 L77 90 L77 175
               L163 175 L163 90
               L187 133 L212 119
               L180 42 L151 28Z"
            fill="${color}" ${outline}/>

      <path d="M89 28 L120 79 L151 28
               L138 100 L120 79 L102 100Z"
            fill="#ffffff" fill-opacity=".45"
            stroke="#243044" stroke-width="2"/>

      <path d="M120 79 L120 174"
            stroke="#243044" stroke-width="3"/>

      <path d="M87 125 L108 125 M132 125 L153 125"
            stroke="#243044" stroke-width="3"/>
    `;

  } else if (["Sneakers", "Boots"].includes(category)) {
    const high = category === "Boots";

    shape = `
      <path d="M54 113
               L91 ${high ? 52 : 86}
               L128 ${high ? 52 : 112}
               L154 132 L191 142
               Q211 148 211 168
               L30 168
               Q26 143 54 113Z"
            fill="${color}" ${outline}/>

      <path d="M32 160 L209 160"
            stroke="#ffffff" stroke-width="9"/>

      <path d="M91 117 L119 128
               M83 129 L111 140"
            stroke="#ffffff" stroke-width="4"/>
    `;

  } else if (["Dress", "Skirt"].includes(category)) {
    shape = `
      <path d="M91 32 L149 32
               L158 82 L194 171
               L46 171 L82 82Z"
            fill="${color}" ${outline}/>

      <path d="M82 82 L158 82"
            stroke="#243044" stroke-width="3"/>
    `;

  } else {
    shape = `
      <rect x="65" y="40" width="110" height="120"
            rx="18" fill="${color}" ${outline}/>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="240" height="210"
         viewBox="0 0 240 210">
      <rect width="240" height="210"
            rx="18" fill="#e8edf4"/>
      <ellipse cx="120" cy="189" rx="69" ry="8"
               fill="#cbd5e1"/>
      ${shape}
    </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(svg);
}
