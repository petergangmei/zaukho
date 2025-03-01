# Common Components

This directory contains reusable components that are used throughout the application. These components are designed to be flexible, customizable, and consistent with the Netflix-inspired design system.

## Available Components

### Button

A versatile button component with different variants, sizes, and states.

```jsx
import { Button } from '../components/common';

<Button 
  variant="primary" 
  size="md" 
  fullWidth={false}
  isLoading={false}
  leftIcon={<SomeIcon />}
>
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'text' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `fullWidth`: boolean (default: false)
- `isLoading`: boolean (default: false)
- `disabled`: boolean (default: false)
- `leftIcon`: React node
- `rightIcon`: React node
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `onClick`: function
- `className`: string for additional styling

### FormInput

A form input component with label and error handling.

```jsx
import { FormInput } from '../components/common';

<FormInput
  id="email"
  name="email"
  type="email"
  label="Email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

**Props:**
- `id`: string (required)
- `name`: string (required)
- `type`: string (default: 'text')
- `label`: string
- `value`: string | number
- `onChange`: function (required)
- `error`: string
- `placeholder`: string
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `className`: string for additional styling

### MediaCard

A card component for displaying movies and TV shows.

```jsx
import { MediaCard } from '../components/common';

<MediaCard
  id="movie-1"
  title="Interstellar"
  image="path/to/image.jpg"
  type="movie"
  matchPercentage={98}
  year="2014"
  rating="PG-13"
  duration="2h 49m"
  isWideCard={true}
  progress={45}
  episodeInfo="S1:E5"
/>
```

**Props:**
- `id`: string (required)
- `title`: string (required)
- `image`: string
- `type`: 'movie' | 'tv' (default: 'movie')
- `matchPercentage`: number
- `year`: string
- `rating`: string
- `duration`: string
- `isWideCard`: boolean (default: false)
- `progress`: number (default: 0)
- `episodeInfo`: string

### ContentRow

A row component for displaying a collection of media cards.

```jsx
import { ContentRow } from '../components/common';

<ContentRow
  title="Trending Now"
  items={trendingItems}
  isWideCard={true}
  showProgress={false}
/>
```

**Props:**
- `title`: string
- `items`: array of media items (required)
- `isWideCard`: boolean (default: false)
- `showProgress`: boolean (default: false)

### HeroSection

A hero section component for displaying featured content.

```jsx
import { HeroSection } from '../components/common';

<HeroSection
  content={featuredContent}
  onPlay={handlePlay}
  onMoreInfo={handleMoreInfo}
/>
```

**Props:**
- `content`: object (required)
  - `id`: string (required)
  - `title`: string (required)
  - `description`: string
  - `backgroundImage`: string
  - `matchPercentage`: number
  - `year`: string
  - `rating`: string
  - `duration`: string
  - `quality`: string
- `onPlay`: function
- `onMoreInfo`: function

### FaqItem

An accordion-style component for displaying FAQ items.

```jsx
import { FaqItem } from '../components/common';

<FaqItem
  question="Can I change my plan later?"
  answer="Yes, you can upgrade, downgrade, or cancel your subscription at any time."
  isOpen={isOpen}
  toggleOpen={toggleOpen}
/>
```

**Props:**
- `question`: string (required)
- `answer`: string (required)
- `isOpen`: boolean
- `toggleOpen`: function

### PricingCard

A card component for displaying pricing plans.

```jsx
import { PricingCard } from '../components/common';

<PricingCard
  name="Premium"
  monthlyPrice={14.99}
  annualPrice={149.99}
  features={[
    "Watch on up to 3 devices",
    "Full HD and 4K available",
    "Ad-free experience"
  ]}
  highlight={true}
  cta="Get Premium"
  isAnnual={isAnnual}
  onSelect={handleSelect}
/>
```

**Props:**
- `name`: string (required)
- `monthlyPrice`: number (required)
- `annualPrice`: number (required)
- `features`: array of strings
- `highlight`: boolean (default: false)
- `cta`: string (default: 'Select Plan')
- `isAnnual`: boolean (default: false)
- `onSelect`: function

## Usage Guidelines

1. Import components from the common directory:
   ```jsx
   import { Button, FormInput } from '../components/common';
   ```

2. Use the components with the appropriate props.

3. For consistent styling, avoid overriding the component styles directly. Instead, use the provided props for customization.

4. If you need additional functionality, consider extending the component rather than modifying it directly.