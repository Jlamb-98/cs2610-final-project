from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('products/', view=views.products, name="products"),
    path('products/<int:id>/', view=views.product, name="get product"),
    path('images/<int:id>/', view=views.image, name="get image"),
    path('shopping_cart/', view=views.shopping_cart_items, name="shopping cart items"),
    path('shopping_cart/<int:id>/', view=views.shopping_cart, name="shopping cart"),
]