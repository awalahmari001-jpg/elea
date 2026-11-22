# Design Tokens

Token reference for **ELEA**. Use utility classes and CSS variables — never raw values.

## Colors

Apply with any color utility: `bg-<name>`, `text-<name>`, `border-<name>`, `ring-<name>`, `divide-<name>`, etc.

| Name | CSS variable |
|---|---|
| `background` | `--background` |
| `foreground` | `--foreground` |
| `card` | `--card` |
| `card-foreground` | `--card-foreground` |
| `popover` | `--popover` |
| `popover-foreground` | `--popover-foreground` |
| `primary` | `--primary` |
| `primary-foreground` | `--primary-foreground` |
| `secondary` | `--secondary` |
| `secondary-foreground` | `--secondary-foreground` |
| `muted` | `--muted` |
| `muted-foreground` | `--muted-foreground` |
| `accent` | `--accent` |
| `accent-foreground` | `--accent-foreground` |
| `accent-soft` | `--accent-soft` |
| `destructive` | `--destructive` |
| `destructive-foreground` | `--destructive-foreground` |
| `success` | `--success` |
| `border` | `--border` |
| `input` | `--input` |
| `ring` | `--ring` |
| `inverse` | `--inverse` |
| `inverse-foreground` | `--inverse-foreground` |
| `inverse-muted` | `--inverse-muted` |
| `kids-sun` | `--kids-sun` |
| `kids-sky` | `--kids-sky` |
| `kids-leaf` | `--kids-leaf` |
| `kids-berry` | `--kids-berry` |
| `chart-1` | `--chart-1` |
| `chart-2` | `--chart-2` |
| `chart-3` | `--chart-3` |
| `chart-4` | `--chart-4` |
| `chart-5` | `--chart-5` |
| `sidebar` | `--sidebar` |
| `sidebar-foreground` | `--sidebar-foreground` |
| `sidebar-primary` | `--sidebar-primary` |
| `sidebar-primary-foreground` | `--sidebar-primary-foreground` |
| `sidebar-accent` | `--sidebar-accent` |
| `sidebar-accent-foreground` | `--sidebar-accent-foreground` |
| `sidebar-border` | `--sidebar-border` |
| `sidebar-ring` | `--sidebar-ring` |

## Typography

Typography classes (`font-*` for families, `text-*` for sizes):

| Class | CSS variable |
|---|---|
| `font-sans` | `--font-sans` |
| `font-arabic` | `--font-arabic` |

## Border Radius

Border-radius classes:

| Class | CSS variable |
|---|---|
| `rounded-sm` | `--radius-sm` |
| `rounded-md` | `--radius-md` |
| `rounded-xl` | `--radius-xl` |
| `rounded-2xl` | `--radius-2xl` |
| `rounded-3xl` | `--radius-3xl` |
| `rounded-4xl` | `--radius-4xl` |
| `rounded` | `--radius` |

## Shadows

Box-shadow classes:

| Class | CSS variable |
|---|---|
| `shadow-card-value` | `--shadow-card-value` |
| `shadow-lift-value` | `--shadow-lift-value` |
| `shadow-ink-value` | `--shadow-ink-value` |

## Other

Reference via `var(--name)` in inline styles or CSS.

| CSS variable |
|---|
| `--animate-rise` |
| `--animate-float` |
| `--gradient-hero` |

