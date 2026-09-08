# -*- coding: utf-8 -*-
"""One-shot injector: writes JSON-LD into each page's <head>.

Deliberately a one-shot script rather than a build step. The site is
hand-written HTML with no bundler on purpose; JSON-LD is text a human can read
and diff, so it belongs in the source, unlike binary image derivatives.
"""
import json, re, html, sys

BASE = "https://www.tienyan.com"
ORG  = f"{BASE}/#organization"
SITE = f"{BASE}/#website"

MARKER = "<!-- Structured data."

def script_block(graph):
    doc = {"@context": "https://schema.org", "@graph": graph}
    body = json.dumps(doc, indent=2, ensure_ascii=False)
    return (
        '<!-- Structured data. Organization and WebSite are declared once on the\n'
        '     homepage and referenced by @id from every other page, so the brand is\n'
        '     one node in the graph rather than eight copies that drift apart. -->\n'
        f'<script type="application/ld+json">\n{body}\n</script>\n'
    )

def breadcrumb(url, trail):
    return {
        "@type": "BreadcrumbList",
        "@id": f"{url}#breadcrumb",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": n,
             **({"item": f"{BASE}/{u}"} if u is not None else {})}
            for i, (n, u) in enumerate(trail)
        ],
    }

def page_nodes(path, name, desc, ptype="WebPage", trail=None, extra=None):
    url = f"{BASE}/{path}" if path else f"{BASE}/"
    node = {
        "@type": ptype,
        "@id": f"{url}#webpage",
        "url": url,
        "name": name,
        "description": desc,
        "isPartOf": {"@id": SITE},
        "about": {"@id": ORG},
        "inLanguage": "en-SG",
    }
    if extra:
        node.update(extra)
    graph = [node]
    if trail:
        c = breadcrumb(url, trail)
        node["breadcrumb"] = {"@id": c["@id"]}
        graph.append(c)
    return graph

def meta_desc(fname):
    s = open(fname, encoding="utf-8").read()
    m = re.search(r'<meta name="description" content="([^"]*)"', s)
    return html.unescape(m.group(1)) if m else ""

def title_of(fname):
    s = open(fname, encoding="utf-8").read()
    m = re.search(r"<title>([^<]*)</title>", s)
    return html.unescape(m.group(1)) if m else ""

# ---------------------------------------------------------------- Organization
organization = {
    "@type": "Organization",
    "@id": ORG,
    "name": "Tien Yan",
    "legalName": "Tien Yan Pte. Ltd.",
    "alternateName": "天燕",
    "url": f"{BASE}/",
    "logo": {
        "@type": "ImageObject",
        "@id": f"{BASE}/#logo",
        "url": f"{BASE}/assets/logo/logo-horizontal-960.png",
        "caption": "Tien Yan 天燕",
    },
    "image": {"@id": f"{BASE}/#logo"},
    "description": (
        "Tien Yan supplies premium Indonesian edible bird's nest to retail, "
        "hospitality and wellness partners worldwide. The house traces its origins "
        "to Hoo Ann Bird's Nest, established in 1950 at 19 North Canal Road, "
        "Singapore, and produces with PT ESTA Indonesia."
    ),
    "slogan": "Nature's Gift, Beyond Generations",
    "email": "info@tienyan.com",
    "telephone": "+65 8548 7226",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "10 Jalan Kilang, #04-06 Bukit Merah Enterprise Centre",
        "postalCode": "159410",
        "addressLocality": "Singapore",
        "addressCountry": "SG",
    },
    "sameAs": [
        "https://www.linkedin.com/company/tienyan",
        "https://www.instagram.com/tienyan",
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@tienyan.com",
        "telephone": "+65 8548 7226",
        "areaServed": "Worldwide",
        "availableLanguage": ["en", "zh-Hans"],
    },
}

website = {
    "@type": "WebSite",
    "@id": SITE,
    "url": f"{BASE}/",
    "name": "Tien Yan",
    "publisher": {"@id": ORG},
    "inLanguage": "en-SG",
}

# ------------------------------------------------------------------- Products
src = open("products.html", encoding="utf-8").read()
cards = re.findall(
    r'<img class="pcard__media" src="([^"]+)"[^>]*alt="([^"]*)".*?'
    r'<h2 class="pcard__name">([^<]*)</h2>\s*<p class="pcard__desc">(.*?)</p>',
    src, re.S)
assert len(cards) == 12, f"expected 12 product cards, parsed {len(cards)}"

products = []
for i, (img, alt, name, desc) in enumerate(cards):
    nm = html.unescape(name).strip()
    ds = html.unescape(re.sub(r"\s+", " ", desc)).strip()
    products.append({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
            "@type": "Product",
            # No offers node: this is a trade catalogue with no public pricing.
            # Inventing price or availability to chase a rich result would be
            # a structured-data policy breach.
            "@id": f"{BASE}/products.html#{re.sub(r'[^a-z0-9]+', '-', nm.lower()).strip('-')}",
            "name": nm,
            "description": ds,
            "image": f"{BASE}/{img}",
            "brand": {"@id": ORG},
            "manufacturer": {"@id": ORG},
            "category": "Edible bird's nest",
        },
    })

# ----------------------------------------------------------------- Page graphs
HOME = ("Home", None)
PAGES = {
    "index.html": [organization, website] + page_nodes(
        "", title_of("index.html"), meta_desc("index.html")),

    "our-story.html": page_nodes(
        "our-story.html", title_of("our-story.html"), meta_desc("our-story.html"),
        ptype="AboutPage",
        trail=[("Home", ""), ("Our Story", None)]),

    "products.html": page_nodes(
        "products.html", title_of("products.html"), meta_desc("products.html"),
        ptype="CollectionPage",
        trail=[("Home", ""), ("Products", None)],
        extra={"mainEntity": {"@id": f"{BASE}/products.html#catalogue"}},
    ) + [{
        "@type": "ItemList",
        "@id": f"{BASE}/products.html#catalogue",
        "name": "Tien Yan product range",
        "numberOfItems": len(products),
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": products,
    }],

    "partnership.html": page_nodes(
        "partnership.html", title_of("partnership.html"), meta_desc("partnership.html"),
        trail=[("Home", ""), ("Partnership", None)]),

    "contact.html": page_nodes(
        "contact.html", title_of("contact.html"), meta_desc("contact.html"),
        ptype="ContactPage",
        trail=[("Home", ""), ("Contact", None)]),

    "privacy.html": page_nodes(
        "privacy.html", title_of("privacy.html"), meta_desc("privacy.html"),
        trail=[("Home", ""), ("Privacy Policy", None)]),

    "terms.html": page_nodes(
        "terms.html", title_of("terms.html"), meta_desc("terms.html"),
        trail=[("Home", ""), ("Terms of Use", None)]),

    "cookies.html": page_nodes(
        "cookies.html", title_of("cookies.html"), meta_desc("cookies.html"),
        trail=[("Home", ""), ("Cookie Policy", None)]),
}

for fname, graph in PAGES.items():
    s = open(fname, encoding="utf-8").read()
    if MARKER in s:
        # idempotent: strip the previous block first
        s = re.sub(r'\n?' + re.escape(MARKER) + r'.*?</script>\n', '\n', s, flags=re.S)
    assert "</head>" in s, fname
    s = s.replace("</head>", "\n" + script_block(graph) + "</head>", 1)
    open(fname, "w", encoding="utf-8").write(s)
    types = [n["@type"] for n in graph]
    print(f"  {fname:20} {', '.join(types)}")
