
# Phase 1 - Publish to Social Media

```mermaid

sequenceDiagram
    autonumber
    participant prod as Food Producer
    participant sys as TechForLife
    participant med as Social media
    participant con as Food Consumer

    prod ->>+ sys : Register as a Producer
    prod ->>+ sys : Onboard Producer with Address and Domains (meal/grocery/bakery)
    prod ->>+ sys : Publish Items to sell : Items, quantity, Price, Promotions    
    sys ->> med : Publish avaialble items to Social media
    con ->> med : Knows availability of items.
    com ->> prod : Contact Producer to get item
```