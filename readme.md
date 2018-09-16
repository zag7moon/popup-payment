Всплывающее окно, встраивающееся в фронтенд интернет-магазинов посредством тега  `<script>`

Конфигурационные данные и данные о заказе передаются через атрибуты data-*

Конфигурационные данные:
- `data-merchant-id: String` - уникальный номер интренет магазина

- `data-order-id: String` -  id заказа

- `data-order-items: Array(Object)` - список заказанный товаров с информацией (количество, название, описание, стоимость товара в фиатной валюте)

Пример списка товаров в заказе:
```json
data-order-items: [
  {"title": "Macbook", "description": "Amazing computer", "count": 1, "price": 1199},
  {"title": "Longboard", "description": "Best transport", "count": 1, "price": 289},
  {"title": "Longboard", "description": "Best transport", "count": 1, "price": 289},
  {"title": "Longboard", "description": "Best transport", "count": 1, "price": 289},
  {"title": "Longboard", "description": "Best transport", "count": 1, "price": 289},
  {"title": "Coffee", "description": "For your productivity", "count": 5, "price": 1.7}
]
```
