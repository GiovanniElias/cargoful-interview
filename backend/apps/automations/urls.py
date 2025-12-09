from django.urls import path
from .views import AutomationCreateAPIView, AutomationReadAPIView

urlpatterns = [
    path("automations/", AutomationReadAPIView.as_view(), name="automation-read"),
    path("automations/create", AutomationCreateAPIView.as_view(), name="automation-create"),
]
