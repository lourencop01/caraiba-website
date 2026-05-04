# COPY GUIDE

In this part we will rewrite the copy for the website. Make sure to use the keywords that make most sense that were given in the CONTEXT.md file.

## Rules

- The Hero Section Title should hold the main keyword
- Throughout the rest of the content, the main keyword from the Hero Section Title should naturally appear multiple times
- The sections together must hold at least 1000 words

Helpful SEO guidelines [https://www.seobility.net/en/wiki/c/search-engine-optimization](https://www.seobility.net/en/wiki/c/search-engine-optimization)

## PROVIDED SERVICES

Online Private Portuguese Lessons For Beginners
Online Group Portuguese Lessons For Beginners
On-Site Private Portuguese Lessons For Beginners
On-Site Group Portuguese Lessons For Beginners

Intermediate Online Private Portuguese Lessons
Intermediate Online Group Portuguese Lessons
Intermediate On-Site Private Portuguese Lessons
Intermediate On-Site Group Portuguese Lessons

Advanced Online Private Portuguese Lessons
Advanced Online Group Portuguese Lessons
Advanced On-Site Private Portuguese Lessons
Advanced On-Site Group Portuguese Lessons

## HOW-TO

In order to write the copy, you will go section by section and rewrite the copy in the translation files both in portuguese and english.
The copy is currently under the /locales/en and /locales/pt folders.

## PART 1: REQUIRED SECTIONS

1. Hero Section (Hero.tsx component and content.json files)
    1. Title
    2. Subtitle
    3. Description
2. Why Choose Us Section (WhyChooseUs.tsx component and content.json)
    1. Title
    2. Subtitle
    3. Description
    4. 4 reason cards each with
        1. Title
        2. Subtitle
3. Services Section (Services.tsx component and services.json files)
    1. Title
    2. Subtitle
    3. Description
4. About (About.tsx component and content.json files)
    1. Title
    2. Subtitle
    3. Description
5. Reviews (Testimonials.tsx component and content.json files)
    1. Title
    2. Subtitle
    3. Description
6. Gallery (Gallery.tsx component and content.json files)
    1. Title
    2. Subtitle
    3. Description
7. Booking Call-to-Action (Booking.tsx component and content.json files)
    1. Title
    2. Subtitle
    3. Description
8. Contact (Contact.tsx component and content.json files)
    1. Title
    2. Subtitle
9. SEO (metadata.json files)
    1. Meta Title
    2. Meta Description

## PART 2: INDIVIDUAL SERVICES

The first part of the individual services will be writing the copy for each. For that go into the services.json files and rewrite the content to make it fit the provided services. Each service will have:

1. Title
2. Subtitle
3. Description
4. What makes it great (6 bullet points +/- each of why this service will help you)
5. FAQs (at least 4 each)

Then you will redo the service pages by creating new ones for the services that don't already exist and delete the ones that exist but aren't provided.

In order to understand how to add a new service, refer to the ADD-NEW-SERVICE-GUIDE.md file.

For removing unwanted services, check in the ADD-NEW-SERVICE-GUIDE what is added for each new service and, instead of adding, remove.

## PART 3: STRUCTURED DATA

In this part you will update the fields of the structuredData.ts file to match this websites niche.

The things you have to update are the following:

in the main generateMainStructuredData function

- "description"
- "slogan"
- "keywords"

in the generateGalleryStructuredData function

- "name"
- "description"
- "mainEntity"

in the generateBlogPostStructuredData function

- "author"."jobTitle"
- "keywords"
- "genre"
