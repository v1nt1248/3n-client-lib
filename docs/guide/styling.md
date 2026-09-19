# Styling

Every component keeps its measurements in variables of its own. You can leave them
alone — the defaults are what you see in the demo — or set them where you need a
component to look different, without touching the library.

## Changing a component

Each public variable is named `--ui3n-<component>-<property>` and is never declared
inside the library, only read with a fixed default. That means you can set it at any
level, and the nearest one wins:

```css
/* every chip in the application */
:root {
  --ui3n-chip-font-size: 12px;
}

/* only the chips in this panel */
.filter-panel {
  --ui3n-chip-font-size: 14px;
}
```

Class names are hashed by CSS modules, so there is nothing stable to aim a selector
at — except that every component marks its root element with `data-ui3n`:

```css
.filter-panel [data-ui3n='chip'] {
  --ui3n-chip-height: 32px;
}
```

A component's page in this documentation lists its variables and their defaults.

## Sizes that differ per modifier

Where a component has several sizes, each one reads its own variable first and then
the variable shared by all of them, so you can change one size or every size:

```css
/* only small buttons */
:root {
  --ui3n-button-height-small: 28px;
}

/* every button, whatever its size */
:root {
  --ui3n-button-height: 36px;
}
```

## Colours

Colours are different from measurements: they belong to the theme. A component reads
a theme token (`--color-*`), which is what changes when the theme does, so leave them
alone unless you mean to depart from the theme in one particular place — then set the
component's own colour variable there.

## Props still win

Where a component takes a size or a colour as a prop, passing it writes an inline
variable on the element, and an inline value beats any stylesheet. Pass the prop when
one instance is special; use CSS when a whole area or the whole application is.

## Writing a component

Two rules, both checked by `pnpm test` and `pnpm stylelint`:

**Never declare a public variable.** Read it with a fixed default and keep the result
in a private `--_<component>-<property>` variable when it is needed more than once:

```scss
.ui3nChip {
  --_chip-height: var(--ui3n-chip-height, 24px);

  height: var(--_chip-height);
  padding: 0 calc(var(--_chip-height) / 3);
  /* used once, so no private variable is needed */
  font-size: var(--ui3n-chip-font-size, 10px);
}
```

Declaring `--ui3n-chip-height` on the root would undo all of this: a declaration on
the element always beats one inherited from an ancestor, so nobody outside could set it.

**Never read a layout token.** `--spacing-*` and `--font-*` set the rhythm of a page;
a component that reads them changes shape whenever a layout decision is made
elsewhere. Write the measurement as a fixed default instead.

Give the private variables the component's name as a prefix: they are inherited by
children, and components are nested inside one another.
