from django.urls import path
from .views import (
    AutomationCreateAPIView,
    AutomationReadAPIView,
    AutomationUpdateAPIView,
    AutomationDeleteAPIView,
)

urlpatterns = [
    path("automations/", AutomationReadAPIView.as_view(), name="automation-read"),
    path(
        "automations/create/",
        AutomationCreateAPIView.as_view(),
        name="automation-create",
    ),
    path(
        "automations/<uuid:pk>/update/",
        AutomationUpdateAPIView.as_view(),
        name="automation-update",
    ),
    path(
        "automations/<uuid:pk>/delete/",
        AutomationDeleteAPIView.as_view(),
        name="automation-delete",
    ),
]
