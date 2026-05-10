# REPLACE TEXT GUIDE

## PART 1

### GIVEN INFORMATION

1. email = example@gmail.com
2. domain = example.pt
3. instagram handle = example
4. facebook handle = example
5. main name = Example Name
6. phone number = 912345678
7. address = Rua Virgilio Correia 83
8. postal code = 1112-555
9. opening time and days = Monday to Friday - 10am to 11pm; Saturday - 10 am to 1pm
10. google maps url = https://maps.app.goo.gl/V9WF9Gi97u6QMdni9
11. owner name = Owner Name Example
12. geo coordinates = x: y:
13. founding date = 2020
14. linkedin handle = example
15. tiktok handle = example
16. google review rating = 3.8
17. worst rating = 4
18. languages spoken = languages
19. google review count = count
20. credentials = loreal
21. business type = HairSalon

### HOW TO REPLACE

To replace the required fields, text should be matched with match case and match whole word.

To replace the required fields, please replace by this order:

1. caraibalisboa@gmail.com - email
2. info@lisbonglamstudio.com - email
3. salonconcept.pt - domain
4. lisbonglamstudio.com - domain
5. https://www.instagram.com/salonconcept - https://www.instagram.com/instagram handle
6. https://www.linkedin.com/company/salonconcept - https://www.linkedin.com/company/linkedin handle
7. https://www.tiktok.com/@salonconcept - https://www.tiktok.com/tiktok handle
8. @salonconcept - @instagram handle
9. Salon Concept - main name
10. 915662413 - phone number
11. Rua Virgilio Correia 8 - address
12. 1600-223 - postal code
13. facebook.com/ParrucchieriLisbona - facebook.com/facebook handle
14. <https://maps.app.goo.gl/V9WF9Gi97u6QMdni9> - google maps url
15. Luana Roger - owner name
16. LisbonGlamStudio - main name
17. 2020 - founding date
18. 4.9 - google review rating
19. 4,9 - google review rating
20. 229 - google review count
21. "@type": "HairSalon" - "@type": "business type"

This next part doesn't require match case and match whole word.

Look for this text in the codebase: 'OpeningHours' and replace the content with the correct days and open times stated on the 'opening time and days' information.

Look for this text in the codebase: 'hoursValue'and replace the content with the correct days and open times stated on the 'opening time and days' information.

Then, in the structuredData.ts file:

- look for 'geo' and replace the geo coordinates with the 'geo coordinates' in the given information.
- look for availableLanguage and replace the languages with the provided 'languages spoken'
- look for knowsLanguage and replace the languages with the provided 'languages spoken'
- look for hasCredential and replace with the provided 'credentials'

## PART 2

### PROVIDED INFORMATION

Testimonial 1:
Name:
Rating:
Text:

Testimonial 2:
Name:
Rating:
Text:

Testimonial 3:
Name:
Rating:
Text:

Testimonial 4:
Name:
Rating:
Text:

Testimonial 5:
Name:
Rating:
Text:

Testimonial 6:
Name:
Rating:
Text:

### HOW TO USE

In order to update this websites testimonials you need to first go into the Testimonials.tsx component and replace them there. Then, go into the structuredData.ts file and replace the testimonials there by looking for 'review'.
