from django import views
from django.urls import path
from accounts import views
# /:Item/:Id/:SubItem/:SubId
urlpatterns = [
    path("<str:Item>/<int:Id>/<str:SubItem>/<int:SubId>", views.get_results )
]