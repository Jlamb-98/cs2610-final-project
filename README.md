# CS2610 Final Project

## General Overview

I have decided to build an E-commerce website, essentially an eBay.com or Amazon.com clone.
Online shopping is huge nowadays, so I figure this would be a good learning experience as to how these types of websites work.
Users will be able to create an account on the site, browse through available items, add them to their shopping cart, and checkout.
Users will be able to upgrade their account to list their own products for sale.
I would like to implement a simple search bar, probably nothing more than matching exact phrases, as I would have to do more research for anything more complex.

## Feature List

### Must Have Features

#### Standard User

- As a user I should be able to log in
- As a user I should be able to see a list of products for sale
- As a user I should be able to click on a product to go to its product page
- As a user I should be able to add/remove a product to/from my shopping cart
- As a user I should be able to checkout from my shopping cart
- As a user I should be able to upgrade to a retailer

#### Retailer User

- As a retailer I should be able to list a new product with description and photo
- As a retailer I should be able to edit/delete an existing product
- As a retailer I should be able to see all of my listed products

### Nice to Have Features

#### Standard User

- As a user I could search for a product
- As a user I could see my purchase history
- As a user I could leave a review on a product
- As a user I could filter/sort the search results

#### Retailer User

- As a retailer I could get a message when a product is purchased
- As a retailer I could see metrics for my products
- As a retailer I could set amount of stock for a product
    - Stock would decrease after a purchase

## Technical Challenges

There is potential for a long list of products, so I will probably want to implement pagination.
I didn't know what that was when I first read it in the assignment description, but a quick Google search told me that it is "dividing a document into discrete pages".
So I will have different pages for the list of products, shopping cart, checkout, and product editing.
But nested in the list of products page I'll want to add sub-pages so it isn't just a huge list of products.

Maintaining the shopping cart state is also something I don't know how to do.
It seems like a trivial thing, like I could just attach some cookies or save a state using React, but I'll need to do more research.

I'd like products to have a photo.
I'm not sure what is the best way to store pictures in the backend.
I have seen arguments for storing them in the filesystem and the database just contains the file location.
Another option would be to store them in the database, but that doesn't feel quite right.

## Requirements

1. My application will use React to display pages and Django to access the database with listed products
2. My application will use client-side routing to display multiple pages
    - Login, product list, shopping cart, checkout, edit product
3. My application will require users to login before checking out and to access retailer features
4. My application may be a sort of clone, but this type of application is useful for countless businesses to sell their products
5. My application will have a consistent, intentional design by seamlessly switching between pages, maintaining the user's state, and looking nice overall
6. My application will use the database in a meaningful way by storing listed products and accessing them as requested