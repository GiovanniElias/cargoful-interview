# automations/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta
from .models import Automation, Schedule, Run
from .serializers import AutomationSerializer

class AutomationCreateAPIView(generics.CreateAPIView):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

class AutomationReadAPIView(APIView):

    def get(self, request, format=None):
        now = timezone.now()
        today = now.date()
        yesterday = today - timedelta(days=1)

        automations = Automation.objects.all()

        # KPIs
        total = automations.count()
        active = automations.filter(status=True).count()
        last_runs = [a.last_run for a in automations if a.last_run]
        if last_runs:
            success_count = sum(1 for run in last_runs if run.status)
            success_rate = round(success_count / len(last_runs) * 100, 1)
        else:
            success_rate = 0.0

        kpi = {
            "total_number_of_automations": total,
            "active_schedules": active,
            "success_rate": f"{success_rate}%"
        }

        scheduled_today = []
        for a in automations:
            sched_date = a.schedule.start_date.date()
            if sched_date == today:
                scheduled_today.append({"name": a.name, "time": a.schedule.start_date.strftime("%I:%M %p")})

        runs_yesterday = Run.objects.filter(timestamp__date=yesterday)
        scheduled_yesterday = [{"name": r.automation.name, "status": "Completed" if r.status else "Failed"} for r in runs_yesterday]

        # All automations grid
        all_autos = []
        for a in automations:
            if a.schedule.frequency == "Daily":
                next_run = a.schedule.start_date
                while next_run.date() < today:
                    next_run += timedelta(days=1)
            else:
                next_run = a.schedule.start_date 

            all_autos.append({
                "id": a.id,
                "name": a.name,
                "status": a.status,
                "schedule": {"frequency": a.schedule.frequency, "start_date": a.schedule.start_date},
                "last_run": {
                    "timestamp": a.last_run.timestamp if a.last_run else None,
                    "status": a.last_run.status if a.last_run else None
                },
                "next_run": next_run
            })

        return Response({
            "kpi": kpi,
            "scheduled_runs": {
                "today": scheduled_today,
                "yesterday": scheduled_yesterday
            },
            "all_automations": all_autos
        })

class AutomationUpdateAPIView(generics.UpdateAPIView):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

class AutomationDeleteAPIView(generics.DestroyAPIView):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer