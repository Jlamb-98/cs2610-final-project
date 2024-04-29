from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('products/', view=views.products, name="products"),
    path('products/<int:id>/', view=views.product, name="get product"),
    path('images/<int:id>/', view=views.image, name="get image"),
]