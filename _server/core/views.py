import json
import os
import secrets
from django.shortcuts import render
from django.conf  import settings
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpRequest, FileResponse
from django.forms.models import model_to_dict
from .models import Product, Image, CartItem
from pathlib import Path

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def products(req: HttpRequest):
    if req.method == "POST":
        name = req.POST.get('name')
        price = int(req.POST.get('price'))
        description = req.POST.get('description')
        quantity = int(req.POST.get('quantity'))

        # data validation
        if name == "":
            return JsonResponse({"success": False, "message": "No name provided"})
        if description == "":
            return JsonResponse({"success": False, "message": "No description provided"})
        if price < 1:
            return JsonResponse({"success": False, "message": "Price must be positive number"})
        if quantity < 1:
            return JsonResponse({"success": False, "message": "Quantity must be positive number"})

        # create product in database
        product = Product(
            name=name,
            price=price,
            description=description,
            quantity=quantity,
            user=req.user
        )
        product.save()

        # create image in database
        new_file_name = secrets.token_hex(16)
        extension = req.FILES["my_file"].name.split(".", maxsplit=1)[1]
        file_path = f"/product_images/{new_file_name}.{extension}"
        image = Image(
            name=req.FILES["my_file"].name,
            path=file_path,
            product=product
        )
        image.save()

        # save image to filesystem
        with open(f"{Path.cwd()}{file_path}", "ab+") as f:
            for chunk in req.FILES["my_file"].chunks():
                f.write(chunk)

        return JsonResponse({"success": True})
    else:
        products = Product.objects.all()
        products = [model_to_dict(product, exclude='customer') for product in products]

        return JsonResponse({"products": products})

@login_required
def product(req: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    product = model_to_dict(product, exclude='customer')
    return JsonResponse({"product": product})

@login_required
def image(req: HttpRequest, id: int):
    file = Image.objects.get(product_id=id)
    f = open(f"{Path.cwd()}{file.path}", "rb")
    return FileResponse(f, filename=file.name)

@login_required
def shopping_cart_items(req: HttpRequest):
    items = CartItem.objects.filter(customer=req.user)
    new_items = []
    for item in items:
        updated_item = model_to_dict(item)
        updated_item["product"] = model_to_dict(item.product, exclude='customer')
        new_items.append(updated_item)
    return JsonResponse({"shoppingCart": new_items})

@login_required
def shopping_cart(req: HttpRequest, id: int):
    if req.method == "POST":
        body = json.loads(req.body)
        item = CartItem(
            customer=req.user,
            product_id=id,
            quantity=body["quantity"]
        )
        item.save()
        return JsonResponse({"success": True})
    if req.method == "DELETE":
        # TODO: delete product from user's shopping cart
        pass
    if req.method == "PUT":
        # TODO: update product in user's cart (probably just quantity)
        pass